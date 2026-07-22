import { getSupabase } from '../../../lib/supabase'
import Link from 'next/link'

export const revalidate = 3600
// Revalidate every 1 hour

interface Destination {
  id: string
  country: string
  name: string
  short_description: string
  description: string
  hero_image: string
  featured_image: string
  status: string
  created_at: string
  updated_at: string
}

interface Tour {
  id: string
  slug: string
  title: string
  short_description: string
  price_from: number
  duration_days: number
  country: string
  status: string
  created_at: string
}

export async function generateMetadata(
  { params }: { params: Promise<{ country: string }> }
) {
  const { country: countrySlug } = await params
  const supabase = getSupabase()
  const { data: destination } = await supabase
    .from('destinations')
    .select('short_description')
    .eq('country', countrySlug)
    .single()

  const country = countrySlug.charAt(0).toUpperCase() 
    + countrySlug.slice(1)

  return {
    title: `${country} Travel Guide — AsiaBuddy`,
    description: destination?.short_description 
      ?? `Explore ${country} with AsiaBuddy — 
         tours, travel tips, and expert guidance.`,
    openGraph: {
      title: `${country} Travel Guide — AsiaBuddy`,
      description: destination?.short_description ?? '',
      url: `https://asiabuddy.app/${countrySlug}/destination`,
    },
  }
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  const countryName = country.charAt(0).toUpperCase() + country.slice(1)

  const supabase = getSupabase()

  // Fetch destination data
  const { data: destination, error: destError } = await supabase
    .from('destinations')
    .select('short_description')
    .eq('country', country)
    .limit(1)
    .single()

  if (destError) {
    console.error('Error fetching destination:', destError)
  }

  // Fetch featured tours
  const { data: tours, error: toursError } = await supabase
    .from('tours')
    .select('id, title, short_description, price_from, duration_days, slug')
    .eq('country', country)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(3)

  if (toursError) {
    console.error('Error fetching tours:', JSON.stringify(toursError))
  }

  const featuredTours = tours || []
  const tagline = destination?.short_description || `Your journey to ${countryName} begins here.`

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Inter:wght@400;500;600&display=swap');
        
        @keyframes underline-expand {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        
        .animated-underline {
          animation: underline-expand 1.5s ease-out forwards;
        }
      `}</style>

      <div className="min-h-screen bg-[#F5F0E4]">
        {/* SECTION 1 — HERO */}
        <div className="relative min-h-[70vh] overflow-hidden bg-gradient-to-br from-[#F5F0E4] to-[#EDE8D8]">
          {/* Top-left eyebrow */}
          <div className="absolute top-8 left-8 z-20">
            <span className="text-[#E07B20] font-['Inter'] text-xs tracking-[0.3em] uppercase font-semibold">
              ASIABUDDY DESTINATION GUIDE
            </span>
          </div>
          
          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
            {/* H1 with animated underline */}
            <div className="relative">
              <h1 className="font-['Playfair_Display'] text-7xl md:text-9xl font-bold text-[#1B3A2D]">
                {countryName}
              </h1>
              <div className="h-1 bg-[#E07B20] mt-4 animated-underline"></div>
            </div>
            
            {/* Italic tagline */}
            <p className="font-['Playfair_Display'] italic text-2xl text-[#6B7280] mt-6 max-w-3xl">
              {tagline}
            </p>
            
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link
                href={`/${country}/tours`}
                className="bg-[#E07B20] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#C45E00] hover:scale-105 transition-all duration-300"
              >
                Explore Tours
              </Link>
              <Link
                href={`/${country}/tours`}
                className="border-2 border-[#1B3A2D] text-[#1B3A2D] px-8 py-4 rounded-full font-semibold hover:bg-[#1B3A2D] hover:text-white transition-all duration-300"
              >
                Talk to Expert
              </Link>
            </div>
          </div>
          
          {/* Bottom right decorative faded country name */}
          <div className="absolute bottom-8 right-8 z-0 opacity-5 pointer-events-none select-none">
            <span className="text-[15vw] font-bold text-[#1B3A2D] font-['Playfair_Display']">
              {countryName.toUpperCase()}
            </span>
          </div>
          
          {/* Bouncing scroll arrow */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <div className="text-[#E07B20] animate-bounce text-2xl">
              ↓
            </div>
          </div>
        </div>

        {/* SECTION 2 — STATS BAR */}
        <div className="bg-[#1B3A2D] py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center border-r border-[#2D5A3D] last:border-r-0">
                <div className="font-['Playfair_Display'] text-4xl text-[#C9A84C] font-bold">
                  50+
                </div>
                <div className="font-['Inter'] text-sm text-[#A8C5B5] uppercase tracking-wide mt-1">
                  Curated Tours
                </div>
              </div>
              <div className="text-center border-r border-[#2D5A3D] last:border-r-0">
                <div className="font-['Playfair_Display'] text-4xl text-[#C9A84C] font-bold">
                  4.9★
                </div>
                <div className="font-['Inter'] text-sm text-[#A8C5B5] uppercase tracking-wide mt-1">
                  Traveler Rating
                </div>
              </div>
              <div className="text-center border-r border-[#2D5A3D] last:border-r-0">
                <div className="font-['Playfair_Display'] text-4xl text-[#C9A84C] font-bold">
                  24/7
                </div>
                <div className="font-['Inter'] text-sm text-[#A8C5B5] uppercase tracking-wide mt-1">
                  Expert Support
                </div>
              </div>
              <div className="text-center border-r border-[#2D5A3D] last:border-r-0">
                <div className="font-['Playfair_Display'] text-4xl text-[#C9A84C] font-bold">
                  10K+
                </div>
                <div className="font-['Inter'] text-sm text-[#A8C5B5] uppercase tracking-wide mt-1">
                  Happy Travelers
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3 — WHY ASIABUDDY */}
        <div className="bg-[#F5F0E4] py-20">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section eyebrow */}
            <div className="text-[#E07B20] text-xs tracking-[0.3em] uppercase font-semibold">
              WHY CHOOSE US
            </div>
            
            {/* H2 */}
            <h2 className="font-['Playfair_Display'] text-4xl text-[#1B3A2D] mt-2">
              Travel Smarter, Not Harder
            </h2>
            
            {/* 3 cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {/* Card 1 */}
              <div className="bg-white rounded-2xl p-8 border border-[#E5E0D5] hover:border-[#E07B20] hover:shadow-md transition-all duration-300">
                <div className="text-4xl mb-4">✈️</div>
                <h3 className="font-['Playfair_Display'] text-xl text-[#1B3A2D] font-bold">
                  Expert Local Guides
                </h3>
                <p className="font-['Inter'] text-sm text-[#6B7280] mt-3 leading-relaxed">
                  Our guides are born and raised here — they know the hidden gems no tourist map shows.
                </p>
              </div>
              
              {/* Card 2 */}
              <div className="bg-white rounded-2xl p-8 border border-[#E5E0D5] hover:border-[#E07B20] hover:shadow-md transition-all duration-300">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="font-['Playfair_Display'] text-xl text-[#1B3A2D] font-bold">
                  Secure & Flexible Booking
                </h3>
                <p className="font-['Inter'] text-sm text-[#6B7280] mt-3 leading-relaxed">
                  Book with confidence — full refund guarantee and free rescheduling up to 48 hours before.
                </p>
              </div>
              
              {/* Card 3 */}
              <div className="bg-white rounded-2xl p-8 border border-[#E5E0D5] hover:border-[#E07B20] hover:shadow-md transition-all duration-300">
                <div className="text-4xl mb-4">⭐</div>
                <h3 className="font-['Playfair_Display'] text-xl text-[#1B3A2D] font-bold">
                  5-Star Rated Experiences
                </h3>
                <p className="font-['Inter'] text-sm text-[#6B7280] mt-3 leading-relaxed">
                  Consistently rated #1 by independent travelers across Google, TripAdvisor, and Trustpilot.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4 — FEATURED TOURS */}
        {featuredTours.length > 0 && (
          <div className="bg-[#F5F0E4] py-20 border-t border-[#E5E0D5]">
            <div className="max-w-7xl mx-auto px-6">
              {/* Section eyebrow */}
              <div className="text-[#E07B20] text-xs tracking-[0.3em] uppercase font-semibold">
                HANDPICKED FOR YOU
              </div>
              
              {/* H2 */}
              <h2 className="font-['Playfair_Display'] text-4xl text-[#1B3A2D] mt-2">
                Featured Experiences
              </h2>
              
              {/* Subtitle */}
              <p className="font-['Inter'] text-[#6B7280] mt-2">
                Each tour personally vetted by our travel experts
              </p>
              
              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {featuredTours.map((tour) => (
                  <Link
                    key={tour.id}
                    href={`/${country}/tours/${tour.slug}`}
                    className="bg-white rounded-2xl overflow-hidden border border-[#E5E0D5] hover:translate-y-[-6px] hover:shadow-xl hover:border-[#E07B20]/40 transition-all duration-300"
                  >
                    {/* Top accent bar */}
                    <div className="h-1 bg-gradient-to-r from-[#E07B20] to-[#C9A84C]"></div>
                    
                    {/* Card image placeholder */}
                    <div className="bg-gradient-to-br from-[#FDE8D0] to-[#F5E6C8] h-48 flex items-center justify-center">
                      <span className="text-6xl">🏯</span>
                    </div>
                    
                    {/* Card body */}
                    <div className="p-6">
                      {/* Duration badge */}
                      <div className="bg-[#FDE8D0] text-[#E07B20] text-xs rounded-full px-3 py-1 inline-block">
                        {tour.duration_days} Days
                      </div>
                      
                      {/* Title */}
                      <h3 className="font-['Playfair_Display'] text-xl text-[#1B3A2D] mt-3 font-bold">
                        {tour.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="font-['Inter'] text-sm text-[#6B7280] mt-2 line-clamp-2">
                        {tour.short_description}
                      </p>
                      
                      {/* Divider */}
                      <div className="border-t border-[#E5E0D5] mt-4 pt-4"></div>
                      
                      {/* Bottom row */}
                      <div className="flex justify-between items-center">
                        {/* Price */}
                        <div>
                          <div className="font-['Inter'] text-xs text-[#6B7280]">From</div>
                          <div className="font-['Playfair_Display'] text-2xl text-[#E07B20] font-bold">
                            {tour.price_from.toLocaleString()}
                          </div>
                          <div className="font-['Inter'] text-xs text-[#6B7280]">
                            USD
                          </div>
                        </div>
                        
                        {/* View Tour link */}
                        <span className="text-[#E07B20] text-sm font-semibold hover:text-[#C45E00] transition-colors">
                          View Tour →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5 — BOTTOM CTA */}
        <div className="bg-[#1B3A2D] py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            {/* Eyebrow */}
            <div className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-semibold">
              START YOUR JOURNEY
            </div>
            
            {/* H2 */}
            <h2 className="font-['Playfair_Display'] text-5xl text-white mt-3">
              Your Perfect Trip Awaits
            </h2>
            
            {/* Sub */}
            <p className="font-['Inter'] text-[#A8C5B5] text-lg mt-4 max-w-xl mx-auto">
              Let our local experts craft every detail — you just show up and experience.
            </p>
            
            {/* Button */}
            <Link
              href={`/${country}/tours`}
              className="inline-block mt-8 bg-[#E07B20] text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-[#C45E00] hover:scale-105 transition-all shadow-lg shadow-[#E07B20]/30"
            >
              Plan My Trip
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
