'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { UI_TRANSLATIONS } from '../../lib/i18n'
import { SupportedLanguage } from '../../types/country'

export default function FloatingContactButton({ language }: { language: string | SupportedLanguage }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const t = UI_TRANSLATIONS[language as SupportedLanguage] || UI_TRANSLATIONS.EN
  const tooltipText = t.floatingTooltip || '📩 Send us a quick inquiry'
  const badgeText = t.floatingBadge || 'Quick Inquiry'

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '8px',
      }}
    >
      {/* Tooltip */}
      <div style={{
        background: 'white',
        color: '#1a2e1a',
        fontSize: '12px',
        fontWeight: '600',
        padding: '6px 14px',
        borderRadius: '999px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
        border: '1px solid #fde68a',
        whiteSpace: 'nowrap',
      }}>
        {tooltipText}
      </div>

      {/* Main Button */}
      <Link href="/contact">
        <button
          style={{
            position: 'relative',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #C9A84C, #B8943E)',
            border: '4px solid white',
            boxShadow: '0 8px 32px rgba(201, 168, 76, 0.5)',
            cursor: 'pointer',
            fontSize: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          aria-label="Contact AsiaBuddy"
        >
          📩
        </button>
      </Link>

      {/* Badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: 'white',
        padding: '4px 10px',
        borderRadius: '999px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #fef3c7',
      }}>
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#C9A84C',
          display: 'inline-block',
        }} />
        <span style={{
          fontSize: '10px',
          fontWeight: '700',
          color: '#B8943E',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}>
          {badgeText}
        </span>
      </div>
    </div>
  )
}
