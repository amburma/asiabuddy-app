'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Tour {
  id: string
  slug: string
  title: string
  short_description: string
  price_from: number
  currency: string
  duration_days: number
  duration_nights: number
  group_size_max: number
  image_url?: string
  images: string[]
  highlights: string[]
  inclusions: string[]
  exclusions: string[]
  featured: boolean
  destination_id: string
  salesperson_id: string
  country: string
  status: string
  created_at: string
  updated_at: string
  category?: string
}

interface Props {
  tours: Tour[]
  country: string
}

const categories = ['All', 'Adventure', 'Cultural', 'Beach', 'Luxury', 'Family']

export default function TourFilterSection({ tours, country }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredTours = selectedCategory === 'All'
    ? tours
    : tours.filter(tour => tour.category === selectedCategory)

  return (
    <>
      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`
              px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
              ${selectedCategory === category
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-500'
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Tours Grid */}
      {filteredTours.length === 0 ? (
        /* EMPTY STATE */
        <div className="min-h-[400px] flex flex-col items-center justify-center text-center py-24">
          <div className="text-8xl mb-6">🌏</div>
          <h3 className="text-3xl font-black text-gray-800 mb-3">
            No Tours Available in this Category
          </h3>
          <p className="text-gray-400 text-lg max-w-md">
            Try selecting a different category to explore more options.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => {
            return (
            <Link
              key={tour.id}
              href={`/${country}/tours/${tour.slug}`}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              {/* IMAGE AREA */}
              <div className="relative w-full h-48 bg-amber-50">
                {tour.image_url ? (
                  <img
                    src={tour.image_url}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                  />
                ) : tour.images && tour.images.length > 0 && tour.images[0] ? (
                  <img
                    src={tour.images[0]}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">🌏</div>
                )}
              </div>
              
              {/* Featured Badge */}
              {tour.featured && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                  ⭐ Featured
                </div>
              )}
              
              {/* Price Badge */}
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur text-orange-600 font-black text-sm px-3 py-1.5 rounded-xl shadow">
                From {tour.price_from.toLocaleString()} {tour.currency}
              </div>

              {/* CARD BODY */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-black text-gray-900 group-hover:text-orange-500 transition-colors leading-tight mb-2">
                  {tour.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                  {tour.short_description}
                </p>
                
                {/* Divider */}
                <div className="border-t border-gray-100 mb-4"></div>
                
                {/* Info Pills */}
                <div className="flex flex-wrap gap-2">
                  <div className="inline-flex items-center gap-1.5 bg-gray-50 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-100">
                    🕐 {tour.duration_days} Day{tour.duration_days !== 1 ? 's' : ''} / {tour.duration_nights} Night{tour.duration_nights !== 1 ? 's' : ''}
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-gray-50 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-100">
                    👥 Max {tour.group_size_max} people
                  </div>
                </div>
                
                {/* CTA Button */}
                <div className="mt-5 w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-200 shadow-md hover:shadow-orange-200 hover:shadow-lg text-center block">
                  Explore This Tour →
                </div>
              </div>
            </Link>
            )
          })}
        </div>
      )}
    </>
  )
}
