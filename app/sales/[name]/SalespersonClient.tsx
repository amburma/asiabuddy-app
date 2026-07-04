"use client";

import { useState } from 'react';
import { createPortal } from 'react-dom';
import HumanOperatorChat from '@/components/thailand/HumanOperatorChat';

interface Props {
  id: string;
  display_name: string;
  avatar_url: string | null;
}

const getBrowserLanguage = (): string => {
  if (typeof navigator === 'undefined') return 'EN'
  const lang = navigator.language || 'en'
  if (lang.startsWith('my')) return 'MM'
  if (lang.startsWith('th')) return 'TH'
  if (lang.startsWith('de')) return 'DE'
  if (lang.startsWith('zh')) return 'ZH'
  if (lang.startsWith('ko')) return 'KO'
  if (lang.startsWith('ja')) return 'JA'
  return 'EN'
}

export default function SalespersonClient({ id, display_name, avatar_url }: Props) {
  console.log('[DEBUG] SalespersonClient rendered with id:', id);
  const [showChat, setShowChat] = useState(false);
  const detectedLanguage = getBrowserLanguage();

  return (
    <>
      {/* Book Now Button */}
      <button
        onClick={() => setShowChat(true)}
        className="px-8 py-3 bg-gradient-to-r from-gold-deep to-gold-soft text-white font-semibold rounded-lg hover:from-gold-soft hover:to-gold-deep transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        Book Now
      </button>

      {/* HumanOperatorChat Modal */}
      {showChat && (
        <HumanOperatorChat salesperson_id={id} language="EN" onClose={() => setShowChat(false)} />
      )}
    </>
  );
}
