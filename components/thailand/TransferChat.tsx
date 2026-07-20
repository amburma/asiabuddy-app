"use client";

import { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Car, Loader2, MessageSquare, ChevronLeft, Check, Square, CheckSquare } from 'lucide-react';
import { getConciergeResponse } from '@/services/geminiService';
import { ChatMessage, ThaiLanguage } from '@/types/country';
import { UI_TRANSLATIONS } from '@/lib/i18n';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import HumanOperatorChat from './HumanOperatorChat';

interface Props {
  language: ThaiLanguage;
  destination: string;
}

const STEP_SEQUENCE = [
  'pickup_location',
  'dropoff_location',
  'date_time',
  'passengers',
  'luggage'
];

export default function TransferChat({ language, destination }: Props) {
  const uiT = useMemo(() => UI_TRANSLATIONS[language] || UI_TRANSLATIONS.EN, [language]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStepId, setCurrentStepId] = useState<string>('pickup_location');
  const [stepHistory, setStepHistory] = useState<string[]>(['pickup_location']);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [textInput, setTextInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showBookNow, setShowBookNow] = useState<boolean>(false);
  const [showHumanChat, setShowHumanChat] = useState<boolean>(false);
  const [surveyCompleted, setSurveyCompleted] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [showFallback, setShowFallback] = useState<boolean>(false);
  const [contextSummary, setContextSummary] = useState<string>('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const t = useMemo(() => (uiT as any).transfer || uiT.transport || UI_TRANSLATIONS.EN.transport, [uiT]);
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

  const getNextStepId = (currentId: string): string | null => {
    const currentIndex = STEP_SEQUENCE.indexOf(currentId);
    if (currentIndex === -1 || currentIndex === STEP_SEQUENCE.length - 1) return null;
    return STEP_SEQUENCE[currentIndex + 1];
  };

  const proceedToNext = (updatedAnswers: Record<string, any>, stepDisplayValue: string) => {
    const currentQuestion = currentSurveyStep?.question || "";

    setMessages(prev => [
      ...prev,
      { role: 'assistant', content: `**${currentQuestion}**` },
      { role: 'user', content: stepDisplayValue }
    ]);

    const nextId = getNextStepId(currentStepId);

    if (nextId) {
      setCurrentStepId(nextId);
      setStepHistory(prev => [...prev, nextId]);
      setTextInput('');
    } else {
      triggerAISubmission(updatedAnswers);
    }
  };

  const handleTextSubmit = () => {
    const val = textInput.trim();
    if (!val) return;
    const updatedAnswers = { ...answers, [currentStepId]: val };
    setAnswers(updatedAnswers);
    proceedToNext(updatedAnswers, val);
  };

  const triggerAISubmission = async (finalAnswers: Record<string, any>) => {
    setSurveyCompleted(true);
    setIsLoading(true);

    let formattedSummary = `THAILAND TRANSFER SURVEY DETAILS (Destination: ${destination}):\n`;
    
    STEP_SEQUENCE.forEach(stepId => {
      if (finalAnswers[stepId]) {
        const qText = currentSurveyStep?.question || stepId;
        const ansVal = finalAnswers[stepId];
        formattedSummary += `- ${qText}: ${ansVal}\n`;
      }
    });

    // Store context summary for HumanOperatorChat
    setContextSummary(formattedSummary);

    const promptContext = `You are AsiaBuddy's Transfer & Airport Service concierge for ${destination}, Thailand.

SERVICE CONTEXT (do not deviate — this is the only provider available):
- We book transfers exclusively through Kiwitaxi: fixed-price, pre-booked private transfers with professional drivers.
- Vehicle tiers available: Sedan (1-3 pax), Van (4-6 pax), Minivan (7+ pax / extra luggage)
- Includes: meet & greet at arrival, flight monitoring (adjusts for delays), free cancellation up to 24h before pickup

CUSTOMER SURVEY RESPONSE:
${formattedSummary}

YOUR GOAL — map user needs to what Kiwitaxi actually offers:
1. Based on passenger/luggage count, recommend the correct vehicle tier (never suggest a tier we don't offer)
2. If user asks about price negotiation, bidding, or "cheapest possible option" — explain that Kiwitaxi uses fixed transparent pricing (no bidding), which avoids surprise costs common with marketplace-style transfer apps
3. If the need falls outside what Kiwitaxi covers (e.g. multi-city route, >15 passengers, non-Thailand destination) — say so honestly, don't overpromise
4. Summarize the match (route + vehicle tier) and prompt them toward "Book Now"

RESPONSE RULES (MANDATORY):
1. Respond exclusively in the user's interface language matching parameter (${language}).
2. Be concise, warm, practical — like a local friend who knows the transfer options.
3. Never invent providers, prices, or features not listed above.
4. Keep the response factual and elegantly structured. At the end, prompt them toward "Book Now".`;

    const userMessage = `I've completed the transfer survey. Please recommend a vehicle and pricing based on my details.`;

    try {
      const response = await getConciergeResponse(userMessage, [], language, promptContext, 'thailand', true);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setShowBookNow(true);
    } catch (err: any) {
      console.error('[ERROR] triggerAISubmission failed:', err);
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
      newHistory.pop();
      const previousStepId = newHistory[newHistory.length - 1];

      setCurrentStepId(previousStepId);
      setStepHistory(newHistory);
      setMessages(prev => prev.slice(0, -2));
    }
  };

  const handleReset = () => {
    setMessages([]);
    setCurrentStepId('pickup_location');
    setStepHistory(['pickup_location']);
    setAnswers({});
    setTextInput('');
    setSurveyCompleted(false);
    setShowBookNow(false);
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

  const isShortAnswer = true; // All fields are text input

  return (
    <div className="flex flex-col h-[480px] w-full bg-white rounded-2xl overflow-hidden border border-gold-soft/30 shadow-xs">
      <div className="p-4 bg-sacred-bg border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gold-deep/10 flex items-center justify-center text-gold-deep">
            <Car size={18} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest leading-none mb-1 text-sacred-green">{t.title || 'Airport Transfers'}</h4>
            <p className="text-[9px] text-gray-500 font-medium tracking-tight">{t.destinationLabel || 'Destination'}: {destination}</p>
          </div>
        </div>
        {stepHistory.length > 1 && !surveyCompleted && (
          <button 
            onClick={handleBack}
            className="flex items-center gap-1 text-[10px] uppercase font-bold text-gray-500 hover:text-gold-deep transition-colors"
          >
            <ChevronLeft size={14} />
            {activeSurvey?.buttons?.back || 'Back'}
          </button>
        )}
        {surveyCompleted && (
          <button 
            onClick={handleReset}
            className="text-[10px] uppercase font-bold text-gold-deep hover:underline"
          >
            {commonT.resetButtonLabel || 'Reset'}
          </button>
        )}
      </div>

      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-4 space-y-4 bg-sacred-bg/20"
      >
        {messages.length === 0 && !surveyCompleted && (
          <div className="text-center opacity-70 py-4">
            <MessageSquare size={24} className="mx-auto mb-3 text-gold-soft" />
            <p className="text-xs font-serif italic mb-1 tracking-wide text-gray-800">
              {activeSurvey?.title || 'Book Your Transfer'}
            </p>
            <p className="text-[10px] text-gray-500 font-medium tracking-tight">
              {t.emptyState || 'Answer a few questions to get started'}
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
              <span className="text-[10px] text-gray-500">{activeSurvey?.analyzing || 'Finding best options...'}</span>
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
                {commonT.bookNowCta || 'Book Now'}
              </button>
            </div>
          </div>
        )}
      </div>

      {!surveyCompleted && currentSurveyStep && (
        <div className="p-4 bg-white border-t border-gray-100 space-y-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] uppercase font-bold tracking-wider text-gold-deep">
              {commonT.surveyProgressLabel || 'Progress'}
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
              {isShortAnswer && (
                <div className="space-y-2">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleTextSubmit()}
                      placeholder={currentSurveyStep.placeholder || commonT.placeholder || 'Type your answer...'}
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

      {showBookNow && (
        <div className="p-3 bg-white border-t border-gray-100 flex flex-col items-center gap-2">
          <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">{t.readyToBook || 'Ready to book?'}</p>
          <button
            onClick={() => setShowHumanChat(true)}
            className="w-full bg-sacred-green text-white font-bold uppercase tracking-widest text-[11px] py-3 px-4 rounded-xl hover:bg-opacity-90 transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            📅 {t.bookStayButton || 'Book Now'}
          </button>
        </div>
      )}

      {mounted && createPortal(modalContent, document.body)}
    </div>
  );
}
