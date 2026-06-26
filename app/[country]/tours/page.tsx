import { getSupabase } from '@/lib/supabase'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { translateText } from '@/lib/translate'
import LanguageSelector from '@/components/shared/LanguageSelector'

export const revalidate = 3600

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
  const { country } = await params
  const countryName = country.charAt(0).toUpperCase() + country.slice(1)

  const cookieStore = await cookies()
  const targetLanguage = cookieStore.get('NEXT_LOCALE')?.value || 'en'

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
    titleText: `${countryName} Tours & Packages`,
    subtitleText: "Handpicked experiences. Unforgettable memories.",
    verifiedText: "100% Verified Tours",
    guaranteeText: "Best Price Guarantee",
    supportText: "24/7 Support",
    availText: "Available Experiences",
    exploreTitle: `Explore ${countryName}`,
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

  let translatedData = translationPayload

  if (activeTours.length > 0 && targetLanguage !== 'en') {
    try {
      // API ကို ၁ ကြိမ်တည်းသာ တိုက်ရိုက်ပို့သည်
      const jsonString = JSON.stringify(translationPayload)
      const prompt = `You are a professional JSON translation engine. Translate all the VALUE fields in this JSON object into the language code '${targetLanguage}'. 
      Keep the JSON keys exactly the same. Do not translate brand names like 'AsiaBuddy' or person names like 'Zaw Zaw'. 
      Return ONLY the translated JSON output, no other explanations or markdown backticks: ${jsonString}`
      
      const translatedJSONString = await translateText(prompt, targetLanguage)
      
      // Markdown backticks ကင်းစင်အောင် သန့်စင်ပြီး JSON parse ခြင်း
      const cleanJSON = translatedJSONString.replace(/```json/g, '').replace(/```/g, '').trim()
      translatedData = JSON.parse(cleanJSON)
    } catch (e) {
      console.error("Batch translation failed, falling back to English safely:", e)
    }
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
      title: translatedTourData?.title || tour.title,
      short_description: translatedTourData?.short_description || tour.short_description,
    }
  })

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <div className="relative h-[420px] overflow-hidden bg-amber-600">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-orange-900/40 to-amber-500/60 z-10"></div>
        
        {/* Decorative Circles */}
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-orange-400/20 blur-3xl z-0"></div>
        <div className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full bg-yellow-300/20 blur-2xl z-0"></div>
        
        {/* Content */}
        <div className="relative z-20 flex flex-col justify-end h-full max-w-7xl mx-auto px-6 pb-16">
          
          {/* Breadcrumb Row + Language Selector */}
          <div className="flex justify-between items-start w-full mb-4">
            <div className="text-orange-300 text-sm tracking-wide uppercase font-sans">
              {homeText} / {countryName} / {toursText}
            </div>
            
            <LanguageSelector />
          </div>
          
          {/* Back Button */}
          <Link
            href={`/${country}`}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition"
          >
            ← {backText}
          </Link>
          
          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-4">
            {titleText}
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-white/80 font-light max-w-2xl">
            {subtitleText}
          </p>
          
          {/* Stats Row */}
          <div className="flex flex-wrap gap-8 mt-8">
            <div className="text-white/90 text-sm font-medium">✦ {verifiedText}</div>
            <div className="text-white/90 text-sm font-medium">✦ {guaranteeText}</div>
            <div className="text-white/90 text-sm font-medium">✦ {supportText}</div>
          </div>
        </div>
      </div>

      {/* TOURS GRID SECTION */}
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Section Label */}
          <div className="text-orange-500 text-sm font-bold uppercase tracking-widest mb-2">
            {availText}
          </div>
          
          {/* Section Title */}
          <h2 className="text-3xl font-black text-gray-900 mb-2">
            {exploreTitle}
          </h2>
          
          {/* Section Subtitle */}
          <p className="text-gray-500 mb-10">
            {tourCountText}
          </p>
          
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
                        🕐 {tour.duration_days} {dayText}{tour.duration_days !== 1 ? 's' : ''} / {tour.duration_nights} {nightText}{tour.duration_nights !== 1 ? 's' : ''}
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