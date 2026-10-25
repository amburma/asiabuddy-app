'use client';

import { useEffect, useState } from 'react';
import { Volume2 } from 'lucide-react';
import type { SupportedLanguage } from '../../types/country';
import { VIETNAM_PHRASES_DATA } from '../../data/vietnam/phrasesData';
import type { LocalizedText } from '../../data/vietnam/phrasesData';

export default function VietnamPhrases({ language }: { language: SupportedLanguage }) {
  const [canSpeak, setCanSpeak] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const check = () => {
      setCanSpeak(window.speechSynthesis.getVoices().some(v => v.lang.toLowerCase().startsWith('vi')));
    };

    check();
    window.speechSynthesis.addEventListener('voiceschanged', check);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', check);
  }, []);

  const pick = (text: LocalizedText): string => text[language] || text.EN;

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <p className="text-sm text-gray-600 mb-8">{pick(VIETNAM_PHRASES_DATA.ui.hint)}</p>

      {VIETNAM_PHRASES_DATA.categories.map((category) => (
        <div key={category.id} className="mb-10">
          <h3 className="text-xs font-bold tracking-[0.2em] text-amber-600 uppercase mb-4">
            {pick(category.title)}
          </h3>
          <div className="space-y-4">
            {category.phrases.map((phrase) => (
              <div
                key={phrase.id}
                className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm relative"
              >
                <p className="text-sm text-gray-600 mb-2">{pick(phrase.meaning)}</p>
                <p lang="vi" className="text-xl font-bold text-gray-900 mb-2">
                  {phrase.vi}
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  {pick(VIETNAM_PHRASES_DATA.ui.howToSay)}: <em>{phrase.pron}</em>
                </p>
                {phrase.note && (
                  <p className="text-xs text-gray-500 mt-2">{pick(phrase.note)}</p>
                )}
                {canSpeak && (
                  <button
                    type="button"
                    onClick={() => speak(phrase.vi)}
                    aria-label={phrase.vi}
                    className="absolute top-4 right-4 p-2 rounded-full bg-amber-50 hover:bg-amber-100 transition-colors"
                  >
                    <Volume2 size={16} className="text-amber-600" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mb-10">
        <h3 className="text-xs font-bold tracking-[0.2em] text-amber-600 uppercase mb-4">
          {pick(VIETNAM_PHRASES_DATA.ui.tipsHeading)}
        </h3>
        <div className="space-y-4">
          {VIETNAM_PHRASES_DATA.tips.map((tip) => (
            <div key={tip.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <p className="font-bold text-gray-900 mb-2">{pick(tip.title)}</p>
              <p className="text-sm text-gray-700">{pick(tip.body)}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-8">{pick(VIETNAM_PHRASES_DATA.ui.footnote)}</p>
    </div>
  );
}
