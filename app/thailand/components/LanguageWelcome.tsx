"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { ThaiLanguage } from '../types';
import { Sparkles } from 'lucide-react';
import { UI_TRANSLATIONS } from '../i18n';

interface Props {
  onStart: (lang: ThaiLanguage) => void;
}

// Custom SVG Icon for consistent branding
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
  { id: 'bengali', label: 'বাংলা', flag: '🇧🇩', start: 'ရှုရှု' },
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
    <div className="fixed inset-0 z-[100] bg-[#fdfaf3] flex flex-col items-center overflow-y-auto scrollbar-hide">
      {/* Engaging Gold Banner */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full bg-[#D4AF37] py-12 px-6 text-center shadow-lg sticky top-0 z-10"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-2xl"
          >
            <PagodaIcon size={48} className="text-[#D4AF37]" />
          </motion.div>
          
          <AnimatePresence mode="wait">
            <motion.span
              key={selected || 'default'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-white font-serif tracking-wide font-medium text-lg md:text-2xl h-8"
            >
              {selected ? (UI_TRANSLATIONS[selected]?.welcome || "Sawasdee") : "Sawasdee"}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="max-w-4xl w-full py-12 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl mb-2 text-[#2d4a3e] font-serif">ThaiGuide</h1>
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-500">
            {(selected && UI_TRANSLATIONS[selected]?.appTagline) || 'Digital Concierge for Travelers'}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-20">
          {LANGUAGES.map((lang) => (
            <motion.button
              key={lang.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelected(lang.id)}
              className={`p-4 rounded-2xl flex items-center gap-3 transition-all border shadow-sm ${
                selected === lang.id 
                  ? 'bg-[#2d4a3e] text-white border-[#2d4a3e] shadow-md ring-2 ring-[#2d4a3e]/20' 
                  : 'bg-white text-gray-700 border-gray-100 hover:border-[#D4AF37]'
              }`}
            >
              <span className="text-2xl">{lang.flag}</span>
              <div className="text-left">
                <span className="block text-[11px] font-bold uppercase tracking-widest leading-tight">
                  {lang.label}
                </span>
                <span className="block text-[9px] opacity-60 font-serif italic">
                  {lang.start}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Floating Action Button for Start */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-0 right-0 px-6 flex justify-center pointer-events-none"
          >
            <button
              onClick={() => onStart(selected)}
              className="pointer-events-auto px-12 py-4 bg-[#D4AF37] text-white rounded-full text-xs font-bold uppercase tracking-[0.3em] shadow-2xl hover:bg-[#2d4a3e] transition-all flex items-center gap-3 group will-change-transform"
            >
              <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
              {UI_TRANSLATIONS[selected]?.start || 'Start Journey'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}