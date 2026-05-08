"use client"; // Client component ဖြစ်ကြောင်း သတ်မှတ်ရန်

import { ThaiLanguage } from '../types';
import { Globe } from 'lucide-react';

interface Props {
  currentLanguage: ThaiLanguage;
  onLanguageChange: (lang: ThaiLanguage) => void;
}

const TIER1_LANGUAGES: ThaiLanguage[] = ['EN', 'DE', 'FR', 'ES', 'MM', 'TH'];

const LANGUAGES: { id: ThaiLanguage; label: string }[] = [
  { id: 'EN', label: 'English' },
  { id: 'TH', label: 'ภาษาไทย' },
  { id: 'MM', label: 'မြန်မာ' },
  { id: 'DE', label: 'Deutsch' },
  { id: 'FR', label: 'Français' },
  { id: 'ES', label: 'Español' },
  { id: 'chinese', label: '中文' },
  { id: 'japanese', label: '日本語' },
  { id: 'korean', label: '한국어' },
  { id: 'italian', label: 'Italiano' },
  { id: 'portuguese', label: 'Português' },
  { id: 'russian', label: 'Русский' },
  { id: 'hebrew', label: 'עברית' },
  { id: 'hindi', label: 'हिन्दी' },
  { id: 'malay', label: 'Bahasa Melayu' },
  { id: 'indonesian', label: 'Bahasa Indonesia' },
  { id: 'vietnamese', label: 'Tiếng Việt' },
  { id: 'arabic', label: 'العربية' },
];

export default function LanguageSelector({ currentLanguage, onLanguageChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Globe size={14} className="text-[#D4AF37]" /> {/* gold-deep အတွက် hex သုံးထားသည် */}
      <select
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value as ThaiLanguage)}
        className="bg-transparent text-[10px] uppercase font-bold tracking-widest text-gray-500 outline-none cursor-pointer hover:text-[#D4AF37] transition-colors"
      >
        {LANGUAGES.map((lang) => {
          const isTier1 = TIER1_LANGUAGES.includes(lang.id);
          return (
            <option 
              key={lang.id} 
              value={lang.id} 
              className={`bg-white ${isTier1 ? 'text-gray-700' : 'text-gray-400'}`}
              disabled={!isTier1}
            >
              {lang.label} {!isTier1 ? '(Coming Soon)' : ''}
            </option>
          );
        })}
      </select>
    </div>
  );
}