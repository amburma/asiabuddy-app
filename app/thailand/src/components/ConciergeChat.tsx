import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Loader2, Info, Calendar } from 'lucide-react';
import { getConciergeResponse } from '../services/geminiService';
import { ChatMessage, ThaiLanguage } from '../types';
import { UI_TRANSLATIONS } from '../i18n';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import HumanOperatorChat from './HumanOperatorChat';

interface Props {
  language: ThaiLanguage;
}

export default function ConciergeChat({ language }: Props) {
  const uiT = useMemo(() => UI_TRANSLATIONS[language] || UI_TRANSLATIONS.EN, [language]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showBookNow, setShowBookNow] = useState(false);
  const [showHumanChat, setShowHumanChat] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const t = uiT.chat || UI_TRANSLATIONS.EN.chat;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    setShowBookNow(false);
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const history = messages.map(m => ({
      role: (m.role === 'user' ? 'user' : 'model') as 'user' | 'model',
      parts: [{ text: m.content }]
    }));

    const contextPrompt = `You are a helpful travel concierge for Thailand. ${userMessage}

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

  return (
    <div className="flex flex-col h-[500px] w-full bg-sacred-bg/50 rounded-2xl overflow-hidden gold-border">
      {/* Header */}
      <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gold-deep/10 flex items-center justify-center text-gold-deep">
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
          <div className="space-y-6">
            <div className="text-center py-6 opacity-70">
              <p className="text-sm font-serif italic mb-2 tracking-wide text-gray-800">{t.welcome}</p>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-700">{t.hint}</p>
            </div>
            
            {t.suggestions && t.suggestions.length > 0 && (
              <div className="space-y-3">
                <p className="text-[10px] uppercase font-bold tracking-widest text-gold-deep/60 px-2">
                  {t.suggestionsLabel}
                </p>
                <div className="grid gap-2">
                  {t.suggestions.map((suggestion: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setInput(suggestion)}
                      className="text-left p-3 text-xs bg-white border border-gold-soft/20 rounded-xl hover:border-gold-soft hover:shadow-sm transition-all text-gray-700 font-medium"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {messages.map((message, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
              message.role === 'user' 
                ? 'bg-sacred-green text-white rounded-tr-none' 
                : 'bg-white border border-gold-soft/30 text-gray-900 rounded-tl-none'
            }`}>
              <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-sacred-green prose-hr:my-4 prose-hr:border-gold-soft/20">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{message.content}</ReactMarkdown>
              </div>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 rounded-2xl p-4 rounded-tl-none flex items-center gap-2">
              <Loader2 size={14} className="animate-spin text-gold-deep" />
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
            className="w-full bg-sacred-bg/50 border border-transparent rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-gold-soft transition-all placeholder:text-gray-400"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2 bg-gold-deep text-white rounded-lg hover:bg-gold-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
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
