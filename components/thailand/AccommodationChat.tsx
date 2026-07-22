"use client";

import { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Home, Loader2, MessageSquare, ChevronLeft, Check, Square, CheckSquare } from 'lucide-react';
import { getConciergeResponse } from '@/services/geminiService';
import { THAILAND_CITIES, normalizeCityName, buildTripComSearchValue } from '@/src/config/thailandCities';
import { ChatMessage, ThaiLanguage } from '@/types/country';
import { UI_TRANSLATIONS } from '@/lib/i18n';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import HumanOperatorChat from './HumanOperatorChat';

interface Props {
  language: ThaiLanguage;
  onCitySelect?: (city: string) => void;
}

// Complete dynamic sequence path. Conditions are verified dynamically.
const STEP_SEQUENCE = [
  'city',
  'nights',
  'area_general',
  'budget',
  'type',
  'stars',
  'bangkok_vibe',       // Conditional: ONLY if city === 'Bangkok'
  'phuket_beach',       // Conditional: ONLY if city === 'Phuket'
  'transit_proximity',  // Conditional: ONLY if city === 'Bangkok'
  'beach_proximity',    // Conditional: ONLY if beach destination (Phuket, Pattaya, Krabi, Koh Samui)
  'airport_pickup',
  'guests',
  'room_type',
  'amenities',
  'checkin_date'
];

export default function AccommodationChat({ language, onCitySelect }: Props) {
  const uiT = useMemo(() => UI_TRANSLATIONS[language] || UI_TRANSLATIONS.EN, [language]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStepId, setCurrentStepId] = useState<string>('city');
  const [stepHistory, setStepHistory] = useState<string[]>(['city']);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [textInput, setTextInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showBookNow, setShowBookNow] = useState<boolean>(false);
  const [showHumanChat, setShowHumanChat] = useState<boolean>(false);
  const [surveyCompleted, setSurveyCompleted] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [showFallback, setShowFallback] = useState<boolean>(false);
  const [contextSummary, setContextSummary] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('Bangkok');
  const scrollRef = useRef<HTMLDivElement>(null);

  const t = useMemo(() => uiT.accommodation || UI_TRANSLATIONS.EN.accommodation, [uiT]);
  const commonT = useMemo(() => uiT.chat || UI_TRANSLATIONS.EN.chat, [uiT]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, currentStepId]);

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

  const activeSurvey = t.survey;

  const currentSurveyStep = useMemo(() => {
    if (!activeSurvey || !activeSurvey.questions) return null;
    return activeSurvey.questions[currentStepId as keyof typeof activeSurvey.questions];
  }, [activeSurvey, currentStepId]);

  // Logic solver to find the next logical step ID considering conditional rules
  const getNextStepId = (currentId: string, currentAnswers: Record<string, any>): string | null => {
    const currentIndex = STEP_SEQUENCE.indexOf(currentId);
    if (currentIndex === -1 || currentIndex === STEP_SEQUENCE.length - 1) return null;

    for (let i = currentIndex + 1; i < STEP_SEQUENCE.length; i++) {
      const nextId = STEP_SEQUENCE[i];
      const selectedCity = currentAnswers['city'];

      if (nextId === 'bangkok_vibe' && selectedCity !== 'Bangkok') continue;
      if (nextId === 'phuket_beach' && selectedCity !== 'Phuket') continue;
      if (nextId === 'transit_proximity' && selectedCity !== 'Bangkok') continue;

      const isBeachDest = ['Phuket', 'Pattaya', 'Krabi', 'Koh Samui'].includes(selectedCity);
      if (nextId === 'beach_proximity' && !isBeachDest) continue;

      return nextId;
    }
    return null;
  };

  const proceedToNext = (updatedAnswers: Record<string, any>, stepDisplayValue: string | string[]) => {
    const currentQuestion = currentSurveyStep?.question || "";
    const displayString = Array.isArray(stepDisplayValue) ? stepDisplayValue.join(', ') : stepDisplayValue;

    setMessages(prev => [
      ...prev,
      { role: 'assistant', content: `**${currentQuestion}**` },
      { role: 'user', content: displayString }
    ]);

    const nextId = getNextStepId(currentStepId, updatedAnswers);

    if (nextId) {
      setCurrentStepId(nextId);
      setStepHistory(prev => [...prev, nextId]);
      setTextInput('');
    } else {
      triggerAISubmission(updatedAnswers);
    }
  };

  const handleSelectOption = (option: string) => {
    const updatedAnswers = { ...answers, [currentStepId]: option };
    setAnswers(updatedAnswers);
    
    // Store selected city for URL building
    if (currentStepId === 'city') {
      setSelectedCity(option);
    }
    
    // Call onCitySelect callback when city is selected
    if (currentStepId === 'city' && onCitySelect) {
      onCitySelect(option);
    }
    
    proceedToNext(updatedAnswers, option);
  };

  const handleTextSubmit = () => {
    const val = textInput.trim();
    if (!val) return;
    const updatedAnswers = { ...answers, [currentStepId]: val };
    setAnswers(updatedAnswers);
    
    // Store selected city for URL building
    if (currentStepId === 'city') {
      setSelectedCity(val);
    }
    
    proceedToNext(updatedAnswers, val);
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(item => item !== amenity)
        : [...prev, amenity]
    );
  };

  const handleNextMultipleChoice = () => {
    const chosen = selectedAmenities.length > 0 ? selectedAmenities : [t.noneSelected];
    const updatedAnswers = { ...answers, [currentStepId]: chosen };
    setAnswers(updatedAnswers);
    proceedToNext(updatedAnswers, chosen);
  };

  const triggerAISubmission = async (finalAnswers: Record<string, any>) => {
    setSurveyCompleted(true);
    setIsLoading(true);

    const questionsMap = activeSurvey.questions;
    let formattedSummary = `THAILAND ACCOMMODATION SURVEY DETAILS:\n`;
    
    STEP_SEQUENCE.forEach(stepId => {
      if (finalAnswers[stepId]) {
        const qText = questionsMap[stepId as keyof typeof questionsMap]?.question || stepId;
        const ansVal = Array.isArray(finalAnswers[stepId]) ? finalAnswers[stepId].join(', ') : finalAnswers[stepId];
        formattedSummary += `- ${qText}: ${ansVal}\n`;
      }
    });

    // Store context summary for HumanOperatorChat
    setContextSummary(formattedSummary);

    const promptContext = `You are an elite boutique accommodation concierge expert for Thailand.
A traveler has finished our dynamic configuration survey:

${formattedSummary}

RESPONSE RULES (MANDATORY):
1. Respond exclusively in the user's interface language matching parameter (${language}).
2. Provide direct, highly structured expert recommendations. Avoid generic introductions.
3. Suggest 3 specific zones or elite hotel profiles fitting their exact configuration.
4. Highlight why each option aligns with their stated details (budget, beach preference, MRT/BTS transit proximity, etc.).
5. Do not act like a salesperson. Never use pushy, hard-sell, or exaggerated language. Recommend naturally and helpfully, like a knowledgeable friend giving honest advice.
6. IMPORTANT — CTA OVERRIDE FOR HOTELS: Do NOT invite the user to click 'Book Now' or fill out a contact form for hotel bookings. Instead, direct them to search and compare live prices using the Agoda and Trip.com search options available on this page.
7. Include one brief, natural, reassuring sentence noting that booking through the Agoda or Trip.com links on this page goes directly to the official Agoda/Trip.com website, so payment and confirmation happen securely on their platform — this helps the traveler avoid scam or fake booking sites. Keep this low-key and factual, not alarmist.
8. End with a warm, concise closing appropriate to the user's language. Do not mention 'live support team' or 'immediate bookings' for hotels.`;

    try {
      const response = await getConciergeResponse(promptContext, [], language);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setShowBookNow(true);
    } catch (err: any) {
      if (err.fallback === true) {
        setShowFallback(true);
      } else {
        setMessages(prev => [
          ...prev, 
          { role: 'assistant', content: commonT.aiBusyFallback }
        ]);
        setShowBookNow(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (stepHistory.length > 1) {
      const newHistory = [...stepHistory];
      newHistory.pop(); // Remove current step
      const previousStepId = newHistory[newHistory.length - 1];
      
      setCurrentStepId(previousStepId);
      setStepHistory(newHistory);
      setMessages(prev => prev.slice(0, -2)); // Undo last Q&A bubble state
    }
  };

  const handleReset = () => {
    setMessages([]);
    setCurrentStepId('city');
    setStepHistory(['city']);
    setAnswers({});
    setSelectedAmenities([]);
    setTextInput('');
    setSurveyCompleted(false);
    setShowBookNow(false);
    setSelectedCity('Bangkok');
  };

  // Build Agoda search URL
  const buildAgodaSearchUrl = (cityName: string) => {
    const normalizedCity = normalizeCityName(cityName);
    const cityData = THAILAND_CITIES[normalizedCity] || THAILAND_CITIES['Bangkok'];
    const today = new Date();
    const checkin = new Date(today);
    checkin.setDate(today.getDate() + 7);
    const checkout = new Date(checkin);
    checkout.setDate(checkin.getDate() + 3);
    const formatDate = (d: Date) => d.toISOString().split('T')[0];
    return `https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid=1968300&city=${cityData.agodaCityId}&checkIn=${formatDate(checkin)}&checkOut=${formatDate(checkout)}&adults=2&rooms=1`;
  };

  // Build Trip.com search URL
  const buildTripComSearchUrl = (cityName: string) => {
    const normalizedCity = normalizeCityName(cityName);
    const cityData = THAILAND_CITIES[normalizedCity] || THAILAND_CITIES['Bangkok'];
    const { cityId, provinceId, countryId } = cityData;
    const searchValue = buildTripComSearchValue(cityId);
    const today = new Date();
    const checkin = new Date(today);
    checkin.setDate(today.getDate() + 7);
    const checkout = new Date(checkin);
    checkout.setDate(checkin.getDate() + 3);
    const formatDate = (d: Date) => d.toISOString().split('T')[0];
    return `https://www.trip.com/hotels/list?flexType=1&cityId=${cityId}&provinceId=${provinceId}&districtId=0&countryId=${countryId}&destName=${encodeURIComponent(normalizedCity)}&searchWord=${encodeURIComponent(normalizedCity)}&searchType=C&optionId=4&searchValue=${encodeURIComponent(searchValue)}&checkin=${formatDate(checkin)}&checkout=${formatDate(checkout)}&crn=1&adult=2&curr=USD&locale=en-XX&Allianceid=9417346&SID=325250647`;
  };

  const modalContent = showHumanChat ? (
    <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs"
        onClick={() => setShowHumanChat(false)}
      />
      <div className="relative w-full h-full md:w-auto md:h-auto md:max-w-lg md:max-h-[85vh] flex flex-col">
        <HumanOperatorChat
          language={language}
          onClose={() => setShowHumanChat(false)}
          contextSummary={contextSummary}
        />
      </div>
    </div>
  ) : null;

  // Render logic for different step input types
  const isShortAnswer = ['nights', 'guests', 'checkin_date'].includes(currentStepId);
  const isMultipleChoice = currentStepId === 'amenities';

  // Type guard for steps with options
  const hasOptions = currentSurveyStep && 'options' in currentSurveyStep;
  const hasPlaceholder = currentSurveyStep && 'placeholder' in currentSurveyStep;

  return (
    <div className="flex flex-col h-[480px] w-full bg-white rounded-2xl overflow-hidden border border-gold-soft/30 shadow-xs">
      {/* Header */}
      <div className="p-4 bg-sacred-bg border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gold-deep/10 flex items-center justify-center text-gold-deep">
            <Home size={18} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest leading-none mb-1 text-sacred-green">{t.title}</h4>
            <p className="text-[9px] text-gray-500 font-medium tracking-tight">{t.subtitle}</p>
          </div>
        </div>
        {stepHistory.length > 1 && !surveyCompleted && (
          <button 
            onClick={handleBack}
            className="flex items-center gap-1 text-[10px] uppercase font-bold text-gray-500 hover:text-gold-deep transition-colors"
          >
            <ChevronLeft size={14} />
            {activeSurvey.buttons.back}
          </button>
        )}
        {surveyCompleted && (
          <button 
            onClick={handleReset}
            className="text-[10px] uppercase font-bold text-gold-deep hover:underline"
          >
            {commonT.resetButtonLabel}
          </button>
        )}
      </div>

      {/* Messages View Area */}
      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-4 space-y-4 bg-sacred-bg/20"
      >
        {messages.length === 0 && !surveyCompleted && (
          <div className="text-center opacity-70 py-4">
            <MessageSquare size={24} className="mx-auto mb-3 text-gold-soft" />
            <p className="text-xs font-serif italic mb-1 tracking-wide text-gray-800">
              {activeSurvey.title}
            </p>
            <p className="text-[10px] text-gray-500 font-medium tracking-tight">
              {t.emptyState}
            </p>
          </div>
        )}

        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[90%] rounded-2xl p-3 shadow-2xs ${
              m.role === 'user' 
                ? 'bg-sacred-green text-white rounded-tr-none text-right' 
                : 'bg-white border border-gold-soft/20 text-gray-900 rounded-tl-none text-left'
            }`}>
              <div className="prose prose-sm max-w-none prose-p:leading-relaxed text-xs">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{m.content}</ReactMarkdown>
              </div>
            </div>
          </motion.div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 rounded-2xl p-3 rounded-tl-none flex items-center gap-2">
              <Loader2 size={12} className="animate-spin text-gold-deep" />
              <span className="text-[10px] text-gray-500">{activeSurvey.analyzing}</span>
            </div>
          </div>
        )}
        {showFallback && (
          <div className="flex justify-start">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 rounded-tl-none max-w-[90%]">
              <p className="text-xs text-gray-800 mb-2">{commonT.aiBusyFallback}</p>
              <button
                onClick={() => setShowHumanChat(true)}
                className="bg-sacred-green text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-opacity-90 transition-colors"
              >
                {commonT.bookNowCta}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Selector Panels */}
      {!surveyCompleted && currentSurveyStep && (
        <div className="p-4 bg-white border-t border-gray-100 space-y-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] uppercase font-bold tracking-wider text-gold-deep">
              {commonT.surveyProgressLabel}
            </span>
            <div className="flex gap-1 h-1 w-24 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="bg-gold-deep transition-all duration-300"
                style={{ width: `${(stepHistory.length / STEP_SEQUENCE.length) * 100}%` }}
              />
            </div>
          </div>
          <p className="text-xs font-serif font-semibold text-gray-900 leading-tight mb-2">
            {currentSurveyStep.question}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepId}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
              className="max-h-[160px] overflow-y-auto pr-1"
            >
              {/* Type 1: Single Choice Buttons */}
              {!isShortAnswer && !isMultipleChoice && hasOptions && (
                <div className="grid grid-cols-1 gap-1.5">
                  {(currentSurveyStep as { options: string[]; question: string }).options.map((option: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(option)}
                      className="p-2 text-left text-[10px] font-bold uppercase tracking-wider border border-gray-200 rounded-lg hover:border-gold-deep hover:text-gold-deep transition-all bg-sacred-bg/20 hover:bg-white"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {/* Type 2: Multiple Choice Amenities */}
              {isMultipleChoice && hasOptions && (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-1.5">
                    {(currentSurveyStep as { options: string[]; question: string }).options.map((option: string, idx: number) => {
                      const isChecked = selectedAmenities.includes(option);
                      return (
                        <button
                          key={idx}
                          onClick={() => toggleAmenity(option)}
                          className={`flex items-center gap-2 p-2 text-left text-[10px] font-bold uppercase tracking-wider border rounded-lg transition-all ${
                            isChecked 
                              ? 'border-gold-deep bg-gold-deep/5 text-gold-deep' 
                              : 'border-gray-200 bg-sacred-bg/20 hover:border-gold-deep'
                          }`}
                        >
                          {isChecked ? <CheckSquare size={13} /> : <Square size={13} />}
                          <span className="truncate">{option}</span>
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={handleNextMultipleChoice}
                    className="w-full mt-2 py-2 px-4 bg-sacred-green hover:bg-sacred-green/90 text-white font-bold uppercase text-[10px] tracking-widest rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Check size={12} />
                    {activeSurvey.buttons.next}
                  </button>
                </div>
              )}

              {/* Type 3: Short Answer Inputs */}
              {isShortAnswer && (
                <div className="space-y-2">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleTextSubmit()}
                      placeholder={hasPlaceholder ? (currentSurveyStep as { placeholder: string; question: string }).placeholder : commonT.placeholder}
                      className="w-full bg-sacred-bg/50 border border-transparent rounded-xl py-2 pl-4 pr-12 text-xs focus:outline-none focus:border-gold-soft transition-all placeholder:text-gray-400 font-medium"
                      autoFocus
                    />
                    <button
                      onClick={handleTextSubmit}
                      disabled={!textInput.trim()}
                      className="absolute right-1.5 p-1.5 bg-gold-deep text-white rounded-lg hover:bg-gold-soft transition-colors disabled:opacity-45"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Book Now Button display */}
      {showBookNow && (
        <div className="p-3 bg-white border-t border-gray-100 flex flex-col items-center gap-2">
          <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">{t.readyToBook}</p>
          <div className="w-full flex gap-2">
            <a
              href={buildAgodaSearchUrl(selectedCity)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-sacred-green text-white font-bold uppercase tracking-widest text-[11px] py-3 px-4 rounded-xl hover:bg-opacity-90 transition-colors shadow-sm flex items-center justify-center gap-2 text-center"
            >
              Search Agoda
            </a>
            <a
              href={buildTripComSearchUrl(selectedCity)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#C9A84C] text-white font-bold uppercase tracking-widest text-[11px] py-3 px-4 rounded-xl hover:bg-opacity-90 transition-colors shadow-sm flex items-center justify-center gap-2 text-center"
            >
              Search Trip.com
            </a>
          </div>
        </div>
      )}

      {mounted && createPortal(modalContent, document.body)}
    </div>
  );
}
