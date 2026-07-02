import Link from 'next/link'
import { cookies } from 'next/headers'
import { translateText } from '@/lib/translate'
import TourServiceCard from '@/components/shared/services/TourServiceCard'
import { getGygLinksByCity } from '@/lib/queries/gygLinks'
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
    title: `${country} Activities — AsiaBuddy`,
    description: `Discover affiliate tour activities in ${country} from GYG.`,
    openGraph: {
      title: `${country} Activities — AsiaBuddy`,
      description: `Browse GYG affiliate activities and tours in ${country}.`,
      url: `https://asiabuddy.app/${countrySlug}/activities`,
    },
  }
}

export default async function ActivitiesPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  const countryName = country.charAt(0).toUpperCase() + country.slice(1)

  const cookieStore = await cookies()
  const targetLanguage = (cookieStore.get('NEXT_LOCALE')?.value ?? 'EN').toUpperCase()

  const defaultCity = 'bangkok'
  const gygLinks = await getGygLinksByCity(defaultCity)

  const translationPayload = {
    homeText: 'Home',
    servicesText: 'Activities',
    backText: `Back to ${countryName}`,
    titleText: `Activities in ${countryName}`,
    subtitleText: 'GYG affiliate tours and experiences curated for your trip.',
    verifiedText: 'Verified Experiences',
    guaranteeText: 'Best Price Guarantee',
    supportText: '24/7 Support',
    availText: 'Available Activities',
    exploreTitle: `Activities in ${countryName}`,
    countText: `${gygLinks.length} activity${gygLinks.length !== 1 ? 'ies' : 'y'} available`,
    exploreCtaText: 'View Activity →',
  }

  let translatedData: typeof translationPayload | null = null

  if (gygLinks.length > 0 && targetLanguage !== 'EN') {
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
      console.error('Activities translation failed, falling back to English safely:', e)
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

          {gygLinks.length === 0 ? (
            <div className="min-h-[400px] flex flex-col items-center justify-center text-center py-24">
              <div className="text-8xl mb-6">🌏</div>
              <h3 className="text-3xl font-black text-gray-800 mb-3">No Activities Available Yet</h3>
              <p className="text-gray-400 text-lg max-w-md">We are curating GYG activities for you. Check back soon!</p>
              <Link href={`/${country}`} className="mt-8 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-2xl transition">
                ← {translatedData.backText}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gygLinks.map((activity) => (
                <div key={activity.id} className="w-full">
                  <TourServiceCard
                    tour={{
                      activity_name: activity.activity_name,
                      image_url: activity.image_url || '',
                      price_from: activity.price_from || '0',
                      rating: activity.rating || '0',
                      reviews_count: activity.reviews_count || '0',
                      duration: activity.duration || 'Flexible',
                      gyg_url: activity.gyg_url,
                    }}
                    language={targetLanguage as any}
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
