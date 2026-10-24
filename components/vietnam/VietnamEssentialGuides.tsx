'use client'

import { Info, Plane, FileCheck, Bus, Home, Wallet } from 'lucide-react'
import { UI_TRANSLATIONS } from '../../lib/i18n'
import { VIETNAM_MODAL_TITLES } from '../../lib/i18n-vietnam-generic'
import { SupportedLanguage } from '../../types/country'

export default function VietnamEssentialGuides({ language }: { language: string }) {
  const lang = (language || 'EN').toUpperCase()
  const t = UI_TRANSLATIONS[lang as SupportedLanguage] || UI_TRANSLATIONS.EN
  const titles = VIETNAM_MODAL_TITLES[lang] || VIETNAM_MODAL_TITLES.EN

  const guides = [
    { guide: 'general-info', title: titles.generalInfo, icon: <Info size={22} /> },
    { guide: 'travel-types', title: titles.travelTypes, icon: <Plane size={22} /> },
    { guide: 'visa', title: titles.visa, icon: <FileCheck size={22} /> },
    { guide: 'transport', title: titles.transport, icon: <Bus size={22} /> },
    { guide: 'accommodation', title: titles.accommodation, icon: <Home size={22} /> },
    { guide: 'budget', title: titles.budget, icon: <Wallet size={22} /> },
  ]

  const handleGuideClick = (guide: string) => {
    window.dispatchEvent(
      new CustomEvent('openVietnamGuide', { detail: { guide, language: lang } })
    )
  }

  return (
    <section className="bg-amber-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <h2 className="text-xs font-bold tracking-[0.2em] text-amber-600 uppercase text-center">
          {t.essentialGuides?.sectionTitle || t.menuCategories?.guides || ''}
        </h2>
        <div className="w-12 h-0.5 bg-amber-500 mt-2 mb-8 mx-auto" />

        {/* Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {guides.map((guide) => (
            <button
              key={guide.guide}
              onClick={() => handleGuideClick(guide.guide)}
              className="bg-white rounded-2xl border border-amber-100 shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-200 p-5 flex flex-col items-start gap-2 cursor-pointer w-full text-left"
            >
              <span className="text-amber-600 mb-1">{guide.icon}</span>
              <span className="text-sm font-bold text-gray-800">{guide.title}</span>
              <span className="text-xs text-amber-600">{t.essentialGuides?.learnMore || t.learnMore || ''}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
