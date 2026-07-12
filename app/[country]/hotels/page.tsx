import { getSupabase } from '@/lib/supabase'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { translateText } from '@/lib/translate'
import HotelServiceCard from '@/components/shared/services/HotelServiceCard'
import { getAgodaLinksByCity } from '@/lib/queries/agodaLinks'
import Navbar from '@/components/shared/Navbar'
import AccommodationChatWrapper from '@/components/shared/AccommodationChatWrapper'

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
  const targetLanguage = (cookieStore.get('NEXT_LOCALE')?.value ?? 'EN').toUpperCase()

  const defaultCity = 'bangkok'
  const agodaLinks = await getAgodaLinksByCity(defaultCity)

  const translationPayload = {
    homeText: 'Home',
    servicesText: 'Hotels',
    backText: `Back to ${countryName}`,
    titleText: `Hotels in ${countryName}`,
    subtitleText: 'Handpicked stays with great value.',
    verifiedText: 'Verified Listings',
    guaranteeText: 'Best Price Guarantee',
    supportText: '24/7 Support',
    availText: 'Available Hotels',
    exploreTitle: `Hotels in ${countryName}`,
    countText: `${agodaLinks.length} hotel${agodaLinks.length !== 1 ? 's' : ''} available`,
    exploreCtaText: 'View Hotel →',
  }

  let translatedData: typeof translationPayload | null = null

  if (agodaLinks.length > 0 && targetLanguage !== 'EN') {
    try {
      const jsonString = JSON.stringify(translationPayload)
      const translatedJSONString = await translateText(
        `You are a professional JSON translation engine. Translate all the VALUE fields in this JSON object into ${targetLanguage}. Keep the JSON keys exactly the same. Return ONLY the translated JSON output, no other explanations or markdown backticks: ${jsonString}`,
        targetLanguage,
        { raw: true }
      )

      const cleanJSON = translatedJSONString.replace(/```json/g, '').replace(/```/g, '').trim()
      const firstBracket = Math.min(
        ...[cleanJSON.indexOf('{'), cleanJSON.indexOf('[')].filter((i) => i >= 0)
      )
      const lastBracket = Math.max(cleanJSON.lastIndexOf('}'), cleanJSON.lastIndexOf(']'))
      const jsonPayload = firstBracket >= 0 && lastBracket > firstBracket
        ? cleanJSON.slice(firstBracket, lastBracket + 1)
        : cleanJSON

      translatedData = JSON.parse(jsonPayload)
    } catch (e) {
      console.error('Hotel translation failed, falling back to English safely:', e)
    }
  }

  if (!translatedData) {
    translatedData = translationPayload
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar country={country} language={targetLanguage} />
      <div className="border-b border-gold-soft/20 bg-sacred-bg/70">
        <div className="max-w-7xl mx-auto px-6 py-8 md:py-10">
          <div className="mt-6">
            <div className="inline-flex flex-col items-start gap-2 mb-4">
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-gold-deep">
                {translatedData.availText}
              </span>
              <span className="h-[1px] w-16 bg-gold-deep/70" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-sacred-green leading-tight">
              {translatedData.titleText}
            </h1>
          </div>
        </div>
      </div>

      {/* Accommodation Chat Section */}
      {country === 'thailand' && (
        <section className="bg-sacred-bg py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-xs font-bold tracking-[0.2em] text-amber-600 uppercase text-center mb-2">
                FIND YOUR PERFECT STAY
              </h2>
              <div className="w-12 h-0.5 bg-amber-500 mx-auto" />
            </div>
            <div className="max-w-2xl mx-auto">
              <AccommodationChatWrapper language={targetLanguage as any} />
            </div>
          </div>
        </section>
      )}

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-16">

          {agodaLinks.length === 0 ? (
            <div className="min-h-[400px] flex flex-col items-center justify-center text-center py-24">
              <div className="text-8xl mb-6">🏨</div>
              <h3 className="text-3xl font-black text-gray-800 mb-3">No Hotels Available Yet</h3>
              <p className="text-gray-400 text-lg max-w-md">We are curating amazing stays for you. Check back soon!</p>
              <Link href={`/${country}`} className="mt-8 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-2xl transition">
                ← {translatedData.backText}
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
    </div>
  )
}
