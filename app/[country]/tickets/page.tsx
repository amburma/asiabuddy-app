import Link from 'next/link'
import { cookies } from 'next/headers'
import { translateText } from '@/lib/translate'
import TicketServiceCard from '@/components/shared/services/TicketServiceCard'
import { getKlookLinksByCity } from '@/lib/queries/klookLinks'
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
    title: `${country} Tickets & Activities — AsiaBuddy`,
    description: `Discover tickets and activities in ${country} with reliable booking options.`,
    openGraph: {
      title: `${country} Tickets & Activities — AsiaBuddy`,
      description: `Find the best tickets and activities in ${country}.`,
      url: `https://asiabuddy.app/${countrySlug}/tickets`,
    },
  }
}

export default async function TicketsPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  const countryName = country.charAt(0).toUpperCase() + country.slice(1)

  const cookieStore = await cookies()
  const targetLanguage = (cookieStore.get('NEXT_LOCALE')?.value ?? 'EN').toUpperCase()

  const defaultCity = 'bangkok'
  const klookLinks = await getKlookLinksByCity(defaultCity)

  const translationPayload = {
    homeText: 'Home',
    servicesText: 'Tickets',
    backText: `Back to ${countryName}`,
    titleText: `Tickets in ${countryName}`,
    subtitleText: 'Skip-the-line access to unforgettable experiences.',
    verifiedText: 'Instant Confirmation',
    guaranteeText: 'Best Price Guarantee',
    supportText: '24/7 Support',
    availText: 'Available Tickets',
    exploreTitle: `Tickets in ${countryName}`,
    countText: `${klookLinks.length} ticket${klookLinks.length !== 1 ? 's' : ''} available`,
    exploreCtaText: 'View Ticket →',
  }

  let translatedData: typeof translationPayload | null = null

  if (klookLinks.length > 0 && targetLanguage !== 'EN') {
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
      console.error('Ticket translation failed, falling back to English safely:', e)
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

          {klookLinks.length === 0 ? (
            <div className="min-h-[400px] flex flex-col items-center justify-center text-center py-24">
              <div className="text-8xl mb-6">🎫</div>
              <h3 className="text-3xl font-black text-gray-800 mb-3">No Tickets Available Yet</h3>
              <p className="text-gray-400 text-lg max-w-md">We are curating amazing experiences for you. Check back soon!</p>
              <Link href={`/${country}`} className="mt-8 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-2xl transition">
                ← {translatedData.backText}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {klookLinks.map((ticket) => (
                <div key={ticket.id} className="w-full">
                  <TicketServiceCard
                    ticket={{
                      attraction_name: ticket.activity_name,
                      image_url: ticket.image_url || '',
                      price: parseFloat(ticket.price_from?.replace(/[^0-9.]/g, '') || '0'),
                      rating: parseFloat(ticket.rating || '0'),
                      reviews_count: parseInt(ticket.reviews_count?.replace(/[^0-9]/g, '') || '0'),
                      skip_the_line: true,
                      instant_confirmation: true,
                      delivery_method: 'qr',
                      affiliate_url: ticket.klook_url,
                    }}
                    language={targetLanguage as any}
                    is_placeholder={Boolean(ticket.is_placeholder)}
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
