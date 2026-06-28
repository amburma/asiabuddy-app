"use client";

import { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { Send, Home, Loader2, MessageSquare, Calendar } from 'lucide-react';
import { getConciergeResponse } from '@/services/geminiService';
import { ChatMessage, ThaiLanguage } from '@/types/country';
import { UI_TRANSLATIONS } from '@/lib/i18n';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import HumanOperatorChat from './HumanOperatorChat';

interface Props {
  language: ThaiLanguage;
}

export default function AccommodationChat({ language }: Props) {
  const uiT = useMemo(() => UI_TRANSLATIONS[language] || UI_TRANSLATIONS.EN, [language]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showBookNow, setShowBookNow] = useState(false);
  const [showHumanChat, setShowHumanChat] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const t = uiT.accommodation || UI_TRANSLATIONS.EN.accommodation;
  const commonT = uiT.chat || UI_TRANSLATIONS.EN.chat;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (showHumanChat) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showHumanChat]);

  const handleSend = async (customMessage?: string) => {
    const userMessage = customMessage || input.trim();
    if (!userMessage || isLoading) return;

    setShowBookNow(false);
    if (!customMessage) setInput('');
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const history = messages.map(m => ({
      role: (m.role === 'user' ? 'user' : 'model') as 'user' | 'model',
      parts: [{ text: m.content }]
    }));

    const contextPrompt = `You are a specialized accommodation concierge for Thailand. Help the traveler with specific advice about hotels (1-5 stars), guesthouses, hostels, and booking platforms like Agoda. Answer this: ${userMessage}

RESPONSE RULES — MANDATORY:
1. Direct answers only. No intro sentences like 'Hello! I am ThaiGuide...'. Go straight to the answer.
2. No filler. No repetition. No restating the question.
3. Maximum 3 follow-up suggestions only if relevant.
4. Never list your own capabilities unless asked.
5. Out-of-scope question → one sentence decline in user's language only. Nothing else.`;

    try {
      const response = await getConciergeResponse(contextPrompt, history, language);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      
      const keywords = [
        // English
        'hotel', 'tour', 'flight', 'ticket', 'car rental', 'airport transfer',
        'day tour', 'join tour', 'package tour', 'customize tour', 'vip tour', 'entrance ticket',
        // Myanmar
        'ဟိုတယ်', 'ခရီးစဉ်', 'လေယာဉ်', 'လက်မှတ်', 'ကားငှား', 'လေဆိပ်ပို့',
        'တစ်နေ့ခရီး', 'ပက်ကေ့ခ်ျ', 'ကားအငှား',
        // Thai
        'โรงแรม', 'ทัวร์', 'เที่ยวบิน', 'ตั๋ว', 'เช่ารถ', 'รับส่งสนามบิน',
        // Chinese
        '酒店', '旅游', '航班', '门票', '租车', '机场接送',
        // Japanese
        'ホテル', 'ツアー', 'フライト', 'チケット', 'レンタカー', '空港送迎',
        // Korean
        '호텔', '투어', '항공편', '티켓', '렌터카', '공항 픽업',
        // German
        'hotel', 'tour', 'flug', 'ticket', 'mietwagen', 'flughafentransfer',
        // French
        'hôtel', 'tour', 'vol', 'billet', 'location de voiture', 'transfert aéroport',
        // Spanish
        'hotel', 'tour', 'vuelo', 'entrada', 'alquiler de coche', 'traslado aeropuerto'
      ];
      const responseLower = response.toLowerCase();
      const hasKeyword = keywords.some(keyword => responseLower.includes(keyword));
      if (hasKeyword) {
        setShowBookNow(true);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }]);
    }
    setIsLoading(false);
  };

  const modalContent = showHumanChat ? (
    <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => setShowHumanChat(false)}
      />
      <div className="relative w-full h-full md:w-auto md:h-auto md:max-w-lg md:max-h-[85vh] flex flex-col">
        <HumanOperatorChat
          language={language}
          onClose={() => setShowHumanChat(false)}
        />
      </div>
    </div>
  ) : null;

  return (
    <div className="flex flex-col h-[450px] w-full bg-white rounded-2xl overflow-hidden border border-gold-soft/30 shadow-sm">
      {/* Header */}
      <div className="p-4 bg-sacred-bg border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gold-deep/10 flex items-center justify-center text-gold-deep">
            <Home size={18} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest leading-none mb-1 text-sacred-green">{t.title}</h4>
            <p className="text-[9px] text-gray-500 font-medium tracking-tight">Expert Housing Advice</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-4 space-y-4 bg-sacred-bg/20"
      >
        {messages.length <= 1 && (
          <div className="space-y-6 py-4">
            <div className="text-center opacity-70">
              <MessageSquare size={24} className="mx-auto mb-3 text-gold-soft" />
              <p className="text-xs font-serif italic mb-2 tracking-wide text-gray-800">{commonT.welcome}</p>
            </div>
            
            <div className="grid grid-cols-1 gap-2 px-4">
              {t.suggestions.map((suggestion: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => handleSend(suggestion)}
                  className="text-left p-3 text-[10px] font-bold uppercase tracking-widest bg-white border border-gray-100 rounded-xl hover:border-gold-deep hover:text-gold-deep transition-all shadow-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[90%] rounded-2xl p-3 shadow-sm ${
              m.role === 'user' 
                ? 'bg-sacred-green text-white rounded-tr-none' 
                : 'bg-white border border-gold-soft/20 text-gray-900 rounded-tl-none'
            }`}>
              <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-sacred-green prose-hr:my-4 prose-hr:border-gold-soft/20 text-left">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{m.content}</ReactMarkdown>
              </div>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 rounded-2xl p-3 rounded-tl-none flex items-center gap-2">
              <Loader2 size={12} className="animate-spin text-gold-deep" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-gray-100">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={commonT.placeholder}
            className="w-full bg-sacred-bg/50 border border-transparent rounded-xl py-2 pl-4 pr-10 text-xs focus:outline-none focus:border-gold-soft transition-all placeholder:text-gray-400"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="absolute right-1.5 p-1.5 bg-gold-deep text-white rounded-lg hover:bg-gold-soft transition-colors disabled:opacity-50"
          >
            <Send size={14} />
          </button>
        </div>
        {showBookNow && (
          <button
            onClick={() => setShowHumanChat(true)}
            className="mt-3 w-full bg-[#22c55e] text-white font-semibold py-3 px-4 rounded-xl hover:bg-[#16a34a] transition-colors"
          >
            📅 Book Now
          </button>
        )}
      </div>

      {mounted && createPortal(modalContent, document.body)}
    </div>
  );
}
