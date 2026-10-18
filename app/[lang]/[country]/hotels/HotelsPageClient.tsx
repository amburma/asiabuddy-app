'use client'

import { useState } from 'react'
import AgodaSearchWidget from '@/components/shared/services/AgodaSearchWidget'
import HotelProviderRedirectCard from '@/components/shared/services/HotelProviderRedirectCard'
import AccommodationChatWrapper from '@/components/shared/AccommodationChatWrapper'
import { UI_TRANSLATIONS } from '@/lib/i18n'
import { VIETNAM_GENERIC_UI, mergeVietnamGeneric } from '@/lib/i18n-vietnam-generic'
import { SupportedLanguage } from '@/types/country'
import dynamicImport from 'next/dynamic'
import { getDefaultCity } from '@/data/countryDefaults'

const ChatWidgetGrid = dynamicImport(() => import('@/components/shared/ChatWidgetGrid'))
const VIETNAM_SLUG_TO_NAME: Record<string, string> = { 'hanoi': 'Hanoi', 'ho-chi-minh-city': 'Ho Chi Minh City' }

interface HotelsPageClientProps {
  country: string
  targetLanguage: SupportedLanguage
}

export default function HotelsPageClient({ country, targetLanguage }: HotelsPageClientProps) {
  const [selectedCity, setSelectedCity] = useState<string>(country.toLowerCase() === 'vietnam' ? (VIETNAM_SLUG_TO_NAME[getDefaultCity(country)] || 'Hanoi') : 'Bangkok')

  const baseHotels = UI_TRANSLATIONS[targetLanguage].hotels
  const t = country.toLowerCase() === 'thailand'
    ? baseHotels
    : mergeVietnamGeneric(baseHotels, VIETNAM_GENERIC_UI[targetLanguage].hotelsGeneric)

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
          {country.toLowerCase() === 'vietnam' && (
            <div className="flex gap-2 mb-4">
              {Object.values(VIETNAM_SLUG_TO_NAME).map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setSelectedCity(name)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${selectedCity === name ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-gray-700 border-gray-200 hover:border-amber-300'}`}
                >
                  {name}
                </button>
              ))}
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Agoda Widget - Only for Thailand (Bangkok-specific) */}
            {(country === 'thailand' || country === 'vietnam') && (
              <div className="lg:col-span-1" key={selectedCity}>
                <AgodaSearchWidget cityName={selectedCity} country={country} />
              </div>
            )}

            {/* Trip.com and Booking.com Redirect Cards */}
            {country === 'thailand' && (
              <div className="lg:col-span-2">
                <HotelProviderRedirectCard city={selectedCity} />
              </div>
            )}
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
