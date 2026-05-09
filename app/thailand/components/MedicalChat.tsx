import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Send, Loader2, RefreshCcw, ChevronRight, Stethoscope, FileText, Calendar, Heart } from 'lucide-react';
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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    const userMsg: ChatMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const prompt = `You are a professional medical travel consultant for Thailand. 
      Answer this inquiry based on the latest 2026 medical standards in Thailand.
      User question: ${text}
      Respond strictly in ${language}.`;
      
      const mappedHistory: { role: 'user' | 'model', parts: { text: string }[] }[] = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      const response = await getConciergeResponse(prompt, mappedHistory, language);
      const assistantMsg: ChatMessage = { role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] w-full bg-sacred-bg/30 rounded-2xl overflow-hidden border border-gold-soft/30 shadow-inner">
      <div className="p-4 bg-white border-b border-gold-soft/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gold-deep/10 flex items-center justify-center text-gold-deep">
            <Stethoscope size={16} />
          </div>
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-sacred-green line-clamp-1">
              {t.chatTitle}
            </h4>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">{t.statusActive || 'Medical Concierge Active'}</span>
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

      <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 scroll-smooth scrollbar-thin scrollbar-thumb-gold-soft/20">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6 px-4">
            <div className="w-16 h-16 rounded-3xl bg-gold-soft/10 flex items-center justify-center text-gold-deep">
              <Heart size={32} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">{t.suggestionsLabel || 'Common Medical Inquiries'}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {t.suggestions.map((s: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => handleSend(s)}
                    className="p-3 bg-white border border-gray-100 rounded-xl text-[10px] font-medium text-gray-600 hover:border-gold-deep hover:text-gold-deep transition-all shadow-sm max-w-[280px] text-left"
                  >
                    {s}
                  </button>
                ))}
              </div>
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
            <div className={`max-w-[85%] p-4 rounded-2xl text-[11px] leading-relaxed shadow-sm ${
              m.role === 'user' 
                ? 'bg-sacred-green text-white rounded-tr-none' 
                : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'
            }`}>
              {m.content}
            </div>
          </motion.div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm">
              <Loader2 size={14} className="animate-spin text-gold-deep" />
            </div>
          </div>
        )}
      </div>

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
            className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-100 rounded-xl text-[11px] outline-none focus:border-gold-deep transition-colors"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-sacred-green text-white rounded-lg disabled:opacity-50 transition-opacity"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}
