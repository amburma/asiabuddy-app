import Link from 'next/link'
import { cookies } from 'next/headers'
import HotelServiceCard from '@/components/shared/services/HotelServiceCard'
import { getAgodaLinksByCity } from '@/lib/queries/agodaLinks'
import Navbar from '@/components/shared/Navbar'
import AccommodationChatWrapper from '@/components/shared/AccommodationChatWrapper'
import { UI_TRANSLATIONS, normalizeLocale } from '@/lib/i18n'
import { SupportedLanguage } from '@/types/country'
import { MapPin, Calendar, Clock, Plane } from 'lucide-react'
import dynamicImport from 'next/dynamic'

const ChatWidgetGrid = dynamicImport(() => import('@/components/shared/ChatWidgetGrid'))

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country: countrySlug } = await params
  const country = countrySlug.charAt(0).toUpperCase() + countrySlug.slice(1)

  return {
    title: `${country} Hotels — AsiaBuddy`,
    description: `Discover hotels in ${country} with curated options and competitive prices.`,
    openGraph: {
      title: `${country} Hotels — AsiaBuddy`,
      description: `Find the best hotels in ${country}.`,
      url: `https://asiabuddy.app/${countrySlug}/hotels`,
    },
  }
}

export default async function HotelsPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  const countryName = country.charAt(0).toUpperCase() + country.slice(1)

  const cookieStore = await cookies()
  const targetLanguage = normalizeLocale(cookieStore.get('NEXT_LOCALE')?.value)

  const defaultCity = 'bangkok'
  const agodaLinks = await getAgodaLinksByCity(defaultCity)

  const t = UI_TRANSLATIONS[targetLanguage].hotels

  return (
    <div className="min-h-screen bg-white">
      <Navbar country={country} language={targetLanguage} />
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
              <AccommodationChatWrapper language={targetLanguage as any} />
            </div>
          )}

          {agodaLinks.length === 0 ? (
            <div className="min-h-[400px] flex flex-col items-center justify-center text-center py-24">
              <div className="text-8xl mb-6">🏨</div>
              <h3 className="text-3xl font-black text-gray-800 mb-3">No Hotels Available Yet</h3>
              <p className="text-gray-400 text-lg max-w-md">We are curating amazing stays for you. Check back soon!</p>
              <Link href={`/${country}`} className="mt-8 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-2xl transition">
                ← Back to {countryName}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {agodaLinks.map((hotel) => (
                <div key={hotel.id} className="w-full">
                  <HotelServiceCard
                    hotel={{
                      name: hotel.hotel_name,
                      image_url: hotel.image_url || '',
                      price_per_night: parseFloat(hotel.price_from?.replace(/[^0-9.]/g, '') || '0'),
                      rating: parseFloat(hotel.rating || '0'),
                      reviews_count: parseInt(hotel.reviews_count?.replace(/[^0-9]/g, '') || '0'),
                      location: 'Bangkok',
                      free_cancellation: true,
                      affiliate_url: hotel.agoda_url,
                    }}
                    language={targetLanguage as any}
                    is_placeholder={Boolean(hotel.is_placeholder)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chat Widget Grid for modal support */}
      {country === 'thailand' && (
        <ChatWidgetGrid language={targetLanguage} hideGrid={true} />
      )}
    </div>
  )
}
