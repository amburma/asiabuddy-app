import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Send, MessageSquare, Sparkles, User, Bot, Loader2, Play } from 'lucide-react';
import { ESSENTIAL_PHRASES, TRAVELER_TIPS } from '../data/phrasesData';
import { SUPPORTED_LANGUAGES, ThaiLanguage } from '../types';
import { UI_TRANSLATIONS } from '../i18n';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import { getConciergeResponse } from '../services/geminiService';

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
  const uiT = useMemo(() => UI_TRANSLATIONS[language] || UI_TRANSLATIONS.EN, [language]);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const phrases = ESSENTIAL_PHRASES[language] || ESSENTIAL_PHRASES['EN'];
  const tips = TRAVELER_TIPS[language] || TRAVELER_TIPS['EN'];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'th-TH';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSend = async (messageText?: string) => {
    const userMessage = messageText || input.trim();
    if (!userMessage) return;

    if (!messageText) setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    isTyping || setIsTyping(true);

    try {
      const history = messages.map(m => ({ 
        role: (m.role === 'user' ? 'user' : 'model') as 'user' | 'model', 
        parts: [{ text: m.content }] 
      }));

      const systemContext = `Thai phrases, audio, and pronunciation guide`;

      const text = await getConciergeResponse(userMessage, history, language, systemContext);
      
      const thaiMatch = text.match(/[\u0E00-\u0E7F]+/);
      const pronMatch = text.match(/\[(.*?)\]/);

      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: text,
        thai: thaiMatch ? thaiMatch[0] : undefined,
        pronunciation: pronMatch ? pronMatch[1] : undefined
      }]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const suggestedQuestions = uiT.tools?.phrasesChat?.suggestions || [];

  return (
    <div className="flex flex-col bg-white">
      {/* Header */}
      <div className="p-8 border-b border-gray-100 bg-sacred-bg/30">
        <div className="max-w-2xl mx-auto text-center space-y-2">
          <h2 className="text-3xl font-serif text-sacred-green">{uiT.tools?.phrases || 'Essential Phrases'}</h2>
          <p className="text-sm text-gold-deep font-medium italic">{uiT.tools?.phrasesSubtitle || 'Basics, Audio & Pronunciation Guide'}</p>
        </div>
      </div>

      {/* Intro & Content */}
      <div className="p-8 pb-0">
        <div className="max-w-2xl mx-auto space-y-12">
          {/* Polite Particles */}
          <div className="bg-sacred-bg/20 p-6 rounded-3xl border border-gold-soft/10">
            <h3 className="text-xl font-serif text-sacred-green mb-3">{uiT.tools?.politeParticlesTitle || 'The Golden Rule: Polite Particles'}</h3>
            <p className="text-sm text-gray-700 leading-relaxed italic mb-4">
              {uiT.tools?.politeParticlesDesc || 'In Thai, politeness is conveyed by adding a particle at the end of almost every sentence.'}
            </p>
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-white rounded-xl border border-gold-soft/20 text-xs font-bold text-sacred-green shadow-sm">
                {uiT.tools?.maleParticle || 'Male: Krap'}
              </div>
              <div className="px-4 py-2 bg-white rounded-xl border border-gold-soft/20 text-xs font-bold text-sacred-green shadow-sm">
                {uiT.tools?.femaleParticle || 'Female: Ka'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {phrases.map((cat, idx) => (
              <div key={idx} className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold-deep border-b border-gold-soft/10 pb-2">
                  {cat.title}
                </h4>
                <div className="space-y-3">
                  {cat.phrases.map((p, pIdx) => (
                    <div key={pIdx} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gold-soft/10 hover:border-gold-deep transition-all group shadow-sm">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 font-medium uppercase tracking-tight mb-0.5">{p.english}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-sacred-green">{p.thai}</span>
                          <span className="text-[10px] text-gold-deep font-medium bg-gold-soft/10 px-1.5 rounded italic">[{p.pronunciation}] 🔊</span>
                        </div>
                      </div>
                      <button 
                         onClick={() => speak(p.thai)}
                        className="p-2 rounded-full bg-sacred-bg text-gold-deep hover:bg-gold-deep hover:text-white transition-all scale-90 group-hover:scale-100"
                      >
                        <Volume2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6 pt-4">
             <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold-deep border-b border-gold-soft/10 pb-2">Traveler Tips</h4>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tips.map((tip, idx) => (
                  <div key={idx} className="p-5 bg-white rounded-2xl border border-gold-soft/10 shadow-sm space-y-2 hover:border-gold-deep transition-all">
                    <h5 className="text-[10px] font-bold uppercase tracking-widest text-sacred-green">{tip.title}</h5>
                    <p className="text-[11px] text-gray-600 leading-relaxed italic">{tip.content}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* Interactive Chat Box Section - AT THE BOTTOM */}
      <div className="mt-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-2xl mx-auto p-8 space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sacred-green text-white shadow-lg">
              <MessageSquare size={16} />
            </div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-sacred-green">
              {uiT.tools?.phrasesChatHeading || 'Ask any Essential Phrases you want to know.'}
            </h4>
          </div>

          {/* Chat area with fixed height inside the flow */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[500px]">
            <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
              {messages.length <= 1 && (
                <div className="flex flex-col items-center justify-center text-center max-w-sm mx-auto space-y-6 pt-4">
                  <div className="w-16 h-16 rounded-full bg-sacred-bg flex items-center justify-center text-gold-deep mb-2">
                    <Sparkles size={32} />
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed uppercase tracking-widest font-medium">
		{uiT.tools?.phrasesEmptyText || 'Ask anything about Thai phrases and language.'}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {suggestedQuestions.map((q, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleSend(q)}
                        className="px-4 py-2 bg-white border border-gold-soft/20 rounded-xl text-[10px] font-medium text-gray-600 hover:border-gold-deep hover:text-gold-deep transition-all shadow-sm"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border border-gold-soft/10 ${
                    m.role === 'user' ? 'bg-gold-soft/20 text-gold-deep' : 'bg-sacred-green text-white'
                  }`}>
                    {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={`max-w-[80%] space-y-3 ${m.role === 'user' ? 'text-right' : ''}`}>
                    <div className={`p-4 rounded-2xl text-[11px] leading-relaxed shadow-sm border ${
                      m.role === 'user' 
                        ? 'bg-white border-gold-soft/20 text-gray-800' 
                        : 'bg-sacred-bg border-gold-soft/10 text-sacred-green font-medium'
                    }`}>
                      <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-sacred-green prose-hr:my-4 prose-hr:border-gold-soft/20">
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{m.content}</ReactMarkdown>
                      </div>
                    </div>
                    {m.thai && (
                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`flex items-center gap-2 p-2 px-4 bg-white rounded-full border border-gold-deep/20 shadow-sm w-fit ${m.role === 'user' ? 'ml-auto' : ''}`}
                      >
                        <span className="text-sm font-bold text-sacred-green">{m.thai}</span>
                        <span className="text-[10px] text-gold-deep italic bg-gold-soft/10 px-2 rounded-full">[{m.pronunciation}] 🔊</span>
                        <button 
                          onClick={() => speak(m.thai!)}
                          className="p-1.5 rounded-full bg-gold-deep/10 text-gold-deep hover:bg-gold-deep hover:text-white transition-all shadow-sm"
                        >
                          <Volume2 size={12} />
                        </button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl bg-sacred-green text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Bot size={14} />
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-gray-100 flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin text-gold-deep" />
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">
                      {uiT.chat.processing || 'ThaiGuide is thinking...'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={uiT.tools?.phrasesChat?.placeholder || 'Ask any phrase...'}
                  className="w-full pl-6 pr-14 py-3 bg-white border border-gold-soft/20 rounded-2xl text-xs focus:ring-2 focus:ring-gold-deep/20 focus:border-gold-deep outline-none transition-all"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-1.5 p-2.5 bg-gold-deep text-white rounded-xl hover:bg-sacred-green disabled:opacity-50 disabled:grayscale transition-all shadow-lg shadow-gold-deep/20"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
          <p className="text-[9px] text-gray-400 text-center uppercase tracking-widest font-bold">
            Translations & Phonetics powered by AsiaBuddy AI
          </p>
        </div>
      </div>
    </div>
  );
}


