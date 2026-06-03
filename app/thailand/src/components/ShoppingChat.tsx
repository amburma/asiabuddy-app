import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, ShoppingBag, Loader2, MessageSquare, Calendar } from 'lucide-react';
import { getConciergeResponse } from '../services/geminiService';
import { ChatMessage, ThaiLanguage } from '../types';
import { UI_TRANSLATIONS } from '../i18n';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import HumanOperatorChat from './HumanOperatorChat';

interface Props {
  language: ThaiLanguage;
}

export default function ShoppingChat({ language }: Props) {
  const uiT = useMemo(() => UI_TRANSLATIONS[language] || UI_TRANSLATIONS.EN, [language]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showHumanChat, setShowHumanChat] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const t = uiT.shopping || UI_TRANSLATIONS.EN.shopping;
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

    const contextPrompt = `You are a specialized Thailand Shopping concierge. Help the traveler with specific shopping advice (Luxury malls, night markets like Jodd Fairs, Chatuchak strategies, VAT refund process, bargaining etiquette, etc.). ${userMessage}`;
    
    const response = await getConciergeResponse(contextPrompt, history, language);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[450px] w-full bg-white rounded-2xl overflow-hidden border border-gold-soft/30 shadow-sm">
      {/* Header */}
      <div className="p-4 bg-sacred-bg border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gold-deep/10 flex items-center justify-center text-gold-deep">
            <ShoppingBag size={18} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest leading-none mb-1 text-sacred-green">{t.title}</h4>
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-orange-500 animate-pulse" />
              <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">ThaiGuide Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-4 space-y-4 bg-sacred-bg/20 transition-all duration-300"
      >
        {messages.length <= 1 && (
          <div className="space-y-6 py-4">
            <div className="text-center opacity-70">
              <MessageSquare size={24} className="mx-auto mb-3 text-gold-soft" />
              <p className="text-xs font-serif italic mb-2 tracking-wide text-gray-800">{commonT.welcome}</p>
            </div>
            
            <div className="grid grid-cols-1 gap-2 px-4">
              {t.suggestions.map((suggestion: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => handleSend(suggestion)}
                  className="text-left p-3 text-[10px] font-bold uppercase tracking-widest bg-white border border-gray-100 rounded-xl hover:border-gold-deep hover:text-gold-deep transition-all shadow-sm"
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
                ? 'bg-sacred-green text-white rounded-tr-none' 
                : 'bg-white border border-gold-soft/20 text-gray-900 rounded-tl-none'
            }`}>
              <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-sacred-green prose-hr:my-4 prose-hr:border-gold-soft/20">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{m.content}</ReactMarkdown>
              </div>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 rounded-2xl p-3 rounded-tl-none flex items-center gap-2">
              <Loader2 size={12} className="animate-spin text-gold-deep" />
              <span className="text-[9px] uppercase font-bold tracking-widest text-gray-400">{commonT.processing || 'ThaiGuide is thinking...'}</span>
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
            className="w-full bg-sacred-bg/50 border border-transparent rounded-xl py-2 pl-4 pr-10 text-xs focus:outline-none focus:border-gold-soft transition-all placeholder:text-gray-400"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="absolute right-1.5 p-1.5 bg-gold-deep text-white rounded-lg hover:bg-gold-soft transition-colors disabled:opacity-50"
          >
            <Send size={14} />
          </button>
        </div>

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
