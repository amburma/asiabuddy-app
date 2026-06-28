'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ThaiLanguage } from '@/types/country'
import TravelToolbox from './TravelToolbox'
import GuideModal from './GuideModal'
import MarkdownRenderer from './MarkdownRenderer'
import { Plane, Stethoscope, Music, ShoppingBag, Home, Utensils, Bus, MessageSquare, ShieldCheck, Gavel, Receipt, FileCheck, Calculator, X } from 'lucide-react'
import { TRAVEL_STYLE_GUIDE } from '@/data/thailand/travelStyleGuide'
import { MEDICAL_GUIDE_MARKDOWN } from '@/data/thailand/medicalGuide'
import { NIGHTLIFE_GUIDE_MARKDOWN } from '@/data/thailand/nightlifeGuide'
import { SHOPPING_GUIDE_MARKDOWN } from '@/data/thailand/shoppingGuide'
import { ACCOMMODATION_GUIDE } from '@/data/thailand/accommodationGuide'
import { FOOD_GUIDE_MARKDOWN } from '@/data/thailand/foodGuide'
import { VISA_GUIDE } from '@/data/thailand/visaGuide'
import { VAT_REFUND_GUIDE } from '@/data/thailand/vatRefundGuide'
import { GENERAL_INFORMATION } from '@/data/thailand/generalInformation'
import { TRANSPORT_GUIDE } from '@/data/thailand/transportGuide'
import { BUDGET_GUIDE } from '@/data/thailand/budgetGuide'
import TransportChat from '../thailand/TransportChat'
import FoodChat from '../thailand/FoodChat'
import AccommodationChat from '../thailand/AccommodationChat'
import TripPlannerChat from '../thailand/TripPlannerChat'

interface ChatWidgetGridProps {
  language?: string
}
import MedicalChat from '../thailand/MedicalChat'
import NightlifeChat from '../thailand/NightlifeChat'
import ShoppingChat from '../thailand/ShoppingChat'
import PhrasesChat from '../thailand/PhrasesChat'
import LawsGuide from './LawsGuide'
import EtiquetteGuide from './EtiquetteGuide'

export default function ChatWidgetGrid({ language: langProp }: ChatWidgetGridProps) {
  const [language, setLanguage] = useState<ThaiLanguage>(
    (langProp?.toUpperCase() as ThaiLanguage) || 'EN'
  )
  const [showVatModal, setShowVatModal] = useState(false)
  const [showVisaModal, setShowVisaModal] = useState(false)
  const [showTransportModal, setShowTransportModal] = useState(false)
  const [showAppsModal, setShowAppsModal] = useState(false)
  const [showAccommodationModal, setShowAccommodationModal] = useState(false)
  const [showFoodModal, setShowFoodModal] = useState(false)
  const [showTravelTypesModal, setShowTravelTypesModal] = useState(false)
  const [showMedicalModal, setShowMedicalModal] = useState(false)

  useEffect(() => {
    if (langProp) {
      setLanguage(langProp.toUpperCase() as ThaiLanguage)
    }
  }, [langProp])

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail
      const modalId = detail?.modalId
      const lang = detail?.language
      if (lang) setLanguage(lang.toUpperCase() as ThaiLanguage)
      if (modalId) handleOpenModal(modalId)
    }
    window.addEventListener('openGuideModal', handler)
    return () => window.removeEventListener('openGuideModal', handler)
  }, [])
  const [showNightlifeModal, setShowNightlifeModal] = useState(false)
  const [showShoppingModal, setShowShoppingModal] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showPhrasesModal, setShowPhrasesModal] = useState(false)
  const [showEtiquetteModal, setShowEtiquetteModal] = useState(false)
  const [showLawsModal, setShowLawsModal] = useState(false)
  const [showInformationModal, setShowInformationModal] = useState(false)
  const [showBudgetModal, setShowBudgetModal] = useState(false)

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
      case 'information': setShowInformationModal(true); break
      case 'budget': setShowBudgetModal(true); break
    }
  }

  return (
    <>
      <TravelToolbox
        language={language}
        onOpenModal={handleOpenModal}
      />

      {/* Travel Types Modal */}
      <GuideModal
        isOpen={showTravelTypesModal}
        onClose={() => setShowTravelTypesModal(false)}
        title="Comprehensive Guide to Traveling in Thailand"
        subtitle="Travel Styles & Planner"
        icon={<Plane size={20} />}
        footer="Comprehensive Travel Guide • AsiaBuddy Services"
      >
        <div className="markdown-body mb-20">
          <MarkdownRenderer content={TRAVEL_STYLE_GUIDE[language] || TRAVEL_STYLE_GUIDE['EN']} />
        </div>
        <div className="border-t border-gray-100 pt-12 pb-8">
          <TripPlannerChat language={language} />
        </div>
      </GuideModal>

      {/* Visa Modal */}
      <GuideModal
        isOpen={showVisaModal}
        onClose={() => setShowVisaModal(false)}
        title="Thailand Visa Guide"
        subtitle="Visa Information"
        icon={<FileCheck size={20} />}
        footer="Visa Guide • AsiaBuddy Services"
      >
        <div className="markdown-body">
          <MarkdownRenderer content={VISA_GUIDE[language] || VISA_GUIDE['EN']} />
        </div>
      </GuideModal>

      {/* Transport Modal */}
      <GuideModal
        isOpen={showTransportModal}
        onClose={() => setShowTransportModal(false)}
        title="Thailand Nationwide Transport Guide"
        subtitle="Transportation"
        icon={<Bus size={20} />}
        footer="Thailand Transport Guide • AsiaBuddy Services"
      >
        <div className="markdown-body mb-20">
          <MarkdownRenderer content={TRANSPORT_GUIDE[language] || TRANSPORT_GUIDE['EN']} />
        </div>
        <div className="border-t border-gray-100 pt-12 pb-8">
          <div className="mb-6">
            <h3 className="text-lg font-serif text-sacred-green">
              Ask anything about transport in Thailand.
            </h3>
            <div className="w-12 h-1 bg-gold-deep mt-2 rounded-full" />
          </div>
          <TransportChat language={language} />
        </div>
      </GuideModal>

      {/* Apps Modal */}
      <GuideModal
        isOpen={showAppsModal}
        onClose={() => setShowAppsModal(false)}
        title="Essential Apps & Tools"
        subtitle="Transportation"
        icon={<Bus size={20} />}
        footer="Transportation Apps Guide • AsiaBuddy Services"
      >
        <div className="markdown-body">
          <MarkdownRenderer content="" />
        </div>
      </GuideModal>

      {/* Accommodation Modal */}
      <GuideModal
        isOpen={showAccommodationModal}
        onClose={() => setShowAccommodationModal(false)}
        title="Comprehensive Guide to Accommodations in Thailand"
        subtitle="Accommodations"
        icon={<Home size={20} />}
        footer="Accommodation Guide for Travelers • AsiaBuddy Services"
      >
        <div className="markdown-body">
          <MarkdownRenderer content={ACCOMMODATION_GUIDE[language] || ACCOMMODATION_GUIDE['EN']} />
        </div>
        <div className="mt-12 pt-12 border-t border-gray-100">
          <div className="mb-6">
            <h3 className="text-lg font-serif text-sacred-green">
              Ask any Thailand Accommodation you want to know.
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
        title="The Ultimate Thailand Food Guide: From Michelin Stars to Street Eats"
        subtitle="Food Guide"
        icon={<Utensils size={20} />}
        footer="Thailand Food Guide • AsiaBuddy Services"
      >
        <div className="markdown-body">
          <MarkdownRenderer content={FOOD_GUIDE_MARKDOWN[language] || FOOD_GUIDE_MARKDOWN['EN']} />
        </div>
        <div className="mt-12 pt-12 border-t border-gray-100">
          <div className="mb-6">
            <h3 className="text-lg font-serif text-sacred-green">
              Ask any Thailand Food you want to know.
            </h3>
            <div className="w-12 h-1 bg-gold-deep mt-2 rounded-full" />
          </div>
          <FoodChat language={language} />
        </div>
      </GuideModal>

      {/* Medical Modal */}
      <GuideModal
        isOpen={showMedicalModal}
        onClose={() => setShowMedicalModal(false)}
        title="The Ultimate Thailand Medical Guide"
        subtitle="Healthcare, Checkups & Preparation"
        icon={<Stethoscope size={20} />}
        footer="Medical Tourism Guide • AsiaBuddy Services"
      >
        <div className="markdown-body mb-20">
          <MarkdownRenderer content={MEDICAL_GUIDE_MARKDOWN[language] || MEDICAL_GUIDE_MARKDOWN['EN']} />
        </div>
        <div className="border-t border-gray-100 pt-12 pb-8">
          <MedicalChat language={language} />
        </div>
      </GuideModal>

      {/* Nightlife Modal */}
      <GuideModal
        isOpen={showNightlifeModal}
        onClose={() => setShowNightlifeModal(false)}
        title="The Ultimate Thailand Nightlife Guide"
        subtitle="Clubs, Bars & Safety"
        icon={<Music size={20} />}
        footer="Nightlife Guide • AsiaBuddy Services"
      >
        <div className="markdown-body mb-20">
          <MarkdownRenderer content={NIGHTLIFE_GUIDE_MARKDOWN[language] || NIGHTLIFE_GUIDE_MARKDOWN['EN']} />
        </div>
        <div className="border-t border-gray-100 pt-12 pb-8">
          <NightlifeChat language={language} />
        </div>
      </GuideModal>

      {/* Shopping Modal */}
      <GuideModal
        isOpen={showShoppingModal}
        onClose={() => setShowShoppingModal(false)}
        title="Comprehensive Thailand Shopping Guide"
        subtitle="Malls & Local Markets"
        icon={<ShoppingBag size={20} />}
        footer="Thailand Shopping Guide • AsiaBuddy Services"
      >
        <div className="markdown-body">
          <MarkdownRenderer content={SHOPPING_GUIDE_MARKDOWN[language] || SHOPPING_GUIDE_MARKDOWN['EN']} />
        </div>
        <div className="mt-12 pt-12 border-t border-gray-100">
          <div className="mb-6">
            <h3 className="text-lg font-serif text-sacred-green">
              Ask any Thailand Shopping you want to know.
            </h3>
            <div className="w-12 h-1 bg-gold-deep mt-2 rounded-full" />
          </div>
          <ShoppingChat language={language} />
        </div>
      </GuideModal>

      {/* Information Modal */}
      <GuideModal
        isOpen={showInformationModal}
        onClose={() => setShowInformationModal(false)}
        title="Thailand General Information"
        subtitle="Essential Travel Guide"
        icon={<MessageSquare size={20} />}
        footer="General Information • AsiaBuddy Services"
      >
        <div className="markdown-body">
          <MarkdownRenderer content={GENERAL_INFORMATION[language] || GENERAL_INFORMATION['EN']} />
        </div>
      </GuideModal>

      {/* VAT Modal */}
      <GuideModal
        isOpen={showVatModal}
        onClose={() => setShowVatModal(false)}
        title="VAT Refund Guide"
        subtitle="Tax Refund Information"
        icon={<Receipt size={20} />}
        footer="VAT Refund Guide • AsiaBuddy Services"
      >
        <div className="markdown-body">
          <MarkdownRenderer content={VAT_REFUND_GUIDE[language] || VAT_REFUND_GUIDE['EN']} />
        </div>
      </GuideModal>

      {/* Budget Modal */}
      <GuideModal
        isOpen={showBudgetModal}
        onClose={() => setShowBudgetModal(false)}
        title="Thailand Budget & Money-Saving Guide"
        subtitle="Smart Travel Tips"
        icon={<Calculator size={20} />}
        footer="Budget Guide • AsiaBuddy Services"
      >
        <div className="markdown-body mb-20">
          <MarkdownRenderer content={BUDGET_GUIDE[language] || BUDGET_GUIDE['EN']} />
        </div>
      </GuideModal>

      {/* Phrases Modal */}
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
                      Essential Thai Phrases
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

      {/* Etiquette Modal */}
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
                      Thai Etiquette Guide
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

      {/* Laws Modal */}
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
                      Key Laws in Thailand
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

      {/* Booking Modal */}
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
                    <Calculator size={20} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-sacred-green leading-none mb-1">
                      Booking Assistance
                    </h2>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter text-gold-deep">
                      Official AsiaBuddy Service
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
                 {/* BookingChat component would go here */}
              </div>
              
              <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-center italic text-[10px] text-gray-400">
                Prices are estimates only &bull; Service rates subject to change
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
