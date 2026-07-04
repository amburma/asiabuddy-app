"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Menu, Globe, Home, Info, FileCheck, Plane, Bus, Home as HomeIcon, Utensils, ShoppingBag, Stethoscope, Music, Receipt, Calculator, MessageSquare, Gavel, ShieldCheck } from 'lucide-react'
import GuideModal from './GuideModal'
import MarkdownRenderer from './MarkdownRenderer'
import { UI_TRANSLATIONS } from '@/lib/i18n'
import { GENERAL_INFORMATION } from '@/data/thailand/generalInformation'
import { VISA_GUIDE } from '@/data/thailand/visaGuide'
import { TRAVEL_STYLE_GUIDE } from '@/data/thailand/travelStyleGuide'
import { TRANSPORT_DETAILS } from '@/data/thailand/transportDetails'
import { ACCOMMODATION_GUIDE } from '@/data/thailand/accommodationGuide'
import { FOOD_GUIDE_MARKDOWN } from '@/data/thailand/foodGuide'
import { SHOPPING_GUIDE_MARKDOWN } from '@/data/thailand/shoppingGuide'
import { MEDICAL_GUIDE_MARKDOWN } from '@/data/thailand/medicalGuide'
import { NIGHTLIFE_GUIDE_MARKDOWN } from '@/data/thailand/nightlifeGuide'
import { VAT_REFUND_GUIDE } from '@/data/thailand/vatRefundGuide'
import { ESSENTIAL_PHRASES } from '@/data/thailand/phrasesData'
import { ETIQUETTE_DATA } from '@/data/thailand/etiquetteData'
import { LAWS_DATA } from '@/data/thailand/lawsData'
import { ThaiLanguage } from '@/types/country'
import LanguageWelcome from './LanguageWelcome'

interface NavbarProps {
  country?: string
  language?: string
  isFirstVisit?: boolean
}

const languages = [
  { code: 'EN', label: 'English' },
  { code: 'MM', label: 'မြန်မာ' },
  { code: 'DE', label: 'Deutsch' },
  { code: 'TH', label: 'ภาษาไทย' },
  { code: 'FR', label: 'Français' },
]

export default function Navbar({ country, language, isFirstVisit }: NavbarProps) {
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [showLanguageWelcome, setShowLanguageWelcome] = useState(isFirstVisit || false)
  const [currentLanguage, setCurrentLanguage] = useState(
    language ? language.toUpperCase() : 'EN'
  )
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (language) {
      setCurrentLanguage(language.toUpperCase())
    }
  }, [language])

  const t = UI_TRANSLATIONS[currentLanguage as keyof typeof UI_TRANSLATIONS] || UI_TRANSLATIONS.EN

  const modalContent: Record<string, { title: string; subtitle: string; icon: React.ReactNode; content: string; footer?: string }> = {
    information: {
      title: t.infoModalTitle || 'Thailand Essentials Guide',
      subtitle: t.infoModalSubtitle || 'Practical guidance for your stay',
      icon: <Info size={20} />,
      content: GENERAL_INFORMATION[currentLanguage as ThaiLanguage] || GENERAL_INFORMATION['EN'],
      footer: 'AsiaBuddy Services • Preserving Excellence in Thai Hospitality'
    },
    visa: {
      title: t.visa?.modalTitle || 'Thailand Visa Guide',
      subtitle: 'Immigration & Entry',
      icon: <FileCheck size={20} />,
      content: VISA_GUIDE[currentLanguage as ThaiLanguage] || VISA_GUIDE['EN'],
      footer: 'Essential Thai Travel Visa Guide • AsiaBuddy Services'
    },
    'travel-types': {
      title: t.travelTypes?.modalTitle || 'Comprehensive Guide to Traveling in Thailand',
      subtitle: t.travelTypes?.modalSubtitle || 'Travel Styles & Planner',
      icon: <Plane size={20} />,
      content: TRAVEL_STYLE_GUIDE[currentLanguage as ThaiLanguage] || TRAVEL_STYLE_GUIDE['EN'],
      footer: 'Comprehensive Travel Guide • AsiaBuddy Services'
    },
    transport: {
      title: t.transport?.modalTitle || 'Thailand Nationwide Transport Guide',
      subtitle: t.transport?.modalSubtitle || 'Transportation',
      icon: <Bus size={20} />,
      content: (TRANSPORT_DETAILS[currentLanguage as ThaiLanguage] || TRANSPORT_DETAILS['EN'])?.fullGuideMarkdown || 'Transport guide content not available.',
      footer: 'Thailand Transport Guide • AsiaBuddy Services'
    },
    accommodation: {
      title: t.accommodation?.modalTitle || 'Comprehensive Guide to Accommodations in Thailand',
      subtitle: t.accommodation?.detailsTitle || 'Accommodations',
      icon: <HomeIcon size={20} />,
      content: ACCOMMODATION_GUIDE[currentLanguage as ThaiLanguage] || ACCOMMODATION_GUIDE['EN'],
      footer: 'Accommodation Guide for Travelers • AsiaBuddy Services'
    },
    food: {
      title: t.food?.modalTitle || 'The Ultimate Thailand Food Guide',
      subtitle: t.food?.detailsTitle || 'Food Guide',
      icon: <Utensils size={20} />,
      content: FOOD_GUIDE_MARKDOWN[currentLanguage as ThaiLanguage] || FOOD_GUIDE_MARKDOWN['EN'],
      footer: 'Thailand Food Guide • AsiaBuddy Services'
    },
    shopping: {
      title: t.shopping?.modalTitle || 'Comprehensive Thailand Shopping Guide',
      subtitle: t.shopping?.modalSubtitle || 'Malls & Local Markets',
      icon: <ShoppingBag size={20} />,
      content: SHOPPING_GUIDE_MARKDOWN[currentLanguage as ThaiLanguage] || SHOPPING_GUIDE_MARKDOWN['EN'],
      footer: 'Thailand Shopping Guide • AsiaBuddy Services'
    },
    medical: {
      title: t.medical?.modalTitle || 'The Ultimate Thailand Medical Guide',
      subtitle: t.medical?.modalSubtitle || 'Healthcare, Checkups & Preparation',
      icon: <Stethoscope size={20} />,
      content: MEDICAL_GUIDE_MARKDOWN[currentLanguage as ThaiLanguage] || MEDICAL_GUIDE_MARKDOWN['EN'],
      footer: 'Medical Tourism Guide • AsiaBuddy Services'
    },
    nightlife: {
      title: t.nightlife?.modalTitle || 'The Ultimate Thailand Nightlife Guide',
      subtitle: t.nightlife?.modalSubtitle || 'Clubs, Bars & Safety',
      icon: <Music size={20} />,
      content: NIGHTLIFE_GUIDE_MARKDOWN[currentLanguage as ThaiLanguage] || NIGHTLIFE_GUIDE_MARKDOWN['EN'],
      footer: 'Nightlife Guide • AsiaBuddy Services'
    },
    vat: {
      title: t.vatRefund?.title || 'VAT Refund Guide',
      subtitle: 'Customs & Money Back',
      icon: <Receipt size={20} />,
      content: VAT_REFUND_GUIDE[currentLanguage as ThaiLanguage] || VAT_REFUND_GUIDE['EN'],
      footer: 'VAT Refund Guide for Travelers • AsiaBuddy Services'
    },
    phrases: {
      title: t.tools?.phrases || 'Essential Thai Phrases',
      subtitle: t.tools?.phrasesSubtitle || 'Language Basics',
      icon: <MessageSquare size={20} />,
      content: '# Essential Thai Phrases\n\nLearn these basic phrases to communicate effectively in Thailand.\n\n## Greetings & Basics\n\n* **Sawasdee** - Hello / Goodbye\n* **Khop Khun** - Thank you\n* **Kho Tot** - Excuse me / Sorry\n* **Chai** - Yes\n* **Mai** - No\n\n## Getting Around\n\n* **Tao Rai** - How much is this?\n* **Lot Dai Mai** - Can you give a discount?\n* **Yoo Tee Nai** - Where is...?\n\n*Note: For full phrase guide with audio, visit the chat section.*',
      footer: 'Language Guide • AsiaBuddy Services'
    },
    etiquette: {
      title: t.tools?.etiquette || 'Thai Etiquette Guide',
      subtitle: t.culturalGuideLink || 'Cultural Customs',
      icon: <Gavel size={20} />,
      content: '# Thai Etiquette Guide\n\n## The Wai (Greeting)\n\nThe traditional Thai greeting is the *wai* - palms pressed together at chest level with a slight bow.\n\n* **Wai to elders**: Higher wai, more bow\n* **Wai to equals**: Chest level\n* **Wai to children**: Lower wai\n\n## Temple Etiquette\n\n* Dress modestly - cover shoulders and knees\n* Remove shoes before entering temple buildings\n* Never point feet toward Buddha images\n* Women should not touch monks\n\n## General Do\'s and Don\'ts\n\n* **Do**: Smile often - Thais appreciate a friendly demeanor\n* **Don\'t**: Touch people\'s heads (considered sacred)\n* **Do**: Show respect to the King and Royal Family\n* **Don\'t**: Disrespect Buddha images or religious symbols\n\n*Note: For detailed etiquette guidance, visit the chat section.*',
      footer: 'Cultural Guide • AsiaBuddy Services'
    },
    laws: {
      title: t.tools?.laws || 'Key Laws in Thailand',
      subtitle: t.lawsRegulationsLink || 'Legal Information',
      icon: <ShieldCheck size={20} />,
      content: (() => {
        const laws = LAWS_DATA[currentLanguage as ThaiLanguage] || LAWS_DATA['EN']
        return laws.map(section => `\n## ${section.title}\n\n${section.content}\n\n${section.points ? section.points.map(p => `* ${p}`).join('\n') : ''}`).join('\n\n')
      })(),
      footer: 'Legal Guide • AsiaBuddy Services'
    },
    'tourist-police': {
      title: t.touristPolice || 'Tourist Police Assistance',
      subtitle: t.assistance || 'Emergency Help',
      icon: <ShieldCheck size={20} />,
      content: '# Tourist Police\n\nFor emergency assistance, call **1155**. The Tourist Police provide support for tourists in Thailand and can assist with various issues including lost documents, scams, and other emergencies.',
      footer: 'Emergency Services • AsiaBuddy Services'
    },
    currency: {
      title: t.tools?.currency || 'Currency Converter',
      subtitle: t.footer?.liveEstimates || 'Thai Baht Exchange',
      icon: <Calculator size={20} />,
      content: '# Currency Converter\n\nUse the currency converter tool to check exchange rates between Thai Baht (THB) and other currencies.\n\n## Common Exchange Rates\n\n* 1 USD ≈ 35-36 THB\n* 1 EUR ≈ 38-39 THB\n* 1 GBP ≈ 44-45 THB\n\n*Note: Rates fluctuate daily. Check with your bank for current rates.*',
      footer: 'Financial Tools • AsiaBuddy Services'
    }
  }

  const handleLanguageChange = (lang: string) => {
    const upper = lang.toUpperCase()
    document.cookie = `NEXT_LOCALE=${upper};path=/;max-age=31536000`
    setCurrentLanguage(upper)
    setShowLanguageDropdown(false)
    window.location.reload()
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Left Side - Menu + Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowMenu(true)}
              className="p-3 bg-sacred-bg rounded-xl text-gold-deep hover:bg-gold-deep hover:text-white transition-all shadow-sm border border-gold-soft/20 flex items-center gap-2 group"
            >
              <Menu size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px] uppercase font-bold tracking-widest hidden sm:inline">{t.menu}</span>
            </button>
              <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-serif text-gold-deep leading-none">{t.brand?.name || UI_TRANSLATIONS.EN.brand.name}</h1>
              <p className="text-[8px] uppercase tracking-[0.4em] font-bold text-gray-400 mt-1">{t.brand?.subtitle || UI_TRANSLATIONS.EN.brand.subtitle}</p>
            </div>
          </div>

          {/* Right Side - Language + Explore */}
          <nav className="flex items-center gap-1 bg-sacred-bg p-1 rounded-full border border-gray-100 shadow-inner">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageWelcome(true)}
                className="flex items-center justify-center w-10 h-10 rounded-full text-gray-700 hover:text-gold-deep hover:bg-white transition-all group"
                title="Change Language"
              >
                <Globe size={18} className="group-hover:rotate-12 transition-transform" />
              </button>

              {showLanguageDropdown && (
                <div className="absolute top-full mt-2 right-0 bg-[#0D0D0D] border border-white/10 rounded-xl overflow-hidden shadow-xl z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full px-4 py-2 text-sm hover:bg-white/10 transition-colors flex items-center gap-2 ${
                        currentLanguage === lang.code
                          ? 'text-[#C9A84C] font-semibold'
                          : 'text-white'
                      }`}
                    >
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="w-[1px] h-6 bg-gray-200 mx-1" />
            
            {/* Home Button */}
            {country && (
              <Link
                href={`/${country}`}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gold-deep text-white shadow-md hover:bg-sacred-green transition-all"
                title={`Go to ${country.charAt(0).toUpperCase() + country.slice(1)}`}
              >
                <Home size={18} />
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Menu Overlay */}
      {showMenu && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-start">
          <div 
            onClick={() => setShowMenu(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <div className="relative w-72 h-full bg-white shadow-2xl overflow-y-auto">
            {/* Close Button */}
            <button 
              onClick={() => setShowMenu(false)} 
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 z-10"
            >
              ✕
            </button>

            <div className="p-6">
              {/* Section: Top Items */}
              {country && (
                <div className="space-y-1">
                  <Link 
                    href={`/${country}`}
                    onClick={() => setShowMenu(false)}
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#C9A84C]/10 rounded-lg"
                  >
                    {t.home || UI_TRANSLATIONS.EN.home}
                  </Link>
                  <Link 
                    href={`/${country}/tours`}
                    onClick={() => setShowMenu(false)}
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#C9A84C]/10 rounded-lg"
                  >
                    {t.tours || UI_TRANSLATIONS.EN.tours}
                  </Link>
                  <Link 
                    href={`/${country}#destinations`}
                    onClick={() => setShowMenu(false)}
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#C9A84C]/10 rounded-lg"
                  >
                    {t.destinations || UI_TRANSLATIONS.EN.destinations}
                  </Link>
                  <Link 
                    href={`/${country}#chat`}
                    onClick={() => setShowMenu(false)}
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#C9A84C]/10 rounded-lg"
                  >
                    {/* booking.link exists for longer booking text; keep concise label */}
                    {t.booking?.chatTitle || 'Tour Operator'}
                  </Link>
                </div>
              )}

              {/* Section: ESSENTIAL GUIDES */}
              {country && (
                <>
                  <h4 className="text-xs uppercase tracking-widest text-[#C9A84C] mt-4 mb-1 px-4">
                    {t.menuCategories?.guides || 'ESSENTIAL GUIDES'}
                  </h4>
                  <div className="space-y-1">
                    <button 
                      onClick={() => { setActiveModal('information'); setShowMenu(false) }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#C9A84C]/10 rounded-lg"
                    >
                        {t.tabs?.information || 'Information'}
                    </button>
                    <button 
                      onClick={() => { setActiveModal('visa'); setShowMenu(false) }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#C9A84C]/10 rounded-lg"
                    >
                        {t.visa?.title || 'Visa Info'}
                    </button>
                    <button 
                      onClick={() => { setActiveModal('travel-types'); setShowMenu(false) }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#C9A84C]/10 rounded-lg"
                    >
                        {t.travelTypes?.title || 'Travel Types'}
                    </button>
                    <button 
                      onClick={() => { setActiveModal('transport'); setShowMenu(false) }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#C9A84C]/10 rounded-lg"
                    >
                        {t.transport?.title || 'Transport in Thailand'}
                    </button>
                    <Link 
                      href={`/${country}#chat`}
                      onClick={() => setShowMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#C9A84C]/10 rounded-lg"
                    >
                        {t.booking?.link || 'Book Car Rentals, Bus, Flight, Entrance'}
                    </Link>
                    <button 
                      onClick={() => { setActiveModal('accommodation'); setShowMenu(false) }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#C9A84C]/10 rounded-lg"
                    >
                        {t.accommodation?.detailsTitle || 'Accommodation Details'}
                    </button>
                    <button 
                      onClick={() => { setActiveModal('food'); setShowMenu(false) }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#C9A84C]/10 rounded-lg"
                    >
                        {t.food?.detailsTitle || 'Thailand Food Guide'}
                    </button>
                    <button 
                      onClick={() => { setActiveModal('shopping'); setShowMenu(false) }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#C9A84C]/10 rounded-lg"
                    >
                        {t.shopping?.detailsTitle || 'Thailand Shopping Guide'}
                    </button>
                    <button 
                      onClick={() => { setActiveModal('medical'); setShowMenu(false) }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#C9A84C]/10 rounded-lg"
                    >
                        {t.medical?.title || 'Medical'}
                    </button>
                    <button 
                      onClick={() => { setActiveModal('nightlife'); setShowMenu(false) }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#C9A84C]/10 rounded-lg"
                    >
                        {t.nightlife?.title || 'Nightlife'}
                    </button>
                    <button 
                      onClick={() => { setActiveModal('vat'); setShowMenu(false) }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#C9A84C]/10 rounded-lg"
                    >
                        {t.vatRefund?.title || 'VAT Refund Guide'}
                    </button>
                  </div>
                </>
              )}

              {/* Section: TRAVEL TOOLS */}
              {country && (
                <>
                  <h4 className="text-xs uppercase tracking-widest text-[#C9A84C] mt-4 mb-1 px-4">
                    {t.menuCategories?.tools || 'TRAVEL TOOLS'}
                  </h4>
                  <div className="space-y-1">
                    <button 
                      onClick={() => { setActiveModal('currency'); setShowMenu(false) }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#C9A84C]/10 rounded-lg"
                    >
                        {t.tools?.currency || 'Currency Converter'}
                    </button>
                    <button 
                      onClick={() => { setActiveModal('phrases'); setShowMenu(false) }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#C9A84C]/10 rounded-lg"
                    >
                        {t.tools?.phrases || 'Essential Phrases'}
                    </button>
                    <button 
                      onClick={() => { setActiveModal('etiquette'); setShowMenu(false) }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#C9A84C]/10 rounded-lg"
                    >
                        {t.tools?.etiquette || 'Etiquette'}
                    </button>
                    <button 
                      onClick={() => { setActiveModal('laws'); setShowMenu(false) }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#C9A84C]/10 rounded-lg"
                    >
                        {t.tools?.laws || 'Key Laws'}
                    </button>
                  </div>
                </>
              )}

              {/* Section: DISCOVER */}
              {country && (
                <>
                  <h4 className="text-xs uppercase tracking-widest text-[#C9A84C] mt-4 mb-1 px-4">
                    {t.menuCategories?.travel || 'DISCOVER'}
                  </h4>
                  <div className="space-y-1">
                    <Link 
                      href={`/${country}/tours`}
                      onClick={() => setShowMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#C9A84C]/10 rounded-lg"
                    >
                        {t.tourPackages || UI_TRANSLATIONS.EN.tourPackages}
                    </Link>
                    <Link 
                      href={`/${country}/blog`}
                      onClick={() => setShowMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#C9A84C]/10 rounded-lg"
                    >
                        {t.travelBlog || UI_TRANSLATIONS.EN.travelBlog}
                    </Link>
                    <Link 
                      href={`/${country}#destinations`}
                      onClick={() => setShowMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#C9A84C]/10 rounded-lg"
                    >
                        Destinations
                    </Link>
                  </div>
                </>
              )}

              {/* Section: SERVICE MINDED HELP */}
              {country && (
                <>
                  <h4 className="text-xs uppercase tracking-widest text-[#C9A84C] mt-4 mb-1 px-4">
                    {t.tools?.serviceMinded || 'SERVICE MINDED HELP'}
                  </h4>
                  <div className="space-y-1">
                    <button 
                      onClick={() => { setActiveModal('tourist-police'); setShowMenu(false) }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#C9A84C]/10 rounded-lg"
                    >
                        {t.touristPolice || 'Tourist Police'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Guide Modal */}
      {activeModal && modalContent[activeModal] && (
        <GuideModal
          isOpen={!!activeModal}
          onClose={() => setActiveModal(null)}
          title={modalContent[activeModal].title}
          subtitle={modalContent[activeModal].subtitle}
          icon={modalContent[activeModal].icon}
          footer={modalContent[activeModal].footer}
        >
          <div className="markdown-body">
            <MarkdownRenderer content={modalContent[activeModal].content} />
          </div>
        </GuideModal>
      )}

      {/* Language Welcome Modal */}
      {showLanguageWelcome && (
        <LanguageWelcome
          onStart={(lang: ThaiLanguage) => {
            document.cookie = `NEXT_LOCALE=${lang};path=/;max-age=31536000`
            setShowLanguageWelcome(false)
            window.location.reload()
          }}
        />
      )}
    </>
  )
}
