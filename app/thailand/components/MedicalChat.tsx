"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // motion/react အစား framer-motion ကို သုံးပါ
import { 
  Send, 
  Loader2, 
  RefreshCcw, 
  Stethoscope, 
  Heart 
} from 'lucide-react';
import { getConciergeResponse } from '../services/geminiService';
import { ChatMessage, ThaiLanguage } from '../types';
import { UI_TRANSLATIONS } from '../i18n';

interface Props {
  language: ThaiLanguage;
}

export default function MedicalChat({ language }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Translation safety check
  const t = UI_TRANSLATIONS[language]?.medical || UI_TRANSLATIONS.EN.medical;
  const chatT = UI_TRANSLATIONS[language]?.chat || UI_TRANSLATIONS.EN.chat;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;
    
    const userMsg: ChatMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const prompt = `You are a professional medical travel consultant for Thailand. 
      Answer this inquiry based on the latest 2026 medical standards in Thailand.
      User question: ${text}
      Respond strictly in the language corresponding to code: ${language}.`;
      
      const mappedHistory = messages.map(m => ({
        role: m.role === 'user' ? ('user' as const) : ('model' as const),
        parts: [{ text: m.content }]
      }));

      const response = await getConciergeResponse(prompt, mappedHistory, language);
      const assistantMsg: ChatMessage = { role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error("Medical Chat Error:", error);
      const errorMsg: ChatMessage = { 
        role: 'assistant', 
        content: "I apologize, but I'm having trouble connecting. Please try again." 
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] w-full bg-[#fdfaf3]/30 rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-inner">
      {/* Header */}
      <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
            <Stethoscope size={16} />
          </div>
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#2d4a3e] line-clamp-1">
              {t.chatTitle}
            </h4>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">
                {t.statusActive || 'Medical Concierge Active'}
              </span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setMessages([])}
          className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors"
          title="Reset Chat"
        >
          <RefreshCcw size={14} />
        </button>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 scroll-smooth">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6 px-4">
            <div className="w-16 h-16 rounded-3xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
              <Heart size={32} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                {t.suggestionsLabel || 'Common Medical Inquiries'}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {t.suggestions?.map((s: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => handleSend(s)}
                    className="p-3 bg-white border border-gray-100 rounded-xl text-[10px] font-medium text-gray-600 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all shadow-sm max-w-[280px] text-left"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
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
              <div className={`max-w-[85%] p-4 rounded-2xl text-[11px] leading-relaxed shadow-sm ${
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
            <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm">
              <Loader2 size={14} className="animate-spin text-[#D4AF37]" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <form 
          onSubmit={e => {
            e.preventDefault();
            handleSend(input);
          }}
          className="relative"
        >
          <input 
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={chatT.placeholder}
            className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-100 rounded-xl text-[11px] outline-none focus:border-[#D4AF37] transition-colors"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-[#2d4a3e] text-white rounded-lg disabled:opacity-50 transition-opacity"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}