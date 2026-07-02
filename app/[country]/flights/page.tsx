import Link from 'next/link'
import { cookies } from 'next/headers'
import { translateText } from '@/lib/translate'
import FlightServiceCard from '@/components/shared/services/FlightServiceCard'
import { getTransferLinksByCity } from '@/lib/queries/transferLinks'
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
  const wayawayLinks = await getTransferLinksByCity(defaultCity, 'wayaway')

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
    countText: `${wayawayLinks.length} flight${wayawayLinks.length !== 1 ? 's' : ''} available`,
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

          {wayawayLinks.length === 0 ? (
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
              {wayawayLinks.map((flight) => {
                const routeParts = (flight.route_name || '').split(/\s+to\s+/i)
                const departureCity = routeParts[0]?.trim() || 'Bangkok'
                const arrivalCity = routeParts[1]?.trim() || 'Destination'

                return (
                  <div key={flight.id} className="w-full">
                    <FlightServiceCard
                      flight={{
                        airline: flight.provider || 'Wayaway',
                        departure_city: departureCity,
                        arrival_city: arrivalCity,
                        departure_time: 'Flexible',
                        arrival_time: 'Flexible',
                        duration: 'Flexible',
                        stops: 0,
                        price: parseFloat(flight.price_from?.replace(/[^0-9.]/g, '') || '0'),
                        price_checked_at: new Date().toISOString(),
                        affiliate_url: flight.booking_url || '#',
                      }}
                      language={targetLanguage as any}
                      is_placeholder={Boolean(flight.is_placeholder)}
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
