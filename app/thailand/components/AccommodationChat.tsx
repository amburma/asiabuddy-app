"use client"; // အပေါ်ဆုံးမှာ ဒါကို မဖြစ်မနေ ထည့်ပေးပါ

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion'; // motion/react အစား framer-motion လို့ ပြင်လိုက်ပါ
import { Send, Home, Loader2, MessageSquare } from 'lucide-react';
import { getConciergeResponse } from '../services/geminiService';
import { ChatMessage, ThaiLanguage } from '../types';
import { UI_TRANSLATIONS } from '../i18n';

interface Props {
  language: ThaiLanguage;
}

export default function AccommodationChat({ language }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Translation safety check
  const t = UI_TRANSLATIONS[language]?.accommodation || UI_TRANSLATIONS.EN.accommodation;
  const commonT = UI_TRANSLATIONS[language]?.chat || UI_TRANSLATIONS.EN.chat;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
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

      const contextPrompt = `You are a specialized accommodation concierge for Thailand. Help the traveler with specific advice about hotels (1-5 stars), guesthouses, hostels, and booking platforms like Agoda. Answer this: ${userMessage}. Respond in ${language}.`;
      
      const response = await getConciergeResponse(contextPrompt, history, language);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error("Accommodation Chat Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[450px] w-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
      {/* Header */}
      <div className="p-4 bg-[#fdfaf3] border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
            <Home size={18} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest leading-none mb-1 text-[#2d4a3e]">{t.title}</h4>
            <p className="text-[9px] text-gray-500 font-medium tracking-tight">Expert Housing Advice</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-4 space-y-4 bg-[#fdfaf3]/20"
      >
        {messages.length === 0 && (
          <div className="space-y-6 py-4">
            <div className="text-center opacity-70">
              <MessageSquare size={24} className="mx-auto mb-3 text-[#D4AF37]" />
              <p className="text-xs font-serif italic mb-2 tracking-wide text-gray-800">{t.title}</p>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              {t.suggestions?.map((suggestion: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => handleSend(suggestion)}
                  className="text-left p-3 text-[10px] font-bold uppercase tracking-widest bg-white border border-gray-100 rounded-xl hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all shadow-sm"
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
                ? 'bg-[#2d4a3e] text-white rounded-tr-none' 
                : 'bg-white border border-gray-100 text-gray-900 rounded-tl-none'
            }`}>
              <div className="whitespace-pre-wrap leading-relaxed text-[11px] font-medium">
                {m.content}
              </div>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 rounded-2xl p-3 rounded-tl-none flex items-center gap-2">
              <Loader2 size={12} className="animate-spin text-[#D4AF37]" />
              <span className="text-[9px] uppercase font-bold tracking-widest text-gray-400">{commonT.processing}</span>
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
            className="w-full bg-[#fdfaf3]/50 border border-transparent rounded-xl py-2 pl-4 pr-10 text-xs focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-gray-400"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="absolute right-1.5 p-1.5 bg-[#D4AF37] text-white rounded-lg hover:bg-[#D4AF37]/80 transition-colors disabled:opacity-50"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}