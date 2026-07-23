import Link from 'next/link'
import { cookies } from 'next/headers'
import { translateText } from '../../../lib/translate'
import FlightServiceCard from '../../../components/shared/services/FlightServiceCard'
import { getFlightLinksByCity } from '../../../lib/queries/flightLinks'
import Navbar from '../../../components/shared/Navbar'
import AviasalesSearchWidgetWrapper from '../../../components/shared/AviasalesSearchWidgetWrapper'
import WhiteLabelFlightWidget from '../../../components/shared/WhiteLabelFlightWidget'
import VisaModalTrigger from '../../../components/shared/VisaModalTrigger'
import FlightTrustBadges from '../../../components/shared/FlightTrustBadges'
import { UI_TRANSLATIONS, normalizeLocale } from '../../../lib/i18n'
import { SupportedLanguage } from '../../../types/country'
import { Plane, Calendar, MapPin, Clock } from 'lucide-react'
import dynamicImport from 'next/dynamic'

const ChatWidgetGrid = dynamicImport(() => import('../../../components/shared/ChatWidgetGrid'))

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country: countrySlug } = await params
  const country = countrySlug.charAt(0).toUpperCase() + countrySlug.slice(1)

  return {
    title: `${country} Flights — AsiaBuddy`,
    description: `Compare flight options to ${country} and book with ease.`,
    openGraph: {
      title: `${country} Flights — AsiaBuddy`,
      description: `Find the best flight deals to ${country}.`,
      url: `https://asiabuddy.app/${countrySlug}/flights`,
    },
  }
}

export default async function FlightsPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  const countryName = country.charAt(0).toUpperCase() + country.slice(1)

  const cookieStore = await cookies()
  const targetLanguage = normalizeLocale(cookieStore.get('NEXT_LOCALE')?.value)

  const defaultCity = 'bangkok'
  const flightLinks = await getFlightLinksByCity(defaultCity)

  const t = UI_TRANSLATIONS[targetLanguage].flights
  const servicesStrip = UI_TRANSLATIONS[targetLanguage].servicesStrip
  const destinationTabs = UI_TRANSLATIONS[targetLanguage].destinationTabs

  return (
    <div className="min-h-screen bg-white">
      <Navbar country={country} language={targetLanguage} />
      <div className="border-b border-gold-soft/20 bg-sacred-bg/70">
        <div className="max-w-7xl mx-auto px-6 py-8 md:py-10">
          <div className="mt-6">
            <div className="inline-flex flex-col items-start gap-2 mb-4">
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-gold-deep">
                Flights
              </span>
              <span className="h-[1px] w-16 bg-gold-deep/70" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-sacred-green leading-tight">
              {t.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-16">

          {/* Intro Section */}
          <div className="mb-12 max-w-3xl">
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              {t.intro}
            </p>
            <VisaModalTrigger country={country} language={targetLanguage}>
              {t.visaLinkText} →
            </VisaModalTrigger>
          </div>

          {/* Widget Labels and Widgets */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#D4AF37]" />
              {t.searchSpecificDates}
            </h3>
            {/* TEMP: White Label widget causes layout breakage, reverted pending Travelpayouts dashboard investigation */}
            {/* <WhiteLabelFlightWidget /> */}
            <AviasalesSearchWidgetWrapper />
          </div>

          {/* Trust Badges */}
          <FlightTrustBadges language={targetLanguage} />

          {flightLinks.length === 0 ? (
            <div className="min-h-[400px] flex flex-col items-center justify-center text-center py-24">
              <div className="text-8xl mb-6">✈️</div>
              <h3 className="text-3xl font-black text-gray-800 mb-3">No Flights Available Yet</h3>
              <p className="text-gray-400 text-lg max-w-md">We are curating flight options for you. Check back soon!</p>
              <Link href={`/${country}`} className="mt-8 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-2xl transition">
                ← Back to {countryName}
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Plane className="w-5 h-5 text-[#D4AF37]" />
                  {t.flexibleDates}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {flightLinks.map((flight) => {
                  return (
                    <div key={flight.id} className="w-full">
                      <FlightServiceCard
                        flight={{
                          airline: flight.airline || 'Multiple Airlines',
                          departure_city: flight.departure_city || 'Your City',
                          arrival_city: flight.arrival_city || 'Bangkok',
                          departure_time: flight.departure_time || 'Flexible',
                          arrival_time: flight.arrival_time || 'Flexible',
                          duration: flight.duration || 'Flexible',
                          stops: flight.stops ?? 0,
                          price: flight.price === 'See live prices' || !flight.price ? null : (parseFloat(flight.price.replace(/[^0-9.]/g, '')) || null),
                          price_checked_at: flight.created_at,
                          affiliate_url: flight.flight_url || '#',
                        }}
                        language={targetLanguage}
                        is_placeholder={false}
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-16 max-w-3xl">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-sacred-green mb-8">
                {t.faq.title}
              </h2>
              <div className="space-y-6">
                {[
                  { q: t.faq.q1.question, a: t.faq.q1.answer },
                  { q: t.faq.q2.question, a: t.faq.q2.answer },
                  { q: t.faq.q3.question, a: t.faq.q3.answer },
                  { q: t.faq.q4.question, a: t.faq.q4.answer },
                  { q: t.faq.q5.question, a: t.faq.q5.answer },
                ].map((item, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-800 mb-2 flex items-start gap-2">
                      <span className="text-[#D4AF37] mt-1">Q{index + 1}.</span>
                      {item.q}
                    </h3>
                    <p className="text-gray-600 ml-6">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cross-sell Section */}
            <div className="border-t border-gray-200 pt-16">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-sacred-green mb-8">
                {t.continuePlanning}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                  href={`/${country}/hotels`}
                  className="bg-white border border-gray-200 hover:border-[#D4AF37] rounded-lg p-6 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-6 h-6 text-[#D4AF37]" />
                    <h3 className="font-semibold text-gray-800 group-hover:text-[#D4AF37] transition-colors">
                      {servicesStrip.hotel}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">Find accommodations for your stay</p>
                </Link>
                <Link
                  href={`/${country}/tours`}
                  className="bg-white border border-gray-200 hover:border-[#D4AF37] rounded-lg p-6 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-6 h-6 text-[#D4AF37]" />
                    <h3 className="font-semibold text-gray-800 group-hover:text-[#D4AF37] transition-colors">
                      {UI_TRANSLATIONS[targetLanguage].tours}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">Explore guided experiences</p>
                </Link>
                <Link
                  href={`/${country}/activities`}
                  className="bg-white border border-gray-200 hover:border-[#D4AF37] rounded-lg p-6 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Plane className="w-6 h-6 text-[#D4AF37]" />
                    <h3 className="font-semibold text-gray-800 group-hover:text-[#D4AF37] transition-colors">
                      {destinationTabs.activities}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">Book local experiences</p>
                </Link>
              </div>
            </div>
            </>
          )}
        </div>
      </div>

      {/* Chat Widget Grid for modal support */}
      {country === 'thailand' && (
        <ChatWidgetGrid language={targetLanguage} hideGrid={true} />
      )}
    </div>
  )
}
