import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, MapPin, Calendar, Users, Home, DollarSign, Heart, FileText, Loader2, MessageSquare, ChevronRight, RefreshCcw, Calendar as CalendarIcon } from 'lucide-react';
import { getConciergeResponse } from '../services/geminiService';
import { ChatMessage, ThaiLanguage } from '../types';
import { UI_TRANSLATIONS } from '../i18n';
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
  const [showHumanChat, setShowHumanChat] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const t = UI_TRANSLATIONS[language]?.chat || UI_TRANSLATIONS.EN.chat;

  const labels: Record<string, any> = {
    MM: {
      header: "ထိုင်းခရီးစဉ် စီစဉ်ပေးသူ",
      subHeader: "သင့်ခရီးစဉ်ကို အဆင့်ဆင့် စီစဉ်ကြပါစို့",
      q1: "ဘယ်မြို့တွေကို သွားရောက်ချင်ပါသလဲ? (ဥပမာ- ဘန်ကောက်၊ ဖူးခက်၊ ချင်းမိုင်)",
      q2: "ခရီးစဉ်က ဘယ်လောက်ကြာမှာလဲ? (ဥပမာ- ၅ ရက် ၄ ည)",
      q3: "လူဦးရေ ဘယ်လောက်ပါမလဲ?",
      adults: "လူကြီး",
      infants: "ကလေးငယ်",
      q4: "ဘယ်လိုတည်းခိုခန်းမျိုးကို နှစ်သက်ပါသလဲ?",
      accOptions: ["ဟိုတယ် (Hotel)", "ဂက်စ်ဟောက်စ် (Guesthouse)", "ဟော်တယ် (Hostel)", "သတ်မှတ်မထားပါ"],
      q5: "ဘတ်ဂျက်က ဘယ်လိုရှိပါသလဲ?",
      budgetOptions: ["အသက်သာဆုံး (Budget)", "အလယ်အလတ် (Mid-range)", "ဇိမ်ခံ (Luxury)"],
      q6: "အဓိက စိတ်ဝင်စားမှုက ဘာဖြစ်မလဲ?",
      interestOptions: ["ယဉ်ကျေးမှု/ဘုရားကျောင်း", "ကမ်းခြေ/ကျွန်း", "ဈေးဝယ်ခြင်း", "အစားအစာ", "စွန့်စားမှု"],
      q7: "အခြား အထူးလိုအပ်ချက်များ ရှိပါသလား? (ဥပမာ- သက်သတ်လွတ်စားသူ၊ ဘီးတပ်ကုလားထိုင် လိုအပ်သူ)",
      next: "နောက်တစ်ခု",
      submit: "အစီအစဉ် ထုတ်ပေးပါ",
      restart: "အစမှ ပြန်စမည်",
      generating: "သင့်အတွက် အကောင်းဆုံး ခရီးစဉ်ကို ရေးဆွဲနေသည်..."
    },
    EN: {
      header: "Automated Trip Planner",
      subHeader: "Let's plan your perfect Thailand trip step-by-step",
      q1: "Which destinations are you interested in? (e.g., Bangkok, Phuket, Chiang Mai)",
      q2: "How long is your trip? (e.g., 5 days 4 nights)",
      q3: "How many people are traveling?",
      adults: "Adults",
      infants: "Infants",
      q4: "What type of accommodation do you prefer?",
      accOptions: ["Hotel", "Guesthouse", "Hostel", "No Preference"],
      q5: "What is your budget level?",
      budgetOptions: ["Budget", "Mid-range", "Luxury"],
      q6: "What is your primary interest?",
      interestOptions: ["Culture/Temples", "Beaches/Islands", "Shopping", "Food", "Adventure"],
      q7: "Any special requirements? (e.g., Halal food, wheelchair access, traveling with pets)",
      next: "Next",
      submit: "Generate Plan",
      restart: "Start Over",
      generating: "Crafting your personalized itinerary..."
    }
  };

  const l = labels[language] || labels['EN'];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, step]);

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

ABSOLUTE LANGUAGE RULE: Detect the language of the user's message above and respond EXCLUSIVELY in that same language. If user writes in Burmese, respond in Burmese. If English, respond in English. If German, respond in German. If Thai, respond in Thai. NEVER default to English or Thai.`;

    const response = await getConciergeResponse(prompt, [], language);
    setMessages([{ role: 'assistant', content: response }]);
    setIsLoading(false);
  };

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
                  onChange={e => setPlan({...plan, adults: parseInt(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-gray-400">{l.infants}</label>
                <input 
                  type="number" min="0"
                  className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs outline-none"
                  value={plan.infants}
                  onChange={e => setPlan({...plan, infants: parseInt(e.target.value)})}
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
                 <p className="text-xs font-bold uppercase tracking-widest text-gold-deep">{t.processing || l.generating}</p>
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
                    <div className="prose prose-sm max-w-none text-[11px] leading-relaxed font-medium text-gray-800">
                      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{m.content}</ReactMarkdown>
                    </div>
                  </motion.div>
                ))}
                <button 
                  onClick={() => {
                    setStep('destination');
                    setMessages([]);
                  }}
                  className="w-full py-3 border border-sacred-green text-sacred-green rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <RefreshCcw size={14} /> {l.restart}
                </button>

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
