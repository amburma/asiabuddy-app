'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import HumanOperatorChat from '../../../../components/thailand/HumanOperatorChat';
import { ThaiLanguage } from '../../../../types/country';

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('preferred_language');
    if (stored) {
      setUserLanguage(stored as ThaiLanguage);
    } else {
      setUserLanguage('EN' as ThaiLanguage);
    }
  }, []);

  useEffect(() => {
    if (isChatOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isChatOpen]);

  const handleBookNow = () => {
    setIsChatOpen(true);
  };

  const modalContent = isChatOpen ? (
    <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => setIsChatOpen(false)}
      />
      <div className="relative w-full h-full md:w-auto md:h-auto md:max-w-lg md:max-h-[85vh] flex flex-col">
        <HumanOperatorChat
          onClose={() => setIsChatOpen(false)}
          language={userLanguage}
          salesperson_id={salesperson_id}
        />
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        id="book-now-btn"
        onClick={handleBookNow}
        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-lg py-4 rounded-2xl shadow-lg shadow-orange-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-orange-500/40"
      >
        Book Now — {price} {currency}
      </button>

      {mounted && createPortal(modalContent, document.body)}
    </>
  );
}
