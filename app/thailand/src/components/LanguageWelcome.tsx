import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThaiLanguage } from '../types';
import { Sparkles, Languages } from 'lucide-react';
import { UI_TRANSLATIONS } from '../i18n';

interface Props {
  onStart: (lang: ThaiLanguage) => void;
}

const PagodaIcon = ({ size = 48, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L10 6H14L12 2Z" />
    <path d="M6 10L12 7L18 10V11H6V10Z" />
    <path d="M4 15L12 11L20 15V16H4V15Z" />
    <path d="M2 20L12 16L22 20V22H2V20Z" />
  </svg>
);

const LANGUAGES: { id: ThaiLanguage; label: string; flag: string; start: string }[] = [
  { id: 'EN', label: 'English', flag: '🌐', start: 'Start' },
  { id: 'MM', label: 'မြန်မာ', flag: '🇲🇲', start: 'စတင်ပါ' },
  { id: 'TH', label: 'ภาษาไทย', flag: '🇹🇭', start: 'เริ่ม' },
  { id: 'ES', label: 'Español', flag: '🇪🇸', start: 'Comenzar' },
  { id: 'DE', label: 'Deutsch', flag: '🇩🇪', start: 'Starten' },
  { id: 'FR', label: 'Français', flag: '🇫🇷', start: 'Démarrer' },
];

export default function LanguageWelcome({ onStart }: Props) {
  const [selected, setSelected] = useState<ThaiLanguage | null>(null);

  const currentLang = LANGUAGES.find(l => l.id === selected);

  return (
    <div className="fixed inset-0 z-[100] bg-sacred-bg flex flex-col items-center overflow-y-auto">
      {/* Engaging Gold Banner */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full bg-gold-deep py-12 px-6 text-center shadow-lg"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl"
          >
            <PagodaIcon size={52} className="text-gold-deep" />
          </motion.div>
          
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.span
                key="welcome-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-white font-serif tracking-wide font-medium text-lg md:text-2xl"
              >
                {UI_TRANSLATIONS[selected]?.welcome || "Sawasdee"}
              </motion.span>
            ) : (
              <motion.span
                key="default-greeting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-white/90 font-serif tracking-[0.3em] font-medium text-lg uppercase"
              >
                Sawasdee
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="max-w-4xl w-full py-12 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl mb-2 text-sacred-green">ThaiGuide</h1>
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-700 italic">{(UI_TRANSLATIONS[selected || 'EN']?.appTagline) || 'AsiaBuddy Digital Concierge'}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {LANGUAGES.map((lang) => {
            return (
              <motion.button
                key={lang.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelected(lang.id)}
                className={`p-4 rounded-2xl flex items-center gap-3 transition-all border relative overflow-hidden ${
                  selected === lang.id 
                    ? 'bg-sacred-green text-white border-sacred-green shadow-lg' 
                    : 'bg-white text-gray-700 border-gold-soft/20 hover:border-gold-deep shadow-sacred'
                }`}
              >
                <div className="flex flex-col items-center justify-center">
                   <span className="text-2xl">{lang.flag}</span>
                </div>
                <div className="text-left">
                  <span className="block text-xs font-bold uppercase tracking-widest leading-none mb-1">
                    {lang.label}
                  </span>
                  <span className="block text-[8px] opacity-60 font-serif italic">
                    {lang.start}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center gap-8 max-w-2xl mx-auto text-center"
            >
              <button
                onClick={() => onStart(selected)}
                className="px-16 py-5 bg-gold-deep text-white rounded-full text-sm font-bold uppercase tracking-[0.3em] shadow-2xl hover:bg-sacred-green hover:scale-105 transition-all flex items-center gap-3 group"
              >
                <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                {UI_TRANSLATIONS[selected]?.start || 'Start Journey'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
