'use client'

import { useState } from 'react'

interface Destination {
  id: string
  name: string
  image_url?: string
  description?: string
  must_visit?: string[]
  dining?: string[]
  activities?: string[]
  hidden_gems?: string[]
  other_experiences?: string[]
}

interface Props {
  destinations: Destination[]
}

export default function DestinationTabs({ destinations }: Props) {
  const [selectedDestination, setSelectedDestination] = useState(0)
  const [selectedContent, setSelectedContent] = useState<keyof Destination>('must_visit')

  const destination = destinations[selectedDestination]

  const contentTabs = [
    { key: 'must_visit' as const, label: '📍 Must Visit' },
    { key: 'dining' as const, label: '🍜 Dining' },
    { key: 'other_experiences' as const, label: '🎭 Experiences' },
    { key: 'activities' as const, label: '🏃 Activities' },
    { key: 'hidden_gems' as const, label: '💎 Hidden Gems' },
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
      <div className="flex gap-3 flex-wrap mb-8">
        {destinations.map((dest, index) => (
          <button
            key={dest.id}
            onClick={() => setSelectedDestination(index)}
            className={`font-medium px-5 py-2 text-sm rounded-full transition-all cursor-pointer font-sans ${
              selectedDestination === index
                ? 'bg-gold-deep text-white shadow-lg shadow-gold-deep/20 font-semibold'
                : 'bg-white border border-gray-100 text-gray-700 hover:border-gold-soft hover:text-gold-deep'
            }`}
          >
            {dest.name}
          </button>
        ))}
      </div>

      {/* Content Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-100 pb-2">
        {contentTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedContent(tab.key)}
            className={`text-sm px-3 py-1.5 transition-all font-sans ${
              selectedContent === tab.key
                ? 'text-gold-deep border-b-2 border-gold-deep'
                : 'text-gray-700 hover:text-gold-deep'
            }`}
          >
            {tab.label}
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
