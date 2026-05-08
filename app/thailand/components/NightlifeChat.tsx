"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // framer-motion ကို အသုံးပြုပါ
import { 
  Send, 
  Loader2, 
  RefreshCcw, 
  Music, 
  Beer, 
  Sparkles 
} from 'lucide-react';
import { getConciergeResponse } from '../services/geminiService';
import { ChatMessage, ThaiLanguage } from '../types';
import { UI_TRANSLATIONS } from '../i18n';

interface Props {
  language: ThaiLanguage;
}

export default function NightlifeChat({ language }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const t = UI_TRANSLATIONS[language]?.nightlife || UI_TRANSLATIONS.EN.nightlife;
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
      const prompt = `You are a specialist in Thailand's nightlife, clubs, and bars. 
      Answer this inquiry based on the latest 2026 standards and local knowledge.
      Ensure you emphasize safety and legal requirements (like carrying a passport and drug laws).
      User question: ${cleanInput}
      Respond strictly in the language code: ${language}.`;
      
      const mappedHistory = messages.map(m => ({
        role: (m.role === 'user' ? 'user' : 'model') as 'user' | 'model',
        parts: [{ text: m.content }]
      }));

      const response = await getConciergeResponse(prompt, mappedHistory, language);
      const assistantMsg: ChatMessage = { role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error("Nightlife Chat Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] w-full bg-white rounded-2xl overflow-hidden border border-[#D4AF37]/20 shadow-sm">
      {/* Header */}
      <div className="p-4 bg-[#fdfaf3]/80 backdrop-blur-sm border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            <Music size={16} />
          </div>
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#2d4a3e]">
              {t.chatTitle}
            </h4>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Nightlife Expert Active</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setMessages([])}
          className="p-2 hover:bg-white rounded-lg text-gray-400 transition-all shadow-sm"
          title="Reset"
        >
          <RefreshCcw size={14} />
        </button>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#fdfaf3]/30 to-transparent scrollbar-hide">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6 px-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-16 h-16 rounded-3xl bg-purple-50 flex items-center justify-center text-purple-600 shadow-inner"
            >
              <Beer size={32} />
            </motion.div>
            <div className="max-w-[280px]">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Discovery Guide</p>
              <div className="flex flex-col gap-2">
                {t.suggestions.map((s: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => handleSend(s)}
                    className="p-3 bg-white border border-gray-100 rounded-xl text-[10px] font-medium text-gray-600 hover:border-purple-300 hover:text-purple-600 transition-all shadow-sm text-left active:scale-[0.98]"
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm">
              <Loader2 size={14} className="animate-spin text-purple-600" />
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
          className="relative flex items-center gap-2"
        >
          <div className="relative flex-grow">
            <input 
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={chatT.placeholder}
              className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl text-[11px] outline-none focus:bg-white focus:border-purple-200 transition-all"
            />
          </div>
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 flex items-center justify-center bg-[#2d4a3e] text-white rounded-xl disabled:opacity-30 transition-all active:scale-90 shadow-md"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}