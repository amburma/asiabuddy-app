import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Plane, User, Loader2, Info, MessageSquare, Receipt, Car, Bus, Ticket, Calendar } from 'lucide-react';
import { ChatMessage, ThaiLanguage } from '@/types/country';
import { UI_TRANSLATIONS } from '@/lib/i18n';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import HumanOperatorChat from '../thailand/HumanOperatorChat';

interface Props {
  language: ThaiLanguage;
}

export default function BookingChat({ language }: Props) {
  const uiT = useMemo(() => UI_TRANSLATIONS[language] || UI_TRANSLATIONS.EN, [language]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showHumanChat, setShowHumanChat] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const t = uiT.booking || UI_TRANSLATIONS.EN.booking;
  const commonT = uiT.chat || UI_TRANSLATIONS.EN.chat;

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

    const history = messages.map(m => ({
      role: (m.role === 'user' ? 'user' : 'model') as 'user' | 'model',
      parts: [{ text: m.content }]
    }));

    try {
      const response = await fetch('http://localhost:3001/api/booking-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          history,
          language,
          bookingContext: 'thailand',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'API request failed');
      }

      const data = await response.json();
      let finalResponse = data.response || "I apologize, but I am unable to provide information at this time.";
      
      // Safety check: ensure disclaimer is there if the model fails to include it
      if (!finalResponse.includes(t.disclaimer)) {
        finalResponse += `\n\n${t.disclaimer}`;
      }

      setMessages(prev => [...prev, { role: 'assistant', content: finalResponse }]);
    } catch (error: any) {
      console.error('Booking chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: language === 'MM'
          ? 'တစ်ခုခု မှားယွင်းသွားပါတယ်။ ခဏနေပြီး ထပ်ကြိုးစားကြည့်ပါ။ 🙏'
          : 'Something went wrong. Please try again shortly. 🙏'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] w-full bg-white rounded-3xl overflow-hidden border border-gold-soft/30 shadow-2xl">
      {/* Header */}
      <div className="p-6 bg-sacred-bg border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            <div className="w-10 h-10 rounded-full bg-gold-deep flex items-center justify-center text-white ring-2 ring-white">
              <Car size={18} />
            </div>
            <div className="w-10 h-10 rounded-full bg-sacred-green flex items-center justify-center text-white ring-2 ring-white">
              <Ticket size={18} />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest leading-none mb-1 text-sacred-green">{t.chatTitle}</h4>
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-gold-deep animate-pulse" />
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">ThaiGuide Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-6 space-y-4 bg-sacred-bg/20"
      >
        {messages.length <= 1 && (
          <div className="space-y-6 py-4">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gold-soft/20 shadow-sm text-center">
              <MessageSquare size={28} className="mx-auto mb-4 text-gold-deep opacity-40" />
              <p className="text-sm font-serif italic mb-4 leading-relaxed text-gray-800">
                {commonT.welcome}
              </p>
              <div className="flex items-center justify-center gap-2 text-[9px] uppercase font-bold tracking-widest text-gold-deep bg-gold-soft/10 py-2 px-4 rounded-full w-fit mx-auto">
                <Info size={12} />
                <span>Estimate Prices Only</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {t.suggestions.map((suggestion: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => handleSend(suggestion)}
                  className="text-left p-4 text-[10px] font-bold uppercase tracking-widest bg-white border border-gray-100 rounded-2xl hover:border-gold-deep hover:text-gold-deep transition-all shadow-sm flex items-center justify-between group"
                >
                  <span className="max-w-[80%]">{suggestion}</span>
                  <Plane size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-gold-deep" />
                </button>
              ))}
            </div>
          </div>
        )}
        
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] rounded-2xl p-4 shadow-md ${
              m.role === 'user' 
                ? 'bg-sacred-green text-white rounded-tr-none' 
                : 'bg-white border border-gold-soft/20 text-gray-900 rounded-tl-none'
            }`}>
              <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-sacred-green prose-hr:my-4 prose-hr:border-gold-soft/20">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{m.content}</ReactMarkdown>
              </div>
              {m.role === 'assistant' && (
                 <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
                    <div className="w-1 h-1 bg-gold-deep rounded-full animate-pulse" />
                    <span className="text-[8px] uppercase font-bold tracking-widest text-gray-400">AsiaBuddy Verfied</span>
                 </div>
              )}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 rounded-2xl p-4 rounded-tl-none flex items-center gap-3 shadow-sm">
              <Loader2 size={14} className="animate-spin text-gold-deep" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="relative flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.placeholder}
            className="flex-grow bg-sacred-bg/50 border border-transparent rounded-2xl py-3 px-5 text-sm focus:outline-none focus:border-gold-soft focus:bg-white transition-all placeholder:text-gray-400 font-medium"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="p-3 bg-gold-deep text-white rounded-2xl hover:bg-sacred-green transition-all shadow-lg shadow-gold-deep/20 disabled:opacity-50 disabled:shadow-none"
          >
            <Send size={20} />
          </button>
        </div>

        <p className="text-[8px] text-center mt-3 text-gray-400 font-bold uppercase tracking-widest">
           AsiaBuddy Booking Assistant &bull; Legal Compliant
        </p>
      </div>

      {/* Human Operator Chat Modal */}
      <AnimatePresence>
        {showHumanChat && (
          <HumanOperatorChat
            language={language}
            onClose={() => setShowHumanChat(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
