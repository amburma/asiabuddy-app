import Link from 'next/link'
import { cookies } from 'next/headers'
import { translateText } from '@/lib/translate'
import FlightServiceCard from '@/components/shared/services/FlightServiceCard'
import { getFlightLinksByCity } from '@/lib/queries/flightLinks'
import Navbar from '@/components/shared/Navbar'

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
    title: `${country} Flights — AsiaBuddy`,
    description: `Compare flight options to ${country} and book with ease.`,
    openGraph: {
      title: `${country} Flights — AsiaBuddy`,
      description: `Find the best flight deals to ${country}.`,
      url: `https://asiabuddy.app/${countrySlug}/flights`,
    },
  }
}

export default async function FlightsPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  const countryName = country.charAt(0).toUpperCase() + country.slice(1)

  const cookieStore = await cookies()
  const targetLanguage = (cookieStore.get('NEXT_LOCALE')?.value ?? 'EN').toUpperCase()

  const defaultCity = 'bangkok'
  const flightLinks = await getFlightLinksByCity(defaultCity)

  const translationPayload = {
    homeText: 'Home',
    servicesText: 'Flights',
    backText: `Back to ${countryName}`,
    titleText: `Flights in ${countryName}`,
    subtitleText: 'Find flexible and affordable flights for your next adventure.',
    verifiedText: 'Trusted Airlines',
    guaranteeText: 'Best Price Guarantee',
    supportText: '24/7 Support',
    availText: 'Available Flights',
    exploreTitle: `Flights in ${countryName}`,
    countText: `${flightLinks.length} flight${flightLinks.length !== 1 ? 's' : ''} available`,
    exploreCtaText: 'View Flight →',
  }

  let translatedData: typeof translationPayload | null = null

  if (targetLanguage !== 'EN') {
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
      console.error('Flight translation failed, falling back to English safely:', e)
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

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-16">

          {flightLinks.length === 0 ? (
            <div className="min-h-[400px] flex flex-col items-center justify-center text-center py-24">
              <div className="text-8xl mb-6">✈️</div>
              <h3 className="text-3xl font-black text-gray-800 mb-3">No Flights Available Yet</h3>
              <p className="text-gray-400 text-lg max-w-md">We are curating flight options for you. Check back soon!</p>
              <Link href={`/${country}`} className="mt-8 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-2xl transition">
                ← {translatedData.backText}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {flightLinks.map((flight) => {
                return (
                  <div key={flight.id} className="w-full">
                    <FlightServiceCard
                      flight={{
                        airline: flight.airline || 'Multiple Airlines',
                        departure_city: flight.departure_city || 'Your City',
                        arrival_city: flight.arrival_city || 'Bangkok',
                        departure_time: flight.departure_time || 'Flexible',
                        arrival_time: flight.arrival_time || 'Flexible',
                        duration: flight.duration || 'Flexible',
                        stops: flight.stops ?? 0,
                        price: flight.price === 'See live prices' || !flight.price ? null : (parseFloat(flight.price.replace(/[^0-9.]/g, '')) || null),
                        price_checked_at: flight.created_at,
                        affiliate_url: flight.flight_url || '#',
                      }}
                      language={targetLanguage as any}
                      is_placeholder={false}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
