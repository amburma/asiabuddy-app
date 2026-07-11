"use client";

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Send, MapPin, Calendar, Users, Home, DollarSign, Heart, FileText, Loader2, MessageSquare, ChevronRight, RefreshCcw, Calendar as CalendarIcon } from 'lucide-react';
import { getConciergeResponse } from '@/services/geminiService';
import { ChatMessage, ThaiLanguage } from '@/types/country';
import { UI_TRANSLATIONS } from '@/lib/i18n';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import HumanOperatorChat from './HumanOperatorChat';

interface Props {
  language: ThaiLanguage;
}

type Step = 'destination' | 'duration' | 'groupSize' | 'accommodation' | 'budget' | 'interest' | 'special' | 'final';

interface PlanData {
  destination: string;
  duration: string;
  adults: number;
  infants: number;
  accommodationType: string;
  budgetLevel: string;
  primaryInterest: string;
  specialRequirements: string;
}

export default function TripPlannerChat({ language }: Props) {
  const [step, setStep] = useState<Step>('destination');
  const [plan, setPlan] = useState<PlanData>({
    destination: '',
    duration: '',
    adults: 1,
    infants: 0,
    accommodationType: '',
    budgetLevel: '',
    primaryInterest: '',
    specialRequirements: ''
  });
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showBookNow, setShowBookNow] = useState(false);
  const [showHumanChat, setShowHumanChat] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const t = UI_TRANSLATIONS[language]?.chat || UI_TRANSLATIONS.EN.chat;
  const l = UI_TRANSLATIONS[language]?.tripPlanner || UI_TRANSLATIONS.EN.tripPlanner;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, step]);

  useEffect(() => {
    if (showHumanChat) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showHumanChat]);

  const handleNext = (nextStep: Step) => {
    setStep(nextStep);
  };

  const generateFinalPlan = async () => {
    setIsLoading(true);
    setStep('final');
    
    const prompt = `Please generate a detailed Thailand travel itinerary based on this data:
    - Destinations: ${plan.destination}
    - Duration: ${plan.duration}
    - Group: ${plan.adults} Adults, ${plan.infants} Infants
    - Accommodation: ${plan.accommodationType}
    - Budget: ${plan.budgetLevel}
    - Interest: ${plan.primaryInterest}
    - Special Requirements: ${plan.specialRequirements}
    
    Format the response as a clear day-by-day plan with specific recommendations for dining and transport.

RESPONSE RULES — MANDATORY:
1. Direct answers only. No intro sentences like 'Hello! I am ThaiGuide...'. Go straight to the answer.
2. No filler. No repetition. No restating the question.
3. Maximum 3 follow-up suggestions only if relevant.
4. Never list your own capabilities unless asked.
5. Out-of-scope question → one sentence decline in user's language only. Nothing else.`;

    try {
      const response = await getConciergeResponse(prompt, [], language);
      setMessages([{ role: 'assistant', content: response }]);
      
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
    } catch (error: any) {
      if (error.fallback === true) {
        setShowFallback(true);
      } else {
        setMessages([{ role: 'assistant', content: t.aiBusyFallback }]);
      }
    }
    setIsLoading(false);
  };

  const modalContent = showHumanChat ? (
    <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => setShowHumanChat(false)}
      />
      <div className="relative w-full h-full md:w-auto md:h-auto md:max-w-lg md:max-h-[85vh] flex flex-col">
        <HumanOperatorChat
          language={language}
          onClose={() => setShowHumanChat(false)}
        />
      </div>
    </div>
  ) : null;

  const renderStep = () => {
    switch(step) {
      case 'destination':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sacred-green mb-2">
              <MapPin size={16} />
              <p className="text-[11px] font-bold uppercase tracking-widest">{l.q1}</p>
            </div>
            <input 
              className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs focus:border-gold-deep outline-none"
              placeholder="e.g. Bangkok & Phuket"
              value={plan.destination}
              onChange={e => setPlan({...plan, destination: e.target.value})}
            />
            <button 
              disabled={!plan.destination}
              onClick={() => handleNext('duration')}
              className="w-full py-3 bg-sacred-green text-white rounded-xl text-[10px] font-bold uppercase tracking-taller disabled:opacity-50"
            >
              {l.next} <ChevronRight size={14} className="inline ml-1" />
            </button>
          </div>
        );
      case 'duration':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sacred-green mb-2">
              <Calendar size={16} />
              <p className="text-[11px] font-bold uppercase tracking-widest">{l.q2}</p>
            </div>
            <input 
              className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs focus:border-gold-deep outline-none"
              placeholder="e.g. 7 days"
              value={plan.duration}
              onChange={e => setPlan({...plan, duration: e.target.value})}
            />
            <button 
              disabled={!plan.duration}
              onClick={() => handleNext('groupSize')}
              className="w-full py-3 bg-sacred-green text-white rounded-xl text-[10px] font-bold uppercase tracking-taller disabled:opacity-50"
            >
              {l.next} <ChevronRight size={14} className="inline ml-1" />
            </button>
          </div>
        );
      case 'groupSize':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sacred-green mb-2">
              <Users size={16} />
              <p className="text-[11px] font-bold uppercase tracking-widest">{l.q3}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-gray-400">{l.adults}</label>
                <input 
                  type="number" min="1"
                  className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs outline-none"
                  value={plan.adults}
                  onChange={e => setPlan({...plan, adults: parseInt(e.target.value) || 1})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-gray-400">{l.infants}</label>
                <input 
                  type="number" min="0"
                  className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs outline-none"
                  value={plan.infants}
                  onChange={e => setPlan({...plan, infants: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>
            <button 
              onClick={() => handleNext('accommodation')}
              className="w-full py-3 bg-sacred-green text-white rounded-xl text-[10px] font-bold uppercase tracking-taller"
            >
              {l.next} <ChevronRight size={14} className="inline ml-1" />
            </button>
          </div>
        );
      case 'accommodation':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sacred-green mb-2">
              <Home size={16} />
              <p className="text-[11px] font-bold uppercase tracking-widest">{l.q4}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {l.accOptions.map((opt: string) => (
                <button
                  key={opt}
                  onClick={() => setPlan({...plan, accommodationType: opt})}
                  className={`p-3 text-[10px] font-bold uppercase rounded-xl border transition-all ${
                    plan.accommodationType === opt ? 'bg-gold-deep text-white border-gold-deep' : 'bg-white border-gray-100'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <button 
              disabled={!plan.accommodationType}
              onClick={() => handleNext('budget')}
              className="w-full py-3 bg-sacred-green text-white rounded-xl text-[10px] font-bold uppercase tracking-taller disabled:opacity-50"
            >
              {l.next} <ChevronRight size={14} className="inline ml-1" />
            </button>
          </div>
        );
      case 'budget':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sacred-green mb-2">
              <DollarSign size={16} />
              <p className="text-[11px] font-bold uppercase tracking-widest">{l.q5}</p>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {l.budgetOptions.map((opt: string) => (
                <button
                  key={opt}
                  onClick={() => setPlan({...plan, budgetLevel: opt})}
                  className={`p-3 text-[10px] font-bold uppercase rounded-xl border text-left flex justify-between items-center transition-all ${
                    plan.budgetLevel === opt ? 'bg-gold-deep text-white border-gold-deep' : 'bg-white border-gray-100'
                  }`}
                >
                  {opt}
                  {plan.budgetLevel === opt && <ChevronRight size={14} />}
                </button>
              ))}
            </div>
            <button 
              disabled={!plan.budgetLevel}
              onClick={() => handleNext('interest')}
              className="w-full py-3 bg-sacred-green text-white rounded-xl text-[10px] font-bold uppercase tracking-taller disabled:opacity-50"
            >
              {l.next} <ChevronRight size={14} className="inline ml-1" />
            </button>
          </div>
        );
      case 'interest':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sacred-green mb-2">
              <Heart size={16} />
              <p className="text-[11px] font-bold uppercase tracking-widest">{l.q6}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {l.interestOptions.map((opt: string) => (
                <button
                  key={opt}
                  onClick={() => setPlan({...plan, primaryInterest: opt})}
                  className={`p-3 text-[10px] font-bold uppercase rounded-xl border transition-all ${
                    plan.primaryInterest === opt ? 'bg-gold-deep text-white border-gold-deep' : 'bg-white border-gray-100'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <button 
              disabled={!plan.primaryInterest}
              onClick={() => handleNext('special')}
              className="w-full py-3 bg-sacred-green text-white rounded-xl text-[10px] font-bold uppercase tracking-taller disabled:opacity-50"
            >
              {l.next} <ChevronRight size={14} className="inline ml-1" />
            </button>
          </div>
        );
      case 'special':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sacred-green mb-2">
              <FileText size={16} />
              <p className="text-[11px] font-bold uppercase tracking-widest">{l.q7}</p>
            </div>
            <textarea 
              className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs focus:border-gold-deep outline-none min-h-[80px]"
              placeholder="e.g. Vegan food only, Wheelchair accessibility..."
              value={plan.specialRequirements}
              onChange={e => setPlan({...plan, specialRequirements: e.target.value})}
            />
            <button 
              onClick={generateFinalPlan}
              className="w-full py-4 bg-gold-deep text-white rounded-xl text-[11px] font-bold uppercase tracking-widest shadow-lg hover:bg-gold-soft"
            >
              {l.submit}
            </button>
          </div>
        );
      case 'final':
        return (
          <div className="space-y-4">
            {isLoading ? (
               <div className="py-12 flex flex-col items-center gap-4 text-center">
                 <Loader2 size={32} className="animate-spin text-gold-deep" />
               </div>
            ) : (
              <div className="space-y-4">
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white border border-gold-soft/20 rounded-2xl p-4 shadow-sm"
                  >
                    <div className="prose prose-sm max-w-none text-[11px] leading-relaxed font-medium text-gray-800 text-left">
                      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{m.content}</ReactMarkdown>
                    </div>
                  </motion.div>
                ))}
                {showFallback && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                    <p className="text-xs text-gray-800 mb-3">{t.aiBusyFallback}</p>
                    <button
                      onClick={() => setShowHumanChat(true)}
                      className="bg-sacred-green text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-opacity-90 transition-colors"
                    >
                      {t.bookNowCta}
                    </button>
                  </div>
                )}
                <button 
                  onClick={() => {
                    setShowBookNow(false);
                    setStep('destination');
                    setMessages([]);
                  }}
                  className="w-full py-3 border border-sacred-green text-sacred-green rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <RefreshCcw size={14} /> {l.restart}
                </button>
                {showBookNow && (
                  <button
                    onClick={() => setShowHumanChat(true)}
                    className="w-full py-3 bg-[#22c55e] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    {t.bookNowCta}
                  </button>
                )}

              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-fit min-h-[500px] w-full bg-sacred-bg/30 rounded-2xl overflow-hidden border border-gold-soft/30 shadow-inner p-6">
      <div className="mb-8 text-center">
        <h4 className="text-sm font-bold uppercase tracking-wider text-sacred-green mb-1">{l.header}</h4>
        <p className="text-[10px] text-gray-500 font-medium">{l.subHeader}</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      {mounted && createPortal(modalContent, document.body)}
    </div>
  );
}
