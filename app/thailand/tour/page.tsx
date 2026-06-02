// app/thailand/tour/page.tsx

import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { Clock, DollarSign, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Thailand Tours – AsiaBuddy',
  description: 'Discover the best tour packages in Thailand by AsiaBuddy.',
  openGraph: {
    title: 'Thailand Tours – AsiaBuddy',
    description: 'Discover the best tour packages in Thailand.',
    url: 'https://asiabuddy.app/thailand/tour',
  },
}

interface Tour {
  id: string
  title: string
  slug: string
  excerpt: string | null
  cover_image: string | null
  duration: string | null
  price: string | null
  highlights: string[] | null
  country: string
  published: boolean
  created_at: string
}

async function getTours(): Promise<Tour[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('tours')
    .select('id, title, slug, excerpt, cover_image, duration, price, highlights, country, published, created_at')
    .eq('published', true)
    .eq('country', 'thailand')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Supabase error:', error)
    return []
  }
  return data ?? []
}

// ─── Hero Tour ────────────────────────────────────────────────
function HeroTour({ tour }: { tour: Tour }) {
  return (
    <Link href={`/thailand/tour/${tour.slug}`} className="group block">
      <article className="relative rounded-3xl overflow-hidden min-h-[480px] md:min-h-[560px] flex items-end shadow-xl">
        {tour.cover_image ? (
          <Image
            src={tour.cover_image}
            alt={tour.title}
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-sacred-green to-emerald-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="relative z-10 p-8 md:p-12 w-full">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-gold-deep text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
              ✦ Featured Tour
            </span>
            {tour.duration && (
              <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1">
                <Clock size={10} />
                {tour.duration}
              </span>
            )}
            {tour.price && (
              <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1">
                <DollarSign size={10} />
                {tour.price}
              </span>
            )}
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-white font-bold mb-3 leading-tight max-w-3xl group-hover:text-gold-soft transition-colors duration-300">
            {tour.title}
          </h2>
          {tour.excerpt && (
            <p className="text-white/70 text-sm md:text-base max-w-2xl leading-relaxed mb-6 line-clamp-2">
              {tour.excerpt}
            </p>
          )}
          {tour.highlights && tour.highlights.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {tour.highlights.slice(0, 4).map((h, i) => (
                <span key={i} className="bg-white/15 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/20">
                  {h}
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2 text-gold-deep font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
            <span>View Tour</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </article>
    </Link>
  )
}

// ─── Tour Card ────────────────────────────────────────────────
function TourCard({ tour, index }: { tour: Tour; index: number }) {
  return (
    <Link href={`/thailand/tour/${tour.slug}`} className="group block">
      <article className="flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
        <div className="relative aspect-[16/10] overflow-hidden">
          {tour.cover_image ? (
            <Image
              src={tour.cover_image}
              alt={tour.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-sacred-green/10 to-gold-deep/10 flex items-center justify-center">
              <span className="text-4xl opacity-20">✦</span>
            </div>
          )}
        </div>

        <div className="flex flex-col flex-grow p-5">
          <h3 className="font-serif text-lg text-sacred-green group-hover:text-gold-deep transition-colors leading-snug mb-2 line-clamp-2 font-bold">
            {tour.title}
          </h3>
          {tour.excerpt && (
            <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-grow mb-4">
              {tour.excerpt}
            </p>
          )}

          {/* Highlights */}
          {tour.highlights && tour.highlights.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tour.highlights.slice(0, 3).map((h, i) => (
                <span key={i} className="text-[10px] font-bold uppercase tracking-wider bg-sacred-green/8 text-sacred-green px-2.5 py-1 rounded-full border border-sacred-green/10">
                  {h}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-3">
              {tour.duration && (
                <span className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                  <Clock size={11} />
                  {tour.duration}
                </span>
              )}
              {tour.price && (
                <span className="flex items-center gap-1 text-[11px] text-sacred-green font-bold">
                  <DollarSign size={11} />
                  {tour.price}
                </span>
              )}
            </div>
            <span className="flex items-center gap-1 text-xs text-gold-deep font-bold uppercase tracking-widest group-hover:gap-2 transition-all">
              View <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

// ─── Empty State ──────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="w-16 h-16 rounded-full bg-sacred-bg flex items-center justify-center mb-6">
        <span className="text-2xl text-gold-deep">✦</span>
      </div>
      <h3 className="text-xl font-serif text-sacred-green mb-2">Tours coming soon</h3>
      <p className="text-gray-400 text-sm max-w-xs">
        Amazing Thailand tour packages will appear here shortly.
      </p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────
export default async function TourPage() {
  const tours = await getTours()
  const [hero, ...rest] = tours

  return (
    <div className="min-h-screen bg-sacred-bg/30">

      {/* ── Header ── */}
      <header className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="flex items-center gap-4 mb-6">
          <span className="w-10 h-[1px] bg-gold-deep/30" />
          <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-sacred-green">
            AsiaBuddy — Thailand
          </span>
          <span className="w-10 h-[1px] bg-gold-deep/30" />
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-serif text-sacred-green leading-none tracking-tight">
              Tour Packages
            </h1>
            <p className="text-gray-400 text-sm italic font-light mt-3 tracking-wide">
              Handcrafted experiences across the Land of Smiles
            </p>
          </div>
          {tours.length > 0 && (
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium pb-2">
              {tours.length} {tours.length === 1 ? 'tour' : 'tours'}
            </p>
          )}
        </div>
        <div className="mt-8 flex items-center gap-3">
          <div className="flex-grow h-[1px] bg-gradient-to-r from-gold-deep/30 to-transparent" />
          <span className="text-gold-deep/40 text-xs">✦</span>
          <div className="w-16 h-[1px] bg-gold-deep/20" />
        </div>
      </header>

      {/* ── Content ── */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        {tours.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {hero && (
              <section className="mb-16">
                <HeroTour tour={hero} />
              </section>
            )}
            {rest.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400">
                    More Tours
                  </h2>
                  <div className="flex-grow h-[1px] bg-gray-100" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((tour, i) => (
                    <TourCard key={tour.id} tour={tour} index={i} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-sacred-green font-serif tracking-widest">AsiaBuddy</span>
            <span className="w-[1px] h-4 bg-gray-200" />
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">Thailand Tours</span>
          </div>
          <Link href="/thailand" className="text-[10px] uppercase tracking-widest text-gold-deep font-bold hover:text-sacred-green transition-colors">
            ← Back to Thailand Guide
          </Link>
        </div>
      </footer>
    </div>
  )
}
