"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // framer-motion ကို သုံးပါ
import { Send, ShoppingBag, Loader2, MessageSquare, Tag } from 'lucide-react';
import { getConciergeResponse } from '../services/geminiService';
import { ChatMessage, ThaiLanguage } from '../types';
import { UI_TRANSLATIONS } from '../i18n';

interface Props {
  language: ThaiLanguage;
}

export default function ShoppingChat({ language }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const t = UI_TRANSLATIONS[language]?.shopping || UI_TRANSLATIONS.EN.shopping;
  const commonT = UI_TRANSLATIONS[language]?.chat || UI_TRANSLATIONS.EN.chat;

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSend = async (customMessage?: string) => {
    const userMessage = customMessage || input.trim();
    if (!userMessage || isLoading) return;

    if (!customMessage) setInput('');
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: (m.role === 'user' ? 'user' : 'model') as 'user' | 'model',
        parts: [{ text: m.content }]
      }));

      const contextPrompt = `You are a specialized Thailand Shopping concierge. Help the traveler with specific shopping advice (Luxury malls, night markets like Jodd Fairs, Chatuchak strategies, VAT refund process, bargaining etiquette, etc.). Answer this inquiry based on latest 2026 information: ${userMessage}`;
      
      const response = await getConciergeResponse(contextPrompt, history, language);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error("Shopping Chat Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[480px] w-full bg-white rounded-2xl overflow-hidden border border-[#D4AF37]/20 shadow-lg">
      {/* Header */}
      <div className="p-4 bg-[#fdfaf3] border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shadow-sm">
            <ShoppingBag size={18} />
          </div>
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#2d4a3e] leading-none mb-1">{t.title}</h4>
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-orange-400 animate-pulse" />
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Shopping Expert Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef} 
        className="flex-grow overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#fdfaf3]/30 to-white scrollbar-hide"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center space-y-6">
            <div className="text-center px-4">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-50">
                <Tag size={24} className="text-[#D4AF37]" />
              </div>
              <p className="text-[11px] font-serif italic text-gray-500 mb-6">{t.chatTitle}</p>
              
              <div className="grid grid-cols-1 gap-2 max-w-[260px] mx-auto">
                {t.suggestions.map((suggestion: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(suggestion)}
                    className="text-left p-3 text-[10px] font-bold uppercase tracking-widest bg-white border border-gray-100 rounded-xl hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all shadow-sm active:scale-95"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        <AnimatePresence mode="popLayout">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm text-[11px] leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-[#2d4a3e] text-white rounded-tr-none' 
                  : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'
              }`}>
                {m.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 rounded-2xl p-3 rounded-tl-none flex items-center gap-2 shadow-sm">
              <Loader2 size={12} className="animate-spin text-[#D4AF37]" />
              <span className="text-[9px] uppercase font-bold tracking-widest text-gray-400">{commonT.processing}</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-50">
        <div className="relative flex items-center gap-2">
          <div className="relative flex-grow">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={commonT.placeholder}
              className="w-full bg-gray-50 border border-transparent rounded-xl py-3 pl-4 pr-10 text-[11px] focus:outline-none focus:bg-white focus:border-[#D4AF37]/30 transition-all"
            />
          </div>
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="w-10 h-10 flex items-center justify-center bg-[#2d4a3e] text-white rounded-xl hover:bg-[#3d6354] transition-all disabled:opacity-30 shadow-md active:scale-90"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}