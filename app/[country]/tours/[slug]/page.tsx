import { createClient } from '../../../../lib/supabase/server'
import { createPublicClient } from '../../../../lib/supabase/public-server'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { Clock, ArrowLeft, Play, CheckCircle2, ChevronDown } from 'lucide-react'
import BookNowClient from './BookNowClient'
import { ThaiLanguage } from '../../../../types/country'
import { translateText, translateTourBatch } from '../../../../lib/translate'
import { cookies } from 'next/headers'
import { unstable_cache } from 'next/cache'

// ─── Types ────────────────────────────────────────────────────
interface Tour {
  id: string
  tour_code?: string
  title: string
  slug: string
  short_description: string
  description: string
  price_from: number
  currency: string
  duration_days: number
  duration_nights: number
  group_size_max: number
  images: string[]
  highlights: string[]
  inclusions: string[]
  exclusions: string[]
  featured: boolean
  destination_id: string
  salesperson_id?: string
  country: string
  status: string
  video_url: string | null
  created_at: string
}

interface Itinerary {
  id: string
  tour_id: string
  day_number: number
  title: string
  content: string
  highlights: string[]
  meals_included: string[]
  accommodation: string | null
  image_url: string | null
  landmark_id: string | null
  landmarks: {
    image_url: string | null
    alt_text: string | null
    name: string | null
  } | null
  created_at: string
}

// ─── Metadata ─────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; slug: string }>
}): Promise<Metadata> {
  const { country: countrySlug, slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('tours')
    .select('title, short_description, images')
    .eq('slug', slug)
    .eq('country', countrySlug)
    .single()

  const country = countrySlug.charAt(0).toUpperCase() + countrySlug.slice(1)

  if (!data) return { title: 'Tour – AsiaBuddy' }

  const heroImage = Array.isArray(data.images) && data.images.length > 0 ? data.images[0] : null

  return {
    title: `${data.title} – AsiaBuddy ${country}`,
    description: data.short_description ?? undefined,
    openGraph: {
      title: `${data.title} – AsiaBuddy ${country}`,
      description: data.short_description ?? undefined,
      images: heroImage ? [heroImage] : [],
      url: `https://asiabuddy.app/${countrySlug}/tours/${slug}`,
    },
  }
}

// ─── Cached Data Fetching Functions ───────────────────────────
function getCachedTour(slug: string, country: string) {
  return unstable_cache(
    async () => {
      const supabase = createPublicClient()
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('slug', slug)
        .eq('country', country)
        .single()
      return { data, error }
    },
    [`tour-${slug}-${country}`],
    { revalidate: 3600, tags: [`tour-${slug}`] }
  )()
}

function getCachedItineraries(tourId: string) {
  return unstable_cache(
    async () => {
      const supabase = createPublicClient()
      const { data } = await supabase
        .from('itineraries')
        .select('*, landmarks(image_url, alt_text, name)')
        .eq('tour_id', tourId)
        .order('day_number', { ascending: true })
      return data
    },
    [`itinerary-${tourId}`],
    { revalidate: 3600, tags: [`itinerary-${tourId}`] }
  )()
}

function getCachedTranslation(
  tourId: string,
  targetLanguage: string,
  t: Tour,
  highlights: string[],
  inclusions: string[],
  exclusions: string[],
  itineraries: Itinerary[] | null
) {
  return unstable_cache(
    async () => {
      // Build the batch translation data object
      const batchData = {
        title: t.title || '',
        short_description: t.short_description || '',
        description: t.description || '',
        highlights: highlights,
        inclusions: inclusions,
        exclusions: exclusions,
        itineraries: (itineraries || []).map(day => ({
          title: day.title || '',
          content: day.content || '',
          highlights: Array.isArray(day.highlights) ? day.highlights : [],
          meals_included: Array.isArray(day.meals_included) ? day.meals_included : [],
          accommodation: day.accommodation || null,
        })),
      }

      // Single batch API call
      const translatedData = await translateTourBatch(batchData, targetLanguage)

      // Map results back to expected structure
      const translatedTour = {
        ...t,
        title: translatedData.title,
        short_description: translatedData.short_description,
        description: translatedData.description,
      }

      const translatedHighlights = translatedData.highlights
      const translatedInclusions = translatedData.inclusions
      const translatedExclusions = translatedData.exclusions

      let translatedItineraries = itineraries
      if (itineraries && itineraries.length > 0) {
        translatedItineraries = itineraries.map((day, index) => ({
          ...day,
          title: translatedData.itineraries[index]?.title || day.title,
          content: translatedData.itineraries[index]?.content || day.content,
          highlights: translatedData.itineraries[index]?.highlights || day.highlights,
          meals_included: translatedData.itineraries[index]?.meals_included || day.meals_included,
          accommodation: translatedData.itineraries[index]?.accommodation || day.accommodation,
        }))
      }

      return {
        translatedTour,
        translatedHighlights,
        translatedInclusions,
        translatedExclusions,
        translatedItineraries,
      }
    },
    [`translation-${tourId}-${targetLanguage}`],
    { revalidate: 3600, tags: [`translation-${tourId}-${targetLanguage}`] }
  )()
}

// ─── YouTube ID ───────────────────────────────────────────────
function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )
  return match ? match[1] : null
}

// ─── Itinerary Renderer ───────────────────────────────────────
function ItinerarySection({ itinerary }: { itinerary: any }) {
  if (!itinerary) return null

  // If array of day objects
  if (Array.isArray(itinerary)) {
    return (
      <div className="space-y-4">
        {itinerary.map((day: any, i: number) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-sacred-green text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                {i + 1}
              </div>
              {i < itinerary.length - 1 && <div className="w-[1px] flex-grow bg-gray-200 mt-2" />}
            </div>
            <div className="pb-6">
              <h4 className="font-bold text-sacred-green text-sm mb-1">
                {day.day || `Day ${i + 1}`}{day.title ? ` — ${day.title}` : ''}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed">{day.description || day.content || ''}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // If plain text
  if (typeof itinerary === 'string') {
    return (
      <div className="prose prose-sm max-w-none text-gray-600 whitespace-pre-line">
        {itinerary}
      </div>
    )
  }

  return null
}

// ─── Page ─────────────────────────────────────────────────────
export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ country: string; slug: string }>
}) {
  const { country, slug } = await params

  // Detect user's preferred language from cookie
  const cookieStore = await cookies()
  const targetLanguage = cookieStore.get('NEXT_LOCALE')?.value || 'en'

  // Fetch tour data with caching
  const { data: tour, error } = await getCachedTour(slug, country)

  if (!tour) notFound()
  if (error) {
    console.error('Tour fetch error:', error.message)
    notFound()
  }

  // Fetch itineraries with caching
  const itineraries = await getCachedItineraries(tour.id)

  const t = tour as Tour
  const videoId = t.video_url ? getYouTubeId(t.video_url) : null
  const highlights = Array.isArray(t.highlights) ? t.highlights : []
  const inclusions = Array.isArray(t.inclusions) ? t.inclusions : []
  const exclusions = Array.isArray(t.exclusions) ? t.exclusions : []

  const countryName = country.charAt(0).toUpperCase() + country.slice(1)

  // Translate tour data if needed with caching
  let translatedTour = t
  let translatedItineraries = itineraries
  let translatedHighlights = highlights
  let translatedInclusions = inclusions
  let translatedExclusions = exclusions

  if (targetLanguage !== 'en') {
    const translationResult = await getCachedTranslation(
      tour.id,
      targetLanguage,
      t,
      highlights,
      inclusions,
      exclusions,
      itineraries
    )
    translatedTour = translationResult.translatedTour
    translatedHighlights = translationResult.translatedHighlights
    translatedInclusions = translationResult.translatedInclusions
    translatedExclusions = translationResult.translatedExclusions
    translatedItineraries = translationResult.translatedItineraries
  }

  return (
    <div className="min-h-screen bg-sacred-bg/30">

      {/* ── Hero ── */}
      <div className="relative w-full h-[42vh] sm:h-[50vh] md:h-[65vh] overflow-hidden">
        {(() => {
          const heroImage = Array.isArray(t.images) && t.images.length > 0 ? t.images[0] : null;
          return heroImage ? (
            <div className="absolute inset-0">
              <Image 
                src={heroImage} 
                alt={translatedTour.title} 
                fill 
                priority 
                className="object-cover animate-ken-burns" 
                sizes="100vw" 
              />
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-sacred-green to-emerald-950 animate-ken-burns" />
          );
        })()}
        
        {/* Vignette overlay for cinematic effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
        
        {/* Strong gradient overlay for guaranteed text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 via-black/10 to-transparent" />

        {/* Back */}
        <div className="absolute top-6 left-6 z-10">
          <Link
            href={`/${country}/tours`}
            className="flex items-center gap-2 bg-white/90 backdrop-blur-md text-sacred-green text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-full shadow-md hover:bg-white transition-all"
          >
            <ArrowLeft size={13} /> Tours
          </Link>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12 lg:p-16">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {t.duration_days && (
              <span className="bg-white/15 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg">
                <Clock size={11} /> {t.duration_days} Day{t.duration_days !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-bold leading-tight max-w-3xl mb-4 drop-shadow-2xl">
            {translatedTour.title}
          </h1>
          {translatedTour.short_description && (
            <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed drop-shadow-lg">
              {translatedTour.short_description}
            </p>
          )}
        </div>

        {/* Scroll-down cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-2 shadow-lg">
            <ChevronDown className="text-white/80" size={20} />
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <div className="max-w-7xl mx-auto px-6 py-12 pb-[160px]">

        {/* SECTION A — Overview + Reserve Your Spot */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Overview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="text-xs font-semibold text-orange-500 tracking-widest uppercase mb-2">OVERVIEW</div>
              {t.tour_code && (
                <div className="text-sm text-gray-600 mb-3">
                  <span className="font-medium">Tour Code:</span>{' '}
                  <span className="font-mono font-bold">{t.tour_code}</span>
                </div>
              )}
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Tour</h2>
              {translatedTour.description ? (
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {translatedTour.description}
                </p>
              ) : (
                <p className="text-gray-400 italic">Tour details coming soon.</p>
              )}
            </div>
          </div>

          {/* Right Column - Reserve Your Spot */}
          <div className="lg:col-span-1">
            <div className="bg-[#1a2332] text-white rounded-2xl shadow-lg p-6">
              <div className="text-xs font-semibold text-orange-400 tracking-widest uppercase mb-4">RESERVE YOUR SPOT</div>
              
              <hr className="border-gray-700 my-4" />

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div>
                  <div className="text-xs text-gray-500 uppercase">🕐 Duration</div>
                  <div className="text-sm font-semibold text-white">
                    {t.duration_days} Day{t.duration_days !== 1 ? 's' : ''} / {t.duration_days - 1} Night{t.duration_days - 1 !== 1 ? 's' : ''}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase">👥 Group Size</div>
                  <div className="text-sm font-semibold text-white">Max 5 people</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase">⚡ Confirmation</div>
                  <div className="text-sm font-semibold text-white">Instant</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase">🔄 Cancellation</div>
                  <div className="text-sm font-semibold text-white">Free</div>
                </div>
              </div>

              {/* Book Now Button */}
              <BookNowClient
                tourSlug={translatedTour.slug}
                country={translatedTour.country}
                salesperson_id={translatedTour.salesperson_id}
                language={country.toUpperCase() as ThaiLanguage}
              />

              {/* Trust Badges */}
              <div className="text-xs text-gray-500 text-center mt-3">
                🔒 Secure &nbsp; ⭐ Best Price &nbsp; 💬 24/7 Chat
              </div>
            </div>
          </div>
        </div>

        {/* SECTION B — Details: What's Included */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h2>
          {translatedInclusions.length > 0 ? (
            <div className="space-y-3">
              {translatedInclusions.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic">No inclusions listed</p>
          )}
        </div>

        <div className="flex items-center gap-3 mb-10">
          <div className="flex-grow h-[1px] bg-gradient-to-r from-gold-deep/30 to-transparent" />
          <span className="text-gold-deep/40 text-xs">✦</span>
          <div className="w-16 h-[1px] bg-gold-deep/20" />
        </div>

        {/* Highlights */}
        {translatedHighlights.length > 0 && (
          <div className="mb-10">
            <h2 className="font-serif text-2xl text-sacred-green font-bold mb-5">Tour Highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {translatedHighlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <CheckCircle2 size={16} className="text-sacred-green mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{h}</span>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* Video */}
        {videoId && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Play size={14} className="text-gold-deep" />
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400">Video</h2>
              <div className="flex-grow h-[1px] bg-gray-100" />
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={translatedTour.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        )}

        {/* Itinerary */}
        {translatedItineraries && translatedItineraries.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="font-serif text-2xl text-sacred-green font-bold">Itinerary</h2>
              <div className="flex-grow h-[1px] bg-gray-100" />
            </div>
            <div className="space-y-4">
              {translatedItineraries.map((day, i) => (
                <div key={day.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-sacred-green text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </div>
                    {i < translatedItineraries.length - 1 && <div className="w-[1px] flex-grow bg-gray-200 mt-2" />}
                  </div>
                  <div className="pb-6 flex-1">
                    <h4 className="font-bold text-sacred-green text-sm mb-1">
                      Day {day.day_number}{day.title ? ` — ${day.title}` : ''}
                    </h4>
                    {/* Landmark photo from joined landmarks table */}
                    {day.landmarks?.image_url && (
                      <div className="mb-3">
                        <Image
                          src={day.landmarks.image_url}
                          alt={day.landmarks.alt_text || day.landmarks.name || day.title || `Day ${day.day_number}`}
                          width={800}
                          height={280}
                          className="rounded-lg"
                          style={{ objectFit: 'cover', width: '100%', height: 'auto', maxHeight: '280px' }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    {/* Fallback to legacy image_url if no landmark photo */}
                    {!day.landmarks?.image_url && day.image_url && (
                      <div className="mb-3">
                        <Image
                          src={day.image_url}
                          alt={day.title || `Day ${day.day_number}`}
                          width={800}
                          height={280}
                          className="rounded-lg"
                          style={{ objectFit: 'cover', width: '100%', height: 'auto', maxHeight: '280px' }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">{day.content}</p>
                    {day.accommodation && (
                      <p className="text-gray-400 text-xs mt-2">🏨 {day.accommodation}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-sacred-green rounded-2xl p-8 text-center mb-10">
          <h3 className="font-serif text-2xl text-white font-bold mb-2">Ready to Book?</h3>
          <p className="text-white/70 text-sm mb-6">Contact us to reserve your spot on this tour.</p>
          <BookNowClient
            tourSlug={translatedTour.slug}
            country={translatedTour.country}
            salesperson_id={translatedTour.salesperson_id}
            language={country.toUpperCase() as ThaiLanguage}
          />
        </div>

        {/* Footer Nav */}
        <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
          <Link href={`/${country}/tours`} className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-gold-deep transition-colors">
            <ArrowLeft size={13} /> All Tours
          </Link>
          <Link href={`/${country}`} className="text-xs uppercase tracking-widest font-bold text-gold-deep hover:text-sacred-green transition-colors">
            {countryName} Guide →
          </Link>
        </div>
      </div>
    </div>
  )
}
