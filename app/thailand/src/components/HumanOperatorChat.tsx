'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Loader2, X, Headphones, Mail, Phone, User as UserIcon, MessageCircle } from 'lucide-react';
import { ChatMessage, ThaiLanguage } from '../types';
import { UI_TRANSLATIONS } from '../i18n';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface Props {
  language: ThaiLanguage;
  onClose: () => void;
}

interface ContactDetails {
  name: string;
  phone: string;
  email: string;
  socialHandles: string;
}

export default function HumanOperatorChat({ language, onClose }: Props) {
  const uiT = useMemo(() => UI_TRANSLATIONS[language] || UI_TRANSLATIONS.EN, [language]);

  const welcomeMessages: Record<string, { greeting: string; disclaimer: string }> = {
    en: {
      greeting: "👋 Hello! I'm your AsiaBuddy operator. How can I help with your booking today?",
      disclaimer: "💬 Your chat history will be saved while this session is open. Once closed, a new session will begin. To follow up on a booking, contact us via the details at the bottom of the app."
    },
    mm: {
      greeting: "👋 မင်္ဂလာပါ။ AsiaBuddy Operator ပါ။ ဘာကူညီပေးရမလဲ။",
      disclaimer: "💬 ဤ Session ဖွင့်နေစဉ် Chat History သိမ်းဆည်းထားမည်။ ပိတ်လိုက်သည်နှင့် Session အသစ်စတင်မည်။ Booking အကြောင်း ဆက်သွယ်လိုပါက App အောက်ခြေရှိ Contact Details မှတဆင့် ဆက်သွယ်ပါ။"
    },
    th: {
      greeting: "👋 สวัสดีครับ! ผมเป็นผู้ดูแล AsiaBuddy ครับ วันนี้ต้องการความช่วยเหลืออะไรครับ?",
      disclaimer: "💬 ประวัติการสนทนาจะถูกบันทึกตลอดเซสชันนี้ เมื่อปิดแล้วจะเริ่มเซสชันใหม่ หากต้องการติดตามการจอง กรุณาติดต่อเราผ่านรายละเอียดที่ด้านล่างของแอป"
    },
    de: {
      greeting: "👋 Hallo! Ich bin Ihr AsiaBuddy-Operator. Wie kann ich Ihnen heute bei Ihrer Buchung helfen?",
      disclaimer: "💬 Ihr Chat-Verlauf wird während dieser Sitzung gespeichert. Nach dem Schließen beginnt eine neue Sitzung. Für Rückfragen zu einer Buchung kontaktieren Sie uns über die Details unten in der App."
    },
    fr: {
      greeting: "👋 Bonjour! Je suis votre opérateur AsiaBuddy. Comment puis-je vous aider aujourd'hui?",
      disclaimer: "💬 Votre historique de chat sera sauvegardé pendant cette session. Une fois fermée, une nouvelle session commencera. Pour un suivi de réservation, contactez-nous via les coordonnées en bas de l'application."
    },
    es: {
      greeting: "👋 ¡Hola! Soy su operador de AsiaBuddy. ¿En qué puedo ayudarle hoy?",
      disclaimer: "💬 Su historial de chat se guardará durante esta sesión. Al cerrar, comenzará una nueva sesión. Para hacer seguimiento de una reserva, contáctenos a través de los detalles en la parte inferior de la app."
    }
  };

  const langKey = (language || 'en').toLowerCase().slice(0, 2);
  const welcome = welcomeMessages[langKey] || welcomeMessages['en'];

  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: welcome.greeting },
    { role: 'assistant', content: welcome.disclaimer }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactDetails, setContactDetails] = useState<ContactDetails>({
    name: '',
    phone: '',
    email: '',
    socialHandles: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToShare, setAgreedToShare] = useState(false);

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

    // Convert ChatMessage format to Gemini format
    const chatHistory = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : msg.role,
      parts: [{ text: msg.content }]
    }));

    const response = await fetch('https://asiabuddy.app/api/booking-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userMessage,
        history: chatHistory,
        language: language
      })
    });
    const data = await response.json();
    const botReply = data.response;
    
    // Check for [SHOW_CONTACT_FORM] trigger
    const showContactFormTrigger = '[SHOW_CONTACT_FORM]';
    let displayResponse = botReply;
    if (botReply.includes(showContactFormTrigger)) {
      displayResponse = botReply.replace(showContactFormTrigger, '');
      setShowContactForm(true);
    }
    
    setMessages(prev => [...prev, { role: 'assistant', content: displayResponse }]);
    setIsLoading(false);
  };

  const handleContactFormSubmit = async () => {
    if (!contactDetails.name.trim() || !contactDetails.phone.trim()) {
      alert('Please fill in the required fields (Name and Phone)');
      return;
    }

    setIsSubmitting(true);

    // Detect language from last 3 user messages
    const userMessages = messages
      .filter(m => m.role === 'user')
      .slice(-3)
      .map(m => m.content)
      .join(' ');

    // Simple detection: check for Thai characters
    const hasThai = /[\u0E00-\u0E7F]/.test(userMessages);
    const hasChinese = /[\u4E00-\u9FFF]/.test(userMessages);
    const hasJapanese = /[\u3040-\u30FF]/.test(userMessages);
    const hasKorean = /[\uAC00-\uD7AF]/.test(userMessages);
    const hasArabic = /[\u0600-\u06FF]/.test(userMessages);
    const hasMyanmar = /[\u1000-\u109F]/.test(userMessages);

    let detectedLanguage = 'en';
    if (hasThai) detectedLanguage = 'th';
    else if (hasChinese) detectedLanguage = 'zh';
    else if (hasJapanese) detectedLanguage = 'ja';
    else if (hasKorean) detectedLanguage = 'ko';
    else if (hasArabic) detectedLanguage = 'ar';
    else if (hasMyanmar) detectedLanguage = 'my';

    try {
      const response = await fetch('https://asiabuddy.app/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatHistory: messages,
          contactDetails: {
            name: contactDetails.name,
            phone: contactDetails.phone,
            email: contactDetails.email,
            socialHandles: contactDetails.socialHandles
          },
          language: detectedLanguage
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit inquiry');
      }

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Thank you! Your contact details have been submitted. Our team will review your request and get back to you shortly.' 
      }]);
      setShowContactForm(false);
      setContactDetails({ name: '', phone: '', email: '', socialHandles: '' });
      setAgreedToShare(false);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, there was an error submitting your details. Please try again.' 
      }]);
    } finally {
      setIsSubmitting(false);
    }
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

      {/* Contact Details Form Modal */}
      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4"
            onClick={() => !isSubmitting && setShowContactForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Contact Details</h3>
                <button
                  onClick={() => !isSubmitting && setShowContactForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <UserIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={contactDetails.name}
                      onChange={(e) => setContactDetails({ ...contactDetails, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-soft focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      value={contactDetails.phone}
                      onChange={(e) => setContactDetails({ ...contactDetails, phone: e.target.value })}
                      placeholder="Your phone number"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-soft focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email (optional)
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={contactDetails.email}
                      onChange={(e) => setContactDetails({ ...contactDetails, email: e.target.value })}
                      placeholder="Your email address"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-soft focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Social Handles (optional)
                  </label>
                  <div className="relative">
                    <MessageCircle size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={contactDetails.socialHandles}
                      onChange={(e) => setContactDetails({ ...contactDetails, socialHandles: e.target.value })}
                      placeholder="Telegram / Viber / WhatsApp / Messenger / Facebook"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-soft focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-xs text-amber-800 leading-relaxed">
                    <strong>Note:</strong> If you provide an email, your invoice will be sent automatically. If you leave the email blank, we will send the invoice via your provided social contact/messaging handles.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreement"
                    checked={agreedToShare}
                    onChange={(e) => setAgreedToShare(e.target.checked)}
                    className="mt-1 w-4 h-4 text-gold-deep border-gray-300 rounded focus:ring-gold-soft cursor-pointer"
                  />
                  <label
                    htmlFor="agreement"
                    className="text-xs text-gray-700 leading-relaxed cursor-pointer"
                  >
                    I understand that my chat history and contact details above will be shared with the operator. Only the information discussed so far will be included — any messages sent after this point will not be shared.
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handleContactFormSubmit}
                  disabled={!agreedToShare || isSubmitting || !contactDetails.name.trim() || !contactDetails.phone.trim()}
                  className="w-full py-3 bg-gold-deep text-white font-semibold rounded-lg hover:bg-gold-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Details'
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
