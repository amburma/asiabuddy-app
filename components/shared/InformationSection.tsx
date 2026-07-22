"use client"

import { UI_TRANSLATIONS } from '../../lib/i18n'

interface Props {
  language: string
  onOpenModal?: (id: string) => void
}

export default function InformationSection({ language }: Props) {
  const t = UI_TRANSLATIONS[language as keyof typeof UI_TRANSLATIONS] || UI_TRANSLATIONS.EN

  const handleClick = () => {
    window.dispatchEvent(
      new CustomEvent('openGuideModal', { detail: { modalId: 'information' } })
    )
  }

  return (
    <section className="py-16 text-center bg-[#F5F0E8]">
      <h2 className="font-playfair text-4xl text-[#1a2e1a] mb-4">
        {t.infoModalTitle || 'Information'}
      </h2>
      <div className="w-16 h-0.5 bg-[#C9A84C] mx-auto mb-6" />
      <button
        type="button"
        onClick={handleClick}
        className="text-[#C9A84C] text-lg cursor-pointer hover:opacity-80 transition underline"
      >
        {t.infoLink || 'for more information click here'}
      </button>
      <div className="mt-4 flex items-center justify-center gap-2 text-xs tracking-widest text-gray-400 uppercase">
        <span>ⓘ</span>
        <span>{t.exploreThailandEssentials || 'Explore Thailand Essentials'}</span>
      </div>
    </section>
  )
}
