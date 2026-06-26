"use client"

import { useState } from 'react'
import { createPortal } from 'react-dom'
import { TripChecklist } from './TripChecklist'
import { SupportedLanguage } from '@/types/country'

interface TripChecklistModalProps {
  language?: SupportedLanguage
}

export function TripChecklistModal({ language = 'EN' }: TripChecklistModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-block border border-[#D5A832] text-[#0B3B2C] font-bold text-lg px-9 py-[14px] rounded-full transition-all duration-300 hover:bg-[#D5A832]/10 font-['Inter']"
      >
        ✓ Trip Checklist
      </button>

      {isOpen && typeof window !== 'undefined' && createPortal(
        <TripChecklist
          language={language}
          onClose={() => setIsOpen(false)}
        />,
        document.body
      )}
    </>
  )
}
