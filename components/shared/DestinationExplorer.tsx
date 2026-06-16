import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DESTINATIONS } from '@/data/thailand/destinations';
import { Destination, DestinationPillars, PillarItem } from '@/types/country';
import { ThaiLanguage } from '@/types/country';
import { UI_TRANSLATIONS } from '@/lib/i18n';
import { GENERAL_INFORMATION } from '@/data/thailand/generalInformation';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { MapPin, Compass, Mountain, ShoppingBag, Utensils, Info, AlertTriangle, Wind, X, ExternalLink, Star, Sparkles, Grid } from 'lucide-react';

interface Props {
  language: ThaiLanguage;
}

export default function DestinationExplorer({ language }: Props) {
  const currentDestinations = DESTINATIONS[language] || DESTINATIONS['EN'];
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
            onClick={() => {
              setSelectedId(dest.id);
            }}
            className={`shrink-0 flex flex-col items-center gap-2 group transition-all ${
              selectedId === dest.id ? 'scale-105' : 'opacity-60 grayscale hover:grayscale-0 hover:opacity-100'
            }`}
          >
            <div className={`w-16 h-16 rounded-full overflow-hidden border-2 p-1 transition-colors ${
              selectedId === dest.id ? 'border-gold-deep shadow-lg shadow-gold-deep/10' : 'border-transparent'
            }`}>
              <div className="w-full h-full rounded-full bg-sacred-green/10 flex items-center justify-center text-sacred-green">
                <MapPin size={24} />
              </div>
            </div>
            <div className="text-center">
              <span className={`text-[10px] block uppercase font-bold tracking-[0.2em] transition-colors ${
                selectedId === dest.id ? 'text-gold-deep' : 'text-gray-700'
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
        className="glass-card p-6 md:p-10"
      >
        <div className="max-w-3xl mb-10">
          <h2 className="text-4xl md:text-6xl mb-2">{selectedDest.name}</h2>
          <p className="text-gold-deep font-serif italic text-xl mb-4">{selectedDest.thaiName}</p>
          <p className="text-sm font-light text-gray-800 leading-relaxed italic border-l-2 border-gold-soft pl-6 mb-4">
            {selectedDest.overview}
          </p>
          <div className="flex items-center gap-2 text-[10px] text-gold-deep font-bold uppercase tracking-wider bg-gold-deep/5 px-3 py-1.5 rounded-lg w-fit">
            <Sparkles size={14} />
            <span>{labels.bestTime || 'Best Time to Visit'}: {selectedDest.bestTime}</span>
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
                  ? 'bg-gold-deep text-white shadow-lg shadow-gold-deep/20' 
                  : 'bg-white border border-gray-100 text-gray-700 hover:border-gold-soft hover:text-gold-deep'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Pillar Content */}
        <div className="space-y-12 min-h-[400px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AnimatePresence mode="wait">
                {selectedDest.pillars[activeTab as keyof DestinationPillars].map((item, idx) => (
                  <motion.div
                    key={item.title + idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col bg-sacred-bg/30 rounded-2xl p-6 gold-border group hover:bg-white transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xl text-sacred-green font-serif">{item.title}</h4>
                      <span className="text-[9px] uppercase font-bold tracking-tighter text-gold-deep border border-gold-deep/20 px-2 py-1 rounded bg-gold-deep/5">
                        {item.badge}
                      </span>
                    </div>

                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.title + ' ' + selectedDest.name + ' Thailand')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold uppercase tracking-wider text-gold-deep hover:underline transition-all mb-4 w-fit inline-block"
                    >
                      Go to Location
                    </a>
                    <div className="text-xs text-gray-800 leading-relaxed font-normal mb-6 flex-grow">
                      {item.description}
                    </div>

                    <div className="space-y-4">
                      {item.etiquette && (
                        <div className="flex items-start gap-3 bg-white/50 p-3 rounded-xl border border-gold-soft/20">
                          <div className="mt-1 flex items-center justify-center p-1 bg-gold-deep/10 rounded-full text-gold-deep">
                            <Info size={12} />
                          </div>
                          <p className="text-[10px] text-gray-700 italic leading-snug">
                            <span className="text-gold-deep font-bold uppercase not-italic mr-1">{labels.etiquette}:</span>
                            {item.etiquette}
                          </p>
                        </div>
                      )}

                      {item.seasonal && (
                        <div className="flex items-start gap-3 bg-red-50 p-3 rounded-xl">
                          <div className="mt-1 flex items-center justify-center p-1 bg-red-500/10 rounded-full text-red-500">
                            <AlertTriangle size={12} />
                          </div>
                          <p className="text-[10px] text-red-700/60 font-bold uppercase tracking-tighter">
                            <span className="text-red-500">{labels.advisory}:</span> {item.seasonal}
                          </p>
                        </div>
                      )}

                      {item.vibe && (
                        <div className="flex items-center gap-2">
                          <Wind size={12} className="text-gray-700" />
                          <span className="text-[9px] uppercase font-bold tracking-widest text-gray-700">{labels.vibe}: {item.vibe}</span>
                        </div>
                      )}

                      {item.dietary && (
                        <div className="flex flex-wrap gap-2 pt-4">
                          {item.dietary.map(d => (
                            <span key={d} className="text-[8px] uppercase font-bold bg-sacred-green/10 text-sacred-green px-2 py-1 rounded">
                              {d}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
        </div>
      </motion.div>
    </div>
  );
}
