'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Languages, Loader2, AlertTriangle, Copy, Check } from 'lucide-react'

// Kept short and Asia-travel-relevant rather than an exhaustive list —
// Gemini will happily translate to any language named here regardless.
const LANGUAGES = [
  'Burmese',
  'English',
  'Thai',
  'Vietnamese',
  'Chinese (Simplified)',
  'Japanese',
  'Korean',
  'Khmer',
  'Lao',
  'Malay',
  'Indonesian',
]

export default function TourGuideTextTranslateForm() {
  const router = useRouter()
  const [sourceText, setSourceText] = useState('')
  const [targetLanguage, setTargetLanguage] = useState('Burmese')
  const [translation, setTranslation] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [remainingHours, setRemainingHours] = useState<number | null>(null)
  const [warning, setWarning] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleTranslate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!sourceText.trim() || isLoading) return

    setIsLoading(true)
    setError('')
    setCopied(false)

    try {
      const response = await fetch('/api/tour-guide/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: sourceText, targetLanguage }),
      })
      const data = await response.json()

      if (response.status === 401) {
        // Session expired/invalid — bounce back to login, matching the
        // dashboard page's own redirect-on-invalid-session behavior.
        router.push('/tourguide')
        return
      }

      if (response.status === 429) {
        setError('Your hours have been used up for this account. Please contact support to add more.')
        return
      }

      if (response.status === 403) {
        // Shouldn't normally happen — the page already redirects trial
        // accounts away before they reach this form — but handle it
        // defensively in case of a stale session/source mismatch.
        setError(data.upsell?.message ?? 'This feature is not available on your account.')
        return
      }

      if (!response.ok || !data.success) {
        setError(data.error ?? 'Translation failed. Please try again.')
        return
      }

      setTranslation(data.data.translation)
      setRemainingHours(typeof data.remainingHours === 'number' ? data.remainingHours : null)
      setWarning(Boolean(data.warning))
    } catch {
      setError('Translation failed. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!translation) return
    await navigator.clipboard.writeText(translation)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div>
      <button
        onClick={() => router.push('/tourguide/dashboard')}
        className="flex items-center gap-2 text-sm text-[#F5F0E8] opacity-70 hover:opacity-100 transition-opacity mb-6"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-lg bg-[#C9A84C]/20">
          <Languages size={24} className="text-[#C9A84C]" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#F5F0E8]">Text Translate</h1>
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

      <form onSubmit={handleTranslate} className="space-y-4">
        <div>
          <label htmlFor="sourceText" className="block text-sm font-medium text-[#F5F0E8] mb-2">
            Text to translate
          </label>
          <textarea
            id="sourceText"
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            rows={5}
            maxLength={5000}
            placeholder="Type or paste text here..."
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#C9A84C] rounded-md text-[#F5F0E8] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent resize-none"
            disabled={isLoading}
            required
          />
          <p className="text-xs text-[#F5F0E8] opacity-50 mt-1 text-right">{sourceText.length} / 5000</p>
        </div>

        <div>
          <label htmlFor="targetLanguage" className="block text-sm font-medium text-[#F5F0E8] mb-2">
            Translate to
          </label>
          <select
            id="targetLanguage"
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

        <button
          type="submit"
          disabled={isLoading || !sourceText.trim()}
          className="w-full h-[44px] bg-[#C9A84C] text-[#0D0D0D] font-semibold rounded-md hover:bg-[#b8942f] focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-2 focus:ring-offset-[#0D0D0D] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 size={18} className="animate-spin" />
              <span>Translating...</span>
            </div>
          ) : (
            'Translate'
          )}
        </button>
      </form>

      {translation && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-[#F5F0E8]">Translation</label>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs text-[#C9A84C] hover:text-[#b8942f] transition-colors"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#C9A84C] rounded-md text-[#F5F0E8] whitespace-pre-wrap">
            {translation}
          </div>
        </div>
      )}
    </div>
  )
}
