import { getSupabase } from '../../../lib/supabase'
import Link from 'next/link'
import { cookies } from 'next/headers'

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
  const { country } = await params
  const countryName = country.charAt(0).toUpperCase() + country.slice(1)

  const cookieStore = await cookies()
  const targetLanguage = (cookieStore.get('NEXT_LOCALE')?.value ?? 'EN').toUpperCase()

  const supabase = getSupabase()
  const result = await supabase
    .from('tours')
    .select('*')
    .eq('status', 'active')
    .eq('country', country)
    .order('display_order', { ascending: true })
  const tours = result.data
  const error = result.error

  if (error) {
    console.error('Error fetching tours:', error)
  }

  const activeTours = tours || []

  // Static UI text translations for supported languages
  const UI_TEXT: Record<string, {
    homeText: string;
    toursText: string;
    backTextPrefix: string;
    titleTextPrefix: string;
    subtitleText: string;
    verifiedText: string;
    guaranteeText: string;
    supportText: string;
    availText: string;
    exploreTitlePrefix: string;
    tourCountTextPrefix: string;
    tourCountTextPlural: string;
    exploreCtaText: string;
    maxGroupText: string;
    peopleText: string;
    dayText: string;
    nightText: string;
    emptyStateTitle: string;
    emptyStateDescription: string;
  }> = {
    EN: {
      homeText: "Home",
      toursText: "Tours",
      backTextPrefix: "Back to",
      titleTextPrefix: "Tours in",
      subtitleText: "Handpicked experiences. Unforgettable memories.",
      verifiedText: "100% Verified Tours",
      guaranteeText: "Best Price Guarantee",
      supportText: "24/7 Support",
      availText: "Available Experiences",
      exploreTitlePrefix: "Tours in",
      tourCountTextPrefix: " tour available",
      tourCountTextPlural: " tours available",
      exploreCtaText: "Explore This Tour →",
      maxGroupText: "Max",
      peopleText: "people",
      dayText: "Day",
      nightText: "Night",
      emptyStateTitle: "No Tours Available Yet",
      emptyStateDescription: "We're curating amazing experiences for you. Check back soon!",
    },
    MM: {
      homeText: "ပင်မစာမျက်နှာ",
      toursText: "ခရီးစဉ်များ",
      backTextPrefix: "သို့ပြန်သွားရန်",
      titleTextPrefix: "ခရီးစဉ်များ",
      subtitleText: "ရွေးချယ်ထားသောအတွေ့အကြုံများ။ မမေ့နိုင်သောမှတ်ဉာဏ်များ။",
      verifiedText: "100% အတည်ပြုခရီးစဉ်များ",
      guaranteeText: "အကောင်းဆုံးစျေးနှုန်းအာမခံ",
      supportText: "၂၄/၇ အထောက်အပံ့",
      availText: "ရရှိနိုင်သောအတွေ့အကြုံများ",
      exploreTitlePrefix: "ခရီးစဉ်များ",
      tourCountTextPrefix: " ခရီးစဉ်ရရှိနိုင်သည်",
      tourCountTextPlural: " ခရီးစဉ်များရရှိနိုင်သည်",
      exploreCtaText: "ဤခရီးစဉ်ကိုလေ့လာရန် →",
      maxGroupText: "အများဆုံး",
      peopleText: "လူများ",
      dayText: "ရက်",
      nightText: "ည",
      emptyStateTitle: "ခရီးစဉ်များမရှိသေးပါ",
      emptyStateDescription: "သင့်အတွက်အံ့ဖွယ်အတွေ့အကြုံများကို ရွေးချယ်နေပါသည်။ မကြာမီပြန်လာကြည့်ရှုပါ!",
    },
    TH: {
      homeText: "หน้าแรก",
      toursText: "ทัวร์",
      backTextPrefix: "กลับไปยัง",
      titleTextPrefix: "ทัวร์ใน",
      subtitleText: "ประสบการณ์ที่คัดสรรแล้ว ความทรงจำที่ไม่อาจลืมเสียได้",
      verifiedText: "ทัวร์ที่ได้รับการยืนยัน 100%",
      guaranteeText: "รับประกันราคาที่ดีที่สุด",
      supportText: "สนับสนุน 24/7",
      availText: "ประสบการณ์ที่มีให้บริการ",
      exploreTitlePrefix: "ทัวร์ใน",
      tourCountTextPrefix: " ทัวร์ที่มีให้บริการ",
      tourCountTextPlural: " ทัวร์ที่มีให้บริการ",
      exploreCtaText: "สำรวจทัวร์นี้ →",
      maxGroupText: "สูงสุด",
      peopleText: "คน",
      dayText: "วัน",
      nightText: "คืน",
      emptyStateTitle: "ยังไม่มีทัวร์ให้บริการ",
      emptyStateDescription: "เรากำลังคัดสรรประสบการณ์ที่น่าทึ่งให้คุณ กลับมาเช็คอีกครั้งเร็วๆ นี้!",
    },
    DE: {
      homeText: "Startseite",
      toursText: "Touren",
      backTextPrefix: "Zurück zu",
      titleTextPrefix: "Touren in",
      subtitleText: "Handverlesene Erlebnisse. Unvergessliche Erinnerungen.",
      verifiedText: "100% verifizierte Touren",
      guaranteeText: "Bestpreisgarantie",
      supportText: "24/7 Support",
      availText: "Verfügbare Erlebnisse",
      exploreTitlePrefix: "Touren in",
      tourCountTextPrefix: " Tour verfügbar",
      tourCountTextPlural: " Touren verfügbar",
      exploreCtaText: "Diese Tour erkunden →",
      maxGroupText: "Max",
      peopleText: "Personen",
      dayText: "Tag",
      nightText: "Nacht",
      emptyStateTitle: "Noch keine Touren verfügbar",
      emptyStateDescription: "Wir kuratieren großartige Erlebnisse für Sie. Schauen Sie bald wieder vorbei!",
    },
    FR: {
      homeText: "Accueil",
      toursText: "Visites",
      backTextPrefix: "Retour à",
      titleTextPrefix: "Visites à",
      subtitleText: "Expériences sélectionnées. Souvenirs inoubliables.",
      verifiedText: "Visites 100% vérifiées",
      guaranteeText: "Garantie meilleur prix",
      supportText: "Support 24/7",
      availText: "Expériences disponibles",
      exploreTitlePrefix: "Visites à",
      tourCountTextPrefix: " visite disponible",
      tourCountTextPlural: " visites disponibles",
      exploreCtaText: "Explorer cette visite →",
      maxGroupText: "Max",
      peopleText: "personnes",
      dayText: "jour",
      nightText: "nuit",
      emptyStateTitle: "Aucune visite disponible pour le moment",
      emptyStateDescription: "Nous sélectionnons d'excellentes expériences pour vous. Revenez bientôt!",
    },
    ES: {
      homeText: "Inicio",
      toursText: "Tours",
      backTextPrefix: "Volver a",
      titleTextPrefix: "Tours en",
      subtitleText: "Experiencias seleccionadas. Recuerdos inolvidables.",
      verifiedText: "Tours 100% verificados",
      guaranteeText: "Garantía de mejor precio",
      supportText: "Soporte 24/7",
      availText: "Experiencias disponibles",
      exploreTitlePrefix: "Tours en",
      tourCountTextPrefix: " tour disponible",
      tourCountTextPlural: " tours disponibles",
      exploreCtaText: "Explorar este tour →",
      maxGroupText: "Máx",
      peopleText: "personas",
      dayText: "día",
      nightText: "noche",
      emptyStateTitle: "Aún no hay tours disponibles",
      emptyStateDescription: "Estamos curando experiencias increíbles para ti. ¡Vuelve pronto!",
    },
  }

  // Select UI text based on target language, fallback to EN
  const uiLabels = UI_TEXT[targetLanguage] || UI_TEXT.EN

  // Construct dynamic strings with proper language context
  const homeText = uiLabels.homeText
  const toursText = uiLabels.toursText
  const backText = `${uiLabels.backTextPrefix} ${countryName}`
  const titleText = `${uiLabels.titleTextPrefix} ${countryName}`
  const subtitleText = uiLabels.subtitleText
  const verifiedText = uiLabels.verifiedText
  const guaranteeText = uiLabels.guaranteeText
  const supportText = uiLabels.supportText
  const availText = uiLabels.availText
  const exploreTitle = `${uiLabels.exploreTitlePrefix} ${countryName}`
  const tourCountText = `${activeTours.length}${activeTours.length !== 1 ? uiLabels.tourCountTextPlural : uiLabels.tourCountTextPrefix}`
  const exploreCtaText = uiLabels.exploreCtaText
  const maxGroupText = uiLabels.maxGroupText
  const peopleText = uiLabels.peopleText
  const dayText = uiLabels.dayText
  const nightText = uiLabels.nightText
  const emptyStateTitle = uiLabels.emptyStateTitle
  const emptyStateDescription = uiLabels.emptyStateDescription

  // Build translated tours using static multilingual columns
  const translatedTours = activeTours.map((tour) => {
    const lang = targetLanguage.toLowerCase()
    
    // For English, use original columns directly
    if (targetLanguage === 'EN') {
      return {
        ...tour,
        title: tour.title || '',
        short_description: tour.short_description || '',
      }
    }
    
    // For other languages, try static columns, fall back to English
    const titleColumn = `title_${lang}` as keyof typeof tour
    const descColumn = `short_description_${lang}` as keyof typeof tour
    
    const translatedTitle = (tour[titleColumn] as string)?.trim() || tour.title || ''
    const translatedDesc = (tour[descColumn] as string)?.trim() || tour.short_description || ''
    
    return {
      ...tour,
      title: translatedTitle,
      short_description: translatedDesc,
    }
  })

  return (
    <>
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
                {emptyStateTitle}
              </h3>
              <p className="text-gray-400 text-lg max-w-md">
                {emptyStateDescription}
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
    </>
  )
}