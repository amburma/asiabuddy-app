export const dynamic = 'force-dynamic'
export const revalidate = 0
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { Clock, DollarSign, ArrowLeft, Play, CheckCircle2 } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────
interface Tour {
  id: string
  title: string
  slug: string
  excerpt: string | null
  cover_image: string | null
  duration: string | null
  price: string | null
  highlights: string[] | null
  itinerary: any
  video_url: string | null
  country: string
  published: boolean
  created_at: string
}

// ─── Metadata ─────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('tours')
    .select('title, excerpt, cover_image')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!data) return { title: 'Tour – AsiaBuddy' }

  return {
    title: `${data.title} – AsiaBuddy Thailand`,
    description: data.excerpt ?? undefined,
    openGraph: {
      title: `${data.title} – AsiaBuddy Thailand`,
      description: data.excerpt ?? undefined,
      images: data.cover_image ? [data.cover_image] : [],
      url: `https://asiabuddy.app/thailand/tour/${slug}`,
    },
  }
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
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: tour, error } = await supabase
    .from('tours')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!tour) notFound()
  if (error) {
    console.error('Tour fetch error:', error.message)
    notFound()
  }

  const t = tour as Tour
  const videoId = t.video_url ? getYouTubeId(t.video_url) : null
  const highlights = Array.isArray(t.highlights) ? t.highlights : []

  return (
    <div className="min-h-screen bg-sacred-bg/30">

      {/* ── Hero ── */}
      <div className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
        {t.cover_image ? (
          <Image src={t.cover_image} alt={t.title} fill priority className="object-cover" sizes="100vw" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-sacred-green to-emerald-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Back */}
        <div className="absolute top-6 left-6 z-10">
          <Link
            href="/thailand/tour"
            className="flex items-center gap-2 bg-white/90 backdrop-blur-md text-sacred-green text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-full shadow-md hover:bg-white transition-all"
          >
            <ArrowLeft size={13} /> Tours
          </Link>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {t.duration && (
              <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1">
                <Clock size={10} /> {t.duration}
              </span>
            )}
            {t.price && (
              <span className="bg-gold-deep text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1">
                <DollarSign size={10} /> {t.price}
              </span>
            )}
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-white font-bold leading-tight max-w-3xl mb-4">
            {t.title}
          </h1>
          {t.excerpt && (
            <p className="text-white/75 text-sm md:text-base max-w-2xl leading-relaxed">
              {t.excerpt}
            </p>
          )}
        </div>
      </div>

      {/* ── Main ── */}
      <div className="max-w-4xl mx-auto px-6 py-12">

        <div className="flex items-center gap-3 mb-10">
          <div className="flex-grow h-[1px] bg-gradient-to-r from-gold-deep/30 to-transparent" />
          <span className="text-gold-deep/40 text-xs">✦</span>
          <div className="w-16 h-[1px] bg-gold-deep/20" />
        </div>

        {/* Highlights */}
        {highlights.length > 0 && (
          <div className="mb-10">
            <h2 className="font-serif text-2xl text-sacred-green font-bold mb-5">Tour Highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highlights.map((h, i) => (
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
                title={t.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        )}

        {/* Itinerary */}
        {t.itinerary && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="font-serif text-2xl text-sacred-green font-bold">Itinerary</h2>
              <div className="flex-grow h-[1px] bg-gray-100" />
            </div>
            <ItinerarySection itinerary={t.itinerary} />
          </div>
        )}

        {/* CTA */}
        <div className="bg-sacred-green rounded-2xl p-8 text-center mb-10">
          <h3 className="font-serif text-2xl text-white font-bold mb-2">Ready to Book?</h3>
          <p className="text-white/70 text-sm mb-6">Contact us to reserve your spot on this tour.</p>
          <Link
            href="/thailand"
            className="inline-flex items-center gap-2 bg-gold-deep text-white font-bold text-sm uppercase tracking-widest px-8 py-3.5 rounded-full hover:opacity-90 transition-all"
          >
            Contact Us <ArrowLeft size={14} className="rotate-180" />
          </Link>
        </div>

        {/* Footer Nav */}
        <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
          <Link href="/thailand/tour" className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-gold-deep transition-colors">
            <ArrowLeft size={13} /> All Tours
          </Link>
          <Link href="/thailand" className="text-xs uppercase tracking-widest font-bold text-gold-deep hover:text-sacred-green transition-colors">
            Thailand Guide →
          </Link>
        </div>
      </div>
    </div>
  )
}
