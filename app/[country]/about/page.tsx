import Link from 'next/link'
import { cookies } from 'next/headers'
import { UI_TRANSLATIONS } from '@/lib/i18n'

export default async function AboutPage() {
  const cookieStore = await cookies()
  const targetLanguage = cookieStore.get('NEXT_LOCALE')?.value?.toUpperCase() || 'EN'
  const t = (UI_TRANSLATIONS[targetLanguage as keyof typeof UI_TRANSLATIONS] || UI_TRANSLATIONS.EN).about
  return (
    <div className="min-h-screen bg-sacred-bg">
      <div className="bg-sacred-bg px-6 py-4">
        <Link href="/thailand" className="inline-flex items-center gap-2 text-sacred-green hover:text-gold-deep transition-colors text-sm font-semibold">
          <span>←</span>
          <span>Back to Home</span>
        </Link>
      </div>

      {/* HERO */}
      <section className="relative bg-sacred-green overflow-hidden py-24 px-6">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #C9A84C 0%, transparent 60%), radial-gradient(circle at 80% 20%, #C9A84C 0%, transparent 50%)' }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-16 h-[1px] bg-gold-deep/50" />
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-gold-deep">
              {t.ourStory}
            </span>
            <span className="w-16 h-[1px] bg-gold-deep/50" />
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {t.heroTitle1}<br />
            <span className="text-gold-deep">{t.heroTitle2}</span>
          </h1>
          <p className="text-white/70 font-light text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>
        </div>
      </section>

      {/* ABOUT US */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-amber-600">{t.aboutLabel}</span>
            <div className="h-[1px] flex-1 bg-gold-deep/20" />
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-sacred-green mb-6 leading-snug">
                {t.aboutHeading}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 font-sans text-sm">
                {t.aboutP1}
              </p>
              <p className="text-gray-600 leading-relaxed font-sans text-sm">
                {t.aboutP2}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: '6', label: t.stat1 },
                { number: '24/7', label: t.stat2 },
                { number: '7+', label: t.stat3 },
                { number: '100%', label: t.stat4 },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-2xl p-6 border border-gold-soft/20 shadow-sm text-center"
                >
                  <p className="font-serif text-3xl font-bold text-gold-deep mb-1">{stat.number}</p>
                  <p className="text-xs text-gray-500 font-sans uppercase tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-amber-600">{t.visionLabel}</span>
            <div className="h-[1px] flex-1 bg-gold-deep/20" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-sacred-green rounded-3xl p-8 text-white">
              <div className="text-3xl mb-4">🌏</div>
              <h3 className="font-serif text-2xl font-bold mb-4 text-gold-deep">{t.visionTitle}</h3>
              <p className="text-white/80 font-sans text-sm leading-relaxed">
                {t.visionText}
              </p>
            </div>
            <div className="bg-sacred-bg rounded-3xl p-8 border border-gold-soft/30">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="font-serif text-2xl font-bold mb-4 text-sacred-green">{t.missionTitle}</h3>
              <p className="text-gray-600 font-sans text-sm leading-relaxed">
                {t.missionText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className="w-12 h-[1px] bg-gold-deep/30" />
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-amber-600">{t.teamLabel}</span>
            <span className="w-12 h-[1px] bg-gold-deep/30" />
          </div>
          <p className="text-gray-600 font-sans text-sm leading-relaxed max-w-2xl mx-auto mb-8">
            {t.teamText} <span className="font-semibold text-sacred-green">{t.teamLocations}</span> {t.teamText2}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['🇩🇪 Germany', '🇬🇧 United Kingdom', '🇹🇭 Thailand', '🇲🇲 Myanmar'].map((loc) => (
              <span key={loc} className="bg-white border border-gold-soft/30 text-sacred-green font-semibold text-xs px-5 py-2 rounded-full shadow-sm">
                {loc}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sacred-green py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">
            {t.ctaTitle}
          </h2>
          <p className="text-white/70 text-sm mb-8 font-sans">
            {t.ctaSubtitle}
          </p>
          <Link
            href="/thailand"
            className="inline-flex items-center gap-3 bg-gold-deep text-white font-bold px-10 py-4 rounded-full shadow-xl hover:bg-gold-deep/90 transition-all"
          >
            <span>{t.ctaButton}</span>
            <span>→</span>
          </Link>
        </div>
      </section>

    </div>
  )
}
