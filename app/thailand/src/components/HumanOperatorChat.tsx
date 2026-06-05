import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Loader2, X, Headphones } from 'lucide-react';
import { ChatMessage, ThaiLanguage } from '../types';
import { UI_TRANSLATIONS } from '../i18n';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { getConciergeResponse } from '../services/geminiService';

interface Props {
  language: ThaiLanguage;
  onClose: () => void;
}

export default function HumanOperatorChat({ language, onClose }: Props) {
  const uiT = useMemo(() => UI_TRANSLATIONS[language] || UI_TRANSLATIONS.EN, [language]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Hello! I\'m your human operator. How can I help you with your booking today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const t = uiT.chat || UI_TRANSLATIONS.EN.chat;

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

    // Get AI response for human operator chat
    const contextPrompt = 'You are a human operator providing premium support for a travel booking service. You are helping customers with their booking requests, answering questions, and providing personalized assistance. Be professional, helpful, and friendly. Respond in the same language as the customer.';
    const response = await getConciergeResponse(contextPrompt, messages, language);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg h-[600px] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-gold-deep to-amber-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Headphones size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest leading-none mb-1">Human Operator</h4>
              <p className="text-[10px] opacity-90 font-medium tracking-tight">1-on-1 Live Chat</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div 
          ref={scrollRef}
          className="flex-grow overflow-y-auto p-6 space-y-6 bg-gray-50"
        >
          {messages.map((message, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
                message.role === 'user' 
                  ? 'bg-gold-deep text-white rounded-tr-none' 
                  : 'bg-white border border-gray-200 text-gray-900 rounded-tl-none'
              }`}>
                <div className="prose prose-sm max-w-none prose-p:leading-relaxed">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>{message.content}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl p-4 rounded-tl-none flex items-center gap-2">
                <Loader2 size={14} className="animate-spin text-gold-deep" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Operator is typing...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="w-full bg-gray-100 border border-transparent rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-gold-soft transition-all placeholder:text-gray-400"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-2 bg-gold-deep text-white rounded-lg hover:bg-gold-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="mt-2 text-center">
            <p className="text-[10px] text-gray-400">Average response time: 2-5 minutes</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
