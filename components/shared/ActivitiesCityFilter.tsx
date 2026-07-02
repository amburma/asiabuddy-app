'use client'

import { useState } from 'react'
import TourServiceCard from './services/TourServiceCard'
import { GygLink } from '@/lib/queries/gygLinks'
import { SupportedLanguage } from '@/types/country'
import { UI_TRANSLATIONS } from '@/lib/i18n'

interface ActivitiesCityFilterProps {
  activities: GygLink[]
  language: SupportedLanguage
}

export default function ActivitiesCityFilter({ activities, language }: ActivitiesCityFilterProps) {
  // Get translations for the current language
  const t = UI_TRANSLATIONS[language]

  // Derive unique cities from activities
  const cities = Array.from(new Set(activities.map(a => a.city)))
    .map(city => city.charAt(0).toUpperCase() + city.slice(1))
    .sort()

  const [selectedCity, setSelectedCity] = useState<string>('All')

  // Filter activities based on selected city
  const filteredActivities = selectedCity === 'All'
    ? activities
    : activities.filter(a => a.city.toLowerCase() === selectedCity.toLowerCase())

  return (
    <div>
      {/* City Filter Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-4 mb-8 scrollbar-hide">
        <button
          onClick={() => setSelectedCity('All')}
          className={`shrink-0 font-medium px-5 py-2 text-sm rounded-full transition-all cursor-pointer font-sans ${
            selectedCity === 'All'
              ? 'bg-gold-deep text-white shadow-lg shadow-gold-deep/20 font-semibold'
              : 'bg-white border border-gray-100 text-gray-700 hover:border-gold-soft hover:text-gold-deep'
          }`}
        >
          {t.activitiesPage.filterAllCities}
        </button>
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => setSelectedCity(city)}
            className={`shrink-0 font-medium px-5 py-2 text-sm rounded-full transition-all cursor-pointer font-sans ${
              selectedCity === city
                ? 'bg-gold-deep text-white shadow-lg shadow-gold-deep/20 font-semibold'
                : 'bg-white border border-gray-100 text-gray-700 hover:border-gold-soft hover:text-gold-deep'
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Activities Grid */}
      {filteredActivities.length === 0 ? (
        <div className="min-h-[200px] flex flex-col items-center justify-center text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 font-serif">
            {t.activitiesPage.filterNoActivities}
          </h3>
          <p className="text-gray-600 font-sans">
            {t.activitiesPage.filterNoActivitiesDescription}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <TourServiceCard
              key={activity.id}
              tour={{
                activity_name: activity.activity_name,
                image_url: activity.image_url || '',
                price_from: activity.price_from || '0',
                rating: activity.rating || '0',
                reviews_count: activity.reviews_count || '0',
                duration: activity.duration || '',
                gyg_url: activity.gyg_url,
              }}
              language={language}
            />
          ))}
        </div>
      )}
    </div>
  )
}
