'use client'
import InstallBanner from '@/components/shared/InstallBanner';
import IOSInstallBanner from '@/components/shared/IOSInstallBanner';
import MarkdownRenderer from '@/components/shared/MarkdownRenderer';
import GuideModal from '@/components/shared/GuideModal';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'motion/react';
import { ThaiLanguage } from '@/types/country';
import EmergencyBanner from '@/components/shared/EmergencyBanner';
import LanguageSelector from '@/components/shared/LanguageSelector';
import DestinationExplorer from '@/components/shared/DestinationExplorer';
import TravelToolbox from '@/components/shared/TravelToolbox';
import LanguageWelcome from '@/components/shared/LanguageWelcome';
import { UI_TRANSLATIONS } from '@/lib/i18n';
import { GENERAL_INFORMATION } from '@/data/thailand/generalInformation';
import { TRANSPORT_DETAILS } from '@/data/thailand/transportDetails';
import { ACCOMMODATION_GUIDE } from '@/data/thailand/accommodationGuide';
import { FOOD_GUIDE_MARKDOWN } from '@/data/thailand/foodGuide';
import { MEDICAL_GUIDE_MARKDOWN } from '@/data/thailand/medicalGuide';
import { NIGHTLIFE_GUIDE_MARKDOWN } from '@/data/thailand/nightlifeGuide';
import { VAT_REFUND_GUIDE } from '@/data/thailand/vatRefundGuide';
import { VISA_GUIDE } from '@/data/thailand/visaGuide';
import { TRAVEL_STYLE_GUIDE } from '@/data/thailand/travelStyleGuide';
import { SHOPPING_GUIDE_MARKDOWN } from '@/data/thailand/shoppingGuide';
import { Compass, MessageSquare, Map as MapIcon, ShieldCheck, Languages, Info, X, Bus, ChevronRight, Check, AlertCircle, Receipt, FileCheck, FileText, Menu, Grid, MessageCircle, Home, Utensils, Plane, Ticket, Stethoscope, Music, ShoppingBag, Calculator, Gavel, Briefcase, Phone, Mail, Globe, ExternalLink, Calendar } from 'lucide-react';
import CurrencyConverter from '@/components/shared/CurrencyConverter';
import { TripChecklist } from '@/components/shared/TripChecklist';
import BookingWebForm from '@/components/shared/BookingWebForm';
import CookieBanner from '@/components/shared/CookieBanner';

// Dynamic imports for chat components with SSR disabled
const ConciergeChat = dynamic(() => import('@/components/thailand/ConciergeChat'), { 
  ssr: false,
  loading: () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="h-10 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-64 mx-auto" />
      </div>
      <div className="h-96 bg-gray-200 rounded animate-pulse" />
    </div>
  )
})
const TransportChat = dynamic(() => import('@/components/thailand/TransportChat'), { ssr: false, loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded" /> })
const FoodChat = dynamic(() => import('@/components/thailand/FoodChat'), { ssr: false, loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded" /> })
const AccommodationChat = dynamic(() => import('@/components/thailand/AccommodationChat'), { ssr: false, loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded" /> })
const TripPlannerChat = dynamic(() => import('@/components/thailand/TripPlannerChat'), { ssr: false, loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded" /> })
const MedicalChat = dynamic(() => import('@/components/thailand/MedicalChat'), { ssr: false, loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded" /> })
const NightlifeChat = dynamic(() => import('@/components/thailand/NightlifeChat'), { ssr: false, loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded" /> })
const ShoppingChat = dynamic(() => import('@/components/thailand/ShoppingChat'), { ssr: false, loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded" /> })
const BookingChat = dynamic(() => import('@/components/shared/BookingChat'), { ssr: false, loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded" /> })
const PhrasesChat = dynamic(() => import('@/components/thailand/PhrasesChat'), { ssr: false, loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded" /> })
const EtiquetteGuide = dynamic(() => import('@/components/shared/EtiquetteGuide'), { ssr: false, loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded" /> })
const LawsGuide = dynamic(() => import('@/components/shared/LawsGuide'), { ssr: false, loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded" /> })
const HumanOperatorChat = dynamic(() => import('@/components/thailand/HumanOperatorChat'), { ssr: false, loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded" /> })

export default function ThailandApp() {
  const [language, setLanguage] = useState<ThaiLanguage>('EN')
  const [hasStarted, setHasStarted] = useState(false)
  const [activeView, setActiveView] = useState<'explorer' | 'chat'>('explorer');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showTransportModal, setShowTransportModal] = useState(false);
  const [showAccommodationModal, setShowAccommodationModal] = useState(false);
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [showAppsModal, setShowAppsModal] = useState(false);
  const [showVatModal, setShowVatModal] = useState(false);
  const [showVisaModal, setShowVisaModal] = useState(false);
  const [showTravelTypesModal, setShowTravelTypesModal] = useState(false);
  const [showMedicalModal, setShowMedicalModal] = useState(false);
  const [showNightlifeModal, setShowNightlifeModal] = useState(false);
  const [showShoppingModal, setShowShoppingModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showWebFormModal, setShowWebFormModal] = useState(false);
  const [showHumanOperatorChat, setShowHumanOperatorChat] = useState(false);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [showPhrasesModal, setShowPhrasesModal] = useState(false);
  const [showEtiquetteModal, setShowEtiquetteModal] = useState(false);
  const [showLawsModal, setShowLawsModal] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [mounted, setMounted] = useState(false)

const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.EN;
const uiT = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.EN;

const handleStart = (lang: ThaiLanguage) => {
  setLanguage(lang);
  setHasStarted(true);
  localStorage.setItem('thaiguide_target_lang', lang);
  localStorage.setItem('thaiguide_has_started', 'true');
};
const handleResetLanguage = () => {
  setHasStarted(false);
  setLanguage('EN');
  localStorage.removeItem('thaiguide_has_started');
  localStorage.removeItem('thaiguide_target_lang');
};

const handleOpenModal = (modalId: string) => {
  switch (modalId) {
    case 'vat': setShowVatModal(true); break
    case 'visa': setShowVisaModal(true); break
    case 'transport': setShowTransportModal(true); break
    case 'apps': setShowAppsModal(true); break
    case 'accommodation': setShowAccommodationModal(true); break
    case 'food': setShowFoodModal(true); break
    case 'travel-types': setShowTravelTypesModal(true); break
    case 'medical': setShowMedicalModal(true); break
    case 'nightlife': setShowNightlifeModal(true); break
    case 'shopping': setShowShoppingModal(true); break
    case 'booking': setShowBookingModal(true); break
    case 'phrases': setShowPhrasesModal(true); break
    case 'etiquette': setShowEtiquetteModal(true); break
    case 'laws': setShowLawsModal(true); break
  }
};

useEffect(() => {
    const savedLang = localStorage.getItem('thaiguide_target_lang')
    if (savedLang === 'english') setLanguage('EN')
    else if (savedLang === 'thai') setLanguage('TH')
    else if (savedLang === 'myanmar') setLanguage('MM')
    else if (savedLang === 'spanish') setLanguage('ES')
    else if (savedLang === 'french') setLanguage('FR')
    else if (savedLang === 'german') setLanguage('DE')
    else if (savedLang) setLanguage(savedLang as ThaiLanguage)

    const started = localStorage.getItem('thaiguide_has_started') === 'true'
    setHasStarted(started)
    setMounted(true)
  }, [])

useEffect(() => {
  const titles: Record<string, string> = {
    EN: 'ThaiGuide – Thailand Travel Guide',
    TH: 'ThaiGuide – คู่มือท่องเที่ยวไทย',
    MM: 'ThaiGuide – ထိုင်းခရီးသွားလမ်းညွှန်',
    ES: 'ThaiGuide – Guía de Viaje a Tailandia',
    FR: 'ThaiGuide – Guide de Voyage en Thaïlande',
    DE: 'ThaiGuide – Thailand Reiseführer',
  };
  document.title = titles[language] || 'ThaiGuide – Thailand Travel Guide';
}, [language]);


  if (!mounted) {
    return null
  }

  if (!hasStarted) {
    return <LanguageWelcome onStart={handleStart} />
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowMenu(true)}
              className="p-3 bg-sacred-bg rounded-xl text-gold-deep hover:bg-gold-deep hover:text-white transition-all shadow-sm border border-gold-soft/20 flex items-center gap-2 group"
            >
              <Menu size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px] uppercase font-bold tracking-widest hidden sm:inline">{uiT.menu}</span>
            </button>
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-serif text-gold-deep leading-none">ThaiGuide</h1>
              <p className="text-[8px] uppercase tracking-[0.4em] font-bold text-gray-400 mt-1">AsiaBuddy Services</p>
            </div>
          </div>

          <nav className="flex items-center gap-1 bg-sacred-bg p-1 rounded-full border border-gray-100 shadow-inner">
            <button
              onClick={handleResetLanguage}
              className="flex items-center justify-center w-10 h-10 rounded-full text-gray-700 hover:text-gold-deep hover:bg-white transition-all group"
              title="Change Language"
            >
              <Languages size={18} className="group-hover:rotate-12 transition-transform" />
            </button>
            <div className="w-[1px] h-6 bg-gray-200 mx-1" />
            <button
              onClick={() => setActiveView('explorer')}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeView === 'explorer' ? 'bg-gold-deep text-white shadow-md' : 'text-gray-700 hover:text-gold-deep'
              }`}
            >
              <MapIcon size={14} />
              <span className="hidden sm:inline">{t.explore}</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-sacred-green/5">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://thutatravel.com/wp-content/uploads/2026/04/Gemini_Generated_Image_rrwlx8rrwlx8rrwl.png"
            alt="Thailand Background"
            className="w-full h-full object-cover opacity-20 grayscale-[20%]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sacred-bg via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-gold-deep/30" />
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-sacred-green">{t.sacredAesthetic}</span>
              <span className="w-12 h-[1px] bg-gold-deep/30" />
            </div>
            <h2 className="text-6xl md:text-8xl mb-6 tracking-tight leading-none text-sacred-green font-bold">
              {t.hero}
            </h2>
            <p className="max-w-xl mx-auto text-gray-800 font-light italic text-sm md:text-base leading-relaxed tracking-wide">
              {t.heroSub}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12">
        <AnimatePresence mode="wait">
          {activeView === 'explorer' ? (
            <motion.div
              key="explorer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-20"
            >
              {/* Travel Ready CTA */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center -mt-20 mb-12 relative z-20"
              >
                <motion.button
                  initial={{ scale: 1 }}
                  animate={{ 
                    scale: [1, 1.05, 0.98, 1.05, 1],
                    x: [0, -2, 2, -2, 0],
                    boxShadow: [
                      "0px 10px 30px rgba(0,0,0,0.1)",
                      "0px 10px 40px rgba(181, 148, 16, 0.4)",
                      "0px 10px 30px rgba(0,0,0,0.1)"
                    ]
                  }}
                  transition={{ 
                    duration: 3,
                    times: [0, 0.1, 0.2, 0.3, 1],
                    repeat: Infinity,
                    repeatDelay: 5
                  }}
                  whileHover={{ scale: 1.05, boxShadow: "0px 15px 50px rgba(181, 148, 16, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowChecklist(true)}
                  className="bg-gradient-to-r from-sacred-green to-emerald-950 text-white px-10 py-5 rounded-full shadow-2xl flex items-center gap-4 group border border-gold-deep/20 backdrop-blur-md"
                >
                  <div className="bg-gold-deep p-2 rounded-full group-hover:rotate-12 transition-transform shadow-lg">
                    <Briefcase size={22} className="text-white" />
                  </div>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold-soft mb-1 opacity-80">Departure Prep</span>
                    <span className="text-base font-bold uppercase tracking-widest">{uiT.checklist?.readyButton || 'Travel Ready?'}</span>
                  </div>
                  <ChevronRight size={20} className="text-gold-deep opacity-50 group-hover:translate-x-1 transition-transform ml-2" />
                </motion.button>
              </motion.div>

              <DestinationExplorer language={language} />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center justify-center py-20 bg-sacred-bg/30 rounded-3xl border-2 border-dashed border-gold-soft/30 px-6 text-center"
              >
                <div className="mb-8">
                  <h3 className="text-4xl md:text-5xl font-serif text-sacred-green mb-2">
                    {uiT.tabs?.information || 'Information'}
                  </h3>
                  <div className="w-12 h-1 bg-gold-deep mx-auto rounded-full" />
                </div>
                
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setShowInfoModal(true); }}
                  target="_self"
                  className="group flex flex-col items-center gap-6 hover:scale-105 transition-all duration-300"
                >
                  <div className="relative group">
                    <span className="text-2xl md:text-3xl font-serif text-gold-deep border-b-2 border-gold-deep/20 pb-2 group-hover:text-sacred-green group-hover:border-sacred-green transition-all">
                      {uiT.infoLink || 'for more Information click here'}
                    </span>
                    <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-sacred-green group-hover:w-full transition-all duration-500" />
                  </div>
                  
                  <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.3em] text-gray-500 group-hover:text-gold-deep transition-colors">
                    <Info size={14} className="text-gold-deep" />
                    <span>{uiT.exploreThailandEssentials || 'Explore Thailand Essentials'}</span>
                  </div>
                </a>
              </motion.div>
              
              <div className="space-y-10">
                <div className="flex items-center gap-4">
                  <div className="flex-grow h-[1px] bg-gray-100" />
                </div>
                <TravelToolbox 
                  language={language} 
                  onOpenModal={handleOpenModal}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-10">
                <h2 className="text-4xl mb-2 text-sacred-green">{t.concierge}</h2>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-700 italic">{t.chat.advice}</p>
              </div>
              <ConciergeChat language={language} />
             </motion.div>
          )}
        </AnimatePresence>
      </main>

{/* Global Travel Types Modal */}

<GuideModal
  isOpen={showTravelTypesModal}
  onClose={() => setShowTravelTypesModal(false)}
  title={(uiT.travelTypes as any)?.modalTitle || 'Comprehensive Guide to Traveling in Thailand'}
  subtitle={(uiT.travelTypes as any)?.modalSubtitle || 'Travel Styles & Planner'}
  icon={<Plane size={20} />}
  footer="Comprehensive Travel Guide • AsiaBuddy Services"
>
  <div className="markdown-body mb-20">
    <MarkdownRenderer content={(TRAVEL_STYLE_GUIDE[language] || TRAVEL_STYLE_GUIDE['EN']) ?? ''} />
  </div>
  <div className="border-t border-gray-100 pt-12 pb-8">
    <TripPlannerChat language={language} />
  </div>
</GuideModal>

{/* Global Medical Guide Modal */}
<GuideModal
  isOpen={showMedicalModal}
  onClose={() => setShowMedicalModal(false)}
  title={uiT.medical?.modalTitle || 'The Ultimate Thailand Medical Guide'}
  subtitle={uiT.medical?.modalSubtitle || 'Healthcare, Checkups & Preparation'}
  icon={<Stethoscope size={20} />}
  footer="Medical Tourism Guide • AsiaBuddy Services"
>

<div className="markdown-body mb-20">
  <MarkdownRenderer content={(MEDICAL_GUIDE_MARKDOWN[language] || MEDICAL_GUIDE_MARKDOWN['EN']) ?? ''} />
</div>

  <div className="border-t border-gray-100 pt-12 pb-8">
    <MedicalChat language={language} />
  </div>
</GuideModal>

{/* Global Nightlife Guide Modal */}
<GuideModal
  isOpen={showNightlifeModal}
  onClose={() => setShowNightlifeModal(false)}
  title={uiT.nightlife?.modalTitle || 'The Ultimate Thailand Nightlife Guide'}
  subtitle={uiT.nightlife?.modalSubtitle || 'Clubs, Bars & Safety'}
  icon={<Music size={20} />}
  footer="Nightlife Guide • AsiaBuddy Services"
>

<div className="markdown-body mb-20">
  <MarkdownRenderer content={(NIGHTLIFE_GUIDE_MARKDOWN[language] || NIGHTLIFE_GUIDE_MARKDOWN['EN']) ?? ''} />
</div>

  <div className="border-t border-gray-100 pt-12 pb-8">
    <NightlifeChat language={language} />
  </div>
</GuideModal>
{/* Global Shopping Guide Modal */}
<GuideModal
  isOpen={showShoppingModal}
  onClose={() => setShowShoppingModal(false)}
  title={uiT.shopping?.modalTitle || 'Comprehensive Thailand Shopping Guide'}
  subtitle={uiT.shopping?.modalSubtitle || 'Malls & Local Markets'}
  icon={<ShoppingBag size={20} />}
  footer={`${uiT.footer?.shoppingGuide || 'Thailand Shopping Guide'} • ${uiT.footer?.by || 'AsiaBuddy Services'}`}
>

<div className="markdown-body">
  <MarkdownRenderer content={(SHOPPING_GUIDE_MARKDOWN[language] || SHOPPING_GUIDE_MARKDOWN['EN']) ?? ''} />
</div>

  <div className="mt-12 pt-12 border-t border-gray-100">
    <div className="mb-6">
      <h3 className="text-lg font-serif text-sacred-green">
        {uiT.shopping?.title || 'Ask any Thailand Shopping you want to know.'}
      </h3>
      <div className="w-12 h-1 bg-gold-deep mt-2 rounded-full" />
    </div>
    <ShoppingChat language={language} />
  </div>
</GuideModal>

      <div className="mt-20">
        {/* Book Now Button — opens HumanOperatorChat */}
        <motion.button
          onClick={() => {
            const isTelegram = /Telegram/i.test(navigator.userAgent);
            if (isTelegram) {
              window.open('https://t.me/asiabuddy_bot?start=book', '_blank');
            } else {
              setShowHumanOperatorChat(true);
            }
          }}
          className="w-full max-w-4xl mx-auto bg-gradient-to-r from-gold-deep to-amber-500 text-white rounded-xl py-4 px-6 flex items-center justify-center gap-4 hover:from-amber-600 hover:to-gold-soft transition-all shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Calendar size={20} className="flex-shrink-0" />
          <div className="text-left">
            <p className="text-base font-bold uppercase tracking-wider">{t.chat?.bookNow || 'Book Now'}</p>
            <p className="text-xs opacity-90">{t.chat?.bookNowSubtitle || 'Connect with a Human Operator'}</p>
          </div>
        </motion.button>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 md:py-20 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center space-y-6">
            <div className="text-center">
              <h3 className="text-2xl mb-1 text-gold-deep">ThaiGuide</h3>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-700">{(t.footer || UI_TRANSLATIONS.EN.footer).by}</p>
            </div>
            <p className="text-sm text-gray-800 font-light max-w-sm italic text-center">
              {(t.footer || UI_TRANSLATIONS.EN.footer).tagline}
            </p>
            <div className="flex items-center gap-6 pt-2 text-[10px] uppercase tracking-widest font-bold text-gray-500">
              <a href="/thailand/tour" className="hover:text-gold-deep transition-colors">Tours</a>
              <a href="/thailand/blog" className="hover:text-gold-deep transition-colors">Blog</a>
              <a href="/thailand/destination" className="hover:text-gold-deep transition-colors">Destinations</a>
            </div>
            <div className="flex items-center gap-5 pt-2">
              <a
                href="https://www.facebook.com/asiabuddyapp/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-deep hover:text-sacred-green transition-all hover:scale-110"
                id="footer-facebook"
              >
                <ExternalLink size={18} />
              </a>
              <a
                href="https://m.me/asiabuddyapp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-deep hover:text-sacred-green transition-all hover:scale-110"
                id="footer-messenger"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="https://wa.me/+491793956759"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-deep hover:text-sacred-green transition-all hover:scale-110"
                id="footer-whatsapp"
              >
                <MessageSquare size={18} />
              </a>
              <a
                href="mailto:asiabuddyapp@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-deep hover:text-sacred-green transition-all hover:scale-110"
                id="footer-email"
              >
                <Mail size={18} />
              </a>
              <a
                href="https://asiabuddy.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-deep hover:text-sacred-green transition-all hover:scale-110"
                id="footer-website"
              >
                <Globe size={18} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-[9px] text-gray-700 uppercase tracking-widest font-bold">{(t.footer || UI_TRANSLATIONS.EN.footer).rights}</p>
            <p className="text-[10px] text-gold-deep font-bold tracking-widest">ThaiGuide · AsiaBuddy Services · Tourist Police: 1155</p>
          </div>
          <div className="flex gap-8 text-[9px] text-gray-700 uppercase tracking-tighter">
            <span className="hover:text-gold-deep cursor-pointer transition-colors">{(t.footer || UI_TRANSLATIONS.EN.footer).privacyPolicy}</span>
            <span className="hover:text-gold-deep cursor-pointer transition-colors">{(t.footer || UI_TRANSLATIONS.EN.footer).legalTerms}</span>
            <span className="hover:text-gold-deep cursor-pointer transition-colors">{(t.footer || UI_TRANSLATIONS.EN.footer).culturalGuide}</span>
          </div>
        </div>

        {/* Emergency & Safety Advice Bar at absolute bottom of footer */}
        <EmergencyBanner
          title={t.emergency}
          policeLabel={t.touristPolice}
          assistanceLabel={t.assistance}
        />
      </footer>

      {/* Floating Concierge Icon */}
      <button
	onClick={() => {
	  setActiveView('chat');
	  setTimeout(() => {
	    window.scrollTo({ top: 0, behavior: 'smooth' });
	  }, 100);
		}}
        className={`fixed bottom-8 left-8 z-50 p-4 rounded-full shadow-2xl transition-all duration-500 flex items-center gap-3 group ${
          activeView === 'chat' 
            ? 'bg-sacred-green text-white scale-90 opacity-50 pointer-events-none' 
            : 'bg-gold-deep text-white hover:scale-110 hover:bg-sacred-green ring-4 ring-white'
        }`}
      >
        <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
        <div className="flex flex-col items-start pr-2 overflow-hidden w-0 group-hover:w-28 transition-all duration-500 whitespace-nowrap">
          <span className="text-[10px] font-bold uppercase tracking-widest leading-none mb-0.5">{uiT.concierge}</span>
          <span className="text-[8px] opacity-70">{uiT.chat?.digitalHelp || 'Digital Help'}</span>
        </div>
      </button>

      {/* Booking Web Form Modal */}
      <AnimatePresence>
        {showWebFormModal && (
          <BookingWebForm
            language={language}
            onClose={() => setShowWebFormModal(false)}
          />
        )}
      </AnimatePresence>

      {/* Human Operator Chat Modal */}
      <AnimatePresence>
        {showHumanOperatorChat && (
          <HumanOperatorChat
            language={language}
            onClose={() => setShowHumanOperatorChat(false)}
          />
        )}
      </AnimatePresence>

      {/* Global Information Modal */}
<GuideModal
  isOpen={showInfoModal}
  onClose={() => setShowInfoModal(false)}
  title={uiT.infoModalTitle || 'Thailand Essentials Guide'}
  subtitle={uiT.infoModalSubtitle || 'Practical guidance for your stay'}
  icon={<Info size={20} />}
  footer="AsiaBuddy Services • Preserving Excellence in Thai Hospitality"
>

<div className="markdown-body">
  <MarkdownRenderer content={(GENERAL_INFORMATION[language] || GENERAL_INFORMATION['EN']) ?? ''} />
</div>

</GuideModal>

      {/* Global VAT Refund Modal */}
<GuideModal
  isOpen={showVatModal}
  onClose={() => setShowVatModal(false)}
  title={(UI_TRANSLATIONS[language]?.vatRefund || UI_TRANSLATIONS.EN.vatRefund).title}
  subtitle="Customs & Money Back"
  icon={<Receipt size={20} />}
  footer="VAT Refund Guide for Travelers • AsiaBuddy Services"
><div className="markdown-body">
  <MarkdownRenderer content={(VAT_REFUND_GUIDE[language] || VAT_REFUND_GUIDE['EN']) ?? ''} />
</div>
</GuideModal>
      {/* Global Visa Modal */}
<GuideModal
  isOpen={showVisaModal}
  onClose={() => setShowVisaModal(false)}
  title={(UI_TRANSLATIONS[language]?.visa || UI_TRANSLATIONS.EN.visa).modalTitle}
  subtitle="Immigration & Entry"
  icon={<FileCheck size={20} />}
  footer="Essential Thai Travel Visa Guide • AsiaBuddy Services"
>
<div className="markdown-body">
  <MarkdownRenderer content={(VISA_GUIDE[language] || VISA_GUIDE['EN']) ?? ''} />
</div>
</GuideModal>
{/* Global Transport Modal */}
<GuideModal
  isOpen={showTransportModal}
  onClose={() => setShowTransportModal(false)}
  title={uiT.transport?.modalTitle || 'Thailand Nationwide Transport Guide'}
  subtitle={uiT.transport?.modalSubtitle || 'Transportation'}
  icon={<Bus size={20} />}
  footer="Thailand Transport Guide • AsiaBuddy Services"
>

<div className="markdown-body">
  <MarkdownRenderer content={(TRANSPORT_DETAILS[language] || TRANSPORT_DETAILS['EN']).fullGuideMarkdown ?? ''} />
</div>

</GuideModal>

{/* Accommodation Modal */}
<GuideModal
  isOpen={showAccommodationModal}
  onClose={() => setShowAccommodationModal(false)}
  title={uiT.accommodation?.modalTitle || 'Comprehensive Guide to Accommodations in Thailand'}
  subtitle={uiT.accommodation?.detailsTitle || 'Accommodations'}
  icon={<Home size={20} />}
  footer="Accommodation Guide for Travelers • AsiaBuddy Services"
>

<div className="markdown-body">
  <MarkdownRenderer content={(ACCOMMODATION_GUIDE[language] || ACCOMMODATION_GUIDE['EN']) ?? ''} />
</div>

  <div className="mt-12 pt-12 border-t border-gray-100">
    <div className="mb-6">
      <h3 className="text-lg font-serif text-sacred-green">
        {uiT.accommodation?.title}
      </h3>
      <div className="w-12 h-1 bg-gold-deep mt-2 rounded-full" />
    </div>
    <AccommodationChat language={language} />
  </div>
</GuideModal>

{/* Food Modal */}
<GuideModal
  isOpen={showFoodModal}
  onClose={() => setShowFoodModal(false)}
  title={uiT.food?.modalTitle || 'The Ultimate Thailand Food Guide: From Michelin Stars to Street Eats'}
  subtitle={uiT.food?.detailsTitle || 'Food Guide'}
  icon={<Utensils size={20} />}
  footer="Thailand Food Guide • AsiaBuddy Services"
>

<div className="markdown-body">
  <MarkdownRenderer content={(FOOD_GUIDE_MARKDOWN[language] || FOOD_GUIDE_MARKDOWN['EN']) ?? ''} />
</div>

  <div className="mt-12 pt-12 border-t border-gray-100">
    <div className="mb-6">
      <h3 className="text-lg font-serif text-sacred-green">
        {uiT.food?.title || 'Ask any Thailand Food you want to know.'}
      </h3>
      <div className="w-12 h-1 bg-gold-deep mt-2 rounded-full" />
    </div>
    <FoodChat language={language} />
  </div>
</GuideModal>

{/* Essential Apps Modal */}
<GuideModal
  isOpen={showAppsModal}
  onClose={() => setShowAppsModal(false)}
  title="Essential Apps & Tools"
  subtitle={uiT.transport?.detailsTitle || 'Transportation'}
  icon={<Compass size={20} />}
  footer={`${uiT.footer?.transportAppsGuide || 'Transportation Apps Guide'} • ${uiT.footer?.by || 'AsiaBuddy Services'}`}
>

<div className="markdown-body">
  <MarkdownRenderer content={(TRANSPORT_DETAILS[language] || TRANSPORT_DETAILS['EN'])?.appsGuideMarkdown || 
    (TRANSPORT_DETAILS['EN']?.appsGuideMarkdown || '')} />
</div>

</GuideModal>
      {/* Menu Overlay */}
      <AnimatePresence>
        {showMenu && (
          <div className="fixed inset-0 z-[70] flex items-start justify-start">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMenu(false)}
              className="absolute inset-0 bg-sacred-green/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className="relative w-full max-w-[320px] h-full bg-white shadow-2xl overflow-y-auto scrollbar-thin scrollbar-thumb-gold-soft flex flex-col"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-sacred-bg/30">
                <div className="flex flex-col">
                  <h3 className="text-xl font-serif text-gold-deep leading-none">{uiT.menu}</h3>
                  <p className="text-[8px] uppercase tracking-widest text-gray-400 mt-1">{uiT.heroSub}</p>
                </div>
                <button onClick={() => setShowMenu(false)} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-8">
                {/* Travel Planning */}
                <section>
                  <h4 className="text-[9px] uppercase font-bold tracking-[0.3em] text-gray-400 mb-4 px-2">{uiT.menuCategories?.travel}</h4>
                  <div className="grid gap-1">
                    <button 
                      onClick={() => { setShowChecklist(true); setShowMenu(false); }}
                      className="flex items-center gap-4 p-3 rounded-2xl w-full text-left bg-gradient-to-r from-sacred-green/10 to-transparent text-sacred-green hover:from-sacred-green/20 transition-all mb-2 border border-sacred-green/10"
                    >
                      <Briefcase size={18} className="text-gold-deep" />
                      <span className="text-xs font-bold uppercase tracking-widest">{uiT.checklist?.readyButton || 'Travel Ready?'}</span>
                    </button>
                    <button 
                      onClick={() => { setActiveView('explorer'); setShowMenu(false); }}
                      className={`flex items-center gap-4 p-3 rounded-2xl w-full text-left transition-all ${activeView === 'explorer' ? 'bg-gold-deep text-white shadow-lg' : 'hover:bg-sacred-bg text-gray-700'}`}
                    >
                      <MapIcon size={18} />
                      <span className="text-xs font-bold uppercase tracking-widest">{uiT.explore}</span>
                    </button>
                    <button 
                      onClick={() => { setActiveView('chat'); setShowMenu(false); }}
                      className={`flex items-center gap-4 p-3 rounded-2xl w-full text-left transition-all ${activeView === 'chat' ? 'bg-gold-deep text-white shadow-lg' : 'hover:bg-sacred-bg text-gray-700'}`}
                    >
                      <MessageSquare size={18} />
                      <span className="text-xs font-bold uppercase tracking-widest">{uiT.concierge}</span>
                    </button>
                  </div>
                </section>

                {/* Essential Guides */}
                <section>
                  <h4 className="text-[9px] uppercase font-bold tracking-[0.3em] text-gray-400 mb-4 px-2">{uiT.menuCategories?.guides}</h4>
                  <div className="grid gap-1">
                    <button 
                      onClick={() => { setShowInfoModal(true); setShowMenu(false); }}
                      className="flex items-center gap-4 p-3 rounded-2xl w-full text-left hover:bg-gold-soft/10 text-gray-700 transition-all border border-transparent hover:border-gold-soft/20"
                    >
                      <div className="w-8 h-8 rounded-lg bg-sacred-bg flex items-center justify-center text-gold-deep">
                        <Info size={16} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest">{uiT.tabs?.information}</span>
                    </button>
                    <button 
                      onClick={() => { setShowVisaModal(true); setShowMenu(false); }}
                      className="flex items-center gap-4 p-3 rounded-2xl w-full text-left hover:bg-gold-soft/10 text-gray-700 transition-all border border-transparent hover:border-gold-soft/20"
                    >
                      <div className="w-8 h-8 rounded-lg bg-sacred-bg flex items-center justify-center text-gold-deep">
                        <FileCheck size={16} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest">{uiT.visa?.title}</span>
                    </button>
                    <button 
                      onClick={() => { setShowTravelTypesModal(true); setShowMenu(false); }}
                      className="flex items-center gap-4 p-3 rounded-2xl w-full text-left hover:bg-gold-soft/10 text-gray-700 transition-all border border-transparent hover:border-gold-soft/20"
                    >
                      <div className="w-8 h-8 rounded-lg bg-sacred-bg flex items-center justify-center text-gold-deep">
                        <Plane size={16} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest">{uiT.travelTypes?.title}</span>
                    </button>
                    <button 
                      onClick={() => { setShowTransportModal(true); setShowMenu(false); }}
                      className="flex items-center gap-4 p-3 rounded-2xl w-full text-left hover:bg-gold-soft/10 text-gray-700 transition-all border border-transparent hover:border-gold-soft/20"
                    >
                      <div className="w-8 h-8 rounded-lg bg-sacred-bg flex items-center justify-center text-gold-deep" id="menu-transport-btn">
                        <Bus size={16} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest">{uiT.transport?.detailsTitle}</span>
                    </button>
                    {/* Booking Link in Menu */}
                    <button 
                      onClick={() => { setShowBookingModal(true); setShowMenu(false); }}
                      className="flex items-center gap-4 p-3 pl-8 rounded-2xl w-full text-left hover:bg-gold-soft/10 text-gray-700 transition-all border border-transparent hover:border-gold-soft/20"
                      id="menu-booking-btn"
                    >
                      <div className="w-6 h-6 rounded-lg bg-sacred-bg flex items-center justify-center text-gold-deep">
                        <Plane size={12} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest leading-tight">
                        {uiT.booking?.link || 'Book car rentals, bus tickets, flight tickets, and entrance fees.'}
                      </span>
                    </button>
                    <button 
                      onClick={() => { setShowAccommodationModal(true); setShowMenu(false); }}
                      className="flex items-center gap-4 p-3 rounded-2xl w-full text-left hover:bg-gold-soft/10 text-gray-700 transition-all border border-transparent hover:border-gold-soft/20"
                    >
                      <div className="w-8 h-8 rounded-lg bg-sacred-bg flex items-center justify-center text-gold-deep">
                        <Home size={16} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest">{uiT.accommodation?.detailsTitle || 'Accommodations'}</span>
                    </button>
                    <button 
                      onClick={() => { setShowFoodModal(true); setShowMenu(false); }}
                      className="flex items-center gap-4 p-3 rounded-2xl w-full text-left hover:bg-gold-soft/10 text-gray-700 transition-all border border-transparent hover:border-gold-soft/20"
                    >
                      <div className="w-8 h-8 rounded-lg bg-sacred-bg flex items-center justify-center text-gold-deep">
                        <Utensils size={16} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest">{uiT.food?.detailsTitle || 'Thailand Food Guide'}</span>
                    </button>
                    <button 
                      onClick={() => { setShowShoppingModal(true); setShowMenu(false); }}
                      className="flex items-center gap-4 p-3 rounded-2xl w-full text-left hover:bg-gold-soft/10 text-gray-700 transition-all border border-transparent hover:border-gold-soft/20"
                    >
                      <div className="w-8 h-8 rounded-lg bg-sacred-bg flex items-center justify-center text-gold-deep">
                        <ShoppingBag size={16} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest">{uiT.shopping?.detailsTitle || 'Thailand Shopping Guide'}</span>
                    </button>
                    <button 
                      onClick={() => { setShowMedicalModal(true); setShowMenu(false); }}
                      className="flex items-center gap-4 p-3 rounded-2xl w-full text-left hover:bg-gold-soft/10 text-gray-700 transition-all border border-transparent hover:border-gold-soft/20"
                    >
                      <div className="w-8 h-8 rounded-lg bg-sacred-bg flex items-center justify-center text-gold-deep">
                        <Stethoscope size={16} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest">{uiT.medical?.title || 'Medical Travel Guide'}</span>
                    </button>
                    <button 
                      onClick={() => { setShowNightlifeModal(true); setShowMenu(false); }}
                      className="flex items-center gap-4 p-3 rounded-2xl w-full text-left hover:bg-gold-soft/10 text-gray-700 transition-all border border-transparent hover:border-gold-soft/20"
                    >
                      <div className="w-8 h-8 rounded-lg bg-sacred-bg flex items-center justify-center text-gold-deep">
                        <Music size={16} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest">{uiT.nightlife?.title || 'Nightlife Guide'}</span>
                    </button>
                    <button 
                      onClick={() => { setShowVatModal(true); setShowMenu(false); }}
                      className="flex items-center gap-4 p-3 rounded-2xl w-full text-left hover:bg-gold-soft/10 text-gray-700 transition-all border border-transparent hover:border-gold-soft/20"
                    >
                      <div className="w-8 h-8 rounded-lg bg-sacred-bg flex items-center justify-center text-gold-deep">
                        <Receipt size={16} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest">{uiT.vatRefund?.title}</span>
                    </button>
                    <button 
                      onClick={() => { setShowAppsModal(true); setShowMenu(false); }}
                      className="flex items-center gap-4 p-3 rounded-2xl w-full text-left hover:bg-gold-soft/10 text-gray-700 transition-all border border-transparent hover:border-gold-soft/20"
                    >
                      <div className="w-8 h-8 rounded-lg bg-sacred-bg flex items-center justify-center text-gold-deep">
                        <Compass size={16} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest">{uiT.menuCategories?.essentialApps || 'Essential Apps'}</span>
                    </button>
                  </div>
                </section>

                <section>
                  <div className="grid gap-1">
                    <button 
                      onClick={() => { setShowCurrencyModal(true); setShowMenu(false); }}
                      className="p-3 bg-sacred-bg/30 rounded-xl border border-gold-soft/10 text-left hover:border-gold-deep transition-all"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-tighter text-sacred-green">{(uiT.tools || {}).currency}</p>
                    </button>
                    <button 
                      onClick={() => { setShowPhrasesModal(true); setShowMenu(false); }}
                      className="p-3 bg-sacred-bg/30 rounded-xl border border-gold-soft/10 text-left hover:border-gold-deep transition-all"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-tighter text-sacred-green">{(uiT.tools || {}).phrases || 'Essential Phrases'}</p>
                    </button>
                    <button 
                      onClick={() => { setShowEtiquetteModal(true); setShowMenu(false); }}
                      className="p-3 bg-sacred-bg/30 rounded-xl border border-gold-soft/10 text-left hover:border-gold-deep transition-all"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-tighter text-sacred-green">{(uiT.tools || {}).etiquette || 'Thai Etiquette'}</p>
                    </button>
                    <button 
                      onClick={() => { setShowLawsModal(true); setShowMenu(false); }}
                      className="p-3 bg-sacred-bg/30 rounded-xl border border-gold-soft/10 text-left hover:border-gold-deep transition-all"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-tighter text-sacred-green">{(uiT.tools || {}).laws || 'Key Laws'}</p>
                    </button>
                    {[].map((tool) => (
                      <div key={tool} className="p-3 bg-sacred-bg/30 rounded-xl border border-gold-soft/10">
                        <p className="text-[10px] font-bold uppercase tracking-tighter text-sacred-green">{(uiT.tools || {})[tool]}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="mt-auto p-8 bg-sacred-bg/50 border-t border-gold-soft/10">
                <div className="mb-4">
                  <p className="text-[9px] uppercase font-bold tracking-[0.3em] text-gray-400 mb-3">Discover</p>
                  <div className="grid gap-1">
                    <a href="/thailand/tour" onClick={() => setShowMenu(false)}
                      className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gold-soft/10 text-gray-700 transition-all border border-transparent hover:border-gold-soft/20">
                      <div className="w-7 h-7 rounded-lg bg-sacred-bg flex items-center justify-center text-gold-deep">
                        <MapIcon size={14} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest">Tour Packages</span>
                    </a>
                    <a href="/thailand/blog" onClick={() => setShowMenu(false)}
                      className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gold-soft/10 text-gray-700 transition-all border border-transparent hover:border-gold-soft/20">
                      <div className="w-7 h-7 rounded-lg bg-sacred-bg flex items-center justify-center text-gold-deep">
                        <FileText size={14} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest">Travel Blog</span>
                    </a>
                    <a href="/thailand/destination" onClick={() => setShowMenu(false)}
                      className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gold-soft/10 text-gray-700 transition-all border border-transparent hover:border-gold-soft/20">
                      <div className="w-7 h-7 rounded-lg bg-sacred-bg flex items-center justify-center text-gold-deep">
                        <Compass size={14} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest">Destinations</span>
                    </a>
                  </div>
                </div>
                <p className="text-[8px] uppercase tracking-widest text-gray-400 font-bold mb-2">{uiT.tools?.serviceMinded || 'Service Minded'}</p>
                <div className="flex items-center gap-3 text-gold-deep">
                  <ShieldCheck size={18} />
                  <span className="text-[10px] font-bold uppercase">{uiT.touristPolice || 'Tourist Police'}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Global Phrases Modal */}
      <AnimatePresence>
        {showPhrasesModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPhrasesModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 bg-sacred-bg border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold-deep/10 flex items-center justify-center text-gold-deep">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-sacred-green leading-none mb-1">
                      {uiT.tools?.phrases || 'Essential Thai Phrases'}
                    </h2>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter text-gold-deep">
                      Basics, Audio & Pronunciation Guide
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowPhrasesModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto bg-white">
                 <PhrasesChat language={language} />
              </div>
              
              <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-center italic text-[10px] text-gray-400">
                Thai Language Essentials &bull; AsiaBuddy Services
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Etiquette Modal */}
      <AnimatePresence>
        {showEtiquetteModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEtiquetteModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 bg-sacred-bg border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold-deep/10 flex items-center justify-center text-gold-deep">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-sacred-green leading-none mb-1">
                      {uiT.tools?.etiquette || 'Thai Etiquette Guide'}
                    </h2>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter text-gold-deep">
                      Cultural Dos & Don'ts &bull; Local Customs
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowEtiquetteModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto bg-white">
                 <EtiquetteGuide language={language} />
              </div>
              
              <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-center italic text-[10px] text-gray-400">
                Thai Cultural Excellence &bull; AsiaBuddy Services
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Laws Modal */}
      <AnimatePresence>
        {showLawsModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLawsModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 bg-sacred-bg border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
                    <Gavel size={20} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-sacred-green leading-none mb-1">
                      {uiT.tools?.laws || 'Key Laws in Thailand'}
                    </h2>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter text-red-600">
                      Essential Regulations &bull; Updated for 2026
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowLawsModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto bg-white">
                 <LawsGuide language={language} />
              </div>
              
              <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-center italic text-[10px] text-gray-400">
                Official Compliance &bull; AsiaBuddy Law Enforcement Guide
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Global Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBookingModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 bg-sacred-bg border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold-deep/10 flex items-center justify-center text-gold-deep">
                    <Ticket size={20} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-sacred-green leading-none mb-1">
                      {uiT.booking?.chatTitle || 'Booking Assistance'}
                    </h2>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter text-gold-deep">
                      {uiT.footer?.officialService || 'Official AsiaBuddy Service'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowBookingModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-4 md:p-8 bg-white">
                 <BookingChat language={language} />
              </div>
              
              <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-center italic text-[10px] text-gray-400">
                {uiT.booking?.disclaimer || 'Prices are estimates only'} &bull; {uiT.booking?.estimateNotice || 'Service rates subject to change'}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Global Currency Modal */}
      <AnimatePresence>
        {showCurrencyModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCurrencyModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 bg-sacred-bg border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold-deep/10 flex items-center justify-center text-gold-deep">
                    <Calculator size={20} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-sacred-green leading-none mb-1">
                      {uiT.tools?.currency || 'Currency (THB) Converter'}
                    </h2>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter text-gold-deep">
                      {uiT.footer?.liveEstimates || 'Live Estimates'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowCurrencyModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 bg-white">
                 <CurrencyConverter language={language} />
              </div>
              
              <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-center italic text-[10px] text-gray-400">
                {uiT.footer?.estimatesDisclaimer || 'Rates are estimates only'} &bull; {uiT.footer?.preservance || 'Preserving Excellence in Thai Hospitality'}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Checklist Modal */}
      <AnimatePresence>
        {showChecklist && (
          <TripChecklist 
            language={language} 
            onClose={() => setShowChecklist(false)} 
          />
        )}
      </AnimatePresence>
      <InstallBanner language={language} />
      <IOSInstallBanner language={language} />
      <CookieBanner />
    </div>
  );
}

