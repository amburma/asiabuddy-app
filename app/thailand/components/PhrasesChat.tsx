"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // framer-motion ကို သုံးပါ
import { Volume2, Send, MessageSquare, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { ESSENTIAL_PHRASES, TRAVELER_TIPS } from '../data/phrasesData';
import { ThaiLanguage } from '../types';
import { UI_TRANSLATIONS } from '../i18n';

interface Props {
  language: ThaiLanguage;
}

interface Message {
  role: 'user' | 'bot';
  content: string;
  thai?: string;
  pronunciation?: string;
}

export default function PhrasesChat({ language }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const phrases = ESSENTIAL_PHRASES[language] || ESSENTIAL_PHRASES.english;
  const tips = TRAVELER_TIPS[language] || TRAVELER_TIPS.english;
  const uiT = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.EN;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const speak = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // အရင်အသံကို ရပ်ပါ
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'th-TH';
      utterance.rate = 0.9; // နည်းနည်းလေး နှေးပေးခြင်းဖြင့် နားထောင်ရ ပိုလွယ်စေသည်
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input.trim();
    if (!textToSend || isTyping) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: textToSend }]);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `The user is asking for a Thai phrase: "${textToSend}". Provide: 1. Thai translation. 2. Pronunciation in [ ]. 3. Brief explanation. Politeness is key.`,
          history: messages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.content }] }))
        })
      });

      const data = await response.json();
      
      const thaiMatch = data.text.match(/[\u0E00-\u0E7F]+/);
      const pronMatch = data.text.match(/\[(.*?)\]/);

      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: data.text,
        thai: thaiMatch ? thaiMatch[0] : undefined,
        pronunciation: pronMatch ? pronMatch[1] : undefined
      }]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const suggestedQuestions = uiT.tools?.phrasesChat?.suggestions || [
    "How do I say 'How much does this cost?'",
    "Polite way to say 'Thank you'",
    "How to ask for the restroom?",
    "I am allergic to peanuts"
  ];

  return (
    <div className="flex flex-col h-[75vh] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl">
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Intro Section */}
        <div className="p-8 bg-[#fdfaf3]/50 border-b border-gray-100">
          <div className="max-w-2xl mx-auto space-y-8">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h3 className="text-xl font-serif text-[#2d4a3e] mb-2">The Golden Rule: Polite Particles</h3>
              <p className="text-xs text-gray-500 italic mb-4">Add these to the end of every sentence to be respectful.</p>
              <div className="flex gap-3">
                <div className="px-4 py-2 bg-white rounded-xl border border-[#D4AF37]/20 text-[10px] font-bold text-[#2d4a3e] shadow-sm">
                  Male: <span className="text-[#D4AF37]">Krap</span>
                </div>
                <div className="px-4 py-2 bg-white rounded-xl border border-[#D4AF37]/20 text-[10px] font-bold text-[#2d4a3e] shadow-sm">
                  Female: <span className="text-[#D4AF37]">Ka</span>
                </div>
              </div>
            </motion.div>

            {/* Static Phrases Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {phrases.map((cat: any, idx: number) => (
                <div key={idx} className="space-y-3">
                  <h4 className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#D4AF37] opacity-70">
                    {cat.title}
                  </h4>
                  <div className="space-y-2">
                    {cat.phrases.map((p: any, pIdx: number) => (
                      <div key={pIdx} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-50 hover:border-[#D4AF37]/30 transition-all group shadow-sm">
                        <div className="flex flex-col">
                          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter mb-0.5">{p.english}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#2d4a3e]">{p.thai}</span>
                            <span className="text-[9px] text-[#D4AF37] font-medium italic">[{p.pronunciation}]</span>
                          </div>
                        </div>
                        <button onClick={() => speak(p.thai)} className="p-2 rounded-full bg-[#fdfaf3] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all active:scale-90">
                          <Volume2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="p-6 space-y-6" ref={scrollRef}>
          {messages.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center max-w-sm mx-auto space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#fdfaf3] flex items-center justify-center text-[#D4AF37]">
                <Sparkles size={24} />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">Ask AsiaBuddy AI for any phrase</p>
              <div className="flex flex-wrap justify-center gap-2">
                {suggestedQuestions.map((q, idx) => (
                  <button key={idx} onClick={() => handleSend(q)} className="px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-[10px] text-gray-600 hover:bg-white hover:border-[#D4AF37] transition-all active:scale-95 shadow-sm">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {messages.map((m, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-[11px] leading-relaxed shadow-sm ${
                    m.role === 'user' ? 'bg-[#2d4a3e] text-white rounded-tr-none' : 'bg-gray-50 text-gray-800 rounded-tl-none border border-gray-100'
                  }`}>
                    {m.content}
                  </div>
                  {m.thai && (
                    <button onClick={() => speak(m.thai!)} className="mt-2 flex items-center gap-2 p-2 px-4 bg-white rounded-full border border-[#D4AF37]/30 shadow-sm active:scale-95 transition-transform">
                      <span className="text-xs font-bold text-[#2d4a3e]">{m.thai}</span>
                      <span className="text-[9px] text-[#D4AF37] italic">[{m.pronunciation}]</span>
                      <Volume2 size={12} className="text-[#D4AF37]" />
                    </button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          )}
          {isTyping && (
            <div className="flex justify-start">
              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-2">
                <Loader2 size={14} className="animate-spin text-[#D4AF37]" />
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Translating...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Box */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask for a translation..."
            className="w-full pl-5 pr-14 py-4 bg-gray-50 border border-transparent rounded-2xl text-[11px] focus:bg-white focus:border-[#D4AF37]/50 outline-none transition-all shadow-inner"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-[#2d4a3e] text-white rounded-xl hover:bg-[#3d6354] disabled:opacity-30 transition-all active:scale-90 shadow-md flex items-center justify-center"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}