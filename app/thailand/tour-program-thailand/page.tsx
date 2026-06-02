'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Clock, ChevronRight, MapPin, Star, ArrowLeft } from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────
interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  image?: string;
}

interface Tour {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string;
  duration: string;
  price: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  video_url: string;
  created_at: string;
}

// ─── YouTube embed helper ──────────────────────────────────
function getYoutubeId(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return match ? match[1] : null;
}

// ─── Itinerary Timeline ────────────────────────────────────
function ItineraryTimeline({ days }: { days: ItineraryDay[] }) {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {days.map((day, idx) => (
        <div key={day.day} className="relative">
          {/* Connector line */}
          {idx < days.length - 1 && (
            <div
              className="absolute left-[22px] top-[44px] w-px"
              style={{ height: 'calc(100% - 8px)', background: 'linear-gradient(to bottom, #D4AF37, transparent)' }}
            />
          )}

          <button
            onClick={() => setExpanded(expanded === idx ? null : idx)}
            className="w-full text-left group"
          >
            <div className="flex items-center gap-4">
              {/* Day badge */}
              <div
                className="w-11 h-11 rounded-full flex-shrink-0 flex flex-col items-center justify-center text-white font-bold shadow-md z-10"
                style={{ background: expanded === idx ? '#D4AF37' : '#2D4A3E' }}
              >
                <span className="text-[8px] uppercase tracking-wider leading-none">Day</span>
                <span className="text-sm leading-none">{day.day}</span>
              </div>

              {/* Title */}
              <div className="flex-grow">
                <h4
                  className="font-semibold text-sm transition-colors"
                  style={{ color: expanded === idx ? '#D4AF37' : '#2D4A3E' }}
                >
                  {day.title}
                </h4>
              </div>

              {/* Chevron */}
              <ChevronRight
                size={16}
                className="transition-transform flex-shrink-0"
                style={{
                  color: '#D4AF37',
                  transform: expanded === idx ? 'rotate(90deg)' : 'rotate(0deg)',
                }}
              />
            </div>
          </button>

          {/* Expanded content */}
          {expanded === idx && (
            <div className="ml-[60px] mt-3 mb-4">
              {day.image && (
                <img
                  src={day.image}
                  alt={day.title}
                  className="w-full h-40 object-cover rounded-xl mb-3"
                />
              )}
              <p className="text-sm leading-relaxed" style={{ color: '#666' }}>
                {day.description}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Tour Card ─────────────────────────────────────────────
function TourCard({ tour }: { tour: Tour }) {
  const [showItinerary, setShowItinerary] = useState(false);
  const youtubeId = tour.video_url ? getYoutubeId(tour.video_url) : null;

  return (
    <article
      className="bg-white rounded-3xl overflow-hidden shadow-sm border"
      style={{ borderColor: '#f0ede4' }}
    >
      {/* Cover image */}
      <div className="relative h-64 overflow-hidden" style={{ background: '#f5f3ec' }}>
        {tour.cover_image ? (
          <img
            src={tour.cover_image}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl opacity-10">✦</span>
          </div>
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Duration + Price badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {tour.duration && (
            <span
              className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
              style={{ background: '#2D4A3E', color: '#D4AF37' }}
            >
              <Clock size={10} />
              {tour.duration}
            </span>
          )}
        </div>
        {tour.price && (
          <div className="absolute top-4 right-4">
            <span
              className="text-[11px] font-bold px-3 py-1.5 rounded-full"
              style={{ background: '#D4AF37', color: '#fff' }}
            >
              {tour.price}
            </span>
          </div>
        )}

        {/* Title on image */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h2 className="text-xl font-bold text-white leading-snug">
            {tour.title}
          </h2>
          {tour.excerpt && (
            <p className="text-white/60 text-sm mt-1 line-clamp-1">{tour.excerpt}</p>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-6">

        {/* Highlights */}
        {tour.highlights?.length > 0 && (
          <div className="mb-5">
            <h3
              className="text-[9px] uppercase tracking-[0.4em] font-bold mb-3"
              style={{ color: '#bbb' }}
            >
              Highlights
            </h3>
            <div className="flex flex-wrap gap-2">
              {tour.highlights.map((h, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1 text-xs px-3 py-1 rounded-full border"
                  style={{ color: '#2D4A3E', borderColor: 'rgba(212,175,55,0.3)', background: 'rgba(212,175,55,0.06)' }}
                >
                  <Star size={9} style={{ color: '#D4AF37' }} />
                  {h}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Itinerary toggle */}
        {tour.itinerary?.length > 0 && (
          <div className="mb-5">
            <button
              onClick={() => setShowItinerary(!showItinerary)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all mb-3"
              style={{
                background: showItinerary ? 'rgba(212,175,55,0.08)' : '#faf9f5',
                border: '1px solid',
                borderColor: showItinerary ? 'rgba(212,175,55,0.3)' : '#f0ede4',
              }}
            >
              <span
                className="text-[10px] uppercase tracking-[0.35em] font-bold"
                style={{ color: '#2D4A3E' }}
              >
                📅 {tour.itinerary.length}-Day Itinerary
              </span>
              <ChevronRight
                size={14}
                style={{
                  color: '#D4AF37',
                  transform: showItinerary ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                }}
              />
            </button>

            {showItinerary && (
              <div
                className="px-4 py-5 rounded-2xl"
                style={{ background: '#faf9f5', border: '1px solid #f0ede4' }}
              >
                <ItineraryTimeline days={tour.itinerary} />
              </div>
            )}
          </div>
        )}

        {/* Video embed */}
        {youtubeId && (
          <div className="mb-5">
            <h3
              className="text-[9px] uppercase tracking-[0.4em] font-bold mb-3"
              style={{ color: '#bbb' }}
            >
              Tour Video
            </h3>
            <div className="relative rounded-2xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title={tour.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

      </div>
    </article>
  );
}

// ─── Skeleton ──────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border animate-pulse" style={{ borderColor: '#f0ede4' }}>
      <div className="h-64 bg-gray-100" />
      <div className="p-6 space-y-3">
        <div className="h-4 bg-gray-100 rounded-full w-3/4" />
        <div className="h-3 bg-gray-100 rounded-full w-full" />
        <div className="h-3 bg-gray-100 rounded-full w-1/2" />
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────
export default function TourProgramPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTours() {
      const { data } = await supabase
        .from('tours')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      setTours(data || []);
      setLoading(false);
    }
    fetchTours();
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#faf9f5' }}>

      {/* ── Header ── */}
      <header className="w-full" style={{ background: '#faf9f5' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10 pt-14 pb-8">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-8 h-px" style={{ background: 'rgba(212,175,55,0.4)' }} />
            <span className="text-[9px] uppercase tracking-[0.45em] font-bold" style={{ color: '#2D4A3E' }}>
              AsiaBuddy — Thailand
            </span>
            <span className="w-8 h-px" style={{ background: 'rgba(212,175,55,0.4)' }} />
          </div>

          {/* Title */}
          <div className="flex flex-col items-center text-center gap-2 mb-6">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl leading-none tracking-tight"
              style={{ fontFamily: 'Georgia, serif', color: '#2D4A3E' }}
            >
              Tour Programs
            </h1>
            <p className="text-sm italic font-light mt-1" style={{ color: '#aaa', letterSpacing: '0.04em' }}>
              Curated Thailand experiences, day by day
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-grow h-px" style={{ background: 'linear-gradient(to right, rgba(212,175,55,0.35), transparent)' }} />
            <span style={{ color: 'rgba(212,175,55,0.4)', fontSize: 11 }}>✦</span>
            <div className="w-12 h-px" style={{ background: 'rgba(212,175,55,0.15)' }} />
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <main className="max-w-5xl mx-auto px-4 pb-24">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : tours.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5" style={{ background: '#f0ede4' }}>
              <span style={{ color: '#D4AF37', fontSize: 22 }}>✦</span>
            </div>
            <h3 className="text-xl mb-2" style={{ fontFamily: 'Georgia, serif', color: '#2D4A3E' }}>
              Tours coming soon
            </h3>
            <p className="text-sm max-w-xs" style={{ color: '#bbb' }}>
              We are crafting unforgettable Thailand experiences. Check back shortly.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="border-t bg-white" style={{ borderColor: '#f0ede4' }}>
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center gap-3">
          <span className="text-sm tracking-widest" style={{ fontFamily: 'Georgia, serif', color: '#2D4A3E' }}>
            AsiaBuddy
          </span>
          <span className="w-px h-4" style={{ background: '#eee' }} />
          <span className="text-[9px] uppercase tracking-widest" style={{ color: '#bbb' }}>
            Thailand Tour Programs
          </span>
        </div>
      </footer>

      {/* ── Floating Back Button ── */}
      <Link
        href="https://asiabuddy.app/thailand"
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 group"
        style={{ background: '#2D4A3E', color: '#D4AF37' }}
      >
        <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold hidden sm:block">
          Thailand Guide
        </span>
      </Link>

    </div>
  );
}