import Link from 'next/link'
import { cookies } from 'next/headers'
import Navbar from '../../../components/shared/Navbar'
import TwelveGoWidget from '../../../components/thailand/TwelveGoWidget'
import { getTransportTicketRoutesByCountry } from '../../../lib/queries/transportTicketRoutes'
import { generate12GoLink } from '../../../lib/twelveGo'
import { UI_TRANSLATIONS, normalizeLocale } from '../../../lib/i18n'
import { SupportedLanguage } from '../../../types/country'
import { MapPin, Calendar, Plane, Bus } from 'lucide-react'
import { countries } from '../../../data/countries'

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
    title: `${country} Bus, Train & Ferry Tickets — AsiaBuddy`,
    description: `Book bus, train, and ferry tickets in ${country} with 12Go Asia. Travel comfortably between major cities.`,
    openGraph: {
      title: `${country} Bus, Train & Ferry Tickets — AsiaBuddy`,
      description: `Find the best transport tickets in ${country}.`,
      url: `https://asiabuddy.app/${countrySlug}/transport-tickets`,
    },
  }
}

export default async function TransportTicketsPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  const countryName = country.charAt(0).toUpperCase() + country.slice(1)

  const cookieStore = await cookies()
  const targetLanguage = normalizeLocale(cookieStore.get('NEXT_LOCALE')?.value)

  const t = UI_TRANSLATIONS[targetLanguage].transportTickets
  const servicesStrip = UI_TRANSLATIONS[targetLanguage].servicesStrip
  const destinationTabs = UI_TRANSLATIONS[targetLanguage].destinationTabs

  // Thailand-only gate
  const countryData = countries.find(c => c.id === country)
  if (countryData?.status !== 'live') {
    return (
      <div className="min-h-screen bg-white">
        <Navbar country={country} language={targetLanguage} />
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-sacred-green mb-4">
            Coming Soon
          </h1>
          <p className="text-gray-600 mb-8">
            Transport tickets are not yet available for {countryName}.
          </p>
          <Link
            href={`/${country}`}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-2xl transition"
          >
            ← Back to {countryName}
          </Link>
        </div>
      </div>
    )
  }

  const routes = await getTransportTicketRoutesByCountry(country)

  return (
    <div className="min-h-screen bg-white">
      <Navbar country={country} language={targetLanguage} />
      <div className="border-b border-gold-soft/20 bg-sacred-bg/70">
        <div className="max-w-7xl mx-auto px-6 py-8 md:py-10">
          <div className="mt-6">
            <div className="inline-flex flex-col items-start gap-2 mb-4">
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-gold-deep">
                Transport Tickets
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
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Intro Section */}
          <div className="mb-12 max-w-3xl">
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              {t.intro}
            </p>
          </div>

          {/* 12Go City Widget Embed - TODO */}
          <div className="mb-12 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-100 text-center">
              <h3 className="font-serif text-xl font-bold text-gray-900">Search Any Route in Thailand</h3>
              <p className="text-sm text-gray-600 mt-2">Compare buses, trains, and ferries between any two cities — powered by 12Go Asia</p>
            </div>
            <div className="p-6 flex justify-center overflow-x-auto">
              <TwelveGoWidget city="Bangkok" lang="en" />
            </div>
          </div>

          {/* Popular Routes Section */}
          {routes.length > 0 && (
            <div className="mb-16">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-sacred-green mb-8">
                Popular Routes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {routes.map((route) => {
                  const link = generate12GoLink({
                    origin: route.origin_slug,
                    destination: route.destination_slug,
                    lang: targetLanguage.toLowerCase(),
                  })
                  return (
                    <a
                      key={route.id}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white border border-gray-200 hover:border-[#D4AF37] rounded-lg p-6 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <Bus className="w-6 h-6 text-[#D4AF37]" />
                        <h3 className="font-semibold text-gray-800 group-hover:text-[#D4AF37] transition-colors">
                          {route.origin_display} → {route.destination_display}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">
                        Book bus, train & ferry tickets
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[#D4AF37] font-bold text-sm">
                          View Options
                        </span>
                        <span className="text-gray-400 group-hover:text-gray-600 transition-colors">
                          →
                        </span>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          )}

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
                href={`/${country}/flights`}
                className="bg-white border border-gray-200 hover:border-[#D4AF37] rounded-lg p-6 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Plane className="w-6 h-6 text-[#D4AF37]" />
                  <h3 className="font-semibold text-gray-800 group-hover:text-[#D4AF37] transition-colors">
                    {servicesStrip.flight}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">Book your travel to Thailand</p>
              </Link>
              <Link 
                href={`/${country}/activities`}
                className="bg-white border border-gray-200 hover:border-[#D4AF37] rounded-lg p-6 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-6 h-6 text-[#D4AF37]" />
                  <h3 className="font-semibold text-gray-800 group-hover:text-[#D4AF37] transition-colors">
                    {destinationTabs.activities}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">Discover tours and experiences</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
