'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import HumanOperatorChat from '../thailand/HumanOperatorChat'
import { ThaiLanguage } from '../../types/country'

export default function FloatingChatButton({ language }: { language: string | ThaiLanguage }) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [pulse, setPulse] = useState(true)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setPulse(false), 6000)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* Floating Button — always fixed bottom right */}
      {!isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
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
            ✈️ Plan your trip now!
          </div>

          {/* Main Button */}
          <button
            onClick={() => setIsOpen(true)}
            style={{
              position: 'relative',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              border: '4px solid white',
              boxShadow: '0 8px 32px rgba(245,158,11,0.5)',
              cursor: 'pointer',
              fontSize: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            aria-label="Chat with AsiaBuddy Concierge"
          >
            🛎️
          </button>

          {/* Live badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'white',
            padding: '4px 10px',
            borderRadius: '999px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #dcfce7',
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#22c55e',
              display: 'inline-block',
            }} />
            <span style={{
              fontSize: '10px',
              fontWeight: '700',
              color: '#16a34a',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              Live Support
            </span>
          </div>
        </div>
      )}

      {/* HumanOperatorChat — rendered at document.body via createPortal */}
      {isOpen && mounted && createPortal(
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
        }}>
          <HumanOperatorChat
            language={language as ThaiLanguage}
            onClose={() => setIsOpen(false)}
          />
        </div>,
        document.body
      )}
    </>
  )
}
