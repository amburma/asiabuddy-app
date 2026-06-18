'use client';

import { useState, useEffect } from 'react';
import HumanOperatorChat from '@/components/thailand/HumanOperatorChat';
import { ThaiLanguage } from '@/types/country';

interface Props {
  tourSlug: string;
  country: string;
  price: number;
  currency: string;
  salesperson_id?: string;
  language?: ThaiLanguage;
}

export default function BookNowClient({ 
  tourSlug, 
  country, 
  price, 
  currency, 
  salesperson_id,
  language = 'EN' as ThaiLanguage
}: Props) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userLanguage, setUserLanguage] = useState<ThaiLanguage>(language);

  useEffect(() => {
    const stored = localStorage.getItem('preferred_language');
    if (stored) {
      setUserLanguage(stored as ThaiLanguage);
    } else {
      setUserLanguage('EN' as ThaiLanguage);
    }
  }, []);

  const handleBookNow = () => {
    setIsChatOpen(true);
  };

  return (
    <>
      <button
        id="book-now-btn"
        onClick={handleBookNow}
        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-lg py-4 rounded-2xl shadow-lg shadow-orange-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-orange-500/40"
      >
        Book Now — {price} {currency}
      </button>

      {isChatOpen && (
        <HumanOperatorChat
          language={userLanguage}
          onClose={() => setIsChatOpen(false)}
          salesperson_id={salesperson_id}
        />
      )}
    </>
  );
}
