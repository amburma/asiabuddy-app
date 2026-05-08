"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // motion/react အစား framer-motion ကို သုံးခြင်းက ပို၍ stable ဖြစ်ပါသည်
import { ThaiLanguage } from '../types';
import { Sparkles } from 'lucide-react';
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
  { id: 'chinese', label: '中文', flag: '🇨🇳', start: '开始' },
  { id: 'japanese', label: '日本語', flag: '🇯🇵', start: '開始' },
  { id: 'korean', label: '한국어', flag: '🇰🇷', start: '시작' },
  { id: 'russian', label: 'Русский', flag: '🇷🇺', start: 'Начать' },
  { id: 'italian', label: 'Italiano', flag: '🇮🇹', start: 'Inizia' },
  { id: 'portuguese', label: 'Português', flag: '🇵🇹', start: 'Iniciar' },
  { id: 'hebrew', label: 'עברית', flag: '🇮🇱', start: 'התחל' },
  { id: 'arabic', label: 'العربية', flag: '🇸🇦', start: 'ابدأ' },
  { id: 'hindi', label: 'हिन्दी', flag: '🇮🇳', start: 'शुरू करें' },
  { id: 'vietnamese', label: 'Tiếng Việt', flag: '🇻🇳', start: 'Bắt đầu' },
  { id: 'indonesian', label: 'Bahasa Indonesia', flag: '🇮🇩', start: 'Mulai' },
  { id: 'malay', label: 'Bahasa Melayu', flag: '🇲🇾', start: 'Mula' },
  { id: 'filipino', label: 'Filipino', flag: '🇵🇭', start: 'Simulan' },
  { id: 'bengali', label: 'বাংলা', flag: '🇧🇩', start: 'শুরু' },
  { id: 'dutch', label: 'Nederlands', flag: '🇳🇱', start: 'Start' },
  { id: 'polish', label: 'Polski', flag: '🇵🇱', start: 'Start' },
  { id: 'turkish', label: 'Türkçe', flag: '🇹🇷', start: 'Başlat' },
  { id: 'swedish', label: 'Svenska', flag: '🇸🇪', start: 'Starta' },
  { id: 'farsi', label: 'فارسی', flag: '🇮🇷', start: 'شروع' },
  { id: 'romanian', label: 'Română', flag: '🇷🇴', start: 'Start' },
];

export default function LanguageWelcome({ onStart }: Props) {
  const [selected, setSelected] = useState<ThaiLanguage | null>(null);

  return (
    <div className="fixed inset-0 z-[100] bg-[#fdfaf3] flex flex-col items-center overflow-y-auto">
      {/* Engaging Gold Banner */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full bg-[#D4AF37] py-12 px-6 text-center shadow-lg"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl"
          >
            <PagodaIcon size={52} className="text-[#D4AF37]" />
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
          <h1 className="text-4xl md:text-6xl mb-2 text-[#2d4a3e]">ThaiGuide</h1>
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-700 italic">
            {(selected && UI_TRANSLATIONS[selected]?.appTagline) || 'AsiaBuddy Digital Concierge'}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {LANGUAGES.map((lang) => (
            <motion.button
              key={lang.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(lang.id)}
              className={`p-4 rounded-2xl flex items-center gap-3 transition-all border relative overflow-hidden ${
                selected === lang.id 
                  ? 'bg-[#2d4a3e] text-white border-[#2d4a3e] shadow-lg' 
                  : 'bg-white text-gray-700 border-gray-100 hover:border-[#D4AF37] shadow-sm'
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
          ))}
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
                className="px-16 py-5 bg-[#D4AF37] text-white rounded-full text-sm font-bold uppercase tracking-[0.3em] shadow-2xl hover:bg-[#2d4a3e] hover:scale-105 transition-all flex items-center gap-3 group"
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