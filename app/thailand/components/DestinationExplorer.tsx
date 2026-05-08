"use client"; // Client-side hooks (useState) သုံးထားသောကြောင့် ထည့်ရန်

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // motion/react အစား framer-motion သို့ ပြောင်းပါ
import { DESTINATIONS } from '../data/destinations';
import { DestinationPillars } from '../types';
import { ThaiLanguage } from '../types';
import { UI_TRANSLATIONS } from '../i18n';
import { MapPin, Compass, Utensils, Info, AlertTriangle, Wind, ExternalLink, Star, Sparkles, Grid } from 'lucide-react';

interface Props {
  language: ThaiLanguage;
}

export default function DestinationExplorer({ language }: Props) {
  const currentDestinations = DESTINATIONS[language] || DESTINATIONS.english;
  const [selectedId, setSelectedId] = useState(currentDestinations[0].id);
  const [activeTab, setActiveTab] = useState<keyof DestinationPillars>('mustVisit');

  const selectedDest = currentDestinations.find(d => d.id === selectedId)!;
  const uiT = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.EN;
  const t = uiT.tabs || UI_TRANSLATIONS.EN.tabs;
  const labels = uiT.labels || UI_TRANSLATIONS.EN.labels;

  const tabs = [
    { id: 'mustVisit', label: t.mustVisit, icon: Compass },
    { id: 'dining', label: t.dining, icon: Utensils },
    { id: 'otherExperiences', label: t.otherExperiences, icon: Grid },
    { id: 'uniqueActivities', label: t.uniqueActivities, icon: Star },
    { id: 'hiddenGems', label: t.hiddenGems, icon: Sparkles }
  ] as const;

  return (
    <div className="w-full space-y-12 relative">
      {/* Destination Selector */}
      <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide no-scrollbar">
        {currentDestinations.map((dest) => (
          <button
            key={dest.id}
            onClick={() => setSelectedId(dest.id)}
            className={`shrink-0 flex flex-col items-center gap-2 group transition-all ${
              selectedId === dest.id ? 'scale-105' : 'opacity-60 grayscale hover:grayscale-0 hover:opacity-100'
            }`}
          >
            <div className={`w-16 h-16 rounded-full overflow-hidden border-2 p-1 transition-colors ${
              selectedId === dest.id ? 'border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10' : 'border-transparent'
            }`}>
              <div className="w-full h-full rounded-full bg-[#2d4a3e]/10 flex items-center justify-center text-[#2d4a3e]">
                <MapPin size={24} />
              </div>
            </div>
            <div className="text-center">
              <span className={`text-[10px] block uppercase font-bold tracking-[0.2em] transition-colors ${
                selectedId === dest.id ? 'text-[#D4AF37]' : 'text-gray-700'
              }`}>
                {dest.name}
              </span>
              <span className="text-[8px] text-gray-700 font-serif lowercase italic">{dest.thaiName}</span>
            </div>
          </button>
        ))}
      </div>

      <motion.div
        key={selectedId}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-gray-100 shadow-xl"
      >
        <div className="max-w-3xl mb-10">
          <h2 className="text-4xl md:text-6xl mb-2 font-serif text-[#2d4a3e]">{selectedDest.name}</h2>
          <p className="text-[#D4AF37] font-serif italic text-xl mb-4">{selectedDest.thaiName}</p>
          <p className="text-sm font-light text-gray-800 leading-relaxed italic border-l-2 border-[#D4AF37]/30 pl-6 mb-4">
            {selectedDest.overview}
          </p>
          <div className="flex items-center gap-2 text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider bg-[#D4AF37]/5 px-3 py-1.5 rounded-lg w-fit">
            <Sparkles size={14} />
            <span>{labels.bestTime || 'Best Time'}: {selectedDest.bestTime}</span>
          </div>
        </div>

        {/* Pillar Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-gray-100 pb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeTab === tab.id 
                  ? 'bg-[#D4AF37] text-white shadow-lg shadow-[#D4AF37]/20' 
                  : 'bg-white border border-gray-100 text-gray-700 hover:border-[#D4AF37] hover:text-[#D4AF37]'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            {selectedDest.pillars[activeTab]?.map((item, idx) => (
              <motion.div
                key={item.title + idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col bg-gray-50/50 rounded-2xl p-6 border border-gray-100 group hover:bg-white transition-colors hover:shadow-md"
              >
                <div className="flex justify-between items-start mb-4">
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.title + ' ' + selectedDest.name + ' Thailand')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/title flex items-center gap-2 hover:text-[#D4AF37] transition-colors"
                  >
                    <h4 className="text-xl text-[#2d4a3e] font-serif group-hover/title:text-[#D4AF37]">{item.title}</h4>
                    <ExternalLink size={14} className="opacity-0 group-hover/title:opacity-100 transition-opacity" />
                  </a>
                  <span className="text-[9px] uppercase font-bold tracking-tighter text-[#D4AF37] border border-[#D4AF37]/20 px-2 py-1 rounded bg-[#D4AF37]/5">
                    {item.badge}
                  </span>
                </div>
                
                <p className="text-xs text-gray-800 leading-relaxed font-normal mb-6 flex-grow">
                  {item.description}
                </p>

                <div className="space-y-4">
                  {item.etiquette && (
                    <div className="flex items-start gap-3 bg-white/80 p-3 rounded-xl border border-gray-100">
                      <div className="mt-1 flex items-center justify-center p-1 bg-[#D4AF37]/10 rounded-full text-[#D4AF37]">
                        <Info size={12} />
                      </div>
                      <p className="text-[10px] text-gray-700 italic leading-snug">
                        <span className="text-[#D4AF37] font-bold uppercase not-italic mr-1">{labels.etiquette}:</span>
                        {item.etiquette}
                      </p>
                    </div>
                  )}

                  {item.seasonal && (
                    <div className="flex items-start gap-3 bg-red-50 p-3 rounded-xl">
                      <div className="mt-1 flex items-center justify-center p-1 bg-red-500/10 rounded-full text-red-500">
                        <AlertTriangle size={12} />
                      </div>
                      <p className="text-[10px] text-red-700 font-bold uppercase tracking-tighter">
                        <span className="text-red-500">{labels.advisory}:</span> {item.seasonal}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-4">
                    {item.vibe && (
                      <div className="flex items-center gap-2">
                        <Wind size={12} className="text-gray-400" />
                        <span className="text-[9px] uppercase font-bold tracking-widest text-gray-500">{labels.vibe}: {item.vibe}</span>
                      </div>
                    )}
                    
                    {item.dietary && (
                      <div className="flex gap-1">
                        {item.dietary.map(d => (
                          <span key={d} className="text-[7px] uppercase font-bold bg-[#2d4a3e]/10 text-[#2d4a3e] px-2 py-0.5 rounded">
                            {d}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}