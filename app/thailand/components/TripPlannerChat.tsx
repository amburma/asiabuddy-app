"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // framer-motion သို့ ပြောင်းလဲထားပါ
import { 
  Send, MapPin, Calendar, Users, Home, DollarSign, 
  Heart, FileText, Loader2, ChevronRight, RefreshCcw, Sparkles 
} from 'lucide-react';
import { getConciergeResponse } from '../services/geminiService';
import { ChatMessage, ThaiLanguage } from '../types';
import { UI_TRANSLATIONS } from '../i18n';

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
  const scrollRef = useRef<HTMLDivElement>(null);

  const labels: Record<string, any> = {
    myanmar: {
      header: "ထိုင်းခရီးစဉ် ရေးဆွဲသူ",
      subHeader: "သင့်အတွက် အကောင်းဆုံးခရီးစဉ်ကို အတူတူ ဖန်တီးကြပါစို့",
      q1: "ဘယ်မြို့တွေကို သွားရောက်ချင်ပါသလဲ?",
      p1: "ဥပမာ- ဘန်ကောက်၊ ဖူးခက်၊ ချင်းမိုင်",
      q2: "ခရီးစဉ်က ဘယ်လောက်ကြာမှာလဲ?",
      p2: "ဥပမာ- ၅ ရက် ၄ ည (သို့) တစ်ပတ်",
      q3: "လူဦးရေ ဘယ်လောက်ပါမလဲ?",
      adults: "လူကြီး",
      infants: "ကလေး (၂ နှစ်အောက်)",
      q4: "ဘယ်လိုတည်းခိုခန်းမျိုးကို နှစ်သက်ပါသလဲ?",
      accOptions: ["ဟိုတယ် (Hotel)", "ဂက်စ်ဟောက်စ် (Guesthouse)", "ဟော်တယ် (Hostel)", "သတ်မှတ်မထားပါ"],
      q5: "ခရီးစဉ် ဘတ်ဂျက်က ဘယ်လိုရှိပါသလဲ?",
      budgetOptions: ["အသက်သာဆုံး (Budget)", "အလယ်အလတ် (Mid-range)", "ဇိမ်ခံ (Luxury)"],
      q6: "အဓိက ဘာကို စိတ်ဝင်စားပါသလဲ?",
      interestOptions: ["ယဉ်ကျေးမှု/ဘုရားကျောင်း", "ကမ်းခြေ/ကျွန်း", "ဈေးဝယ်ခြင်း", "အစားအစာ", "စွန့်စားမှု"],
      q7: "အခြား အထူးလိုအပ်ချက်များ ရှိပါသလား?",
      p7: "ဥပမာ- သက်သတ်လွတ်စားသူ၊ ဘီးတပ်ကုလားထိုင် လိုအပ်သူ...",
      next: "ရှေ့ဆက်မည်",
      submit: "အစီအစဉ် ရေးဆွဲပါ",
      restart: "အစမှ ပြန်စမည်",
      generating: "သင့်အတွက် အကောင်းဆုံး ခရီးစဉ်ကို ၂၀၂၆ စံနှုန်းများဖြင့် ရေးဆွဲနေသည်..."
    },
    english: {
      header: "AI Trip Planner",
      subHeader: "Let's craft your perfect 2026 Thailand itinerary",
      q1: "Which destinations are you visiting?",
      p1: "e.g., Bangkok, Phuket, Chiang Mai",
      q2: "How long is your trip?",
      p2: "e.g., 5 days 4 nights",
      q3: "How many people are traveling?",
      adults: "Adults",
      infants: "Infants",
      q4: "Preferred accommodation type?",
      accOptions: ["Hotel", "Guesthouse", "Hostel", "No Preference"],
      q5: "What is your budget level?",
      budgetOptions: ["Budget", "Mid-range", "Luxury"],
      q6: "What is your primary interest?",
      interestOptions: ["Culture/Temples", "Beaches/Islands", "Shopping", "Food", "Adventure"],
      q7: "Any special requirements?",
      p7: "e.g., Halal food, wheelchair access...",
      next: "Next Step",
      submit: "Generate 2026 Itinerary",
      restart: "Reset Plan",
      generating: "Crafting your personalized travel guide..."
    }
  };

  const l = labels[language] || labels.english;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isLoading, step]);

  const generateFinalPlan = async () => {
    setIsLoading(true);
    setStep('final');
    
    const prompt = `Please generate a high-end, detailed Thailand travel itinerary for the year 2026 based on this data:
    - Destinations: ${plan.destination}
    - Duration: ${plan.duration}
    - Group: ${plan.adults} Adults, ${plan.infants} Infants
    - Accommodation: ${plan.accommodationType}
    - Budget: ${plan.budgetLevel}
    - Interest: ${plan.primaryInterest}
    - Special Requirements: ${plan.specialRequirements}
    
    Format the response as a clear day-by-day plan. Include current 2026 travel trends, transport advice, and specific dining spots. 
    Respond in ${language === 'myanmar' ? 'Burmese' : 'English'}.`;

    try {
      const response = await getConciergeResponse(prompt, [], language);
      setMessages([{ role: 'assistant', content: response }]);
    } catch (err) {
      setMessages([{ role: 'assistant', content: "Error generating plan. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch(step) {
      case 'destination':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#2d4a3e] mb-2">
              <MapPin size={18} className="text-[#D4AF37]" />
              <p className="text-[11px] font-bold uppercase tracking-widest">{l.q1}</p>
            </div>
            <input 
              autoFocus
              className="w-full p-4 bg-white border border-gray-100 rounded-2xl text-xs focus:border-[#D4AF37] outline-none shadow-inner"
              placeholder={l.p1}
              value={plan.destination}
              onChange={e => setPlan({...plan, destination: e.target.value})}
            />
            <button 
              disabled={!plan.destination}
              onClick={() => setStep('duration')}
              className="w-full py-4 bg-[#2d4a3e] text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-md disabled:opacity-30 transition-all"
            >
              {l.next} <ChevronRight size={14} className="inline ml-1" />
            </button>
          </div>
        );
      case 'duration':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#2d4a3e] mb-2">
              <Calendar size={18} className="text-[#D4AF37]" />
              <p className="text-[11px] font-bold uppercase tracking-widest">{l.q2}</p>
            </div>
            <input 
              autoFocus
              className="w-full p-4 bg-white border border-gray-100 rounded-2xl text-xs focus:border-[#D4AF37] outline-none shadow-inner"
              placeholder={l.p2}
              value={plan.duration}
              onChange={e => setPlan({...plan, duration: e.target.value})}
            />
            <button 
              disabled={!plan.duration}
              onClick={() => setStep('groupSize')}
              className="w-full py-4 bg-[#2d4a3e] text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-md disabled:opacity-30"
            >
              {l.next} <ChevronRight size={14} className="inline ml-1" />
            </button>
          </div>
        );
      case 'groupSize':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#2d4a3e] mb-2">
              <Users size={18} className="text-[#D4AF37]" />
              <p className="text-[11px] font-bold uppercase tracking-widest">{l.q3}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[9px] uppercase font-bold text-gray-400">{l.adults}</label>
                <input 
                  type="number" min="1"
                  className="w-full p-4 bg-white border border-gray-100 rounded-2xl text-xs outline-none"
                  value={plan.adults}
                  onChange={e => setPlan({...plan, adults: parseInt(e.target.value) || 1})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase font-bold text-gray-400">{l.infants}</label>
                <input 
                  type="number" min="0"
                  className="w-full p-4 bg-white border border-gray-100 rounded-2xl text-xs outline-none"
                  value={plan.infants}
                  onChange={e => setPlan({...plan, infants: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>
            <button 
              onClick={() => setStep('accommodation')}
              className="w-full py-4 bg-[#2d4a3e] text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-md"
            >
              {l.next} <ChevronRight size={14} className="inline ml-1" />
            </button>
          </div>
        );
      case 'accommodation':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#2d4a3e] mb-2">
              <Home size={18} className="text-[#D4AF37]" />
              <p className="text-[11px] font-bold uppercase tracking-widest">{l.q4}</p>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {l.accOptions.map((opt: string) => (
                <button
                  key={opt}
                  onClick={() => setPlan({...plan, accommodationType: opt})}
                  className={`p-4 text-[10px] font-bold uppercase tracking-widest rounded-2xl border transition-all text-left ${
                    plan.accommodationType === opt ? 'bg-[#D4AF37] text-white border-[#D4AF37]' : 'bg-white border-gray-100 text-gray-600'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <button 
              disabled={!plan.accommodationType}
              onClick={() => setStep('budget')}
              className="w-full py-4 bg-[#2d4a3e] text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-md disabled:opacity-30"
            >
              {l.next} <ChevronRight size={14} className="inline ml-1" />
            </button>
          </div>
        );
      case 'budget':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#2d4a3e] mb-2">
              <DollarSign size={18} className="text-[#D4AF37]" />
              <p className="text-[11px] font-bold uppercase tracking-widest">{l.q5}</p>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {l.budgetOptions.map((opt: string) => (
                <button
                  key={opt}
                  onClick={() => setPlan({...plan, budgetLevel: opt})}
                  className={`p-4 text-[10px] font-bold uppercase tracking-widest rounded-2xl border flex justify-between items-center transition-all ${
                    plan.budgetLevel === opt ? 'bg-[#D4AF37] text-white border-[#D4AF37]' : 'bg-white border-gray-100 text-gray-600'
                  }`}
                >
                  {opt}
                  {plan.budgetLevel === opt && <ChevronRight size={14} />}
                </button>
              ))}
            </div>
            <button 
              disabled={!plan.budgetLevel}
              onClick={() => setStep('interest')}
              className="w-full py-4 bg-[#2d4a3e] text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-md disabled:opacity-30"
            >
              {l.next} <ChevronRight size={14} className="inline ml-1" />
            </button>
          </div>
        );
      case 'interest':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#2d4a3e] mb-2">
              <Heart size={18} className="text-[#D4AF37]" />
              <p className="text-[11px] font-bold uppercase tracking-widest">{l.q6}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {l.interestOptions.map((opt: string) => (
                <button
                  key={opt}
                  onClick={() => setPlan({...plan, primaryInterest: opt})}
                  className={`p-4 text-[10px] font-bold uppercase tracking-widest rounded-2xl border transition-all text-center ${
                    plan.primaryInterest === opt ? 'bg-[#D4AF37] text-white border-[#D4AF37]' : 'bg-white border-gray-100 text-gray-600'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <button 
              disabled={!plan.primaryInterest}
              onClick={() => setStep('special')}
              className="w-full py-4 bg-[#2d4a3e] text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-md disabled:opacity-30"
            >
              {l.next} <ChevronRight size={14} className="inline ml-1" />
            </button>
          </div>
        );
      case 'special':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#2d4a3e] mb-2">
              <FileText size={18} className="text-[#D4AF37]" />
              <p className="text-[11px] font-bold uppercase tracking-widest">{l.q7}</p>
            </div>
            <textarea 
              className="w-full p-4 bg-white border border-gray-100 rounded-2xl text-xs focus:border-[#D4AF37] outline-none min-h-[100px] shadow-inner"
              placeholder={l.p7}
              value={plan.specialRequirements}
              onChange={e => setPlan({...plan, specialRequirements: e.target.value})}
            />
            <button 
              onClick={generateFinalPlan}
              className="w-full py-4 bg-[#D4AF37] text-white rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] shadow-lg hover:bg-[#2d4a3e] transition-all"
            >
              {l.submit}
            </button>
          </div>
        );
      case 'final':
        return (
          <div className="space-y-4">
            {isLoading ? (
               <div className="py-20 flex flex-col items-center gap-5 text-center">
                 <div className="relative">
                   <Loader2 size={40} className="animate-spin text-[#D4AF37]" />
                   <Sparkles className="absolute -top-1 -right-1 text-gold-soft animate-pulse" size={16} />
                 </div>
                 <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37] max-w-[200px] leading-relaxed">{l.generating}</p>
               </div>
            ) : (
              <div className="space-y-4">
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white border border-[#D4AF37]/10 rounded-2xl p-5 shadow-sm"
                  >
                    <div className="prose prose-sm max-w-none text-[12px] leading-relaxed font-medium text-gray-800 whitespace-pre-wrap">
                      {m.content}
                    </div>
                  </motion.div>
                ))}
                <button 
                  onClick={() => { setStep('destination'); setMessages([]); }}
                  className="w-full py-4 border-2 border-[#2d4a3e] text-[#2d4a3e] rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-50"
                >
                  <RefreshCcw size={14} /> {l.restart}
                </button>
              </div>
            )}
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-fit min-h-[550px] w-full bg-gradient-to-b from-[#fdfaf3] to-white rounded-3xl overflow-hidden border border-[#D4AF37]/20 shadow-xl p-6 sm:p-8">
      <div className="mb-10 text-center">
        <div className="w-12 h-12 bg-[#2d4a3e] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
          <Sparkles className="text-[#D4AF37]" size={24} />
        </div>
        <h4 className="text-[13px] font-bold uppercase tracking-[0.3em] text-[#2d4a3e] mb-1">{l.header}</h4>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{l.subHeader}</p>
      </div>

      <div ref={scrollRef} className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}