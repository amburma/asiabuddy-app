import Link from 'next/link'
import { cookies } from 'next/headers'
import Navbar from '../../../components/shared/Navbar'
import { generateAiraloLink } from '../../../lib/airalo'
import { UI_TRANSLATIONS, normalizeLocale } from '../../../lib/i18n'
import { MapPin, Plane, Bus, Wifi } from 'lucide-react'
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
    title: `${country} eSIM — Stay Connected | AsiaBuddy`,
    description: `Get an instant eSIM for ${country} with Airalo. Skip physical SIM cards and stay connected the moment you land.`,
    openGraph: {
      title: `${country} eSIM — Stay Connected | AsiaBuddy`,
      description: `Get an instant eSIM for ${country}.`,
      url: `https://asiabuddy.app/${countrySlug}/esim`,
    },
  }
}

export default async function EsimPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  const countryName = country.charAt(0).toUpperCase() + country.slice(1)

  const cookieStore = await cookies()
  const targetLanguage = normalizeLocale(cookieStore.get('NEXT_LOCALE')?.value)

  const t = UI_TRANSLATIONS[targetLanguage].esim
  const servicesStrip = UI_TRANSLATIONS[targetLanguage].servicesStrip

  // Same site-wide "coming soon" gate used by transport-tickets — AsiaBuddy currently
  // only has Thailand as a live country, independent of this feature.
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
            eSIM is not yet available for {countryName}.
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

  const airaloLink = generateAiraloLink({
    countryId: country,
    subId: `esim-page-${country}`,
  })

  return (
    <div className="min-h-screen bg-white">
      <Navbar country={country} language={targetLanguage} />
      <div className="border-b border-gold-soft/20 bg-sacred-bg/70">
        <div className="max-w-7xl mx-auto px-6 py-8 md:py-10">
          <div className="mt-6">
            <div className="inline-flex flex-col items-start gap-2 mb-4">
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-gold-deep">
                eSIM
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

          {/* eSIM CTA Card — link-out only, no in-app checkout (matches roadmap decision) */}
          <div className="mb-16 bg-white border border-gray-200 hover:border-[#D4AF37] rounded-lg p-8 transition-all duration-300 max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Wifi className="w-8 h-8 text-[#D4AF37]" />
              <h3 className="font-semibold text-gray-800 text-xl">
                {t.ctaTitle}
              </h3>
            </div>
            <p className="text-gray-600 text-sm mb-6">
              {t.ctaDescription}
            </p>
            <a
              href={airaloLink}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#c19b2e] text-white font-semibold px-8 py-3 rounded-2xl transition"
            >
              {t.ctaButton.replace('{country}', countryName)}
            </a>
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
                href={`/${country}/flights`}
                className="bg-white border border-gray-200 hover:border-[#D4AF37] rounded-lg p-6 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Plane className="w-6 h-6 text-[#D4AF37]" />
                  <h3 className="font-semibold text-gray-800 group-hover:text-[#D4AF37] transition-colors">
                    {servicesStrip.flight}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">Book your travel to {countryName}</p>
              </Link>
              <Link
                href={`/${country}/transport-tickets`}
                className="bg-white border border-gray-200 hover:border-[#D4AF37] rounded-lg p-6 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Bus className="w-6 h-6 text-[#D4AF37]" />
                  <h3 className="font-semibold text-gray-800 group-hover:text-[#D4AF37] transition-colors">
                    Transport Tickets
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">Book buses, trains &amp; ferries</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
