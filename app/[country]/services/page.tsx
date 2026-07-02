import Link from 'next/link'
import { cookies } from 'next/headers'
import { UI_TRANSLATIONS } from '@/lib/i18n'
import { SupportedLanguage } from '@/types/country'
import Navbar from '@/components/shared/Navbar'

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  const lowerCountry = country.toLowerCase()
  const countryName = country.charAt(0).toUpperCase() + country.slice(1)

  const cookieStore = await cookies()
  const targetLanguage = (cookieStore.get('NEXT_LOCALE')?.value ?? 'EN').toUpperCase()
  const uiTranslations = UI_TRANSLATIONS[targetLanguage as SupportedLanguage]

  return (
    <div className="min-h-screen bg-white">
      <Navbar country={country} language={targetLanguage} />
      <div className="border-b border-gold-soft/20 bg-sacred-bg/70">
        <div className="max-w-7xl mx-auto px-6 py-8 md:py-10">
          <div className="mt-6">
            <div className="inline-flex flex-col items-start gap-2 mb-4">
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-gold-deep">
                Available Services
              </span>
              <span className="h-[1px] w-16 bg-gold-deep/70" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-sacred-green leading-tight">
              Services in {countryName}
            </h1>
          </div>
        </div>
      </div>

      <div className="min-h-[calc(100vh-20rem)] bg-sacred-bg/30 flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="text-6xl mb-6">🏗️</div>

        <p className="font-['Inter'] text-sacred-green/70 font-light italic text-sm md:text-base max-w-md mb-2 leading-relaxed">
          {uiTranslations.servicesPage.comingSoonMessage}
        </p>
        <p className="font-['Inter'] text-gold-deep font-semibold text-sm mb-10">
          {uiTranslations.servicesPage.servicesList}
        </p>

        <Link
          href={`/${lowerCountry}`}
          className="bg-gradient-to-r from-sacred-green to-emerald-950 text-white px-10 py-4 rounded-full shadow-xl flex items-center gap-3 font-['Inter'] font-bold transition-all hover:shadow-2xl border border-gold-deep/20"
        >
          <span className="bg-gold-deep p-1.5 rounded-full text-white text-xs">🏠</span>
          <span>{uiTranslations.servicesPage.backToHome}</span>
        </Link>

        <p className="mt-8 font-['Inter'] text-[11px] text-sacred-green/50 italic">
          {uiTranslations.servicesPage.chatNote}
        </p>
      </div>
    </div>
  )
}
