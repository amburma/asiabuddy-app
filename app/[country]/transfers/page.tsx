import Link from 'next/link'
import { cookies } from 'next/headers'
import { translateText } from '@/lib/translate'
import TransferServiceCard from '@/components/shared/services/TransferServiceCard'
import { getTransferLinksByCity } from '@/lib/queries/transferLinks'
import Navbar from '@/components/shared/Navbar'
import TransportChatWrapper from '@/components/shared/TransportChatWrapper'
import { normalizeLocale } from '@/lib/i18n'

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
    title: `${country} Transfers — AsiaBuddy`,
    description: `Book reliable transfers in ${country} with easy pickup and drop-off.`,
    openGraph: {
      title: `${country} Transfers — AsiaBuddy`,
      description: `Find stress-free transfers in ${country}.`,
      url: `https://asiabuddy.app/${countrySlug}/transfers`,
    },
  }
}

export default async function TransfersPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  const countryName = country.charAt(0).toUpperCase() + country.slice(1)

  const cookieStore = await cookies()
  const targetLanguage = normalizeLocale(cookieStore.get('NEXT_LOCALE')?.value)

  const defaultCity = 'bangkok'
  const transferLinks = await getTransferLinksByCity(defaultCity)

  const translationPayload = {
    homeText: 'Home',
    servicesText: 'Transfers',
    backText: `Back to ${countryName}`,
    titleText: `Transfers in ${countryName}`,
    subtitleText: 'Private and shared transfers from airport to hotel and beyond.',
    verifiedText: 'Trusted Operators',
    guaranteeText: 'Flexible Booking',
    supportText: '24/7 Support',
    availText: 'Available Transfers',
    exploreTitle: `Transfers in ${countryName}`,
    countText: `${transferLinks.length} transfer${transferLinks.length !== 1 ? 's' : ''} available`,
    exploreCtaText: 'View Transfer →',
  }

  let translatedData: typeof translationPayload | null = null

  if (transferLinks.length > 0 && targetLanguage !== 'EN') {
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
      console.error('Transfer translation failed, falling back to English safely:', e)
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

          {/* Transport Chat Widget */}
          {country === 'thailand' && (
            <div className="mb-12">
              <TransportChatWrapper language={targetLanguage as any} />
            </div>
          )}

          {transferLinks.length === 0 ? (
            <div className="min-h-[400px] flex flex-col items-center justify-center text-center py-24">
              <div className="text-8xl mb-6">🚐</div>
              <h3 className="text-3xl font-black text-gray-800 mb-3">No Transfers Available Yet</h3>
              <p className="text-gray-400 text-lg max-w-md">We are curating reliable ride options for you. Check back soon!</p>
              <Link href={`/${country}`} className="mt-8 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-2xl transition">
                ← {translatedData.backText}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {transferLinks.map((transfer) => (
                <div key={transfer.id} className="w-full">
                  <TransferServiceCard
                    transfer={{
                      vehicle_type: (transfer.transport_type?.toLowerCase() === 'van'
                        ? 'van'
                        : transfer.transport_type?.toLowerCase() === 'shared'
                          ? 'shared'
                          : 'sedan') as 'sedan' | 'van' | 'shared',
                      pickup_location: transfer.route_name?.split(' to ')[0] || 'Airport',
                      dropoff_location: transfer.route_name?.split(' to ')[1] || 'Hotel',
                      price: parseFloat(transfer.price_from?.replace(/[^0-9.]/g, '') || '0'),
                      duration: 'Flexible',
                      max_passengers: 4,
                      affiliate_url: transfer.booking_url || '#',
                    }}
                    language={targetLanguage as any}
                    is_placeholder={Boolean(transfer.is_placeholder)}
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
