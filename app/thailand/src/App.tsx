import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThaiLanguage } from './types';
import EmergencyBanner from './components/EmergencyBanner';
import LanguageSelector from './components/LanguageSelector';
import ConciergeChat from './components/ConciergeChat';
import TransportChat from './components/TransportChat';
import FoodChat from './components/FoodChat';
import AccommodationChat from './components/AccommodationChat';
import DestinationExplorer from './components/DestinationExplorer';
import TravelToolbox from './components/TravelToolbox';
import LanguageWelcome from './components/LanguageWelcome';
import { UI_TRANSLATIONS } from './i18n';
import { GENERAL_INFORMATION } from './data/generalInformation';
import { TRANSPORT_DETAILS } from './data/transportDetails';
import { ACCOMMODATION_GUIDE } from './data/accommodationGuide';
import { FOOD_GUIDE_MARKDOWN } from './data/foodGuide';
import { MEDICAL_GUIDE_MARKDOWN } from './data/medicalGuide';
import { NIGHTLIFE_GUIDE_MARKDOWN } from './data/nightlifeGuide';
import { VAT_REFUND_GUIDE } from './data/vatRefundGuide';
import { VISA_GUIDE } from './data/visaGuide';
import { TRAVEL_STYLE_GUIDE } from './data/travelStyleGuide';
import { SHOPPING_GUIDE_MARKDOWN } from './data/shoppingGuide';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Compass, MessageSquare, Map as MapIcon, ShieldCheck, Languages, Info, X, Bus, ChevronRight, Check, AlertCircle, Receipt, FileCheck, Menu, Grid, MessageCircle, Home, Utensils, Plane, Ticket, Stethoscope, Music, ShoppingBag, Calculator, Gavel, Briefcase, Phone, Mail, Globe } from 'lucide-react';
import TripPlannerChat from './components/TripPlannerChat';
import MedicalChat from './components/MedicalChat';
import NightlifeChat from './components/NightlifeChat';
import ShoppingChat from './components/ShoppingChat';
import BookingChat from './components/BookingChat';
import CurrencyConverter from './components/CurrencyConverter';
import PhrasesChat from './components/PhrasesChat';
import EtiquetteGuide from './components/EtiquetteGuide';
import LawsGuide from './components/LawsGuide';
import { TripChecklist } from './components/TripChecklist';

export default function App() {
  const [language, setLanguage] = useState<ThaiLanguage>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('thaiguide_target_lang') : null;
    if (saved === 'english') return 'EN';
    if (saved === 'thai') return 'TH';
    if (saved === 'myanmar') return 'MM';
    if (saved === 'spanish') return 'ES';
    if (saved === 'french') return 'FR';
    if (saved === 'german') return 'DE';
    return (saved as ThaiLanguage) || 'EN';
  });
  const [hasStarted, setHasStarted] = useState(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('thaiguide_has_started') === 'true' : false;
  });
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
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [showPhrasesModal, setShowPhrasesModal] = useState(false);
  const [showEtiquetteModal, setShowEtiquetteModal] = useState(false);
  const [showLawsModal, setShowLawsModal] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.EN;
  const uiT = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.EN;

  // Standardized Markdown components for all guides
  const MarkdownComponents: any = {
    h1: ({ node, ...props }: any) => <h1 className="text-2xl font-serif text-sacred-green mb-8 border-b border-gold-soft/20 pb-4 leading-tight" {...props} />,
    h2: ({ node, ...props }: any) => <h2 className="text-lg font-serif text-sacred-green mt-12 mb-6 flex items-center gap-3 before:content-[''] before:w-1 before:h-6 before:bg-gold-deep before:rounded-full" {...props} />,
    h3: ({ node, ...props }: any) => <h3 className="text-base font-bold uppercase tracking-widest text-gold-deep mt-8 mb-4 border-b border-gray-50 pb-2" {...props} />,
    h4: ({ node, ...props }: any) => <h4 className="text-sm font-bold text-gray-800 mt-6 mb-2" {...props} />,
    p: ({ node, ...props }: any) => <p className="text-xs text-gray-700 leading-relaxed mb-5" {...props} />,
    ul: ({ node, ...props }: any) => <ul className="space-y-3 mb-6 list-none p-0" {...props} />,
    li: ({ node, ...props }: any) => (
      <li className="flex gap-3 text-xs text-gray-700 leading-relaxed">
        <span className="text-gold-deep mt-1 flex-shrink-0">•</span>
        <span {...props} />
      </li>
    ),
    strong: ({ node, ...props }: any) => <strong className="font-bold text-gray-900 bg-gold-soft/10 px-1 rounded" {...props} />,
    em: ({ node, ...props }: any) => <em className="italic text-gray-600 font-serif" {...props} />,
    a: ({ node, ...props }: any) => <a {...props} target="_self" className="text-gold-deep hover:underline font-bold" />,
    hr: ({ node, ...props }: any) => <hr className="my-12 border-gray-100" {...props} />,
    u: ({ node, ...props }: any) => <span className="underline decoration-gold-soft/50 decoration-2 underline-offset-4" {...props} />
  };

  const handleStart = (lang: ThaiLanguage) => {
    setLanguage(lang);
    setHasStarted(true);
    localStorage.setItem('thaiguide_target_lang', lang);
    localStorage.setItem('thaiguide_has_started', 'true');
  };

  const handleResetLanguage = () => {
    setHasStarted(false);
    localStorage.removeItem('thaiguide_has_started');
  };

  if (!hasStarted) {
    return <LanguageWelcome onStart={handleStart} />;
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
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-sacred-green/5">
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

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex items-center justify-center gap-4 md:gap-6 mt-10"
            >
              <a 
                href="https://m.me/asiabuddyapp" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group p-3 bg-white/40 backdrop-blur-md rounded-full text-sacred-green hover:bg-sacred-green hover:text-white transition-all shadow-sm border border-gold-deep/20"
                id="social-messenger"
              >
                <MessageCircle size={20} />
              </a>
              <a 
                href="https://wa.me/+491793956759" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group p-3 bg-white/40 backdrop-blur-md rounded-full text-sacred-green hover:bg-emerald-600 hover:text-white transition-all shadow-sm border border-gold-deep/20"
                id="social-whatsapp"
              >
                <MessageSquare size={20} />
              </a>
              <a 
                href="mailto:asiabuddyapp@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group p-3 bg-white/40 backdrop-blur-md rounded-full text-sacred-green hover:bg-red-700 hover:text-white transition-all shadow-sm border border-gold-deep/20"
                id="social-email"
              >
                <Mail size={20} />
              </a>
              <a 
                href="https://asiabuddy.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group p-3 bg-white/40 backdrop-blur-md rounded-full text-sacred-green hover:bg-gold-deep hover:text-white transition-all shadow-sm border border-gold-deep/20"
                id="social-website"
              >
                <Globe size={20} />
              </a>
            </motion.div>
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
                  onOpenVatModal={() => setShowVatModal(true)}
                  onOpenVisaModal={() => setShowVisaModal(true)}
                  onOpenTransportModal={() => setShowTransportModal(true)}
                  onOpenAppsModal={() => setShowAppsModal(true)}
                  onOpenAccommodationModal={() => setShowAccommodationModal(true)}
                  onOpenFoodModal={() => setShowFoodModal(true)}
                  onOpenTravelTypesModal={() => setShowTravelTypesModal(true)}
                  onOpenMedicalModal={() => setShowMedicalModal(true)}
                  onOpenNightlifeModal={() => setShowNightlifeModal(true)}
                  onOpenShoppingModal={() => setShowShoppingModal(true)}
                  onOpenBookingModal={() => setShowBookingModal(true)}
                  onOpenPhrasesModal={() => setShowPhrasesModal(true)}
                  onOpenEtiquetteModal={() => setShowEtiquetteModal(true)}
                  onOpenLawsModal={() => setShowLawsModal(true)}
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
              
              <div className="mt-12 p-6 glass-card bg-sacred-green/5 flex items-center justify-between border-sacred-green/10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-full text-sacred-green shadow-sm">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-sacred-green">{t.touristPolice}</h4>
                    <p className="text-[10px] text-gray-800 italic">{t.assistance}</p>
                  </div>
                </div>
                <button className="px-6 py-2 bg-gold-deep text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-sacred-green transition-colors shadow-md">
                  {t.contactNow}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Travel Types Modal */}
      <AnimatePresence>
        {showTravelTypesModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTravelTypesModal(false)}
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
                    <Plane size={20} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-sacred-green leading-none mb-1">
                      {(uiT.travelTypes as any)?.modalTitle || 'Comprehensive Guide to Traveling in Thailand'}
                    </h2>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter text-gold-deep">
                      {(uiT.travelTypes as any)?.modalSubtitle || 'Travel Styles & Planner'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowTravelTypesModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 scroll-smooth bg-white scrollbar-thin scrollbar-thumb-gold-soft scrollbar-track-transparent">
                <div className="markdown-body mb-20">
                  <ReactMarkdown 
                    rehypePlugins={[rehypeRaw]}
                    components={MarkdownComponents}
                  >
                    {TRAVEL_STYLE_GUIDE[language] || TRAVEL_STYLE_GUIDE['EN']}
                  </ReactMarkdown>
                </div>

                <div className="border-t border-gray-100 pt-12 pb-8">
                   <TripPlannerChat language={language} />
                </div>
              </div>
              
              <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-center italic text-[10px] text-gray-400">
                Comprehensive Travel Guide &bull; AsiaBuddy Services
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Medical Guide Modal */}
      <AnimatePresence>
        {showMedicalModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMedicalModal(false)}
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
                    <Stethoscope size={20} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-sacred-green leading-none mb-1">
                      {uiT.medical?.modalTitle || 'The Ultimate Thailand Medical Guide'}
                    </h2>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter text-gold-deep">
                      {uiT.medical?.modalSubtitle || 'Healthcare, Checkups & Preparation'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowMedicalModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 scroll-smooth bg-white scrollbar-thin scrollbar-thumb-gold-soft scrollbar-track-transparent">
                <div className="markdown-body mb-20">
                  <ReactMarkdown 
                    rehypePlugins={[rehypeRaw]}
                    components={MarkdownComponents}
                  >
                    {MEDICAL_GUIDE_MARKDOWN[language] || MEDICAL_GUIDE_MARKDOWN['EN']}
                  </ReactMarkdown>
                </div>

                <div className="border-t border-gray-100 pt-12 pb-8">
                   <MedicalChat language={language} />
                </div>
              </div>
              
              <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-center italic text-[10px] text-gray-400">
                Medical Tourism Guide &bull; AsiaBuddy Services
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Nightlife Guide Modal */}
      <AnimatePresence>
        {showNightlifeModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNightlifeModal(false)}
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
                    <Music size={20} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-sacred-green leading-none mb-1">
                      {uiT.nightlife?.modalTitle || 'The Ultimate Thailand Nightlife Guide'}
                    </h2>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter text-gold-deep">
                      {uiT.nightlife?.modalSubtitle || 'Clubs, Bars & Safety'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowNightlifeModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 scroll-smooth bg-white scrollbar-thin scrollbar-thumb-gold-soft scrollbar-track-transparent">
                <div className="markdown-body mb-20">
                  <ReactMarkdown 
                    rehypePlugins={[rehypeRaw]}
                    components={MarkdownComponents}
                  >
                    {NIGHTLIFE_GUIDE_MARKDOWN[language] || NIGHTLIFE_GUIDE_MARKDOWN['EN']}
                  </ReactMarkdown>
                </div>

                <div className="border-t border-gray-100 pt-12 pb-8">
                   <NightlifeChat language={language} />
                </div>
              </div>
              
              <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-center italic text-[10px] text-gray-400">
                Nightlife Guide &bull; AsiaBuddy Services
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Shopping Guide Modal */}
      <AnimatePresence>
        {showShoppingModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShoppingModal(false)}
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
                  <div className="w-10 h-10 rounded-xl bg-gold-deep flex items-center justify-center text-white shadow-lg">
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-sacred-green leading-none mb-1">
                      {uiT.shopping?.modalTitle || 'Comprehensive Thailand Shopping Guide'}
                    </h3>
                    <p className="text-[10px] text-gray-500 font-medium tracking-tight">
                      {uiT.shopping?.modalSubtitle || 'Malls & Local Markets'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowShoppingModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 scroll-smooth no-scrollbar bg-white max-w-none">
                <div className="markdown-body">
                  <ReactMarkdown 
                    rehypePlugins={[rehypeRaw]}
                    components={MarkdownComponents}
                  >
                    {SHOPPING_GUIDE_MARKDOWN[language] || SHOPPING_GUIDE_MARKDOWN['EN']}
                  </ReactMarkdown>
                </div>

                <div className="mt-12 pt-12 border-t border-gray-100">
                  <div className="mb-6">
                    <h3 className="text-lg font-serif text-sacred-green">{uiT.shopping?.title || 'Ask any Thailand Shopping you want to know.'}</h3>
                    <div className="w-12 h-1 bg-gold-deep mt-2 rounded-full" />
                  </div>
                  <ShoppingChat language={language} />
                </div>
              </div>
              
              <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-center italic text-[10px] text-gray-400">
                {uiT.footer?.shoppingGuide || 'Thailand Shopping Guide'} &bull; {uiT.footer?.by}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="mt-20">
        <EmergencyBanner 
          title={t.emergency} 
          policeLabel={t.touristPolice} 
          assistanceLabel={t.assistance} 
        />
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 md:py-20 mt-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-2xl mb-1 text-gold-deep">ThaiGuide</h3>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-700">{(t.footer || UI_TRANSLATIONS.EN.footer).by}</p>
            </div>
            <p className="text-sm text-gray-800 font-light max-w-sm italic">
              {(t.footer || UI_TRANSLATIONS.EN.footer).tagline}
            </p>
            <div className="flex items-center gap-5 pt-2">
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
      </footer>

      {/* Floating Concierge Icon */}
      <button
        onClick={() => setActiveView('chat')}
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

      {/* Global Information Modal */}
      <AnimatePresence>
        {showInfoModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInfoModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-sacred-bg/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-deep flex items-center justify-center text-white shadow-lg shadow-gold-deep/20">
                    <Info size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold uppercase tracking-widest text-sacred-green leading-none mb-1">
                      {uiT.infoModalTitle || 'Thailand Essentials Guide'}
                    </h2>
                    <p className="text-[10px] text-gray-500 font-medium lowercase italic">
                      {uiT.infoModalSubtitle || 'Practical guidance for your stay'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowInfoModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-gold-soft scrollbar-track-transparent bg-white">
                <div className="markdown-body">
                  <ReactMarkdown 
                    rehypePlugins={[rehypeRaw]}
                    components={MarkdownComponents}
                  >
                    {GENERAL_INFORMATION[language] || GENERAL_INFORMATION['EN']}
                  </ReactMarkdown>
                </div>
              </div>

              {/* Footer */}
              <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-center italic text-[10px] text-gray-400">
                AsiaBuddy Services &bull; Preserving Excellence in Thai Hospitality
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global VAT Refund Modal */}
      <AnimatePresence>
        {showVatModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowVatModal(false)}
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
                    <Receipt size={20} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-sacred-green leading-none mb-1">
                      {(UI_TRANSLATIONS[language]?.vatRefund || UI_TRANSLATIONS.EN.vatRefund).title}
                    </h2>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter text-gold-deep">
                      Customs & Money Back
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowVatModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 scroll-smooth bg-white scrollbar-thin scrollbar-thumb-gold-soft scrollbar-track-transparent">
                <div className="markdown-body">
                  <ReactMarkdown 
                    rehypePlugins={[rehypeRaw]}
                    components={MarkdownComponents}
                  >
                    {VAT_REFUND_GUIDE[language] || VAT_REFUND_GUIDE['EN']}
                  </ReactMarkdown>
                </div>
              </div>
              
              <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-center italic text-[10px] text-gray-400">
                VAT Refund Guide for Travelers &bull; AsiaBuddy Services
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Visa Modal */}
      <AnimatePresence>
        {showVisaModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowVisaModal(false)}
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
                    <FileCheck size={20} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-sacred-green leading-none mb-1">
                      {(UI_TRANSLATIONS[language]?.visa || UI_TRANSLATIONS.EN.visa).modalTitle}
                    </h2>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter text-gold-deep">
                      Immigration & Entry
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowVisaModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 scroll-smooth bg-white scrollbar-thin scrollbar-thumb-gold-soft scrollbar-track-transparent">
                <div className="markdown-body">
                  <ReactMarkdown 
                    rehypePlugins={[rehypeRaw]}
                    components={MarkdownComponents}
                  >
                    {VISA_GUIDE[language] || VISA_GUIDE['EN']}
                  </ReactMarkdown>
                </div>
              </div>
              
              <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-center italic text-[10px] text-gray-400">
                Essential Thai Travel Visa Guide &bull; AsiaBuddy Services
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Transport Modal */}
      <AnimatePresence>
        {showTransportModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTransportModal(false)}
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
                    <Bus size={20} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-sacred-green leading-none mb-1">
                      {uiT.transport?.modalTitle || 'Thailand Nationwide Transport Guide'}
                    </h2>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter text-gold-deep">
                      {uiT.transport?.modalSubtitle || 'Transportation'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowTransportModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 scroll-smooth no-scrollbar bg-white max-w-none">
                <div className="markdown-body">
                  <ReactMarkdown 
                    rehypePlugins={[rehypeRaw]}
                    components={MarkdownComponents}
                  >
                    {(() => {
                      const transportData = TRANSPORT_DETAILS[language] || TRANSPORT_DETAILS['EN'];
                      // Show both guides if they exist
                      return [
                        transportData.fullGuideMarkdown,
                        transportData.appsGuideMarkdown ? `\n\n---\n\n${transportData.appsGuideMarkdown}` : ''
                      ].filter(Boolean).join('');
                    })()}
                  </ReactMarkdown>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Accommodation Modal */}
      <AnimatePresence>
        {showAccommodationModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAccommodationModal(false)}
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
                    <Home size={20} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-sacred-green leading-none mb-1">
                      {uiT.accommodation?.modalTitle || 'Comprehensive Guide to Accommodations in Thailand'}
                    </h2>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter text-gold-deep">
                      {uiT.accommodation?.detailsTitle || 'Accommodations'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAccommodationModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 scroll-smooth no-scrollbar bg-white max-w-none">
                <div className="markdown-body">
                  <ReactMarkdown 
                    rehypePlugins={[rehypeRaw]}
                    components={MarkdownComponents}
                  >
                    {ACCOMMODATION_GUIDE[language] || ACCOMMODATION_GUIDE['EN']}
                  </ReactMarkdown>
                </div>

                <div className="mt-12 pt-12 border-t border-gray-100">
                  <div className="mb-6">
                    <h3 className="text-lg font-serif text-sacred-green">{uiT.accommodation?.title}</h3>
                    <div className="w-12 h-1 bg-gold-deep mt-2 rounded-full" />
                  </div>
                  <AccommodationChat language={language} />
                </div>
              </div>
              
              <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-center italic text-[10px] text-gray-400">
                Accommodation Guide for Travelers &bull; AsiaBuddy Services
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Food Modal */}
      <AnimatePresence>
        {showFoodModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFoodModal(false)}
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
                    <Utensils size={20} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-sacred-green leading-none mb-1">
                      {uiT.food?.modalTitle || 'The Ultimate Thailand Food Guide: From Michelin Stars to Street Eats'}
                    </h2>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter text-gold-deep">
                      {uiT.food?.detailsTitle || 'Food Guide'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowFoodModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 scroll-smooth no-scrollbar bg-white max-w-none">
                <div className="markdown-body">
                  <ReactMarkdown 
                    rehypePlugins={[rehypeRaw]}
                    components={MarkdownComponents}
                  >
                    {FOOD_GUIDE_MARKDOWN[language] || FOOD_GUIDE_MARKDOWN['EN']}
                  </ReactMarkdown>
                </div>

                <div className="mt-12 pt-12 border-t border-gray-100">
                  <div className="mb-6">
                    <h3 className="text-lg font-serif text-sacred-green">{uiT.food?.title || 'Ask any Thailand Food you want to know.'}</h3>
                    <div className="w-12 h-1 bg-gold-deep mt-2 rounded-full" />
                  </div>
                  <FoodChat language={language} />
                </div>
              </div>
              
              <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-center italic text-[10px] text-gray-400">
                Thailand Food Guide &bull; AsiaBuddy Services
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Essential Apps Modal */}
      <AnimatePresence>
        {showAppsModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAppsModal(false)}
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
                    <Compass size={20} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-sacred-green leading-none mb-1">
                      Essential Apps & Tools
                    </h2>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter text-gold-deep">
                      {uiT.transport?.detailsTitle || 'Transportation'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAppsModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 scroll-smooth no-scrollbar bg-white max-w-none">
                <div className="markdown-body">
                  <ReactMarkdown 
                    rehypePlugins={[rehypeRaw]}
                    components={MarkdownComponents}
                  >
                    {(TRANSPORT_DETAILS[language] || TRANSPORT_DETAILS['EN'])?.appsGuideMarkdown || (TRANSPORT_DETAILS['EN']?.appsGuideMarkdown || '')}
                  </ReactMarkdown>
                </div>
              </div>
              
              <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-center italic text-[10px] text-gray-400">
                {uiT.footer?.transportAppsGuide || 'Transportation Apps Guide'} &bull; {uiT.footer?.by}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
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
    </div>
  );
}

