"use client";

import { useState } from 'react';
import { motion } from 'framer-motion'; // framer-motion ကို ပြောင်းသုံးပါ
import { ThaiLanguage } from '../types';
import { UI_TRANSLATIONS } from '../i18n';
import { 
  Calculator, Cloud, Bus, Receipt, FileCheck, Info, Home, 
  Utensils, Stethoscope, Music, ShoppingBag, MessageSquare, 
  ShieldCheck, Gavel, Navigation, Calendar 
} from 'lucide-react';
import CurrencyConverter from './CurrencyConverter';

interface Props {
  language: ThaiLanguage;
  onOpenVatModal: () => void;
  onOpenVisaModal: () => void;
  onOpenTransportModal: () => void;
  onOpenAppsModal: () => void;
  onOpenAccommodationModal: () => void;
  onOpenFoodModal: () => void;
  onOpenTravelTypesModal: () => void;
  onOpenMedicalModal: () => void;
  onOpenNightlifeModal: () => void;
  onOpenShoppingModal: () => void;
  onOpenBookingModal: () => void;
  onOpenPhrasesModal: () => void;
  onOpenEtiquetteModal: () => void;
  onOpenLawsModal: () => void;
}

export default function TravelToolbox({ 
  language, 
  onOpenVatModal, 
  onOpenVisaModal, 
  onOpenTransportModal, 
  onOpenAppsModal,
  onOpenAccommodationModal,
  onOpenFoodModal,
  onOpenTravelTypesModal,
  onOpenMedicalModal,
  onOpenNightlifeModal,
  onOpenShoppingModal,
  onOpenBookingModal,
  onOpenPhrasesModal,
  onOpenEtiquetteModal,
  onOpenLawsModal
}: Props) {
  const uiT = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.EN;
  const t = uiT.tools || UI_TRANSLATIONS.EN.tools;
  const weatherT = uiT.weather || UI_TRANSLATIONS.EN.weather;

  // ICT Time (UTC+7) Dynamic Update
  const now = new Date();
  const ictTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (7 * 3600000));
  const timeString = ictTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ICT';
  
  const toolsBySection = [
    {
      title: uiT.menuCategories.guides,
      items: [
        { id: 'travelTypes', icon: Info, title: uiT.travelTypes.title, onClick: onOpenTravelTypesModal, linkText: uiT.travelTypes.link },
        { id: 'visa', icon: FileCheck, title: uiT.visa.title, onClick: onOpenVisaModal, linkText: uiT.visa.link },
        { id: 'accommodation', icon: Home, title: uiT.accommodation.detailsTitle, onClick: onOpenAccommodationModal, linkText: uiT.accommodation.guideLink },
        { id: 'food', icon: Utensils, title: uiT.food.detailsTitle, onClick: onOpenFoodModal, linkText: uiT.food.guideLink },
        { id: 'shopping', icon: ShoppingBag, title: uiT.shopping.detailsTitle, onClick: onOpenShoppingModal, linkText: uiT.shopping.guideLink },
        { id: 'medical', icon: Stethoscope, title: uiT.medical.detailsTitle, onClick: onOpenMedicalModal, linkText: uiT.medical.guideLink },
        { id: 'nightlife', icon: Music, title: uiT.nightlife.detailsTitle, onClick: onOpenNightlifeModal, linkText: uiT.nightlife.guideLink },
        { id: 'vat', icon: Receipt, title: uiT.vatRefund.title, onClick: onOpenVatModal, linkText: uiT.vatRefund.link },
      ]
    },
    {
      title: uiT.menuCategories.tools,
      items: [
        { id: 'weather', icon: Cloud, title: weatherT.title, isWeather: true },
        { id: 'currency', icon: Calculator, title: t.currency, isCurrency: true },
        { id: 'phrases', icon: MessageSquare, title: t.phrases, onClick: onOpenPhrasesModal, linkText: t.learnThaiBasics },
        { id: 'etiquette', icon: ShieldCheck, title: t.etiquette, onClick: onOpenEtiquetteModal, linkText: uiT.culturalGuideLink },
        { id: 'laws', icon: Gavel, title: t.laws, onClick: onOpenLawsModal, linkText: uiT.lawsRegulationsLink },
        { id: 'transport', icon: Bus, title: uiT.transport.detailsTitle, customContent: (
          <div className="flex flex-col gap-2 mt-1">
            <button onClick={onOpenTransportModal} className="tool-link-btn text-left">{uiT.transport.transportGuideLink}</button>
            <button onClick={onOpenAppsModal} className="tool-link-btn text-left">{uiT.transport.appsGuideLink}</button>
            <button onClick={onOpenBookingModal} className="tool-link-btn text-left">{uiT.booking?.link || 'Tickets & Rentals'}</button>
          </div>
        )},
      ]
    }
  ];

  return (
    <div className="space-y-10 pb-10">
      {toolsBySection.map((section) => (
        <div key={section.title} className="space-y-6">
          <div className="flex items-center gap-4">
            <h3 className="text-[10px] font-bold text-[#2d4a3e] uppercase tracking-[0.25em] whitespace-nowrap">
              {section.title}
            </h3>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-[#D4AF37]/30 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.items.map((tool) => (
              <motion.div 
                key={tool.id}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className={`p-5 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all ${tool.id === 'currency' ? 'md:col-span-1' : ''}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-xl bg-[#fdfaf3] text-[#D4AF37]">
                    <tool.icon size={16} />
                  </div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-700">{tool.title}</h4>
                </div>

                <div className="text-[11px] leading-relaxed text-gray-600">
                  {tool.isWeather ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-end">
                        <span className="text-2xl font-bold text-[#2d4a3e]">32°C <span className="text-sm font-medium text-gray-400">/ 90°F</span></span>
                        <span className="text-[9px] font-bold text-[#D4AF37] uppercase">{timeString}</span>
                      </div>
                      <div className="p-2.5 bg-[#fdfaf3] rounded-xl border border-[#D4AF37]/10">
                        <p className="font-bold text-[#2d4a3e] mb-1">{weatherT.climate}</p>
                        <p className="text-[10px]"><span className="text-[#D4AF37] font-bold">Alert:</span> {weatherT.alerts}</p>
                      </div>
                    </div>
                  ) : tool.isCurrency ? (
                    <CurrencyConverter language={language} />
                  ) : tool.customContent ? (
                    tool.customContent
                  ) : (
                    <button 
                      onClick={tool.onClick}
                      className="text-[#D4AF37] hover:text-[#2d4a3e] font-bold underline decoration-[#D4AF37]/30 decoration-2 underline-offset-4 transition-all text-left block"
                    >
                      {tool.linkText}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      <style jsx>{`
        .tool-link-btn {
          color: #D4AF37;
          font-weight: 700;
          text-decoration: underline;
          text-decoration-style: dotted;
          text-underline-offset: 3px;
          transition: color 0.2s;
        }
        .tool-link-btn:hover {
          color: #2d4a3e;
        }
      `}</style>
    </div>
  );
}