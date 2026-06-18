import { getSupabase } from '@/lib/supabase'
import Link from 'next/link'

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

export default async function ToursPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  const countryName = country.charAt(0).toUpperCase() + country.slice(1)

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
          {/* Breadcrumb */}
          <div className="text-orange-300 text-sm mb-4 tracking-wide uppercase">
            Home / {countryName} / Tours
          </div>
          
          {/* Back Button */}
          <Link
            href={`/${country}`}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition"
          >
            ← Back to {countryName}
          </Link>
          
          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-4">
            {countryName} Tours & Packages
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-white/80 font-light max-w-2xl">
            Handpicked experiences. Unforgettable memories.
          </p>
          
          {/* Stats Row */}
          <div className="flex gap-8 mt-8">
            <div className="text-white/90 text-sm font-medium">✦ 100% Verified Tours</div>
            <div className="text-white/90 text-sm font-medium">✦ Best Price Guarantee</div>
            <div className="text-white/90 text-sm font-medium">✦ 24/7 Support</div>
          </div>
        </div>
      </div>

      {/* TOURS GRID SECTION */}
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Section Label */}
          <div className="text-orange-500 text-sm font-bold uppercase tracking-widest mb-2">
            Available Experiences
          </div>
          
          {/* Section Title */}
          <h2 className="text-3xl font-black text-gray-900 mb-2">
            Explore {countryName}
          </h2>
          
          {/* Section Subtitle */}
          <p className="text-gray-500 mb-10">
            {activeTours.length} tour{activeTours.length !== 1 ? 's' : ''} available
          </p>
          
          {/* Grid */}
          {activeTours.length === 0 ? (
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
                ← Back to {countryName}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeTours.map((tour) => (
                <Link
                  key={tour.id}
                  href={`/${country}/tours/${tour.slug}`}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                >
                  {/* IMAGE AREA */}
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-orange-200 via-amber-100 to-yellow-50">
                    {/* Decorative Pattern */}
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1.5' fill='%23f97316'/%3E%3C/svg%3E")`,
                        backgroundSize: '20px 20px'
                      }}
                    ></div>
                    
                    {/* Center Content */}
                    <div className="flex items-center justify-center h-full flex-col gap-2">
                      <div className="text-7xl">🏝️</div>
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
                        🕐 {tour.duration_days} Day{tour.duration_days !== 1 ? 's' : ''} / {tour.duration_nights} Night{tour.duration_nights !== 1 ? 's' : ''}
                      </div>
                      <div className="inline-flex items-center gap-1.5 bg-gray-50 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-100">
                        👥 Max {tour.group_size_max} people
                      </div>
                    </div>
                    
                    {/* CTA Button */}
                    <div className="mt-5 w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-200 shadow-md hover:shadow-orange-200 hover:shadow-lg text-center block">
                      Explore This Tour →
                    </div>
                  </div>
                </Link>
              ))}
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
