'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Camera, Loader2, AlertTriangle, Copy, Check, ImageUp, X, Home, LogOut, Trash2 } from 'lucide-react'
import { LANGUAGES } from '@/lib/tour-guide/languages'

// Downscale + re-encode client-side before upload — keeps phone-camera
// photos (often 3-8MB) well under Vercel's ~4.5MB request body cap, and
// cuts Gemini image-input token cost as a side benefit. Longest edge
// 1600px / JPEG quality 0.8 is plenty for OCR accuracy on signs/menus.
async function resizeImageToBase64(file: File): Promise<{ base64: string; mimeType: string }> {
  const bitmap = await createImageBitmap(file)
  const maxEdge = 1600
  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height))
  const width = Math.round(bitmap.width * scale)
  const height = Math.round(bitmap.height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas not supported')
  ctx.drawImage(bitmap, 0, 0, width, height)

  const dataUrl = canvas.toDataURL('image/jpeg', 0.8)
  const base64 = dataUrl.split(',')[1]
  return { base64, mimeType: 'image/jpeg' }
}

export default function TourGuidePhotoOCRForm() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [previewUrl, setPreviewUrl] = useState('')
  const [pendingImage, setPendingImage] = useState<{ base64: string; mimeType: string } | null>(null)
  const [targetLanguage, setTargetLanguage] = useState('Burmese')
  const [extractedText, setExtractedText] = useState('')
  const [translation, setTranslation] = useState('')
  const [isProcessingImage, setIsProcessingImage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [remainingHours, setRemainingHours] = useState<number | null>(null)
  const [warning, setWarning] = useState(false)
  const [copied, setCopied] = useState<'extracted' | 'translation' | null>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError('')
    setExtractedText('')
    setTranslation('')
    setIsProcessingImage(true)

    try {
      const resized = await resizeImageToBase64(file)
      setPendingImage(resized)
      setPreviewUrl(`data:${resized.mimeType};base64,${resized.base64}`)
    } catch {
      setError('Could not process that image. Please try a different photo.')
    } finally {
      setIsProcessingImage(false)
    }
  }

  const clearImage = () => {
    setPendingImage(null)
    setPreviewUrl('')
    setExtractedText('')
    setTranslation('')
    setError('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleExtract = async () => {
    if (!pendingImage || isLoading) return

    setIsLoading(true)
    setError('')
    setCopied(null)

    try {
      const response = await fetch('/api/tour-guide/ocr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: pendingImage.base64,
          mimeType: pendingImage.mimeType,
          targetLanguage,
        }),
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
        setError(data.error ?? 'Could not read text from this photo. Please try again.')
        return
      }

      setExtractedText(data.data.extractedText)
      setTranslation(data.data.translation)
      setRemainingHours(typeof data.remainingHours === 'number' ? data.remainingHours : null)
      setWarning(Boolean(data.warning))
    } catch {
      setError('Something went wrong. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async (text: string, which: 'extracted' | 'translation') => {
    if (!text) return
    await navigator.clipboard.writeText(text)
    setCopied(which)
    setTimeout(() => setCopied(null), 1500)
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

      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-lg bg-[#C9A84C]/20">
          <Camera size={24} className="text-[#C9A84C]" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#F5F0E8]">Photo Translate</h1>
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
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-[#F5F0E8]">Translate to</label>
            <button
              onClick={clearImage}
              className="flex items-center gap-1.5 text-xs text-[#F5F0E8] opacity-70 hover:opacity-100 transition-opacity"
              title="Clear"
            >
              <Trash2 size={14} />
              Clear
            </button>
          </div>
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#C9A84C] rounded-md text-[#F5F0E8] focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent"
            disabled={isLoading}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        {!previewUrl ? (
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessingImage}
            className="w-full border-2 border-dashed border-[#C9A84C] rounded-lg py-10 flex flex-col items-center gap-2 text-[#F5F0E8] hover:bg-[#1a1a1a] transition-colors disabled:opacity-50"
          >
            {isProcessingImage ? (
              <Loader2 size={28} className="text-[#C9A84C] animate-spin" />
            ) : (
              <ImageUp size={28} className="text-[#C9A84C]" />
            )}
            <span className="text-sm">
              {isProcessingImage ? 'Processing photo...' : 'Tap to take a photo or choose one'}
            </span>
          </button>
        ) : (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element -- preview is a locally-generated data URL, not a remote image */}
            <img
              src={previewUrl}
              alt="Selected"
              className="w-full max-h-80 object-contain rounded-lg border border-[#C9A84C] bg-[#1a1a1a]"
            />
            <button
              onClick={clearImage}
              disabled={isLoading}
              className="absolute top-2 right-2 bg-[#0D0D0D]/80 border border-[#C9A84C] rounded-full p-1.5 text-[#F5F0E8] hover:bg-[#0D0D0D] transition-colors disabled:opacity-50"
              aria-label="Remove photo"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileSelect}
          className="hidden"
        />

        <button
          onClick={handleExtract}
          disabled={!pendingImage || isLoading || isProcessingImage}
          className="w-full h-[44px] bg-[#C9A84C] text-[#0D0D0D] font-semibold rounded-md hover:bg-[#b8942f] focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-2 focus:ring-offset-[#0D0D0D] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 size={18} className="animate-spin" />
              <span>Reading photo...</span>
            </div>
          ) : (
            'Extract & Translate'
          )}
        </button>
      </div>

      {(extractedText || translation) && (
        <div className="mt-6 space-y-4">
          {extractedText && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-[#F5F0E8] opacity-70">Text found</label>
                <button
                  onClick={() => handleCopy(extractedText, 'extracted')}
                  className="flex items-center gap-1 text-xs text-[#C9A84C] hover:text-[#b8942f] transition-colors"
                >
                  {copied === 'extracted' ? <Check size={14} /> : <Copy size={14} />}
                  {copied === 'extracted' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-md text-[#F5F0E8] opacity-70 text-sm whitespace-pre-wrap">
                {extractedText}
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-[#F5F0E8]">Translation</label>
              <button
                onClick={() => handleCopy(translation, 'translation')}
                className="flex items-center gap-1 text-xs text-[#C9A84C] hover:text-[#b8942f] transition-colors"
              >
                {copied === 'translation' ? <Check size={14} /> : <Copy size={14} />}
                {copied === 'translation' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#C9A84C] rounded-md text-[#F5F0E8] whitespace-pre-wrap">
              {translation}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
