'use client'

export default function EssentialGuides({ country, language }: { country: string; language: string }) {
  if (country !== 'thailand') return null

  const guides = [
    { icon: "ℹ️",  title: "General Info",       modalId: "information"   },
    { icon: "✈️",  title: "Travel Types",        modalId: "travel-types"  },
    { icon: "🛂",  title: "Visa Info",           modalId: "visa"          },
    { icon: "🚕",  title: "Transport",           modalId: "transport"     },
    { icon: "🏨",  title: "Accommodation",       modalId: "accommodation" },
    { icon: "🍜",  title: "Food & Dining",       modalId: "food"          },
    { icon: "🎭",  title: "Culture & Etiquette", modalId: "etiquette"     },
    { icon: "💰",  title: "Budget Tips",         modalId: "budget"   },
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
          ESSENTIAL GUIDES
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
              <span className="text-xs text-amber-600">Learn more</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
