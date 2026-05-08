"use client"; // Client-side hooks သုံးထားလို့ မဖြစ်မနေ ထည့်ရပါမယ်

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // motion/react မှ framer-motion သို့ ပြောင်းလိုက်ပါ
import { Send, Bot, Loader2, Info } from 'lucide-react';
import { getConciergeResponse } from '../services/geminiService';
import { ChatMessage, ThaiLanguage } from '../types';
import { UI_TRANSLATIONS } from '../i18n';

interface Props {
  language: ThaiLanguage;
}

export default function ConciergeChat({ language }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const t = UI_TRANSLATIONS[language]?.chat || UI_TRANSLATIONS.EN.chat;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: (m.role === 'user' ? 'user' : 'model') as 'user' | 'model',
        parts: [{ text: m.content }]
      }));

      const response = await getConciergeResponse(userMessage, history, language);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error("Concierge Chat Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] w-full bg-[#fdfaf3]/50 rounded-2xl overflow-hidden border border-[#D4AF37]/30">
      {/* Header */}
      <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
            <Bot size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest leading-none mb-1">{t.title}</h4>
            <p className="text-[10px] text-gray-700 font-medium tracking-tight">{t.status}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-6 space-y-6"
      >
        {messages.length === 0 && (
          <div className="text-center py-10 opacity-70">
            <p className="text-sm font-serif italic mb-2 tracking-wide text-gray-800">{t.welcome}</p>
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-700">{t.hint}</p>
          </div>
        )}
        
        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
                m.role === 'user' 
                  ? 'bg-[#2d4a3e] text-white rounded-tr-none' 
                  : 'bg-white border border-[#D4AF37]/30 text-gray-900 rounded-tl-none'
              }`}>
                <div className="whitespace-pre-wrap leading-relaxed text-sm font-medium">
                  {m.content}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 rounded-2xl p-4 rounded-tl-none flex items-center gap-2">
              <Loader2 size={14} className="animate-spin text-[#D4AF37]" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">{t.processing || 'Thinking...'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.placeholder}
            className="w-full bg-[#fdfaf3]/50 border border-transparent rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-gray-400"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2 bg-[#D4AF37] text-white rounded-lg hover:bg-[#D4AF37]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
        <div className="mt-3 flex items-center gap-2 opacity-40">
           <Info size={10} />
           <p className="text-[9px] uppercase tracking-tighter font-bold">{t.safe}</p>
        </div>
      </div>
    </div>
  );
}