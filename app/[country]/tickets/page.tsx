import Link from 'next/link'
import { cookies } from 'next/headers'
import TicketServiceCard from '@/components/shared/services/TicketServiceCard'
import { getKlookLinksByCity } from '@/lib/queries/klookLinks'
import Navbar from '@/components/shared/Navbar'
import { UI_TRANSLATIONS, normalizeLocale } from '@/lib/i18n'
import { SupportedLanguage } from '@/types/country'
import { MapPin, Calendar, Plane } from 'lucide-react'

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
    title: `${country} Tickets & Activities — AsiaBuddy`,
    description: `Discover tickets and activities in ${country} with reliable booking options.`,
    openGraph: {
      title: `${country} Tickets & Activities — AsiaBuddy`,
      description: `Find the best tickets and activities in ${country}.`,
      url: `https://asiabuddy.app/${countrySlug}/tickets`,
    },
  }
}

export default async function TicketsPage({
  params,
  searchParams,
}: {
  params: Promise<{ country: string }>
  searchParams: Promise<{ city?: string }>
}) {
  const { country } = await params
  const countryName = country.charAt(0).toUpperCase() + country.slice(1)

  const cookieStore = await cookies()
  const targetLanguage = normalizeLocale(cookieStore.get('NEXT_LOCALE')?.value)

  const { city: cityParam } = await searchParams
  const city = cityParam || 'bangkok'
  const klookLinks = await getKlookLinksByCity(city)

  const t = UI_TRANSLATIONS[targetLanguage].tickets
  const servicesStrip = UI_TRANSLATIONS[targetLanguage].servicesStrip
  const destinationTabs = UI_TRANSLATIONS[targetLanguage].destinationTabs

  const cities = [
    { slug: 'bangkok', name: 'Bangkok' },
    { slug: 'pattaya', name: 'Pattaya' },
    { slug: 'phuket', name: 'Phuket' },
    { slug: 'krabi', name: 'Krabi' },
    { slug: 'huahin', name: 'Hua Hin' },
    { slug: 'hatyai', name: 'Hat Yai' },
    { slug: 'kanchanaburi', name: 'Kanchanaburi' },
    { slug: 'pakchong', name: 'Pak Chong' },
    { slug: 'kochang', name: 'Ko Chang' },
    { slug: 'satun', name: 'Satun' },
    { slug: 'chiangrai', name: 'Chiang Rai' },
    { slug: 'kosamui', name: 'Ko Samui' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar country={country} language={targetLanguage} />
      <div className="border-b border-gold-soft/20 bg-sacred-bg/70">
        <div className="max-w-7xl mx-auto px-6 py-8 md:py-10">
          <div className="mt-6">
            <div className="inline-flex flex-col items-start gap-2 mb-4">
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-gold-deep">
                Tickets
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
          <div className="flex flex-wrap gap-2 mb-8">
            {cities.map((cityOption) => (
              <Link
                key={cityOption.slug}
                href={`/${country}/tickets?city=${cityOption.slug}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  city === cityOption.slug
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cityOption.name}
              </Link>
            ))}
          </div>

          {/* Intro Section */}
          <div className="mb-12 max-w-3xl">
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              {t.intro}
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-8">

          {klookLinks.length === 0 ? (
            <div className="min-h-[400px] flex flex-col items-center justify-center text-center py-24">
              <div className="text-8xl mb-6">🎫</div>
              <h3 className="text-3xl font-black text-gray-800 mb-3">No Tickets Available Yet</h3>
              <p className="text-gray-400 text-lg max-w-md">We are curating amazing experiences for you. Check back soon!</p>
              <Link href={`/${country}`} className="mt-8 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-2xl transition">
                ← Back to {countryName}
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {klookLinks.map((ticket) => (
                  <div key={ticket.id} className="w-full">
                    <TicketServiceCard
                      ticket={ticket}
                      language={targetLanguage as any}
                    />
                  </div>
                ))}
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
                    <p className="text-gray-600 text-sm">Explore local experiences</p>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
