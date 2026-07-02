'use client'

import { useState } from 'react'
import { MapPin, UtensilsCrossed, Compass, Activity, Gem } from 'lucide-react'
import { UI_TRANSLATIONS } from '@/lib/i18n'

interface Destination {
  id: string
  name: string
  image_url?: string
  description?: string
  must_visit?: string[]
  dining?: string[]
  activities?: string[]
  hidden_gems?: string[]
  experiences?: string[]
}

interface Props {
  destinations: Destination[]
  language?: string
}

interface ContentTab {
  key: keyof Destination
  icon: React.ReactNode
  label: string
}

export default function DestinationTabs({ destinations, language = 'EN' }: Props) {
  const [selectedDestination, setSelectedDestination] = useState(0)
  const [selectedContent, setSelectedContent] = useState<keyof Destination>('must_visit')

  const uiT = UI_TRANSLATIONS[language as keyof typeof UI_TRANSLATIONS] || UI_TRANSLATIONS.EN
  const tabs = uiT.destinationTabs

  const destination = destinations[selectedDestination]

  const contentTabs: ContentTab[] = [
    { key: 'must_visit' as const,   icon: <MapPin size={20} className="text-gold-deep" />, label: tabs.mustVisit },
    { key: 'dining' as const,       icon: <UtensilsCrossed size={20} className="text-gold-deep" />, label: tabs.dining },
    { key: 'experiences' as const,  icon: <Compass size={20} className="text-gold-deep" />, label: tabs.experiences },
    { key: 'activities' as const,   icon: <Activity size={20} className="text-gold-deep" />, label: tabs.activities },
    { key: 'hidden_gems' as const,  icon: <Gem size={20} className="text-gold-deep" />, label: tabs.hiddenGems },
  ]

  const renderContent = () => {
    const items = destination?.[selectedContent]
    const itemsArray = Array.isArray(items) ? items : []

    if (itemsArray.length === 0) {
      return (
        <div className="text-sacred-green/60 italic text-center py-8 font-sans">
          Content coming soon
        </div>
      )
    }

    return (
      <div className="flex flex-wrap gap-3">
        {itemsArray.map((item, index) => (
          <div
            key={index}
            className="inline-flex items-center bg-sacred-bg/30 text-sacred-green font-medium px-4 py-2 rounded-full gold-border group hover:bg-white transition-colors font-sans"
          >
            {item}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      {/* City Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-2 mb-8 scrollbar-hide">
        {destinations.map((dest, index) => (
          <button
            key={dest.id}
            onClick={() => setSelectedDestination(index)}
            className={`shrink-0 font-medium px-5 py-2 text-sm rounded-full transition-all cursor-pointer font-sans ${
              selectedDestination === index
                ? 'bg-gold-deep text-white shadow-lg shadow-gold-deep/20 font-semibold'
                : 'bg-white border border-gray-100 text-gray-700 hover:border-gold-soft hover:text-gold-deep'
            }`}
          >
            {dest.name}
          </button>
        ))}
      </div>

      {destination?.image_url && (
        <div className="w-full h-56 md:h-72 rounded-2xl overflow-hidden mb-6">
          <img
            src={destination.image_url}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-100 pb-2 overflow-x-auto scrollbar-hide">
        {contentTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedContent(tab.key)}
            className={`shrink-0 text-sm px-3 py-1.5 transition-all font-sans flex items-center gap-1.5 ${
              selectedContent === tab.key
                ? 'text-gold-deep border-b-2 border-gold-deep'
                : 'text-gray-700 hover:text-gold-deep'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="glass-card p-6 md:p-10 bg-white">
        {renderContent()}
      </div>
    </div>
  )
}
