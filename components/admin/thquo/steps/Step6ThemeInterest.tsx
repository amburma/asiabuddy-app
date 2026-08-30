'use client';

import { useState, useEffect } from 'react';

// Disclosed assumption for downstream Rough Price Range:
// When formData.themes is empty array [] AND formData.otherThemes is empty (after filtering blanks),
// the assumed theme is "Culture + key highlight sites"
// This must appear in the Rough Price Range's "key assumptions" line per Gem STEP 3

interface Step6ThemeInterestProps {
  themes?: string[];
  otherThemes?: string[];
  setFormData: (update: (prev: any) => any) => void;
}

interface ThemeOption {
  value: string;
  label: string;
  subLabel: string;
}

const themeOptions: ThemeOption[] = [
  { value: 'culture', label: 'ယဉ်ကျေးမှု/ဘုရားကျောင်း', subLabel: 'Culture / Temple' },
  { value: 'adventure', label: 'စွန့်စားခန်း/သဘာဝ', subLabel: 'Adventure / Nature' },
  { value: 'relaxation', label: 'အနားယူခြင်း/ကမ်းခြေ', subLabel: 'Relaxation / Beach' },
  { value: 'shopping', label: 'ဈေးဝယ်ခြင်း', subLabel: 'Shopping' },
  { value: 'food', label: 'အစားအသောက်', subLabel: 'Food / Culinary' },
  { value: 'nightlife', label: 'ညဘက်ဖျော်ဖြေမှု', subLabel: 'Nightlife' },
];

export default function Step6ThemeInterest({ themes, otherThemes, setFormData }: Step6ThemeInterestProps) {
  const [customInterests, setCustomInterests] = useState<string[]>(['']);
  const [showNonLatinWarnings, setShowNonLatinWarnings] = useState<boolean[]>([false]);

  // Initialize customInterests from formData.otherThemes on mount only
  useEffect(() => {
    if (otherThemes && otherThemes.length > 0) {
      setCustomInterests(otherThemes);
      setShowNonLatinWarnings(otherThemes.map(() => false));
    }
    // If no otherThemes, keep the default [''] state
  }, []);

  const toggleTheme = (value: string) => {
    const currentThemes = themes || [];
    const newThemes = currentThemes.includes(value)
      ? currentThemes.filter(t => t !== value)
      : [...currentThemes, value];
    setFormData((prev: any) => ({ ...prev, themes: newThemes }));
  };

  const handleCustomInterestChange = (index: number, value: string) => {
    const newCustomInterests = [...customInterests];
    newCustomInterests[index] = value;
    setCustomInterests(newCustomInterests);
    
    // Check for non-Latin characters (soft warning) for this specific input
    const hasNonLatin = /[^a-zA-Z0-9\s\-.,']/g.test(value);
    const newWarnings = [...showNonLatinWarnings];
    newWarnings[index] = hasNonLatin && value.length > 0;
    setShowNonLatinWarnings(newWarnings);

    // Update formData with all custom interests (non-empty only)
    const nonEmptyValues = newCustomInterests
      .map(v => v.trim())
      .filter(v => v.length > 0);
    setFormData((prev: any) => ({ ...prev, otherThemes: nonEmptyValues }));
  };

  const addCustomInterest = () => {
    setCustomInterests([...customInterests, '']);
    setShowNonLatinWarnings([...showNonLatinWarnings, false]);
  };

  const removeCustomInterest = (index: number) => {
    if (customInterests.length <= 1) return;
    
    const newCustomInterests = customInterests.filter((_, i) => i !== index);
    const newWarnings = showNonLatinWarnings.filter((_, i) => i !== index);
    
    setCustomInterests(newCustomInterests);
    setShowNonLatinWarnings(newWarnings);
    
    // Update formData with remaining non-empty values
    const nonEmptyValues = newCustomInterests
      .map(v => v.trim())
      .filter(v => v.length > 0);
    setFormData((prev: any) => ({ ...prev, otherThemes: nonEmptyValues }));
  };

  // Check if both themes and otherThemes are empty (for assumption note)
  const hasAnySelection = (themes && themes.length > 0) || 
    (otherThemes && otherThemes.length > 0);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        ခရီးစဉ် အမျိုးအစား
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {themeOptions.map((option) => {
          const isSelected = (themes || []).includes(option.value);
          return (
            <button
              key={option.value}
              onClick={() => toggleTheme(option.value)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-emerald-300'
              }`}
            >
              <div className="font-medium text-sm">
                {option.label}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {option.subLabel}
              </div>
            </button>
          );
        })}
      </div>

      {/* Other Interests Section */}
      <div className="mt-6 space-y-3">
        <h3 className="text-sm font-medium text-gray-700">
          အခြား စိတ်ဝင်စားမှု (ရှိပါက)
        </h3>
        {customInterests.map((customInterest, index) => (
          <div key={index} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={customInterest}
                onChange={(e) => handleCustomInterestChange(index, e.target.value)}
                placeholder="ဥပမာ - Diving, Cooking Class"
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-all text-sm"
              />
              {customInterests.length > 1 && (
                <button
                  onClick={() => removeCustomInterest(index)}
                  className="px-3 py-2 rounded-xl border-2 border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50 transition-all text-sm"
                >
                  ✕
                </button>
              )}
            </div>
            {showNonLatinWarnings[index] && (
              <div className="text-xs text-amber-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Please use English characters only for interest names
              </div>
            )}
          </div>
        ))}
        <button
          onClick={addCustomInterest}
          className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          + အခြား ထပ်ထည့်ရန်
        </button>
      </div>

      {/* Disclosed Assumption Note (shown when no themes and no other interests selected) */}
      {!hasAnySelection && (
        <div className="mt-3 text-sm text-gray-600 flex items-start gap-2">
          <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            ရွေးချယ်မှု မထည့်ပါက စံချိန်စံညွှန်း ခရီးစဉ် (ယဉ်ကျေးမှု + အထင်ကရနေရာများ) ကို အခြေခံ၍ စီစဉ်ပေးပါမည်
          </span>
        </div>
      )}

      {/* Selection Info */}
      {hasAnySelection && (
        <div className="mt-4 text-sm text-emerald-600 font-medium">
          ရွေးချယ်ထားသော အမျိုးအစား {(themes?.length || 0) + (otherThemes?.length || 0)} ခု
        </div>
      )}
    </div>
  );
}
