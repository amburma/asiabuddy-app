import { getSupabase } from '@/lib/supabase'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { translateText } from '@/lib/translate'
import Navbar from '@/components/shared/Navbar'
import ToursComingSoon from '@/components/shared/ToursComingSoon'

export const dynamic = 'force-dynamic'
export const revalidate = 0

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
}

export async function generateMetadata(
  { params }: { params: Promise<{ country: string }> }
) {
  const { country: countrySlug } = await params
  const country = countrySlug.charAt(0).toUpperCase() 
    + countrySlug.slice(1)
  return {
    title: `${country} Tours & Packages — AsiaBuddy`,
    description: `Discover handpicked ${country} tours and travel 
      experiences. Expert local guides, secure booking, 
      best price guarantee.`,
    openGraph: {
      title: `${country} Tours & Packages — AsiaBuddy`,
      description: `Handpicked ${country} tours and experiences.`,
      url: `https://asiabuddy.app/${countrySlug}/tours`,
    },
  }
}

export default async function ToursPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  // TEMPORARY BYPASS — set to false to restore the real Tours page.
  // The full Tours page code below is untouched and fully functional.
  const TOURS_COMING_SOON = true

  if (TOURS_COMING_SOON) {
    const { country } = await params
    return <ToursComingSoon country={country} />
  }

  const { country } = await params
  const countryName = country.charAt(0).toUpperCase() + country.slice(1)

  const cookieStore = await cookies()
  const targetLanguage = (cookieStore.get('NEXT_LOCALE')?.value ?? 'EN').toUpperCase()

  const supabase = getSupabase()
  const { data: tours, error } = await supabase
    .from('tours')
    .select('*')
    .eq('status', 'active')
    .eq('country', country)
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching tours:', error)
  }

  const activeTours = tours || []

  // 🌟 (ကမ္ဘာ့အဆင့်မီ စနစ်) စာမျက်နှာပေါ်ရှိ စာသားအားလုံးအား API (၁) ကြိမ်တည်းဖြင့် Batch ဘာသာပြန်ခြင်း 🌟
  const translationPayload = {
    homeText: "Home",
    toursText: "Tours",
    backText: `Back to ${countryName}`,
    titleText: `Tours in ${countryName}`,
    subtitleText: "Handpicked experiences. Unforgettable memories.",
    verifiedText: "100% Verified Tours",
    guaranteeText: "Best Price Guarantee",
    supportText: "24/7 Support",
    availText: "Available Experiences",
    exploreTitle: `Tours in ${countryName}`,
    tourCountText: `${activeTours.length} tour${activeTours.length !== 1 ? 's' : ''} available`,
    exploreCtaText: "Explore This Tour →",
    maxGroupText: "Max",
    peopleText: "people",
    dayText: "Day",
    nightText: "Night",
    // ခရီးစဉ်များကို payload ထဲသို့ စုစည်းထည့်သွင်းခြင်း
    tours: activeTours.map((t) => ({
      id: t.id,
      title: t.title || '',
      short_description: t.short_description || ''
    }))
  }

  let translatedData: typeof translationPayload | null = null

  if (activeTours.length > 0 && targetLanguage !== 'EN') {
    try {
      // API ကို ၁ ကြိမ်တည်းသာ တိုက်ရိုက်ပို့သည်
      const jsonString = JSON.stringify(translationPayload)

      // Map language code to full language name for the prompt
      const langMap: Record<string, string> = {
        'EN': 'English',
        'MY': 'Myanmar (Burmese)',
        'MM': 'Myanmar (Burmese)',
        'ZH': 'Chinese (Simplified)',
        'JA': 'Japanese',
        'KO': 'Korean',
        'DE': 'German',
        'FR': 'French',
        'ES': 'Spanish',
        'AR': 'Arabic',
        'RU': 'Russian',
        'TH': 'Thai',
      }
      const targetLanguageName = langMap[targetLanguage] || targetLanguage

      const prompt = `You are a professional JSON translation engine. Translate all the VALUE fields in this JSON object into ${targetLanguageName}.
      Keep the JSON keys exactly the same. Do not translate brand names like 'AsiaBuddy' or person names like 'Zaw Zaw'.
      Return ONLY the translated JSON output, no other explanations or markdown backticks: ${jsonString}`

      const translatedJSONString = await translateText(prompt, targetLanguage, { raw: true })

      // Markdown backticks ကင်းစင်အောင် သန့်စင်ပြီး JSON parse ခြင်း
      const cleanJSON = translatedJSONString.replace(/```json/g, '').replace(/```/g, '').trim()
      const firstBracket = Math.min(
        ...[cleanJSON.indexOf('{'), cleanJSON.indexOf('[')]
          .filter((i) => i >= 0)
      )
      const lastBracket = Math.max(
        cleanJSON.lastIndexOf('}'),
        cleanJSON.lastIndexOf(']')
      )
      const jsonPayload =
        firstBracket >= 0 && lastBracket > firstBracket
          ? cleanJSON.slice(firstBracket, lastBracket + 1)
          : cleanJSON

      translatedData = JSON.parse(jsonPayload)
    } catch (e) {
      console.error("Batch translation failed, falling back to English safely:", e)
    }
  }

  if (!translatedData) {
    translatedData = translationPayload
  }

  // ဘာသာပြန်ပြီးသား စာသားများအား ပြန်လည်ထုတ်ယူခြင်း
  const homeText = translatedData.homeText || translationPayload.homeText
  const toursText = translatedData.toursText || translationPayload.toursText
  const backText = translatedData.backText || translationPayload.backText
  const titleText = translatedData.titleText || translationPayload.titleText
  const subtitleText = translatedData.subtitleText || translationPayload.subtitleText
  const verifiedText = translatedData.verifiedText || translationPayload.verifiedText
  const guaranteeText = translatedData.guaranteeText || translationPayload.guaranteeText
  const supportText = translatedData.supportText || translationPayload.supportText
  const availText = translatedData.availText || translationPayload.availText
  const exploreTitle = translatedData.exploreTitle || translationPayload.exploreTitle
  const tourCountText = translatedData.tourCountText || translationPayload.tourCountText
  const exploreCtaText = translatedData.exploreCtaText || translationPayload.exploreCtaText
  const maxGroupText = translatedData.maxGroupText || translationPayload.maxGroupText
  const peopleText = translatedData.peopleText || translationPayload.peopleText
  const dayText = translatedData.dayText || translationPayload.dayText
  const nightText = translatedData.nightText || translationPayload.nightText

  // ခရီးစဉ်များကို ဘာသာပြန်အချက်အလက်ဖြင့် ပြန်လည်တွဲဆက်ခြင်း
  const translatedTours = activeTours.map((tour, index) => {
    const translatedTourData = translatedData.tours?.[index]
    return {
      ...tour,
      title: translatedTourData?.title ?? tour.title ?? '',
      short_description: translatedTourData?.short_description ?? tour.short_description ?? '',
    }
  })

  return (
    <div className="min-h-screen bg-white">
      <Navbar country={country} language={targetLanguage} />
      <div className="border-b border-gold-soft/20 bg-sacred-bg/70">
        <div className="max-w-7xl mx-auto px-6 py-8 md:py-10">
          <div className="mt-6">
            <div className="inline-flex flex-col items-start gap-2 mb-4">
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-gold-deep">
                {availText}
              </span>
              <span className="h-[1px] w-16 bg-gold-deep/70" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-sacred-green leading-tight">
              {titleText}
            </h1>
          </div>
        </div>
      </div>

      {/* TOURS GRID SECTION */}
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-16">
          
          {/* Grid */}
          {translatedTours.length === 0 ? (
            /* EMPTY STATE */
            <div className="min-h-[400px] flex flex-col items-center justify-center text-center py-24">
              <div className="text-8xl mb-6">🌏</div>
              <h3 className="text-3xl font-black text-gray-800 mb-3">
                No Tours Available Yet
              </h3>
              <p className="text-gray-400 text-lg max-w-md">
                We're curating amazing experiences for you. Check back soon!
              </p>
              <Link
                href={`/${country}`}
                className="mt-8 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-2xl transition"
              >
                ← {backText}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {translatedTours.map((tour) => {
                const imageUrl = tour.image_url ?? tour.images?.[0] ?? '/placeholder.jpg'

                return (
                <Link
                  key={tour.id}
                  href={`/${country}/tours/${tour.slug}`}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                >
                  {/* IMAGE AREA */}
                  <div className="relative w-full h-48 bg-amber-50">
                    {imageUrl !== '/placeholder.jpg' ? (
                      <img
                        src={imageUrl}
                        alt={tour.title ?? ''}
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
                    From {tour.price_from?.toLocaleString() ?? 'N/A'} {tour.currency}
                  </div>

                  {/* CARD BODY */}
                  <div className="p-6">
                    {/* Title */}
                    <h3 className="text-xl font-black text-gray-900 group-hover:text-orange-500 transition-colors leading-tight mb-2">
                      {tour.title ?? ''}
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
                        🕐 {tour.duration_days ?? 0} {dayText}{(tour.duration_days ?? 0) !== 1 ? 's' : ''} / {tour.duration_nights ?? 0} {nightText}{(tour.duration_nights ?? 0) !== 1 ? 's' : ''}
                      </div>
                      <div className="inline-flex items-center gap-1.5 bg-gray-50 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-100">
                        👥 {maxGroupText} {tour.group_size_max} {peopleText}
                      </div>
                    </div>
                    
                    {/* CTA Button */}
                    <div className="mt-5 w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-200 shadow-md hover:shadow-orange-200 hover:shadow-lg text-center block">
                      {exploreCtaText}
                    </div>
                  </div>
                </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Footer CTA */}
      <section className="relative overflow-hidden bg-[#0F172A] py-20">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-orange-400/10 blur-3xl" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-500/20 border border-orange-500/30 mb-6">
            <span className="text-3xl">✈️</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
            Can't find what you're looking for?
          </h2>

          {/* Subtext */}
          <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Chat with our AI travel assistant — available 24/7 to craft your perfect journey.
          </p>

          {/* Trust pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-slate-300 text-sm px-4 py-2 rounded-full">
              ⚡ Instant Response
            </span>
            <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-slate-300 text-sm px-4 py-2 rounded-full">
              🌏 Thailand Expert
            </span>
            <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-slate-300 text-sm px-4 py-2 rounded-full">
              💬 Free to Chat
            </span>
          </div>

          {/* CTA Button */}
          <Link
            href={`/${country}`}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-lg px-10 py-4 rounded-2xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 hover:-translate-y-0.5"
          >
            Start Planning Your Trip
            <span className="text-xl">→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}