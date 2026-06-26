import { getSupabase } from '@/lib/supabase'
import Link from 'next/link'
import ChatWidgetGrid from '@/components/shared/ChatWidgetGrid'
import DestinationTabs from '@/components/thailand/DestinationTabs'
import InformationSection from '@/components/shared/InformationSection'
import { TripChecklistModal } from '@/components/shared/TripChecklistModal'
import { translateText } from '@/lib/translate'
import { cookies } from 'next/headers'
import Navbar from '@/components/shared/Navbar'
import { SupportedLanguage } from '@/types/country'

export default async function CountryPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  const lowerCountry = country.toLowerCase()
  const countryName = country.charAt(0).toUpperCase() + country.slice(1)

  // Detect user's preferred language from cookie
  const cookieStore = await cookies()
  const targetLanguage = cookieStore.get('NEXT_LOCALE')?.value || 'en'
  console.log('[DEBUG] targetLanguage:', targetLanguage)

  const supabase = getSupabase()
  
  // 1. Fetch Destinations (Using safe lowercase match)
  const { data: destinations, error: destinationsError } = await supabase
    .from('destinations')
    .select('*')
    .eq('country', lowerCountry)
    .order('display_order', { ascending: true })

  if (destinationsError) {
    console.error('Error fetching destinations:', destinationsError)
  }

  // Filter out destinations with no content (all null arrays)
  const destinationsWithContent = destinations?.filter(
    (dest) =>
      dest.must_visit ||
      dest.activities ||
      dest.dining ||
      dest.hidden_gems ||
      dest.experiences
  ) || []

  // Translate destinations if needed
  let translatedDestinations = destinationsWithContent
  if (destinationsWithContent && targetLanguage !== 'en') {
    translatedDestinations = await Promise.all(
      destinationsWithContent.map(async (dest) => {
        const translatedName = await translateText(dest.name || '', targetLanguage)
        const translatedDescription = await translateText(dest.description || '', targetLanguage)
        console.log('[DEBUG] translation result (name):', translatedName)
        console.log('[DEBUG] translation result (description):', translatedDescription)
        return {
          ...dest,
          name: translatedName,
          description: translatedDescription,
        }
      })
    )
  }

  // 2. Fetch Featured Tours (Corrected column names to price_from and duration_days)
  const { data: tours, error: toursError } = await supabase
    .from('tours')
    .select('id, title, price_from, duration_days, image_url, slug')
    .eq('country', lowerCountry)
    .eq('featured', true)
    .limit(6)

  if (toursError) {
    console.error('Error fetching tours:', toursError)
  }

  // Translate tours if needed
  let translatedTours = tours
  if (tours && targetLanguage !== 'en') {
    translatedTours = await Promise.all(
      tours.map(async (tour) => {
        const translatedTitle = await translateText(tour.title || '', targetLanguage)
        console.log('[DEBUG] translation result (title):', translatedTitle)
        return {
          ...tour,
          title: translatedTitle,
        }
      })
    )
  }

  return (
    <>
      <Navbar country={lowerCountry} language={targetLanguage.toUpperCase()} />

      {/* SECTION 1 — HERO */}
      <section id="home" className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-sacred-green/5">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            alt="Background"
            className="w-full h-full object-cover opacity-20 grayscale-[20%]"
            referrerPolicy="no-referrer"
            src="https://images.unsplash.com/photo-1528181304800-259b08848526?w=1920&q=80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sacred-bg via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-4xl px-6 text-center">
          {/* Decorative Header */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-12 h-[1px] bg-gold-deep/30" />
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-sacred-green">
              Sacred Aesthetic
            </span>
            <span className="w-12 h-[1px] bg-gold-deep/30" />
          </div>
          {/* Giant Title */}
          <h2 className="text-6xl md:text-8xl mb-6 tracking-tight leading-none text-sacred-green font-bold">
            Explore the Magic Now
          </h2>
          {/* Subheadline */}
          <p className="max-w-xl mx-auto text-gray-800 font-light italic text-sm md:text-base leading-relaxed tracking-wide">
            Explore Asia beside AsiaBuddy.
          </p>
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Link
              href={`/${lowerCountry}/tours`}
              className="bg-gradient-to-r from-sacred-green to-emerald-950 text-white px-10 py-5 rounded-full shadow-2xl flex items-center gap-4 group border border-gold-deep/20 backdrop-blur-md font-bold transition-all hover:shadow-3xl"
            >
              <span className="bg-gold-deep p-2 rounded-full text-white text-sm">
                ✈
              </span>
              <span>Explore Tours</span>
            </Link>
            <TripChecklistModal language={targetLanguage.toUpperCase() as SupportedLanguage} />
          </div>
        </div>
      </section>

      {/* SECTION 2 — DESTINATIONS */}
      {translatedDestinations && translatedDestinations.length > 0 && (
        <section id="destinations" className="bg-sacred-bg py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-sm font-bold text-sacred-green uppercase tracking-[0.2em] mb-4">
              Discover {countryName}
            </h2>
            <div className="w-16 h-[2px] bg-gold-deep mb-12" />
            <DestinationTabs destinations={translatedDestinations} />
          </div>
        </section>
      )}

      {/* SECTION 3 — FEATURED TOURS */}
      {translatedTours && translatedTours.length > 0 && (
        <section id="tours" className="bg-sacred-bg py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-sm font-bold text-sacred-green uppercase tracking-[0.2em] mb-4">
              Featured Journeys
            </h2>
            <div className="w-16 h-[2px] bg-gold-deep mb-12" />
            
            {/* Tour Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {translatedTours.map((tour: any) => (
                <Link
                  key={tour.id}
                  href={`/${lowerCountry}/tours/${tour.slug}`}
                  className="glass-card group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Image */}
                  <div className="h-56 w-full overflow-hidden">
                    {tour.image_url ? (
                      <img
                        src={tour.image_url}
                        alt={tour.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-sacred-bg/30" />
                    )}
                  </div>
                  {/* Card Body */}
                  <div className="p-6">
                    {/* Duration Badge */}
                    {tour.duration_days && (
                      <span className="inline-block font-['DM_Mono'] text-xs text-sacred-green bg-sacred-green/10 px-3 py-1 rounded-full mb-3 border border-gold-deep/30">
                        {tour.duration_days} Days
                      </span>
                    )}
                    {/* Title */}
                    <h3 className="font-serif text-xl text-sacred-green font-bold mb-2">
                      {tour.title}
                    </h3>
                    {/* Price */}
                    {tour.price_from && (
                      <p className="font-sans text-gold-deep font-bold text-lg">
                        ${tour.price_from}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* See All Button */}
            <div className="text-center">
              <Link
                href={`/${lowerCountry}/tours`}
                className="inline-block border border-gold-deep text-sacred-green font-bold px-10 py-3 rounded-full transition-all duration-300 hover:bg-gold-deep hover:text-white font-sans"
              >
                See All Tours
              </Link>
            </div>
          </div>
        </section>
      )}

      {translatedDestinations && translatedDestinations.length > 0 && lowerCountry === 'thailand' && (
        <InformationSection language={targetLanguage} />
      )}

      {/* SECTION 4 — CHAT WIDGETS */}
      {lowerCountry === 'thailand' && (
        <section id="chat" className="bg-sacred-bg py-24 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <ChatWidgetGrid language={targetLanguage} />
          </div>
        </section>
      )}

      {/* SECTION 5 — FOOTER */}
      <footer id="footer" className="bg-sacred-green border-t border-gold-deep/20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="font-serif text-2xl text-gold-deep font-bold mb-2">
                AsiaBuddy
              </h3>
              <p className="font-sans text-white/80 text-sm">
                Your luxury travel concierge in Southeast Asia
              </p>
            </div>
            {/* Links */}
            <div className="flex gap-8 md:justify-end">
              <Link href="/" className="font-sans text-white hover:text-gold-deep transition-colors">
                Home
              </Link>
              <Link href={`/${lowerCountry}/tours`} className="font-sans text-white hover:text-gold-deep transition-colors">
                Tours
              </Link>
              <Link href="/about" className="font-sans text-white hover:text-gold-deep transition-colors">
                About
              </Link>
            </div>
          </div>
          {/* Bottom Bar */}
          <div className="text-center pt-8 border-t border-gold-deep/10">
            <p className="font-sans text-white/60 text-sm">
              © 2025 AsiaBuddy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
