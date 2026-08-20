'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Mic, Loader2, AlertTriangle, Trash2, LogOut, Home, Volume2, Activity, ArrowLeftRight } from 'lucide-react'
import { GoogleGenAI, Modality } from '@google/genai'
import { TOUR_GUIDE_MODELS } from '@/lib/tour-guide/geminiConfig'

// Language options for live translation dropdowns
const TARGET_LANGUAGES = [
  { code: 'mm', name: 'Burmese' },
  { code: 'th', name: 'Thai' },
  { code: 'en', name: 'English' },
  { code: 'zh-CN', name: 'Chinese (Mandarin)' },
  { code: 'zh-HK', name: 'Chinese (Cantonese)' },
  { code: 'hi', name: 'Hindi' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'ru', name: 'Russian' },
  { code: 'ko', name: 'Korean' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'id', name: 'Indonesian' },
  { code: 'my', name: 'Malay' },
]



// Helper function to convert ArrayBuffer to base64 (browser-compatible)
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

// Helper function to decode base64 PCM audio (24kHz, 16-bit, little-endian) to AudioBuffer
function decodeBase64PCM(base64Data: string, audioContext: AudioContext): AudioBuffer {
  // Decode base64 to ArrayBuffer
  const binaryString = atob(base64Data)
  const bytes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  
  // Interpret as Int16Array (16-bit PCM)
  const int16Array = new Int16Array(bytes.buffer)
  
  // Convert to Float32Array (Web Audio API uses float32, range -1.0 to 1.0)
  const float32Array = new Float32Array(int16Array.length)
  for (let i = 0; i < int16Array.length; i++) {
    float32Array[i] = int16Array[i] / 32768.0
  }
  
  // Create AudioBuffer at 24kHz
  const audioBuffer = audioContext.createBuffer(1, float32Array.length, 24000)
  audioBuffer.copyToChannel(float32Array, 0)
  
  return audioBuffer
}

// Helper function to stop all audio playback
function stopAllPlayback(audioQueue: AudioBufferSourceNode[], playbackAudioContext: AudioContext | null, playbackStartTimeRef: { current: number }, nextPlaybackTimeRef: { current: number }) {
  // Stop all currently playing sources
  audioQueue.forEach(source => {
    try {
      source.stop()
    } catch (e) {
      // Source might already be stopped
    }
  })
  
  // Clear the queue
  audioQueue.length = 0
  
  // Reset playback timing
  playbackStartTimeRef.current = 0
  nextPlaybackTimeRef.current = 0
}

interface TranscriptEntry {
  sourceText: string
  translatedText: string
  timestamp: number
}

interface TokenResponse {
  success: boolean
  token: string
  expiresIn: number
  accountStatus: {
    remainingHours: number
    remainingUsd?: number
    warning: boolean
  }
}

interface GeminiTokenResponse {
  success: boolean
  token: string
  expireTime: string
  newSessionExpireTime: string
}

interface UsageResponse {
  success: boolean
  usageRecorded: boolean
  costUsd?: number
  durationSeconds: number
  accountStatus: {
    remainingHours: number
    remainingUsd?: number
    remainingSeconds?: number
    warning: boolean
  }
  isExhausted: boolean
  isFinal: boolean
}

export default function TourGuideLiveTranslateForm() {
  const router = useRouter()
  const [sourceLanguage, setSourceLanguage] = useState('mm')
  const [targetLanguage, setTargetLanguage] = useState('th')
  const [isLive, setIsLive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionError, setConnectionError] = useState('')
  const [error, setError] = useState('')
  const [isTranslating, setIsTranslating] = useState(false)
  const [remainingHours, setRemainingHours] = useState<number | null>(null)
  const [remainingUsd, setRemainingUsd] = useState<number | null>(null)
  const [warning, setWarning] = useState(false)
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([])
  
  // Token management
  const [token, setToken] = useState<string | null>(null)
  const [tokenExpiry, setTokenExpiry] = useState<number>(0)
  const tokenRefreshTimerRef = useRef<NodeJS.Timeout | null>(null)
  
  // WebSocket and audio
  const wsRef = useRef<WebSocket | null>(null)
  const liveSessionRef = useRef<any>(null) // Gemini Live API session
  const audioContextRef = useRef<AudioContext | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const audioWorkletNodeRef = useRef<AudioWorkletNode | null>(null)
  const pcmBufferRef = useRef<Int16Array[]>([])
  const pcmSendTimerRef = useRef<NodeJS.Timeout | null>(null)
  
  // Transcript tracking
  const inProgressEntryRef = useRef<TranscriptEntry | null>(null)
  
  // Audio playback (separate context from input capture)
  const playbackAudioContextRef = useRef<AudioContext | null>(null)
  const audioQueueRef = useRef<AudioBufferSourceNode[]>([])
  const playbackStartTimeRef = useRef<number>(0)
  const nextPlaybackTimeRef = useRef<number>(0)
  
  // Response latency tracking
  const userTurnCompleteTimeRef = useRef<number>(0)
  const firstAudioChunkReceivedRef = useRef<boolean>(false)
  const userTurnEndTimeCapturedRef = useRef<boolean>(false)
  
  // Usage tracking
  const sessionStartTimeRef = useRef<number>(0)
  const usageReportTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [audioActivity, setAudioActivity] = useState(0)
  const audioActivityRef = useRef(0)
  
  // Manual VAD for turn-taking
  const isSpeakingRef = useRef<boolean>(false)
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const SPEECH_THRESHOLD = 10 // Match existing UI pulse threshold
  const SILENCE_DURATION_MS = 900 // 0.9 second silence threshold (reduced from 3000ms for faster response)
  
  // Session management
  const isManualStopRef = useRef<boolean>(false)
  const isLiveRef = useRef<boolean>(false)
  const sessionDurationWarningTimerRef = useRef<NodeJS.Timeout | null>(null)
  const performEmergencyCleanupRef = useRef<(() => void) | null>(null)
  const reportUsageRef = useRef<(durationSeconds: number, isFinal?: boolean) => Promise<any>>(null)

  // Fetch AsiaBuddy ephemeral token (for budget/account validation)
  const fetchToken = useCallback(async () => {
    try {
      const response = await fetch('/api/tour-guide/live-translate/token', {
        method: 'POST',
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch token')
      }
      
      const data: TokenResponse = await response.json()
      setToken(data.token)
      setTokenExpiry(Date.now() + data.expiresIn * 1000)
      setRemainingHours(data.accountStatus.remainingHours)
      setRemainingUsd(data.accountStatus.remainingUsd ?? null)
      setWarning(data.accountStatus.warning)
      
      // Schedule token refresh at 80% of duration
      if (tokenRefreshTimerRef.current) {
        clearTimeout(tokenRefreshTimerRef.current)
      }
      tokenRefreshTimerRef.current = setTimeout(() => {
        fetchToken()
      }, data.expiresIn * 800) // 80% of duration in ms
      
      return data.token
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch token')
      return null
    }
  }, [])

  // Fetch Gemini ephemeral token (for Live API authentication)
  const fetchGeminiToken = useCallback(async () => {
    try {
      // Convert language codes to full names for API
      const sourceLangName = TARGET_LANGUAGES.find(l => l.code === sourceLanguage)?.name || sourceLanguage
      const targetLangName = TARGET_LANGUAGES.find(l => l.code === targetLanguage)?.name || targetLanguage
      
      const response = await fetch('/api/tour-guide/live-translate/gemini-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceLanguage: sourceLangName, targetLanguage: targetLangName }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch Gemini token')
      }
      
      const data: GeminiTokenResponse = await response.json()
      return data.token
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch Gemini token'
      setConnectionError(errorMessage)
      setError(errorMessage)
      return null
    }
  }, [sourceLanguage, targetLanguage])

  // Report usage
  const reportUsage = useCallback(async (durationSeconds: number, isFinal = false) => {
    try {
      const response = await fetch('/api/tour-guide/live-translate/usage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ durationSeconds, isFinal }),
      })
      
      if (!response.ok) {
        throw new Error('Usage reporting failed')
      }
      
      const data: UsageResponse = await response.json()
      setRemainingHours(data.accountStatus.remainingHours)
      setRemainingUsd(data.accountStatus.remainingUsd ?? null)
      setWarning(data.accountStatus.warning)
      
      if (data.isExhausted) {
        // Stop the live WebSocket session immediately when budget is exhausted
        stopLiveTranslation()
        // Redirect to login page with trial expired parameter for conversion funnel
        router.push('/tourguide/?trial=expired')
        return
      }
      
      return data
    } catch (err) {
      console.error('Usage reporting error:', err)
      return null
    }
  }, [])

  // Shared cleanup function for unexpected session termination
  const performEmergencyCleanup = useCallback(() => {
    // Final usage report before cleanup (fire-and-forget to avoid blocking cleanup)
    if (sessionStartTimeRef.current > 0) {
      const duration = (Date.now() - sessionStartTimeRef.current) / 1000
      // Fire-and-forget: don't await to avoid blocking cleanup
      // Use ref to avoid circular dependency
      reportUsageRef.current?.(duration, true).catch(err => {
        console.error('Final usage report failed during emergency cleanup:', err)
      })
      sessionStartTimeRef.current = 0
    }
    
    // Stop all audio playback
    stopAllPlayback(audioQueueRef.current, playbackAudioContextRef.current, playbackStartTimeRef, nextPlaybackTimeRef)
    
    // Close playback audio context
    if (playbackAudioContextRef.current) {
      try {
        playbackAudioContextRef.current.close()
      } catch (e) {
        console.error('Error closing playback audio context:', e)
      }
      playbackAudioContextRef.current = null
    }
    
    // Stop media stream
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop())
      mediaStreamRef.current = null
    }
    
    // Stop audio visualization
    if (analyserRef.current) {
      analyserRef.current = null
    }
    
    // Disconnect and cleanup AudioWorkletNode
    if (audioWorkletNodeRef.current) {
      audioWorkletNodeRef.current.disconnect()
      audioWorkletNodeRef.current = null
    }
    
    // Clear PCM send timer
    if (pcmSendTimerRef.current) {
      clearInterval(pcmSendTimerRef.current)
      pcmSendTimerRef.current = null
    }
    
    // Clear PCM buffer
    pcmBufferRef.current = []
    
    // Close audio context
    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }
    
    // Clear token refresh timer
    if (tokenRefreshTimerRef.current) {
      clearTimeout(tokenRefreshTimerRef.current)
      tokenRefreshTimerRef.current = null
    }
    
    // Clear usage report timer
    if (usageReportTimerRef.current) {
      clearInterval(usageReportTimerRef.current)
      usageReportTimerRef.current = null
    }
    
    // Clear session duration warning timer
    if (sessionDurationWarningTimerRef.current) {
      clearTimeout(sessionDurationWarningTimerRef.current)
      sessionDurationWarningTimerRef.current = null
    }
    
    // Clear in-progress transcript entry
    inProgressEntryRef.current = null
    
    // Reset speaking state
    isSpeakingRef.current = false
    
    // Update UI state
    setIsLive(false)
    setIsLoading(false)
    setIsTranslating(false)
    setAudioActivity(0)
    audioActivityRef.current = 0
  }, [])

  // Queue audio chunk for gapless playback
  const queueAudioForPlayback = useCallback(async (base64Audio: string) => {
    // Check and resume AudioContext if suspended (browsers suspend contexts without user gesture)
    // Do this at the top of every call, not just after creation
    if (playbackAudioContextRef.current && playbackAudioContextRef.current.state === 'suspended') {
      console.log('[STREAMING] AudioContext is suspended, resuming...')
      await playbackAudioContextRef.current.resume().catch(err => {
        console.error('[STREAMING] Failed to resume AudioContext:', err)
      })
    }
    
    if (!playbackAudioContextRef.current) {
      playbackAudioContextRef.current = new AudioContext()
      console.log('[STREAMING] AudioContext state:', playbackAudioContextRef.current.state)
      
      // Also check and resume newly created context
      if (playbackAudioContextRef.current.state === 'suspended') {
        console.log('[STREAMING] Newly created AudioContext is suspended, resuming...')
        await playbackAudioContextRef.current.resume().catch(err => {
          console.error('[STREAMING] Failed to resume newly created AudioContext:', err)
        })
      }
    }
    
    try {
      const audioBuffer = decodeBase64PCM(base64Audio, playbackAudioContextRef.current)
      const source = playbackAudioContextRef.current.createBufferSource()
      source.buffer = audioBuffer
      source.connect(playbackAudioContextRef.current.destination)
      
      // Schedule for gapless playback using monotonic time tracking
      let startTime: number
      const currentTime = playbackAudioContextRef.current.currentTime
      
      if (nextPlaybackTimeRef.current === 0 || nextPlaybackTimeRef.current < currentTime) {
        // Starting fresh (first chunk or playback has gone idle)
        // Start immediately with minimal latency
        startTime = currentTime + 0.01 // Small buffer to avoid glitches
        playbackStartTimeRef.current = startTime
        console.log('[STREAMING] Starting first chunk immediately at', startTime, 'seconds')
      } else {
        // Continue from where last chunk was scheduled to end
        startTime = nextPlaybackTimeRef.current
        console.log('[STREAMING] Scheduling subsequent chunk at', startTime, 'seconds')
      }
      
      source.start(startTime)
      
      // Update next playback time immediately (synchronously, not in onended)
      nextPlaybackTimeRef.current = startTime + audioBuffer.duration
      
      // Add to queue for tracking and cleanup (needed for stopAllPlayback)
      audioQueueRef.current.push(source)
      
      // Remove from queue when playback finishes
      source.onended = () => {
        const index = audioQueueRef.current.indexOf(source)
        if (index > -1) {
          audioQueueRef.current.splice(index, 1)
        }
        
        // Reset timing if queue is empty
        if (audioQueueRef.current.length === 0) {
          playbackStartTimeRef.current = 0
          nextPlaybackTimeRef.current = 0
          console.log('[STREAMING] Playback queue empty, timing reset')
        }
      }
    } catch (e) {
      console.error('Error queueing audio for playback:', e)
      console.error('Full error object:', JSON.stringify(e, null, 2))
    }
  }, [])

  // Establish Gemini Live API connection (to be called on mount)
  const establishConnection = useCallback(async () => {
    setIsConnecting(true)
    setConnectionError('')
    
    try {
      // Fetch AsiaBuddy token first (for budget/account validation)
      const asiaBuddyToken = await fetchToken()
      if (!asiaBuddyToken) {
        throw new Error('Failed to authenticate with AsiaBuddy')
      }
      
      // Fetch Gemini ephemeral token (for Live API authentication)
      const geminiToken = await fetchGeminiToken()
      if (!geminiToken) {
        throw new Error('Failed to get Gemini ephemeral token')
      }
      
      // Connect to Gemini Live API
      const ai = new GoogleGenAI({ apiKey: geminiToken })
      
      const config = {
        responseModalities: [Modality.AUDIO],
        inputAudioTranscription: {}, // Enable input audio transcription
        outputAudioTranscription: {}, // Enable output audio transcription
      }
      
      console.log('[MOUNT] Establishing Gemini Live API connection with config:', JSON.stringify(config, null, 2))
      
      const session = await ai.live.connect({
        model: TOUR_GUIDE_MODELS.liveTranslate,
        config: config,
        callbacks: {
          onopen: () => {
            console.log('[MOUNT] Gemini Live API connection opened successfully')
            setIsConnecting(false)
          },
          onmessage: (message: any) => {
            // Log raw message for debugging
            console.log('[MOUNT RAW MESSAGE] Full Gemini Live API message:', JSON.stringify(message, null, 2))
            
            // Only process messages if session is live
            // Note: We check the ref directly to avoid dependency issues
            if (!isLiveRef.current) return
            
            // Check if we're receiving audio while model is responding (barge-in detection)
            if (message.serverContent?.modelTurn?.parts) {
              console.log('[BARGE-IN CHECK] Model started responding - checking if user still sending audio')
              console.log('[BARGE-IN CHECK] PCM buffer size:', pcmBufferRef.current.reduce((sum, chunk) => sum + chunk.length, 0), 'samples')
              console.log('[BARGE-IN CHECK] Audio activity level:', audioActivityRef.current)
              
              // Capture timestamp for latency measurement (user's turn is complete - model started responding)
              // Only capture once per turn to avoid resetting on every streamed part
              if (!userTurnEndTimeCapturedRef.current) {
                userTurnCompleteTimeRef.current = Date.now()
                userTurnEndTimeCapturedRef.current = true
                console.log('[LATENCY] User turn end time captured at', new Date().toISOString())
              }
            }
            
            if (!message.serverContent) return
            
            const serverContent = message.serverContent
            
            // Show "Translating..." indicator when server starts processing (model begins responding)
            if (serverContent.modelTurn?.parts && !inProgressEntryRef.current?.translatedText) {
              setIsTranslating(true)
            }
            
            // Handle interruption - stop all audio immediately
            if (serverContent.interrupted) {
              console.log('User interrupted - stopping audio playback')
              stopAllPlayback(audioQueueRef.current, playbackAudioContextRef.current, playbackStartTimeRef, nextPlaybackTimeRef)
              inProgressEntryRef.current = null
              return
            }
            
            // Initialize in-progress entry if needed
            if (!inProgressEntryRef.current) {
              inProgressEntryRef.current = {
                sourceText: '',
                translatedText: '',
                timestamp: Date.now()
              }
            }
            
            // Append input transcription (source language)
            if (serverContent.inputTranscription?.text) {
              console.log('[TRANSCRIPT] Input transcription chunk:', serverContent.inputTranscription.text)
              inProgressEntryRef.current.sourceText += serverContent.inputTranscription.text
            }
            
            // Append output transcription (target language)  
            if (serverContent.outputTranscription?.text) {
              console.log('[TRANSCRIPT] Output transcription chunk:', serverContent.outputTranscription.text)
              inProgressEntryRef.current.translatedText += serverContent.outputTranscription.text
              // Clear "Translating..." indicator when first text chunk arrives
              setIsTranslating(false)
            }
            
            // Process audio parts from model turn
            if (serverContent.modelTurn?.parts) {
              for (const part of serverContent.modelTurn.parts) {
                if (part.inlineData?.data) {
                  // Queue audio for playback
                  const base64Audio = part.inlineData.data
                  console.log('[AUDIO RECEIVE] Model audio chunk received at', new Date().toISOString(), '- Queueing for playback')
                  console.log('[AUDIO RECEIVE] Current PCM buffer size:', pcmBufferRef.current.reduce((sum, chunk) => sum + chunk.length, 0), 'samples')
                  
                  // Calculate and log response latency on first audio chunk
                  if (!firstAudioChunkReceivedRef.current && userTurnCompleteTimeRef.current > 0) {
                    const elapsedMs = Date.now() - userTurnCompleteTimeRef.current
                    console.log('[LATENCY] Time from user turn-complete to first audio chunk:', elapsedMs, 'ms')
                    firstAudioChunkReceivedRef.current = true
                  }
                  
                  // Clear "Translating..." indicator when first audio chunk arrives
                  setIsTranslating(false)
                  queueAudioForPlayback(base64Audio).catch(err => {
                    console.error('[STREAMING] Error in queueAudioForPlayback:', err)
                  })
                }
              }
            }
            
            // Finalize entry on turn complete
            if (serverContent.turnComplete) {
              console.log('[TURN COMPLETE] Turn completed at', new Date().toISOString())
              console.log('[TURN COMPLETE] Final source text:', inProgressEntryRef.current?.sourceText)
              console.log('[TURN COMPLETE] Final translated text:', inProgressEntryRef.current?.translatedText)
              
              // Reset latency tracking flags for next turn
              userTurnEndTimeCapturedRef.current = false
              firstAudioChunkReceivedRef.current = false
              
              if (inProgressEntryRef.current && 
                  (inProgressEntryRef.current.sourceText || inProgressEntryRef.current.translatedText)) {
                // Add finalized entry to transcript array
                setTranscript(prev => [...prev, { ...inProgressEntryRef.current! }])
                // Reset in-progress entry
                inProgressEntryRef.current = null
              }
              // Clear "Translating..." indicator when turn completes
              setIsTranslating(false)
            }
          },
          onerror: (e: any) => {
            console.error('[MOUNT] Gemini Live API error:', e.message)
            const errorMessage = `Connection error: ${e.message}`
            setConnectionError(errorMessage)
            setError(errorMessage)
            setIsConnecting(false)
            
            // Only perform cleanup if this is not a manual stop
            if (!isManualStopRef.current) {
              performEmergencyCleanupRef.current?.()
            }
          },
          onclose: (e: any) => {
            console.log('[MOUNT] Gemini Live API connection closed:', e.reason)
            
            // Handle unexpected close (server-initiated or network drop)
            if (!isManualStopRef.current) {
              const reason = e.reason || 'connection lost'
              const errorMessage = `Session ended unexpectedly (${reason}). Please refresh the page to reconnect.`
              setConnectionError(errorMessage)
              setError(errorMessage)
              performEmergencyCleanupRef.current?.()
            }
            
            // Reset the manual stop flag for next session
            isManualStopRef.current = false
            setIsConnecting(false)
          },
        },
      })
      
      liveSessionRef.current = session
      wsRef.current = session as any // Store reference for cleanup
      console.log('[MOUNT] Gemini Live API session established successfully')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to establish connection'
      setConnectionError(errorMessage)
      setError(errorMessage)
      setIsConnecting(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchToken, fetchGeminiToken, queueAudioForPlayback, sourceLanguage, targetLanguage])

  // Setup audio visualization with manual VAD
  const setupAudioVisualization = useCallback((stream: MediaStream) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
    }
    
    const source = audioContextRef.current.createMediaStreamSource(stream)
    analyserRef.current = audioContextRef.current.createAnalyser()
    analyserRef.current.fftSize = 256
    source.connect(analyserRef.current)
    
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
    
    const updateActivity = () => {
      if (!isLive || !analyserRef.current) return
      
      analyserRef.current.getByteFrequencyData(dataArray)
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length
      setAudioActivity(average)
      audioActivityRef.current = average
      
      // Manual VAD: detect speech start/stop transitions (for UI display only)
      const isNowSpeaking = average > SPEECH_THRESHOLD
      
      if (isNowSpeaking && !isSpeakingRef.current) {
        // Speech started: update UI state
        isSpeakingRef.current = true
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current)
          silenceTimerRef.current = null
        }
      } else if (!isNowSpeaking && isSpeakingRef.current) {
        // Speech stopped: start silence timer
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current)
        }
        silenceTimerRef.current = setTimeout(() => {
          // Silence threshold reached: update UI state
          isSpeakingRef.current = false
        }, SILENCE_DURATION_MS)
      }
      
      requestAnimationFrame(updateActivity)
    }
    
    updateActivity()
  }, [isLive, SPEECH_THRESHOLD, SILENCE_DURATION_MS])

  // Start live translation
  const startLiveTranslation = async () => {
    // Guard against double-start
    if (isLive || isLoading) {
      return
    }
    
    // Reset manual stop flag for new session
    isManualStopRef.current = false
    
    setError('')
    setIsLoading(true)
    
    try {
      // Close any existing session before creating a new one
      if (liveSessionRef.current) {
        try {
          await liveSessionRef.current.close()
          liveSessionRef.current = null
          wsRef.current = null
        } catch (closeErr) {
          console.error('Error closing existing session:', closeErr)
        }
      }
      
      // Establish fresh connection with current language selection
      await establishConnection()
      
      // Check if connection was successful
      if (!liveSessionRef.current || connectionError) {
        const errorMsg = connectionError || 'Failed to establish connection. Please try again.'
        setError(errorMsg)
        setIsLoading(false)
        return
      }
      
      // Get microphone access early (for visualization)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaStreamRef.current = stream
      setupAudioVisualization(stream)

      // Setup AudioWorklet for PCM streaming (session is already established)
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext()
      }

      // Load the AudioWorklet processor
      await audioContextRef.current.audioWorklet.addModule('/worklets/pcm-recorder-processor.js')

      // Create AudioWorkletNode
      const source = audioContextRef.current.createMediaStreamSource(stream)
      audioWorkletNodeRef.current = new AudioWorkletNode(audioContextRef.current, 'pcm-recorder-processor')
      
      // Connect the source to the worklet (don't connect to destination to avoid feedback)
      source.connect(audioWorkletNodeRef.current)

      // Handle PCM chunks from the worklet
      audioWorkletNodeRef.current.port.onmessage = (event) => {
        if (event.data.pcm) {
          pcmBufferRef.current.push(event.data.pcm)
        }
      }

      // Start periodic sending of PCM chunks to Gemini Live API
      pcmSendTimerRef.current = setInterval(() => {
        if (pcmBufferRef.current.length > 0 && liveSessionRef.current) {
          // Safety cap: drop oldest samples if buffer exceeds ~2 seconds (32000 samples at 16kHz)
          const totalSamples = pcmBufferRef.current.reduce((sum, chunk) => sum + chunk.length, 0)
          const MAX_BUFFER_SAMPLES = 32000 // ~2 seconds at 16kHz
          
          if (totalSamples > MAX_BUFFER_SAMPLES) {
            let samplesToDrop = totalSamples - MAX_BUFFER_SAMPLES
            while (samplesToDrop > 0 && pcmBufferRef.current.length > 0) {
              const chunk = pcmBufferRef.current[0]
              if (chunk.length <= samplesToDrop) {
                pcmBufferRef.current.shift()
                samplesToDrop -= chunk.length
              } else {
                // Drop part of the first chunk
                pcmBufferRef.current[0] = chunk.slice(samplesToDrop)
                samplesToDrop = 0
              }
            }
          }

          // Combine all buffered chunks
          const totalLength = pcmBufferRef.current.reduce((sum, chunk) => sum + chunk.length, 0)
          const combinedPCM = new Int16Array(totalLength)
          let offset = 0
          for (const chunk of pcmBufferRef.current) {
            combinedPCM.set(chunk, offset)
            offset += chunk.length
          }

          // Clear buffer
          pcmBufferRef.current = []

          // Convert to base64 and send
          const base64Data = arrayBufferToBase64(combinedPCM.buffer)
          console.log('[AUDIO SEND] Sending PCM chunk:', combinedPCM.length, 'samples at', new Date().toISOString())
          liveSessionRef.current.sendRealtimeInput({
            audio: {
              data: base64Data,
              mimeType: 'audio/pcm;rate=16000'
            }
          })
        }
      }, 100) // Send every 100ms
      
      sessionStartTimeRef.current = Date.now()
      
      // Start periodic usage reporting (every 10 seconds)
      usageReportTimerRef.current = setInterval(() => {
        const duration = (Date.now() - sessionStartTimeRef.current) / 1000
        reportUsage(duration)
      }, 10000)
      
      // Start session duration warning timer (13 minutes = 780,000 ms)
      sessionDurationWarningTimerRef.current = setTimeout(() => {
        setError('Your session will end automatically in about 2 minutes (15-minute limit). Restart if you need to continue.')
      }, 780000) // 13 minutes
      
      setIsLive(true)
      isLiveRef.current = true
      setIsLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start live translation')
      setIsLoading(false)
    }
  }

  // Stop live translation
  const stopLiveTranslation = useCallback(async () => {
    setIsLive(false)
    isLiveRef.current = false
    
    // Set manual stop flag to prevent emergency cleanup from running
    isManualStopRef.current = true
    
    // Stop all audio playback first
    stopAllPlayback(audioQueueRef.current, playbackAudioContextRef.current, playbackStartTimeRef, nextPlaybackTimeRef)
    
    // Close playback audio context
    if (playbackAudioContextRef.current) {
      try {
        await playbackAudioContextRef.current.close()
      } catch (e) {
        console.error('Error closing playback audio context:', e)
      }
      playbackAudioContextRef.current = null
    }
    
    // Close Gemini Live API session
    if (liveSessionRef.current) {
      try {
        await liveSessionRef.current.close()
        console.log('Gemini Live API session closed')
      } catch (e) {
        console.error('Error closing Gemini Live API session:', e)
      }
      liveSessionRef.current = null
    }
    
    // Stop WebSocket
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
    
    // Stop media stream
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop())
      mediaStreamRef.current = null
    }
    
    // Stop audio visualization
    if (analyserRef.current) {
      analyserRef.current = null
    }
    
    // Disconnect and cleanup AudioWorkletNode
    if (audioWorkletNodeRef.current) {
      audioWorkletNodeRef.current.disconnect()
      audioWorkletNodeRef.current = null
    }
    
    // Clear PCM send timer
    if (pcmSendTimerRef.current) {
      clearInterval(pcmSendTimerRef.current)
      pcmSendTimerRef.current = null
    }
    
    // Clear PCM buffer
    pcmBufferRef.current = []
    
    // Close audio context
    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }
    
    // Clear timers
    if (tokenRefreshTimerRef.current) {
      clearTimeout(tokenRefreshTimerRef.current)
      tokenRefreshTimerRef.current = null
    }
    
    if (usageReportTimerRef.current) {
      clearInterval(usageReportTimerRef.current)
      usageReportTimerRef.current = null
    }
    
    // Clear session duration warning timer
    if (sessionDurationWarningTimerRef.current) {
      clearTimeout(sessionDurationWarningTimerRef.current)
      sessionDurationWarningTimerRef.current = null
    }
    
    // Final usage report
    if (sessionStartTimeRef.current > 0) {
      const duration = (Date.now() - sessionStartTimeRef.current) / 1000
      await reportUsage(duration, true)
      sessionStartTimeRef.current = 0
    }
    
    // Clear in-progress transcript entry
    inProgressEntryRef.current = null
    
    // Reset speaking state
    isSpeakingRef.current = false
    
    setAudioActivity(0)
    audioActivityRef.current = 0
  }, [fetchToken, reportUsage])

  // Clear transcript
  const clearTranscript = () => {
    setTranscript([])
  }

  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch('/api/tour-guide/logout', { method: 'POST' })
      router.push('/tourguide')
    } catch {
      router.push('/tourguide')
    }
  }

  // Handle language swap
  const handleSwapLanguages = () => {
    const temp = sourceLanguage
    setSourceLanguage(targetLanguage)
    setTargetLanguage(temp)
  }

  // Handle source language change with same-language guard
  const handleSourceLanguageChange = (newCode: string) => {
    if (newCode === targetLanguage) {
      // Auto-swap target to previous source value
      const previousSource = sourceLanguage
      setSourceLanguage(newCode)
      setTargetLanguage(previousSource)
    } else {
      setSourceLanguage(newCode)
    }
  }

  // Handle target language change with same-language guard
  const handleTargetLanguageChange = (newCode: string) => {
    if (newCode === sourceLanguage) {
      // Auto-swap source to previous target value
      const previousTarget = targetLanguage
      setTargetLanguage(newCode)
      setSourceLanguage(previousTarget)
    } else {
      setTargetLanguage(newCode)
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopLiveTranslation()
    }
  }, [stopLiveTranslation])

  // Assign the cleanup function to the ref after it's defined
  useEffect(() => {
    performEmergencyCleanupRef.current = performEmergencyCleanup
  }, [performEmergencyCleanup])

  // Assign reportUsage to ref after it's defined
  useEffect(() => {
    reportUsageRef.current = reportUsage
  }, [reportUsage])

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.push('/tourguide/dashboard')}
          className="flex items-center gap-2 text-sm text-[#F5F0E8] opacity-70 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>
        <div className="flex items-center gap-2">
          <Link
            href="/thailand"
            className="flex items-center gap-1.5 text-xs text-[#F5F0E8] opacity-70 hover:opacity-100 transition-opacity"
            title="Home"
          >
            <Home size={14} />
            Home
          </Link>
          <a
            href="https://asiabuddy.app/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs bg-[#C9A84C] text-[#0D0D0D] px-3 py-1.5 rounded-md hover:bg-[#b8942f] transition-colors font-medium"
          >
            Top Up Here
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-[#F5F0E8] opacity-70 hover:opacity-100 transition-opacity"
            title="Log out"
          >
            <LogOut size={14} />
            Log out
          </button>
        </div>
      </div>

      {/* Title and Balance */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-lg bg-[#C9A84C]/20">
          <Volume2 size={24} className="text-[#C9A84C]" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#F5F0E8]">Live Translator</h1>
          {remainingHours !== null && (
            <p className="text-sm text-[#C9A84C]">{remainingHours.toFixed(2)}h remaining</p>
          )}
          {typeof remainingUsd === 'number' && (
            <p className="text-xs text-[#C9A84C]/70">${remainingUsd.toFixed(2)} remaining</p>
          )}
        </div>
      </div>

      {/* Warning */}
      {warning && (
        <div className="flex items-start gap-2 bg-yellow-900/20 border border-yellow-600 text-yellow-200 px-4 py-3 rounded-md text-sm mb-4">
          <AlertTriangle size={16} className="mt-0.5 shrink-0" />
          <span>You've used most of your allocated time. Contact support if you need more.</span>
        </div>
      )}

      {/* Connection Error */}
      {connectionError && (
        <div className="bg-red-900/20 border border-red-500 text-red-200 px-4 py-3 rounded-md text-sm mb-4">
          <div className="flex items-start gap-2">
            <AlertTriangle size={16} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">Connection Error</p>
              <p className="mt-1">{connectionError}</p>
              <button
                onClick={() => {
                  setConnectionError('')
                  setError('')
                  establishConnection()
                }}
                className="mt-2 text-xs bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded transition-colors"
              >
                Retry Connection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {error && !connectionError && (
        <div className="bg-red-900/20 border border-red-500 text-red-200 px-4 py-3 rounded-md text-sm mb-4">
          {error}
        </div>
      )}

      {/* Controls */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-[#F5F0E8] mb-2">Translation Direction</label>
          <div className="flex items-center gap-3 bg-[#1a1a1a] border border-[#C9A84C] rounded-2xl p-3">
            <div className="flex-1">
              <select
                value={sourceLanguage}
                onChange={(e) => handleSourceLanguageChange(e.target.value)}
                disabled={isLive || isLoading}
                className="w-full bg-[#0D0D0D] text-[#F5F0E8] border border-[#C9A84C]/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {TARGET_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-[#0D0D0D] text-[#F5F0E8]">
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleSwapLanguages}
              disabled={isLive || isLoading}
              className="p-2 rounded-full bg-[#C9A84C] text-[#0D0D0D] hover:bg-[#b8942f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
              title="Swap languages"
            >
              <ArrowLeftRight size={20} />
            </button>
            <div className="flex-1">
              <select
                value={targetLanguage}
                onChange={(e) => handleTargetLanguageChange(e.target.value)}
                disabled={isLive || isLoading}
                className="w-full bg-[#0D0D0D] text-[#C9A84C] border border-[#C9A84C]/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {TARGET_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-[#0D0D0D] text-[#F5F0E8]">
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>



        <button
          onClick={isLive ? stopLiveTranslation : startLiveTranslation}
          disabled={isLoading || isConnecting || connectionError !== ''}
          className={`w-full h-[44px] font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-2 focus:ring-offset-[#0D0D0D] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center ${
            isLive
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-[#C9A84C] text-[#0D0D0D] hover:bg-[#b8942f]'
          }`}
        >
          {isConnecting ? (
            <div className="flex items-center gap-2">
              <Loader2 size={18} className="animate-spin" />
              <span>Establishing Connection...</span>
            </div>
          ) : isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 size={18} className="animate-spin" />
              <span>Starting...</span>
            </div>
          ) : isLive ? (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              <span>Stop Live Translation</span>
            </div>
          ) : connectionError ? (
            <div className="flex items-center gap-2">
              <AlertTriangle size={18} />
              <span>Connection Failed</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Mic size={18} />
              <span>Start Live Translation</span>
            </div>
          )}
        </button>

        {/* Audio Activity Indicator */}
        {isLive && (
          <div className="flex items-center gap-2 text-sm text-[#C9A84C]">
            <Activity size={16} className={audioActivity > 10 ? 'animate-pulse' : ''} />
            <span>Audio Level: {Math.round(audioActivity)}</span>
          </div>
        )}

        {/* Translating Indicator */}
        {isTranslating && (
          <div className="flex items-center gap-2 text-sm text-[#C9A84C] animate-pulse">
            <Loader2 size={16} className="animate-spin" />
            <span>Translating...</span>
          </div>
        )}
      </div>

      {/* Two-column Transcript Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Source Speech */}
        <div className="bg-[#1a1a1a] border border-[#C9A84C]/30 rounded-md p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-[#F5F0E8]">Source Speech ({TARGET_LANGUAGES.find(l => l.code === sourceLanguage)?.name || sourceLanguage})</h3>
            <button
              onClick={clearTranscript}
              className="flex items-center gap-1 text-xs text-[#C9A84C] opacity-70 hover:opacity-100 transition-opacity"
              title="Clear transcript"
            >
              <Trash2 size={14} />
              Clear
            </button>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {transcript.length === 0 ? (
              <p className="text-sm text-[#F5F0E8]/50 italic">Start speaking to see transcript...</p>
            ) : (
              transcript.map((entry, index) => (
                <div key={index} className="text-sm text-[#F5F0E8]">
                  {entry.sourceText}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Real-time Translation */}
        <div className="bg-[#1a1a1a] border border-[#C9A84C]/30 rounded-md p-4">
          <h3 className="text-sm font-medium text-[#F5F0E8] mb-2">Translation ({TARGET_LANGUAGES.find(l => l.code === targetLanguage)?.name || targetLanguage})</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {transcript.length === 0 ? (
              <p className="text-sm text-[#F5F0E8]/50 italic">Translation will appear here...</p>
            ) : (
              transcript.map((entry, index) => (
                <div key={index} className="text-sm text-[#C9A84C]">
                  {entry.translatedText}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
