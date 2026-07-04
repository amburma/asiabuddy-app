// app/thailand/thailand-destination/[slug]/page.tsx

import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { MapPin, ArrowLeft, Play } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────
interface Destination {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  cover_image: string | null
  gallery: string[] | null
  video_url: string | null
  location: string | null
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
    .from('destinations')
    .select('title, excerpt, cover_image')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!data) return { title: 'Destination – AsiaBuddy' }

  return {
    title: `${data.title} – AsiaBuddy Thailand`,
    description: data.excerpt ?? undefined,
    openGraph: {
      title: `${data.title} – AsiaBuddy Thailand`,
      description: data.excerpt ?? undefined,
      images: data.cover_image ? [data.cover_image] : [],
      url: `https://asiabuddy.app/thailand/thailand-destination/${slug}`,
    },
  }
}

// ─── YouTube Embed ID ──────────────────────────────────────────
function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )
  return match ? match[1] : null
}

// ─── Page ─────────────────────────────────────────────────────
export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: dest, error } = await supabase
    .from('destinations')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error || !dest) notFound()

  const destination = dest as Destination
  const videoId = destination.video_url ? getYouTubeId(destination.video_url) : null
  const gallery = Array.isArray(destination.gallery) ? destination.gallery : []

  return (
    <div className="min-h-screen bg-sacred-bg/30">

      {/* ── Hero Image ── */}
      <div className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
        {destination.cover_image ? (
          <Image
            src={destination.cover_image}
            alt={destination.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-sacred-green to-emerald-950" />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <Link
            href="/thailand/thailand-destination"
            className="flex items-center gap-2 bg-white/90 backdrop-blur-md text-sacred-green text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-full shadow-md hover:bg-white transition-all"
          >
            <ArrowLeft size={13} />
            Destinations
          </Link>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          {destination.location && (
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1">
                <MapPin size={10} />
                {destination.location}
              </span>
            </div>
          )}
          <h1 className="font-serif text-4xl md:text-6xl text-white font-bold leading-tight max-w-3xl">
            {destination.title}
          </h1>
          {destination.excerpt && (
            <p className="text-white/75 text-sm md:text-base mt-4 max-w-2xl leading-relaxed">
              {destination.excerpt}
            </p>
          )}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Decorative rule */}
        <div className="flex items-center gap-3 mb-10">
          <div className="flex-grow h-[1px] bg-gradient-to-r from-gold-deep/30 to-transparent" />
          <span className="text-gold-deep/40 text-xs">✦</span>
          <div className="w-16 h-[1px] bg-gold-deep/20" />
        </div>

        {/* Content Body */}
        {destination.content && (
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-serif prose-headings:text-sacred-green
              prose-p:text-gray-600 prose-p:leading-relaxed
              prose-a:text-gold-deep prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-2xl prose-img:shadow-md
              prose-strong:text-sacred-green
              mb-12"
            dangerouslySetInnerHTML={{ __html: destination.content }}
          />
        )}

        {/* ── YouTube Video ── */}
        {videoId && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Play size={14} className="text-gold-deep" />
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400">
                Video
              </h2>
              <div className="flex-grow h-[1px] bg-gray-100" />
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={destination.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        )}

        {/* ── Gallery ── */}
        {gallery.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400">
                Gallery
              </h2>
              <div className="flex-grow h-[1px] bg-gray-100" />
              <span className="text-[10px] text-gray-400 font-medium">
                {gallery.length} photos
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {gallery.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <Image
                    src={img}
                    alt={`${destination.title} ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Footer Nav ── */}
        <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
          <Link
            href="/thailand/thailand-destination"
            className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-gold-deep transition-colors"
          >
            <ArrowLeft size={13} />
            All Destinations
          </Link>
          <Link
            href="/thailand"
            className="text-xs uppercase tracking-widest font-bold text-gold-deep hover:text-sacred-green transition-colors"
          >
            Thailand Guide →
          </Link>
        </div>

      </div>
    </div>
  )
}