import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSupabase } from '@/lib/supabase';
import BookNowClient from './BookNowClient';
import { ThaiLanguage } from '@/types/country';

export const revalidate = 3600
// Revalidate every 1 hour

interface Tour {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  description: string;
  price_from: number;
  currency: string;
  duration_days: number;
  duration_nights: number;
  group_size_max: number;
  image_url?: string;
  images: string[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  featured: boolean;
  destination_id: string;
  salesperson_id?: string;
  country: string;
  status: string;
  created_at: string;
}

interface Itinerary {
  id: string;
  tour_id: string;
  day_number: number;
  title: string;
  content: string;
  highlights: string[];
  meals_included: string[];
  accommodation: string | null;
  image_url: string | null;
  created_at: string;
}

export async function generateMetadata(
  { params }: { params: Promise<{ country: string; slug: string }> }
) {
  const { country: countrySlug, slug } = await params
  const supabase = getSupabase()
  const { data: tour } = await supabase
    .from('tours')
    .select('title, short_description')
    .eq('slug', slug)
    .single()

  const country = countrySlug.charAt(0).toUpperCase() 
    + countrySlug.slice(1)

  return {
    title: tour
      ? `${tour.title} — AsiaBuddy ${country} Tours` 
      : `${country} Tour — AsiaBuddy`,
    description: tour?.short_description 
      ?? `Explore ${country} with AsiaBuddy expert tours.`,
    openGraph: {
      title: tour?.title ?? `${country} Tour`,
      description: tour?.short_description ?? '',
      url: `https://asiabuddy.app/${countrySlug}/tours/${slug}`,
    },
  }
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ country: string; slug: string }>
}) {
  const { country, slug } = await params;
  const supabase = getSupabase();

  // Fetch tour by slug + country
  const { data: tour, error: tourError } = await supabase
    .from('tours')
    .select('*')
    .eq('slug', slug)
    .eq('country', country)
    .single();

  if (tourError || !tour) {
    notFound();
  }

  // Fetch itineraries ordered by day_number
  const { data: itineraries } = await supabase
    .from('itineraries')
    .select('*')
    .eq('tour_id', tour.id)
    .order('day_number', { ascending: true });

  // Safely parse JSON columns with fallback
  const highlights = Array.isArray(tour.highlights) ? tour.highlights : [];
  const inclusions = Array.isArray(tour.inclusions) ? tour.inclusions : [];
  const exclusions = Array.isArray(tour.exclusions) ? tour.exclusions : [];
  const images = Array.isArray(tour.images) ? tour.images : [];

  const countryName = country.charAt(0).toUpperCase() + country.slice(1);

  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="relative h-[520px] overflow-hidden">
        {/* Hero Image */}
        {tour.image_url ? (
          <img
            src={tour.image_url}
            alt={tour.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : tour.images && tour.images.length > 0 && tour.images[0] ? (
          <img
            src={tour.images[0]}
            alt={tour.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] to-slate-800" />
        )}

        {/* BG Gradient - top and bottom dark for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60" />

        {/* Decorative blobs */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-orange-500/15 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-orange-600/10 blur-3xl" />

        {/* Content */}
        <div className="relative z-20 flex flex-col justify-between h-full max-w-7xl mx-auto px-6 py-8">
          {/* TOP ROW */}
          <div className="flex items-center justify-between">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-white text-sm">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/30">/</span>
              <Link href={`/${country}`} className="hover:text-white transition-colors">{countryName}</Link>
              <span className="text-white/30">/</span>
              <Link href={`/${country}/tours`} className="hover:text-white transition-colors">Tours</Link>
              <span className="text-white/30">/</span>
              <span className="text-orange-400 font-medium">{tour.title}</span>
            </nav>
            
            {/* Back button */}
            <Link
              href={`/${country}/tours`}
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur border border-white/40 text-white text-sm px-4 py-2 rounded-full transition"
            >
              ← Back to Tours
            </Link>
          </div>

          {/* BOTTOM SECTION */}
          <div className="pb-4">
            {/* Featured badge */}
            {tour.featured && (
              <div className="inline-flex items-center gap-2 bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-full mb-5 shadow-lg shadow-orange-500/30">
                ⭐ Featured Experience
              </div>
            )}

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight max-w-4xl">
              {tour.title}
            </h1>

            {/* Stats bar */}
            <div className="flex flex-wrap gap-3 mt-2">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-medium px-5 py-2.5 rounded-full">
                🕐 {tour.duration_days} Day / {tour.duration_nights} Nights
              </div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-medium px-5 py-2.5 rounded-full">
                👥 Max {tour.group_size_max} people
              </div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-medium px-5 py-2.5 rounded-full">
                💰 From {tour.price_from} {tour.currency}
              </div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-medium px-5 py-2.5 rounded-full">
                ✅ Free Cancellation
              </div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-medium px-5 py-2.5 rounded-full">
                ⚡ Instant Confirmation
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — MAIN BODY */}
      <section className="bg-[#F8F7F4] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-2 space-y-8">
              {/* ABOUT CARD */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <div className="text-orange-500 text-xs font-black uppercase tracking-widest mb-2">Overview</div>
                <h2 className="text-2xl font-black text-gray-900 mb-5">About This Tour</h2>
                <p className="text-gray-600 leading-8 text-[15px] whitespace-pre-line">
                  {tour.description}
                </p>
              </div>

              {/* HIGHLIGHTS CARD */}
              {highlights.length > 0 && (
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                  <div className="text-orange-500 text-xs font-black uppercase tracking-widest mb-2">What To Expect</div>
                  <h2 className="text-2xl font-black text-gray-900 mb-6">Tour Highlights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {highlights.map((highlight: string, index: number) => (
                      <div key={index} className="flex items-start gap-4 bg-orange-50/60 border border-orange-100 rounded-2xl p-4 hover:bg-orange-50 transition">
                        <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <span className="text-gray-800 font-medium text-sm leading-relaxed">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ITINERARY SECTION */}
              {itineraries && itineraries.length > 0 && (
                <div>
                  <div className="text-orange-500 text-xs font-black uppercase tracking-widest mb-2">Journey Plan</div>
                  <h2 className="text-2xl font-black text-gray-900 mb-8">Day-by-Day Itinerary</h2>
                  {itineraries.map((day) => {
                    const dayHighlights = Array.isArray(day.highlights) ? day.highlights : [];
                    const mealsIncluded = Array.isArray(day.meals_included) ? day.meals_included : [];

                    return (
                      <div key={day.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                        {/* DAY HEADER */}
                        <div className="relative bg-gradient-to-r from-[#0F172A] to-slate-800 px-8 py-6">
                          <div>
                            <div className="text-orange-400 text-xs font-black uppercase tracking-widest mb-1">
                              Day {day.day_number}
                            </div>
                            <div className="text-white font-black text-xl">{day.title}</div>
                          </div>
                          <div className="absolute right-8 top-1/2 -translate-y-1/2 text-8xl font-black text-white/5 select-none">
                            {day.day_number}
                          </div>
                        </div>

                        {/* DAY BODY */}
                        <div className="p-8">
                          <p className="text-gray-600 leading-8 text-[15px] mb-8">
                            {day.content}
                          </p>

                          {/* Day highlights */}
                          {dayHighlights.length > 0 && (
                            <>
                              <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Highlights</div>
                              {dayHighlights.map((highlight: string, index: number) => (
                                <div key={index} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                                  <div className="w-2 h-2 rounded-full bg-orange-400 flex-shrink-0" />
                                  <span className="text-gray-700 text-sm">{highlight}</span>
                                </div>
                              ))}
                            </>
                          )}

                          {/* Meals row */}
                          {mealsIncluded.length > 0 && (
                            <>
                              <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3 mt-6">Meals</div>
                              <div className="inline-flex gap-2">
                                {mealsIncluded.map((meal: string, index: number) => {
                                  const mealIcon = meal.toLowerCase().includes('breakfast') ? '🍳' : 
                                                   meal.toLowerCase().includes('lunch') ? '🥗' : 
                                                   meal.toLowerCase().includes('dinner') ? '🍽️' : '';
                                  return (
                                    <span
                                      key={index}
                                      className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold px-4 py-2 rounded-full mr-2"
                                    >
                                      {mealIcon} {meal}
                                    </span>
                                  );
                                })}
                              </div>
                            </>
                          )}

                          {/* Accommodation */}
                          {day.accommodation && (
                            <div className="mt-6 flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-700 text-sm font-medium">
                              🏨 {day.accommodation}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* INCLUSIONS / EXCLUSIONS CARD */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <div className="text-orange-500 text-xs font-black uppercase tracking-widest mb-2">Details</div>
                <h2 className="text-2xl font-black text-gray-900 mb-8">What's Included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Inclusions */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="bg-green-500 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                      <span className="text-gray-900 font-black">Included</span>
                    </div>
                    <ul className="space-y-0">
                      {inclusions.map((item: string, index: number) => (
                        <li key={index} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                          <div className="w-5 h-5 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-green-600 text-xs">✓</div>
                          <span className="text-gray-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Exclusions */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="bg-red-400 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs">✕</div>
                      <span className="text-gray-900 font-black">Not Included</span>
                    </div>
                    <ul className="space-y-0">
                      {exclusions.map((item: string, index: number) => (
                        <li key={index} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                          <div className="w-5 h-5 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-400 text-xs">✕</div>
                          <span className="text-gray-500 text-sm line-through">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN — STICKY BOOKING CARD */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 self-start">
                <div className="rounded-3xl shadow-2xl shadow-gray-200/80 overflow-hidden border border-gray-100">
                  {/* CARD TOP SECTION */}
                  <div className="bg-[#0F172A] px-6 pt-6 pb-8 relative overflow-hidden">
                    {/* Decorative */}
                    <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-orange-500/10" />
                    
                    <div className="text-orange-400 text-xs font-black uppercase tracking-widest mb-3">Reserve Your Spot</div>
                    
                    {/* Price row */}
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-white/50 text-sm">From</span>
                      <span className="text-5xl font-black text-white">{tour.price_from}</span>
                      <span className="text-orange-400 font-bold text-lg">{tour.currency}</span>
                    </div>
                    <div className="text-white/40 text-xs mb-5">per person</div>
                    
                    {/* Divider */}
                    <div className="border-t border-white/10 mb-5" />

                    {/* STATS LIST */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-white/10 rounded-lg w-8 h-8 flex items-center justify-center text-sm">🕐</div>
                          <span className="text-white/60 text-sm">Duration</span>
                        </div>
                        <span className="text-white font-bold text-sm">{tour.duration_days} Day / {tour.duration_nights} Nights</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-white/10 rounded-lg w-8 h-8 flex items-center justify-center text-sm">👥</div>
                          <span className="text-white/60 text-sm">Group Size</span>
                        </div>
                        <span className="text-white font-bold text-sm">Max {tour.group_size_max} people</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-white/10 rounded-lg w-8 h-8 flex items-center justify-center text-sm">⚡</div>
                          <span className="text-white/60 text-sm">Confirmation</span>
                        </div>
                        <span className="text-white font-bold text-sm">Instant</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-white/10 rounded-lg w-8 h-8 flex items-center justify-center text-sm">🔄</div>
                          <span className="text-white/60 text-sm">Cancellation</span>
                        </div>
                        <span className="text-white font-bold text-sm">Free</span>
                      </div>
                    </div>
                  </div>

                  {/* CARD BOTTOM */}
                  <div className="bg-white px-6 pb-6 pt-6">
                    {/* Book Now Button */}
                    <BookNowClient
                      tourSlug={tour.slug}
                      country={tour.country}
                      price={tour.price_from}
                      currency={tour.currency}
                      salesperson_id={tour.salesperson_id}
                      language={country.toUpperCase() as ThaiLanguage}
                    />

                    {/* Trust strip */}
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <div className="flex flex-col items-center gap-1 bg-gray-50 rounded-xl py-2.5 px-1">
                        <span className="text-lg">🔒</span>
                        <span className="text-gray-500 text-[10px] font-medium text-center">Secure</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 bg-gray-50 rounded-xl py-2.5 px-1">
                        <span className="text-lg">⭐</span>
                        <span className="text-gray-500 text-[10px] font-medium text-center">Best Price</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 bg-gray-50 rounded-xl py-2.5 px-1">
                        <span className="text-lg">💬</span>
                        <span className="text-gray-500 text-[10px] font-medium text-center">24/7 Chat</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — FOOTER CTA */}
      <section className="bg-[#0F172A] relative overflow-hidden py-16">
        {/* Decorative blobs */}
        <div className="absolute top-10 right-20 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-gray-400 mb-8">
              Let us help you create your perfect journey
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur border border-white/20 text-white text-sm px-4 py-2 rounded-full">
                ✈️ Custom Itineraries
              </div>
              <div className="bg-white/10 backdrop-blur border border-white/20 text-white text-sm px-4 py-2 rounded-full">
                🏨 Best Hotels
              </div>
              <div className="bg-white/10 backdrop-blur border border-white/20 text-white text-sm px-4 py-2 rounded-full">
                🚗 Private Transport
              </div>
              <div className="bg-white/10 backdrop-blur border border-white/20 text-white text-sm px-4 py-2 rounded-full">
                👨‍👩‍👧‍👦 Family Friendly
              </div>
            </div>

            <Link
              href={`/${country}`}
              className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-orange-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-orange-500/40"
            >
              Start Planning Your Trip →
            </Link>
          </div>
        </div>
      </section>

      {/* MOBILE BOOK BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur border-t border-gray-200 shadow-2xl px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-gray-400 text-xs uppercase tracking-wide">From</div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-gray-900">{tour.price_from}</span>
              <span className="text-orange-500 text-sm font-bold ml-1">{tour.currency}</span>
            </div>
          </div>
          <BookNowClient
            tourSlug={tour.slug}
            country={tour.country}
            price={tour.price_from}
            currency={tour.currency}
            salesperson_id={tour.salesperson_id}
            language={country.toUpperCase() as ThaiLanguage}
          />
        </div>
      </div>
    </>
  );
}
