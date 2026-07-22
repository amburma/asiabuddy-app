import Link from 'next/link'
import { SupportedLanguage } from '../../types/country'
import { UI_TRANSLATIONS } from '../../lib/i18n'

interface FooterProps {
  country: string
  language?: SupportedLanguage
}

export default function Footer({ country, language = 'EN' }: FooterProps) {
  const t = UI_TRANSLATIONS[language]
  const footerT = UI_TRANSLATIONS[language].footer
  return (
    <footer id="footer" className="bg-sacred-green border-t border-gold-deep/20 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl text-gold-deep font-bold mb-2">
              AsiaBuddy
            </h3>
            <p className="font-sans text-white/80 text-sm">
              {footerT.tagline}
            </p>
          </div>
          {/* Links */}
          <div className="flex gap-8 md:justify-end">
            <Link href="/" className="font-sans text-white hover:text-gold-deep transition-colors">
              {t.home}
            </Link>
            <Link href={`/${country}/tours`} className="font-sans text-white hover:text-gold-deep transition-colors">
              {t.tours}
            </Link>
            <Link href={`/${country}/about`} className="font-sans text-white hover:text-gold-deep transition-colors">
              {t.about?.ourStory || 'About Us'}
            </Link>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="text-center pt-8 border-t border-gold-deep/10">
          <p className="font-sans text-white/60 text-sm">
            {footerT.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
