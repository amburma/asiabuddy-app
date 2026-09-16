"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'EN';
    setCurrentLang(savedLang);
  }, []);

  const handleLanguageChange = (langCode: string) => {
    const newLangLowercase = langCode.toLowerCase()
    localStorage.setItem('language', langCode);
    setCurrentLang(langCode);
    document.cookie = `NEXT_LOCALE=${langCode}; path=/; max-age=31536000; SameSite=Lax`;
    
    // Navigate to the new locale-prefixed URL
    const pathSegments = pathname.split('/').filter(Boolean)
    
    // Strip existing locale prefix if present
    let pathWithoutLocale = pathname
    if (pathSegments.length > 0 && ['en', 'mm', 'th', 'de', 'fr', 'es'].includes(pathSegments[0].toLowerCase())) {
      pathWithoutLocale = '/' + pathSegments.slice(1).join('/')
    } else if (pathname === '/') {
      // Special case: if on root, keep it as is
      pathWithoutLocale = ''
    }
    
    // Build new path with new locale prefix
    const newPath = `/${newLangLowercase}${pathWithoutLocale}${searchParams.toString() ? '?' + searchParams.toString() : ''}`
    router.push(newPath)
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