'use client'

import { useState } from 'react'
import AgodaSearchWidget from '../../../components/shared/services/AgodaSearchWidget'
import HotelProviderRedirectCard from '../../../components/shared/services/HotelProviderRedirectCard'
import AccommodationChatWrapper from '../../../components/shared/AccommodationChatWrapper'
import { UI_TRANSLATIONS } from '../../../lib/i18n'
import { SupportedLanguage } from '../../../types/country'
import dynamicImport from 'next/dynamic'

const ChatWidgetGrid = dynamicImport(() => import('../../../components/shared/ChatWidgetGrid'))

interface HotelsPageClientProps {
  country: string
  targetLanguage: SupportedLanguage
}

export default function HotelsPageClient({ country, targetLanguage }: HotelsPageClientProps) {
  const [selectedCity, setSelectedCity] = useState<string>('Bangkok')

  const t = UI_TRANSLATIONS[targetLanguage].hotels

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gold-soft/20 bg-sacred-bg/70">
        <div className="max-w-7xl mx-auto px-6 py-8 md:py-10">
          <div className="mt-6">
            <div className="inline-flex flex-col items-start gap-2 mb-4">
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-gold-deep">
                Hotels
              </span>
              <span className="h-[1px] w-16 bg-gold-deep/70" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-sacred-green leading-tight">
              {t.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-16">

          {/* Intro Section */}
          <div className="mb-12 max-w-3xl">
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              {t.intro}
            </p>
          </div>

          {/* Accommodation Chat Widget */}
          {country === 'thailand' && (
            <div className="mb-12">
              <AccommodationChatWrapper 
                language={targetLanguage as any} 
                onCitySelect={setSelectedCity}
              />
            </div>
          )}

          {/* Hotel Provider Search Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Agoda Widget - Only for Thailand (Bangkok-specific) */}
            {country === 'thailand' && (
              <div className="lg:col-span-1" key={selectedCity}>
                <AgodaSearchWidget cityName={selectedCity} />
              </div>
            )}

            {/* Trip.com and Booking.com Redirect Cards */}
            <div className="lg:col-span-2">
              <HotelProviderRedirectCard city={selectedCity} />
            </div>
          </div>
        </div>
      </div>

      {/* Chat Widget Grid for modal support */}
      {country === 'thailand' && (
        <ChatWidgetGrid language={targetLanguage} hideGrid={true} />
      )}
    </div>
  )
}
