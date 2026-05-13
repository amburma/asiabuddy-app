import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThaiLanguage } from '../types';
import { UI_TRANSLATIONS } from '../i18n';
import { Calculator, Cloud, Bus, Receipt, FileCheck, X, ChevronRight, Info, Check, AlertCircle, Home, Utensils, Stethoscope, Music, ShoppingBag, MessageSquare, ShieldCheck, Gavel } from 'lucide-react';
import TransportChat from './TransportChat';
import { TRANSPORT_DETAILS } from '../data/transportDetails';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

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
  const enT = UI_TRANSLATIONS.EN;
  
  const t = uiT.tools || enT.tools;
  const vatT = uiT.vatRefund || enT.vatRefund;
  const visaT = uiT.visa || enT.visa;
  const weatherT = uiT.weather || enT.weather;
  const transportT = uiT.transport || enT.transport;
  const accommodationT = uiT.accommodation || enT.accommodation;
  const foodT = uiT.food || enT.food;
  const travelTypesT = uiT.travelTypes || enT.travelTypes;
  const medicalT = uiT.medical || enT.medical;
  const nightlifeT = uiT.nightlife || enT.nightlife;
  const shoppingT = uiT.shopping || enT.shopping;

  // Weather dynamic data
  const tempC = 32;
  const tempF = Math.round((tempC * 9/5) + 32);
  
  // ICT Time calculation (UTC+7)
  const now = new Date();
  const ictTime = new Date(now.getTime() + (7 * 60 * 60 * 1000));
  const timeString = ictTime.toISOString().replace('T', ' ').substring(0, 16) + ' ' + (weatherT.timeSuffix || 'ICT');
  
  const toolsBySection = [
    {
      title: uiT.menuCategories.guides,
      items: [
        {
          id: 'travelTypes',
          icon: Info,
          title: travelTypesT.title,
          content: (
            <span>
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); onOpenTravelTypesModal(); }}
                target="_self"
                className="text-gold-deep hover:text-sacred-green font-bold underline decoration-dotted transition-colors inline-block text-left"
              >
                {travelTypesT.link}
              </a>
            </span>
          )
        },
        {
          id: 'visa',
          icon: FileCheck,
          title: visaT.title,
          content: (
            <span>
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); onOpenVisaModal(); }}
                target="_self"
                className="text-gold-deep hover:text-sacred-green font-bold underline decoration-dotted transition-colors inline-block text-left"
              >
                {visaT.link}
              </a>
            </span>
          )
        },
        {
          id: 'transport',
          icon: Bus,
          title: transportT.detailsTitle,
          content: (
            <div className="flex flex-col gap-3">
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); onOpenTransportModal(); }}
                target="_self"
                className="text-gold-deep hover:text-sacred-green font-bold underline decoration-dotted transition-colors text-left"
              >
                {transportT.transportGuideLink}
              </a>
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); onOpenAppsModal(); }}
                target="_self"
                className="text-gold-deep hover:text-sacred-green font-bold underline decoration-dotted transition-colors text-left"
              >
                {transportT.appsGuideLink}
              </a>
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); onOpenBookingModal(); }}
                target="_self"
                className="text-gold-deep hover:text-sacred-green font-bold underline decoration-dotted transition-colors text-left"
              >
                {uiT.booking?.link || 'Book car rentals, bus tickets, flight tickets, and entrance fees.'}
              </a>
            </div>
          )
        },
        {
          id: 'accommodation',
          icon: Home,
          title: accommodationT.detailsTitle,
          content: (
            <span>
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); onOpenAccommodationModal(); }}
                target="_self"
                className="text-gold-deep hover:text-sacred-green font-bold underline decoration-dotted transition-colors inline-block text-left"
              >
                {accommodationT.guideLink}
              </a>
            </span>
          )
        },
        {
          id: 'food',
          icon: Utensils,
          title: foodT?.detailsTitle || 'Thailand Food Guide',
          content: (
            <span>
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); onOpenFoodModal(); }}
                target="_self"
                className="text-gold-deep hover:text-sacred-green font-bold underline decoration-dotted transition-colors inline-block text-left"
              >
                {foodT?.guideLink || 'Thailand Food Guide For more information'}
              </a>
            </span>
          )
        },
        {
          id: 'shopping',
          icon: ShoppingBag,
          title: shoppingT?.detailsTitle || 'Thailand Shopping Guide',
          content: (
            <span>
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); onOpenShoppingModal(); }}
                target="_self"
                className="text-gold-deep hover:text-sacred-green font-bold underline decoration-dotted transition-colors inline-block text-left"
              >
                {shoppingT?.guideLink || 'Thailand Shopping Guide For more information'}
              </a>
            </span>
          )
        },
        {
          id: 'medical',
          icon: Stethoscope,
          title: medicalT?.detailsTitle || 'Thailand Medical Guide',
          content: (
            <span>
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); onOpenMedicalModal(); }}
                target="_self"
                className="text-gold-deep hover:text-sacred-green font-bold underline decoration-dotted transition-colors inline-block text-left"
              >
                {medicalT?.guideLink || 'The Ultimate Thailand Medical Guide For more information'}
              </a>
            </span>
          )
        },
        {
          id: 'nightlife',
          icon: Music,
          title: nightlifeT?.detailsTitle || 'Thailand Nightlife Guide',
          content: (
            <span>
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); onOpenNightlifeModal(); }}
                target="_self"
                className="text-gold-deep hover:text-sacred-green font-bold underline decoration-dotted transition-colors inline-block text-left"
              >
                {nightlifeT?.guideLink || 'The Ultimate Thailand Nightlife Guide For more information'}
              </a>
            </span>
          )
        },
        {
          id: 'vat',
          icon: Receipt,
          title: vatT.title,
          content: (
            <span>
              {vatT.description}{' '}
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); onOpenVatModal(); }}
                target="_self"
                className="text-gold-deep hover:text-sacred-green font-bold underline decoration-dotted transition-colors inline-block text-left"
              >
                {vatT.link}
              </a>
            </span>
          )
        }
      ]
    },
    {
      title: uiT.menuCategories.tools,
      items: [
        {
          id: 'weather',
          icon: Cloud,
          title: weatherT.title,
          content: (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-sacred-green">
                  {tempC}°C / {tempF}°F
                </span>
                <span className="text-[9px] italic text-gray-400">
                  {timeString}
                </span>
              </div>
              <div className="space-y-2 text-[10px] leading-relaxed">
                <p className="flex items-center gap-1">
                  <span className="text-gold-deep text-[12px]">{weatherT.updateFrequency.split('.')[0]}</span>
                  <span className="font-medium text-gray-500 uppercase tracking-tighter">{weatherT.updateFrequency.split('.')[1]}</span>
                </p>
                <div className="p-3 bg-sacred-bg/50 rounded-lg border border-gold-soft/10">
                  <p className="font-bold text-sacred-green mb-1">{weatherT.climate}</p>
                  <p className="text-gray-600 mb-1">
                    <span className="font-bold text-gold-deep">{weatherT.alertsLabel || 'Alerts'}:</span> {weatherT.alerts}
                  </p>
                  <div className="pt-2 mt-2 border-t border-gold-soft/10">
                    <p className="italic text-gray-500">
                      <span className="font-semibold not-italic text-gray-700">{weatherT.tipLabel || 'Tip'}:</span> {weatherT.tip}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div className="text-center">
                    <p className="text-gray-400 text-[8px] uppercase">{weatherT.humidity || 'Humidity'}</p>
                    <p className="font-bold">65%</p>
                  </div>
                  <div className="text-center border-x border-gray-100">
                    <p className="text-gray-400 text-[8px] uppercase">{weatherT.uvIndex || 'UV Index'}</p>
                    <p className="font-bold text-orange-500">8 ({weatherT.high || 'High'})</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-[8px] uppercase">{weatherT.wind || 'Wind'}</p>
                    <p className="font-bold">12 km/h</p>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          id: 'currency',
          icon: Calculator,
          title: t.currency,
          content: <CurrencyConverter language={language} />
        },
        {
          id: 'phrases',
          icon: MessageSquare,
          title: t.phrases || 'Essential Phrases',
          content: (
            <span>
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); onOpenPhrasesModal(); }}
                target="_self"
                className="text-gold-deep hover:text-sacred-green font-bold underline decoration-dotted transition-colors inline-block text-left"
              >
                {t.phrases}
              </a>
            </span>
          )
        },
        {
          id: 'etiquette',
          icon: ShieldCheck,
          title: t.etiquette || 'Thai Etiquette',
          content: (
            <span>
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); onOpenEtiquetteModal(); }}
                target="_self"
                className="text-gold-deep hover:text-sacred-green font-bold underline decoration-dotted transition-colors inline-block text-left"
              >
                {uiT.labels.etiquette}
              </a>
            </span>
          )
        },
        {
          id: 'laws',
          icon: Gavel,
          title: t.laws || 'Key Laws',
          content: (
            <span>
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); onOpenLawsModal(); }}
                target="_self"
                className="text-gold-deep hover:text-sacred-green font-bold underline decoration-dotted transition-colors inline-block text-left"
              >
                {t.laws}
              </a>
            </span>
          )
        }
      ]
    }
  ];

  return (
    <div className="space-y-12">
      {toolsBySection.map((section) => (
        <div key={section.title} className="space-y-6">
          <div className="flex items-center gap-4">
            <h3 className="text-sm font-bold text-sacred-green uppercase tracking-[0.2em] whitespace-nowrap">
              {section.title}
            </h3>
            <div className="h-[1px] w-full bg-gold-soft/20"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {section.items.map((tool) => (
              <motion.div 
                key={tool.id}
                whileHover={{ y: -5 }}
                className={`p-6 glass-card ${tool.id === 'currency' ? 'bg-gold-soft/5' : ''}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${tool.id === 'currency' ? 'bg-gold-deep/10 text-gold-deep' : 'bg-sacred-green/10 text-sacred-green'}`}>
                    <tool.icon size={18} />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-widest">{tool.title}</h4>
                </div>
                <div className="text-[11px] text-gray-800 font-medium leading-relaxed">
                  {tool.content}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
