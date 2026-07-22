'use client'

import { SupportedLanguage } from '../../types/country'
import { UI_TRANSLATIONS } from '../../lib/i18n'

export default function EssentialGuides({ country, language }: { country: string; language: string }) {
  if (country !== 'thailand') return null

  const t = UI_TRANSLATIONS[(language || 'EN').toUpperCase() as SupportedLanguage] || UI_TRANSLATIONS.EN

  const guides = [
    { icon: "ℹ️",  title: t.essentialGuides?.cards?.generalInfo || t.tabs?.information || '', modalId: "information" },
    { icon: "✈️",  title: t.essentialGuides?.cards?.travelTypes || t.travelTypes?.title || '', modalId: "travel-types" },
    { icon: "🛂",  title: t.essentialGuides?.cards?.visaInfo || t.visa?.title || '', modalId: "visa" },
    { icon: "🚕",  title: t.essentialGuides?.cards?.transport || t.transport?.title || '', modalId: "transport" },
    { icon: "🏨",  title: t.essentialGuides?.cards?.accommodation || t.accommodation?.title || '', modalId: "accommodation" },
    { icon: "🍜",  title: t.essentialGuides?.cards?.foodDining || t.food?.title || '', modalId: "food" },
    { icon: "🎭",  title: t.essentialGuides?.cards?.cultureEtiquette || t.tools?.etiquette || '', modalId: "etiquette" },
    { icon: "💰",  title: t.essentialGuides?.cards?.budgetTips || t.budget || '', modalId: "budget" },
  ]

  const handleGuideClick = (modalId: string) => {
    window.dispatchEvent(
      new CustomEvent('openGuideModal', { detail: { modalId, language } })
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
              key={guide.title}
              onClick={() => handleGuideClick(guide.modalId)}
              className="bg-white rounded-2xl border border-amber-100 shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-200 p-5 flex flex-col items-start gap-2 cursor-pointer w-full text-left"
            >
              <span className="text-2xl mb-1">{guide.icon}</span>
              <span className="text-sm font-bold text-gray-800">{guide.title}</span>
              <span className="text-xs text-amber-600">{t.essentialGuides?.learnMore || t.learnMore || ''}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
