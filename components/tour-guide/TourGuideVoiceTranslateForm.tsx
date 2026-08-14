'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Mic, Loader2, AlertTriangle, Copy, Check, Trash2, LogOut, Home } from 'lucide-react'
import { LANGUAGES } from '@/lib/tour-guide/languages'

interface TranslationEntry {
  translation: string
  timestamp: number
}

export default function TourGuideVoiceTranslateForm() {
  const router = useRouter()
  const [targetLanguage, setTargetLanguage] = useState('Burmese')
  const [isRecording, setIsRecording] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [remainingHours, setRemainingHours] = useState<number | null>(null)
  const [warning, setWarning] = useState(false)
  const [copied, setCopied] = useState(false)
  const [history, setHistory] = useState<TranslationEntry[]>([])
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const recordingStartTimeRef = useRef<number>(0)

  const handleRecordStart = async () => {
    setError('')
    audioChunksRef.current = []

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      
      const mimeType = 'audio/webm;codecs=opus'
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        throw new Error('Your browser does not support the required audio format. Please try Chrome, Firefox, or Edge.')
      }

      const recorder = new MediaRecorder(stream, { mimeType })
      setMediaRecorder(recorder)

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType })
        stream.getTracks().forEach((track) => track.stop())
        
        // Convert to base64
        const base64 = await blobToBase64(audioBlob)
        console.log('Audio base64 length:', base64.length, 'characters')

        // Send to API
        await handleVoiceSubmit(base64, mimeType, targetLanguage)
      }

      recorder.start()
      recordingStartTimeRef.current = Date.now()
      setIsRecording(true)
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setError('Microphone access was denied. Please allow microphone access in your browser settings and try again.')
        } else {
          setError(err.message)
        }
      } else {
        setError('Could not access microphone. Please check your browser settings and try again.')
      }
    }
  }

  const handleRecordStop = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      const elapsed = Date.now() - recordingStartTimeRef.current
      if (elapsed < 700) {
        // Wait out the remaining time to ensure minimum 700ms of audio
        setTimeout(() => {
          if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop()
            setIsRecording(false)
          }
        }, 700 - elapsed)
      } else {
        mediaRecorder.stop()
        setIsRecording(false)
      }
    }
  }

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        resolve(base64.split(',')[1]) // Remove data URL prefix
      }
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }

  const handleVoiceSubmit = async (audio: string, mimeType: string, targetLanguage: string) => {
    setIsLoading(true)
    setError('')
    setCopied(false)

    try {
      const response = await fetch('/api/tour-guide/voice-translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audio, mimeType, targetLanguage }),
      })
      const data = await response.json()

      if (response.status === 401) {
        router.push('/tourguide')
        return
      }

      if (response.status === 429) {
        setError('Your hours have been used up for this account. Please contact support to add more.')
        return
      }

      if (response.status === 403) {
        setError(data.upsell?.message ?? 'This feature is not available on your account.')
        return
      }

      if (!response.ok || !data.success) {
        setError(data.error ?? 'Voice Translator failed. Please try again.')
        return
      }

      // Add to history
      setHistory((prev) => [
        { translation: data.data.translation, timestamp: Date.now() },
        ...prev,
      ])
      setRemainingHours(typeof data.remainingHours === 'number' ? data.remainingHours : null)
      setWarning(Boolean(data.warning))
    } catch {
      setError('Voice Translator failed. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async (text: string) => {
    if (!text) return
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const handleClearHistory = () => {
    setHistory([])
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/tour-guide/logout', { method: 'POST' })
      router.push('/tourguide')
    } catch {
      // If logout fails, still redirect to login
      router.push('/tourguide')
    }
  }

  return (
    <div>
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

      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-lg bg-[#C9A84C]/20">
          <Mic size={24} className="text-[#C9A84C]" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#F5F0E8]">Voice Translator</h1>
          {remainingHours !== null && (
            <p className="text-sm text-[#C9A84C]">{remainingHours.toFixed(2)}h remaining</p>
          )}
        </div>
      </div>

      {warning && (
        <div className="flex items-start gap-2 bg-yellow-900/20 border border-yellow-600 text-yellow-200 px-4 py-3 rounded-md text-sm mb-4">
          <AlertTriangle size={16} className="mt-0.5 shrink-0" />
          <span>You've used most of your allocated hours. Contact support if you need more.</span>
        </div>
      )}

      {error && (
        <div className="bg-red-900/20 border border-red-500 text-red-200 px-4 py-3 rounded-md text-sm mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#F5F0E8] mb-2">Response language</label>
          <select
            id="targetLanguage"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#C9A84C] rounded-md text-[#F5F0E8] focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent"
            disabled={isRecording || isLoading}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <button
          onClick={isRecording ? handleRecordStop : handleRecordStart}
          disabled={isLoading}
          className={`w-full h-[44px] font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-2 focus:ring-offset-[#0D0D0D] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center ${
            isRecording
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-[#C9A84C] text-[#0D0D0D] hover:bg-[#b8942f]'
          }`}
        >
          {isRecording ? (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              <span>Stop Recording</span>
            </div>
          ) : isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 size={18} className="animate-spin" />
              <span>Thinking...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Mic size={18} />
              <span>Start Recording</span>
            </div>
          )}
        </button>
      </div>

      {history.length > 0 && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-[#F5F0E8]">Translation History</label>
            <button
              onClick={handleClearHistory}
              className="flex items-center gap-1.5 text-xs text-[#F5F0E8] opacity-70 hover:opacity-100 transition-opacity"
              title="Clear history"
            >
              <Trash2 size={14} />
              Clear History
            </button>
          </div>
          {history.map((entry, index) => (
            <div key={index} className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#C9A84C] rounded-md text-[#F5F0E8] whitespace-pre-wrap">
              <span className="text-xs text-[#C9A84C] block mb-1">Recording {history.length - index}:</span>
              {entry.translation}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
