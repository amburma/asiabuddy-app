"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
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

  const t = UI_TRANSLATIONS[language]?.medical || UI_TRANSLATIONS.EN.medical;
  const chatT = UI_TRANSLATIONS[language]?.chat || UI_TRANSLATIONS.EN.chat;

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    const cleanInput = text.trim();
    if (!cleanInput || isLoading) return;
    
    const userMsg: ChatMessage = { role: 'user', content: cleanInput };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const prompt = `You are a professional medical travel consultant for Thailand. 
      Answer this inquiry based on the latest 2026 medical standards in Thailand.
      User question: ${cleanInput}
      Respond strictly in the language corresponding to code: ${language}.`;
      
      const mappedHistory = messages.map(m => ({
        role: (m.role === 'user' ? 'user' : 'model') as 'user' | 'model',
        parts: [{ text: m.content }]
      }));

      const response = await getConciergeResponse(prompt, mappedHistory, language);
      const assistantMsg: ChatMessage = { role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error("Medical Chat Error:", error);
      const errorMsg: ChatMessage = { 
        role: 'assistant', 
        content: "I apologize, but I'm having trouble connecting. Please check your connection and try again." 
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] w-full bg-white rounded-2xl overflow-hidden border border-[#D4AF37]/20 shadow-sm">
      {/* Header */}
      <div className="p-4 bg-[#fdfaf3]/50 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
            <Stethoscope size={16} />
          </div>
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#2d4a3e]">
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
          className="p-2 hover:bg-white rounded-lg text-gray-400 transition-colors shadow-sm"
          title="Reset Chat"
        >
          <RefreshCcw size={14} />
        </button>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-[#fdfaf3]/10">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6 px-4">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center text-[#D4AF37] shadow-sm"
            >
              <Heart size={32} />
            </motion.div>
            <div className="max-w-[280px]">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
                {t.suggestionsLabel || 'Common Medical Inquiries'}
              </p>
              <div className="flex flex-col gap-2">
                {t.suggestions?.map((s: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => handleSend(s)}
                    className="p-3 bg-white border border-gray-100 rounded-xl text-[10px] font-medium text-gray-600 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all shadow-sm text-left active:scale-[0.98]"
                  >
                    {s}
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
              <div className={`max-w-[85%] p-3.5 rounded-2xl text-[11px] leading-relaxed shadow-sm ${
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
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm">
              <Loader2 size={14} className="animate-spin text-[#D4AF37]" />
            </div>
          </motion.div>
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
            className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-transparent rounded-xl text-[11px] outline-none focus:bg-white focus:border-[#D4AF37]/50 transition-all placeholder:text-gray-400"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-[#2d4a3e] text-white rounded-lg disabled:opacity-30 disabled:grayscale transition-all active:scale-90"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}