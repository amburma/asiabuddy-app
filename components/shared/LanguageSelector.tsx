"use client";

import React, { useEffect, useState } from 'react';

const LANGUAGES = [
  { code: 'EN', label: 'English', flag: '🇬🇧' },
  { code: 'TH', label: 'ไทย', flag: '🇹🇭' },
  { code: 'MM', label: 'မြန်မာ', flag: '🇲🇲' }, // မြန်မာ ဘာသာစကား ပေါင်းစပ်ထည့်သွင်းပြီး
  { code: 'DE', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'FR', label: 'Français', flag: '🇫🇷' },
  { code: 'ES', label: 'Español', flag: '🇪🇸' }
];

export default function LanguageSelector() {
  const [currentLang, setCurrentLang] = useState('EN');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'EN';
    setCurrentLang(savedLang);
  }, []);

  const handleLanguageChange = (langCode: string) => {
    localStorage.setItem('language', langCode);
    setCurrentLang(langCode);
    document.cookie = `NEXT_LOCALE=${langCode}; path=/; max-age=31536000; SameSite=Lax`;
    window.location.reload();
  };

  return (
    <div className="relative inline-block text-left z-50">
      <select
        value={currentLang}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="bg-[#0D0D0D]/90 text-[#F5F0E8] border border-[#C9A84C]/30 rounded px-2.5 py-1 text-sm font-sans focus:outline-none focus:border-[#C9A84C] cursor-pointer hover:border-[#C9A84C]/60 transition-colors"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code} className="bg-[#0D0D0D] text-[#F5F0E8]">
            {lang.flag} {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}