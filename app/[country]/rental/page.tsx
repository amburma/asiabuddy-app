import Link from 'next/link'
import { cookies } from 'next/headers'
import { translateText } from '../../../lib/translate'
import { getCarRentalLinksByCity } from '../../../lib/queries/carRentalLinks'
import Navbar from '../../../components/shared/Navbar'
import CarRentalChatWrapper from '../../../components/shared/CarRentalChatWrapper'
import { normalizeLocale } from '../../../lib/i18n'

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
    title: `${country} Car Rental — AsiaBuddy`,
    description: `Book reliable car rentals in ${country} with self-drive and chauffeur options.`,
    openGraph: {
      title: `${country} Car Rental — AsiaBuddy`,
      description: `Find flexible car rental options in ${country}.`,
      url: `https://asiabuddy.app/${countrySlug}/rental`,
    },
  }
}

export default async function RentalPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  const countryName = country.charAt(0).toUpperCase() + country.slice(1)

  const cookieStore = await cookies()
  const targetLanguage = normalizeLocale(cookieStore.get('NEXT_LOCALE')?.value)

  const defaultCity = 'bangkok'
  const carRentalLinks = await getCarRentalLinksByCity(defaultCity)

  const translationPayload = {
    homeText: 'Home',
    servicesText: 'Car Rental',
    backText: `Back to ${countryName}`,
    titleText: `Car Rental in ${countryName}`,
    subtitleText: 'Self-drive and chauffeur services for flexible travel.',
    verifiedText: 'Trusted Providers',
    guaranteeText: 'Flexible Booking',
    supportText: '24/7 Support',
    availText: 'Available Rentals',
    exploreTitle: `Car Rental in ${countryName}`,
    countText: `${carRentalLinks.length} rental${carRentalLinks.length !== 1 ? 's' : ''} available`,
    exploreCtaText: 'View Rental →',
  }

  let translatedData: typeof translationPayload | null = null

  if (carRentalLinks.length > 0 && targetLanguage !== 'EN') {
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
      console.error('Car rental translation failed, falling back to English safely:', e)
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

          {/* Car Rental Chat Widget */}
          {country === 'thailand' && (
            <div className="mb-12">
              <CarRentalChatWrapper language={targetLanguage as any} />
            </div>
          )}

          {carRentalLinks.length === 0 ? (
            <div className="min-h-[400px] flex flex-col items-center justify-center text-center py-24">
              <div className="text-8xl mb-6">🚙</div>
              <h3 className="text-3xl font-black text-gray-800 mb-3">No Car Rentals Available Yet</h3>
              <p className="text-gray-400 text-lg max-w-md">We are curating reliable car rental options for you. Check back soon!</p>
              <Link href={`/${country}`} className="mt-8 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-2xl transition">
                ← {translatedData.backText}
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-sm text-gray-600 mb-2">
                  Powered by <span className="font-semibold text-gold-deep">QEEQ</span> — Reliable car rentals across Thailand
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {carRentalLinks.map((rental) => (
                  <div key={rental.id} className="w-full">
                    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      {rental.image_url && (
                        <div className="h-48 w-full overflow-hidden">
                          <img
                            src={rental.image_url}
                            alt={rental.vehicle_type || 'Car Rental'}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] uppercase font-bold text-gold-deep bg-gold-deep/10 px-2 py-1 rounded">
                            {rental.rental_type === 'self-drive' ? 'Self-Drive' : 'With Driver'}
                          </span>
                          {rental.price_from && (
                            <span className="font-bold text-sacred-green text-lg">
                              ${rental.price_from}
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif text-lg font-bold text-sacred-green mb-1">
                          {rental.vehicle_type || 'Standard Vehicle'}
                        </h3>
                        <p className="text-xs text-gray-500 mb-3">
                          {rental.location_name}
                        </p>
                        <a
                          href={rental.booking_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block w-full text-center bg-sacred-green hover:bg-sacred-green/90 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-colors"
                        >
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
