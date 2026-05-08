import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Send, MessageSquare, Sparkles, User, Bot, Loader2, Play } from 'lucide-react';
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

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `The user is asking for a Thai phrase: "${userMessage}". 
          Please provide:
          1. The Thai translation.
          2. The pronunciation in brackets [ ].
          3. A brief explanation if needed.
          Keep it polite.`,
          history: messages.map(m => ({ role: m.role, parts: [{ text: m.content }] }))
        })
      });

      const data = await response.json();
      
      // Smart parsing of AI response to extract Thai and Pronunciation
      // Example response: "Hospital in Thai is โรงพยาบาล [Rong Phayaban]. It is used for medical emergencies."
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
    "How do I say 'How much does this cost?' in Thai?",
    "What is the polite way to say 'Thank you' for men and women?",
    "How do I ask for the restroom?",
    "How do I say 'I am allergic to peanuts'?",
    "What is the Thai phrase for 'Can you lower the price?'"
  ];

  return (
    <div className="flex flex-col h-[70vh] bg-white">
      {/* Introduction Content */}
      <div className="p-8 border-b border-gray-100 bg-sacred-bg/30">
        <div className="max-w-2xl mx-auto space-y-8">
          <div>
            <h3 className="text-xl font-serif text-sacred-green mb-4">The Golden Rule: Polite Particles</h3>
            <p className="text-sm text-gray-700 leading-relaxed italic">
              In Thai, politeness is conveyed by adding a particle at the end of almost every sentence.
            </p>
            <div className="flex gap-4 mt-3">
              <div className="px-4 py-2 bg-white rounded-lg border border-gold-soft/20 text-xs font-bold text-sacred-green flex items-center gap-2 shadow-sm">
                <span>Male: <span className="text-gold-deep">Krap</span></span>
              </div>
              <div className="px-4 py-2 bg-white rounded-lg border border-gold-soft/20 text-xs font-bold text-sacred-green flex items-center gap-2 shadow-sm">
                <span>Female: <span className="text-gold-deep">Ka</span></span>
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

          <div className="grid grid-cols-1 gap-6 pt-4">
             <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold-deep border-b border-gold-soft/10 pb-2">Traveler Tips</h4>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tips.map((tip, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-2xl border border-gold-soft/10 shadow-sm space-y-2">
                    <h5 className="text-[10px] font-bold uppercase tracking-widest text-sacred-green">{tip.title}</h5>
                    <p className="text-[11px] text-gray-600 leading-relaxed italic">{tip.content}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* Interactive Chat */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="p-6 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sacred-green text-white shadow-lg shadow-sacred-green/20">
              <MessageSquare size={16} />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-sacred-green">Interactive Phrase Helper</h4>
              <p className="text-[10px] text-gray-500 font-medium tracking-tight">
                {uiT.tools?.phrasesChat?.placeholder || 'Ask any Essential Phrases you want to know'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] bg-repeat" ref={scrollRef}>
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto space-y-6 opacity-60">
              <div className="w-16 h-16 rounded-full bg-sacred-bg flex items-center justify-center text-gold-deep mb-2">
                <Sparkles size={32} />
              </div>
              <div>
                <p className="text-sm font-serif text-sacred-green italic mb-2">"How do I say...?"</p>
                <p className="text-[11px] text-gray-500 leading-relaxed uppercase tracking-widest">
                  {uiT.tools?.phrasesChat?.placeholder || 'Ask any Essential Phrases you want to know'}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {suggestedQuestions.map((q, idx) => (
                  <button 
                    key={idx}
                    onClick={() => { setInput(q); handleSend(); }}
                    className="px-3 py-1.5 bg-white border border-gold-soft/20 rounded-full text-[10px] font-medium text-gray-600 hover:border-gold-deep hover:text-gold-deep transition-all shadow-sm"
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
                  {m.content}
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
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-2">
                <Loader2 size={14} className="animate-spin text-gray-400" />
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">AI is thinking...</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-white border-t border-gray-100">
          <div className="max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={uiT.tools?.phrasesChat?.placeholder || 'Ask any Essential Phrases you want to know...'}
                className="w-full pl-6 pr-14 py-4 bg-sacred-bg/50 border border-gold-soft/20 rounded-2xl text-xs focus:ring-2 focus:ring-gold-deep/20 focus:border-gold-deep outline-none transition-all"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="absolute right-2 p-3 bg-gold-deep text-white rounded-xl hover:bg-sacred-green disabled:opacity-50 disabled:grayscale transition-all shadow-lg shadow-gold-deep/20"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[9px] text-gray-400 mt-4 text-center uppercase tracking-widest font-bold">
              Translations & Phonetics powered by AsiaBuddy AI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
