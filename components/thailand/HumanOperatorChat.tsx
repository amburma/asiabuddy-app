'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Loader2, X, Headphones, Mail, Phone, User as UserIcon, MessageCircle, ExternalLink } from 'lucide-react';
import { ChatMessage, ThaiLanguage } from '../../types/country';
import { UI_TRANSLATIONS } from '../../lib/i18n';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { THAILAND_CITIES, buildTripComSearchValue, normalizeCityName } from '../../src/config/thailandCities';

interface Props {
  language: ThaiLanguage;
  onClose: () => void;
  salesperson_id?: string;
  contextSummary?: string;
  isCarRentalFlow?: boolean;
}

interface ContactDetails {
  name: string;
  phone: string;
  email: string;
  socialHandles: string;
}

export default function HumanOperatorChat({ language, onClose, salesperson_id, contextSummary, isCarRentalFlow }: Props) {
  console.log('HumanOperatorChat received salesperson_id:', salesperson_id);
  const uiT = useMemo(() => UI_TRANSLATIONS[language] || UI_TRANSLATIONS.EN, [language]);
  const pathname = usePathname();

  // Determine current category from pathname
  const currentCategory = useMemo(() => {
    if (!pathname) return null;
    if (pathname.includes('/flights')) return 'flights';
    if (pathname.includes('/hotels')) return 'hotels';
    if (pathname.includes('/tickets')) return 'tickets';
    if (pathname.includes('/activities')) return 'activities';
    if (pathname.includes('/rental')) return 'rental';
    return null;
  }, [pathname]);

  // Chip config map by category
  const chipConfig = useMemo(() => ({
    flights: [
      { label: 'BKK vs DMK', question: 'BKK vs DMK လေဆိပ် ဘာကွာလဲ?' },
      { label: 'ဗီဇာလိုအပ်ချက်', question: 'ဗီဇာ လိုအပ်ပါသလား?' },
      { label: 'ဘွတ်ကင် အချိန်', question: 'လေယာဉ်ခရီးစဉ်ကို ဘယ်အချိန်မှာ ဘွတ်ကင်လုပ်သင့်လဲ?' },
      { label: 'လေကြောင်းလိုင်းများ', question: 'ထိုင်းနိုငံသို့ လေယာဉ်များ ပြေးဆိုင်သည့် လေကြောင်းလိုင်းများကား ဘာတွေလဲ?' },
      { label: 'ခရီးကြာချိန်', question: 'ဘန်ကောက်သို့ တိုက်ရိုက် လေယာဉ်ခရီးစဉ်သည် ကြာမြင့်မည့်ကာလ?' }
    ],
    hotels: [
      { label: 'နေရာအကောင်းဆုံး', question: 'ဘန်ကောက်တွင် နေရာလိုက်ရန် အကောင်းဆုံး နေရာက ဘာလဲ?' },
      { label: 'ကြိုတင်ဘွတ်ကင်', question: 'လူဦးရေများသော ရာသီတွင် ကြိုတင် ဘွတ်ကင်လုပ်ရန် လိုအပ်ပါသလား?' },
      { label: 'တိုက်ရိုက် vs ကိုယ်စားလှယ်', question: 'တိုက်ရိုက် ဘွတ်ကင်လုပ်ခြင်းနှင့် ကိုယ်စားလှယ်မှ ဘွတ်ကင်လုပ်ခြင်း ဘယ်ဟာက ပိုလုံခြုံသလဲ?' },
      { label: 'ဘတ်ဂျက်အတိုင်းအတာ', question: 'တစ်ညလျှင် ပုံမှန် ဘတ်ဂျက် အတိုင်းအတာက ဘာလဲ?' },
      { label: 'ပင်လယ်ကမ်းခြေဟိုတယ်', question: 'ပင်လယ်ကမ်းခြေ ဟိုတယ်များသည် ဈေးကြီးသည့်အတွက် တန်ဖိုးရှိပါသလား?' }
    ],
    tickets: [
      { label: 'ကြိုတင်ဘွတ်ကင်', question: 'လက်မှတ်များကို ကြိုတင် ဘွတ်ကင်လုပ်ရန် လိုအပ်ပါသလား?' },
      { label: 'အီလက်ထရွန်းနစ်လက်မှတ်', question: 'အီလက်ထရွန်းနစ် လက်မှတ်များကို နေရာများတွင် လက်ခံပါသလား?' },
      { label: 'ပယ်ဖျက်မူဝါဒ', question: 'ငါ့ ဘွတ်ကင်ကို ပယ်ဖျက်လိုလျှင် ဘာလုပ်ရမလဲ?' },
      { label: 'ပေါင်းစပ်လက်မှတ်များ', question: 'နေရာများစွာအတွက် ပေါင်းစပ် လက်မှတ်များ ရှိပါသလား?' },
      { label: 'နေရာ vs အွန်လိုင်း', question: 'နေရာတွင် သို့မဟုတ် အွန်လိုတွင် ဘွတ်ကင်လုပ်ခြင်းသည် ပိုသက်သာပါသလား?' }
    ],
    activities: [
      { label: 'လှုပ်ရှားမှုအမျိုးအစား', question: 'လှုပ်ရှားမှု အမျိုးအစားများ ရှိပါသလား?' },
      { label: 'ဘွတ်ကင်အတည်ပြုချက်', question: 'ငါ့ ဘွတ်ကင် အတည်ပြုချက်ကို မည်သို့ ရရှိမည်နည်း?' },
      { label: 'ပယ်ဖျက်မူဝါဒ', question: 'ပယ်ဖျက်မူဝါဒမှာ ဘာလဲ?' },
      { label: 'ဘာသာစကားရွေးချယ်', question: 'ခရီးစဉ်များကို ဘာသာစကားများဖြင့် ရရှိနိုင်ပါသလား?' },
      { label: 'ကြိုတင်ဘွတ်ကင်', question: 'ငါသည် လှုပ်ရှားမှုများကို ကြိုတင် ဘွတ််ကင်လုပ်သင့်ပါသလား?' }
    ]
  }), []);

  const welcomeMessages: Record<string, { greeting: string; disclaimer: string }> = {
    en: {
      greeting: "👋 Hello! I'm your AsiaBuddy operator. How can I help with your booking today?",
      disclaimer: "💬 Your chat history will be saved while this session is open. Once closed, a new session will begin. To follow up on a booking, contact us via the details at the bottom of the app."
    },
    mm: {
      greeting: "👋 မင်္ဂလာပါ။ AsiaBuddy operator ဖြစ်ပါသည်။ ဘယ်လို ကူညီပေးရမလဲ?",
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

  const lang = (language || 'en').toLowerCase();
  let langKey = 'en';
  if (lang === 'my' || lang === 'mm') {
    langKey = 'mm';
  } else if (lang === 'th') {
    langKey = 'th';
  } else if (lang === 'de') {
    langKey = 'de';
  } else if (lang === 'fr') {
    langKey = 'fr';
  } else if (lang === 'es') {
    langKey = 'es';
  }
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
  const [validationErrors, setValidationErrors] = useState<{ name?: string; phone?: string }>({});
  const [flightButtons, setFlightButtons] = useState<{ origin: string; destination: string } | null>(null);
  const [hotelButtons, setHotelButtons] = useState<string | null>(null);

  // IATA to city name mapping for Trip.com URLs
  const iataToCity: Record<string, string> = {
    'RGN': 'Yangon',
    'MDL': 'Mandalay',
    'BKK': 'Bangkok',
    'CNX': 'Chiang-Mai',
    'HKT': 'Phuket',
    'SIN': 'Singapore',
    'KUL': 'Kuala-Lumpur',
    'SGN': 'Ho-Chi-Minh-City',
    'HAN': 'Hanoi',
    'HKG': 'Hong-Kong'
  };

  const t = uiT.chat || UI_TRANSLATIONS.EN.chat;

  const getFormNoticeText = (lang: string) => {
    switch(lang) {
      case 'mm':
      case 'my':
        return {
          notice: 'ဆက်လက်မတိုင်မီ သတိပြုပါ — ဤ Session မှ သင်၏ Chat မှတ်တမ်းနှင့် အောက်ပါ ဆက်သွယ်ရေးအချက်အလက်များကို Operator သို့ပေးပို့မည်။ ယခုအချိန်အထိ Chat တွင် မျှဝေထားသည့် အချက်အလက်များသာ ပါဝင်မည် — ဤနောက် ရိုက်ထည့်သည့်အရာများ မပါဝင်ပါ။',
          agree: 'ကျွန်တော်/ကျွန်မ၏ Chat မှတ်တမ်းနှင့် ဆက်သွယ်ရေးအချက်အလက်များကို Operator နှင့် မျှဝေရန် သဘောတူပါသည်။'
        };
      case 'th':
        return {
          notice: 'ก่อนดำเนินการต่อ โปรดทราบว่า ประวัติการสนทนาและข้อมูลติดต่อของคุณจะถูกส่งให้ผู้ดำเนินการ',
          agree: 'ฉันยินยอมให้แชร์ประวัติการสนทนาและข้อมูลติดต่อกับผู้ดำเนินการ'
        };
      case 'de':
        return {
          notice: 'Bevor wir fortfahren: Ihr Chat-Verlauf und Ihre Kontaktdaten werden an unseren Operator gesendet.',
          agree: 'Ich stimme zu, meinen Chat-Verlauf und meine Kontaktdaten mit dem Operator zu teilen.'
        };
      default:
        return {
          notice: 'Before we proceed, please note: your chat history from this session and your contact details below will be sent to our operator. Only the information shared in this chat so far will be included — nothing you type after this point.',
          agree: 'I agree to share my chat history and contact details with the operator.'
        };
    }
  };

  // Detect language from the last user message
  const detectedLanguage = (() => {
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    if (lastUserMessage) {
      const text = lastUserMessage.content;
      // Simple language detection based on character ranges
      if (/[\u1000-\u109F]/.test(text)) return 'mm'; // Myanmar
      if (/[\u0E00-\u0E7F]/.test(text)) return 'th'; // Thai
      if (/[äöüÄÖÜß]/.test(text)) return 'de'; // German
    }
    // Fallback to prop language
    return (language || 'en').toLowerCase().slice(0, 2);
  })();

  const formNoticeText = getFormNoticeText(detectedLanguage);

  const getSubmitConfirmationText = (lang: string) => {
    switch(lang) {
      case 'mm':
      case 'my':
        return 'လူကြီးမင်း၏ Request သည် AsiaBuddy Operator ထံ ရောက်ရှိသွားပါပြီ။ လူကြီးမင်း၏ Email (သို့) Social Media အကောင့်များအား Operator များမှ ၂၄ နာရီအတွင်း ပြန်လည်ဆက်သွယ်လာခြင်း မရှိခဲ့ပါက App ထဲရှိ Contact Detail အတိုင်း Follow up လုပ်ပေးပါရန် မေတ္တာရပ်ခံအပ်ပါသည်။';
      case 'th':
        return 'คำขอของคุณถูกส่งถึง AsiaBuddy Operator แล้ว หากไม่ได้รับการติดต่อกลับภายใน 24 ชั่วโมง กรุณาติดตามผ่านช่องทาง Contact ในแอป';
      case 'de':
        return 'Ihre Anfrage ist beim AsiaBuddy Operator eingegangen. Falls Sie innerhalb von 24 Stunden keine Antwort erhalten, kontaktieren Sie uns bitte über die Kontaktdaten in der App.';
      default:
        return 'Your request has been received by AsiaBuddy Operator. If you do not hear back within 24 hours, please follow up using the Contact details in the App.';
    }
  };

  const getFormLabels = (lang: string) => {
    switch(lang) {
      case 'mm':
      case 'my':
        return {
          fullName: 'အမည်အပြည့်အစုံ',
          phone: 'ဖုန်းနံပါတ်',
          email: 'အီးမေးလ် (ရွေးချယ်စရာ)',
          preferredApps: 'နှစ်သက်ရာ Contact Apps (ရွေးချယ်စရာ)',
          emailHelper: 'အီးမေးလ် ပေးပါက Invoice ကို အလိုအလျောက် ပို့ပေးမည်။ ဗလာထားပါက Social Handle မှတဆင့် ဆက်သွယ်ပေးမည်။',
          phoneHelper: 'ပေးထားသော ဖုန်းနံပါတ်မှတဆင့် ဆက်သွယ်ပေးမည်။',
          messenger: 'm.me/asiabuddyapp သို့ သွားပြီး "Follow up" ပို့ပါ။',
          submit: 'ပို့မည်',
          submitting: 'ပို့နေသည်...'
        };
      case 'th':
        return {
          fullName: 'ชื่อเต็ม',
          phone: 'เบอร์โทรศัพท์',
          email: 'อีเมล (ไม่บังคับ)',
          preferredApps: 'แอปติดต่อที่ต้องการ (ไม่บังคับ)',
          emailHelper: 'หากคุณให้อีเมล ใบเสร็จจะถูกส่งอัตโนมัติ หากไม่กรอก เราจะติดต่อผ่าน social handle',
          phoneHelper: 'เราจะติดต่อคุณผ่านเบอร์โทรศัพท์ที่คุณระบุไว้ด้านบน',
          messenger: 'เยี่ยมชม m.me/asiabuddyapp และส่ง "Follow up" เพื่อติดตามการสอบถาม',
          submit: 'ส่ง',
          submitting: 'กำลังส่ง...'
        };
      case 'de':
        return {
          fullName: 'Vollständiger Name',
          phone: 'Telefonnummer',
          email: 'E-Mail (optional)',
          preferredApps: 'Bevorzugte Kontakt-Apps (optional)',
          emailHelper: 'Wenn Sie eine E-Mail angeben, wird Ihre Rechnung automatisch gesendet. Wenn Sie das Feld leer lassen, kontaktieren wir Sie über Ihre Social-Media-Handles.',
          phoneHelper: 'Wir werden Sie über die oben angegebene Telefonnummer kontaktieren.',
          messenger: 'Besuchen Sie m.me/asiabuddyapp und senden Sie "Follow up", um Ihrer Anfrage nachzugehen.',
          submit: 'Absenden',
          submitting: 'Wird gesendet...'
        };
      case 'fr':
        return {
          fullName: 'Nom complet',
          phone: 'Numéro de téléphone',
          email: 'E-mail (optionnel)',
          preferredApps: 'Applications de contact préférées (optionnel)',
          emailHelper: 'Si vous fournissez un e-mail, votre facture sera envoyée automatiquement. Si vous le laissez vide, nous vous contacterons via vos réseaux sociaux.',
          phoneHelper: 'Nous vous contacterons via le numéro de téléphone que vous avez fourni ci-dessus.',
          messenger: 'Visitez m.me/asiabuddyapp et envoyez "Follow up" pour faire suite à votre demande.',
          submit: 'Envoyer',
          submitting: 'Envoi en cours...'
        };
      case 'es':
        return {
          fullName: 'Nombre completo',
          phone: 'Número de teléfono',
          email: 'Correo electrónico (opcional)',
          preferredApps: 'Aplicaciones de contacto preferidas (opcional)',
          emailHelper: 'Si proporciona un correo electrónico, su factura se enviará automáticamente. Si lo deja en blanco, nos pondremos en contacto con usted a través de sus redes sociales.',
          phoneHelper: 'Le contactaremos a través del número de teléfono que proporcionó arriba.',
          messenger: 'Visite m.me/asiabuddyapp y envíe "Follow up" para dar seguimiento a su consulta.',
          submit: 'Enviar',
          submitting: 'Enviando...'
        };
      default:
        return {
          fullName: 'Full Name',
          phone: 'Phone Number',
          email: 'Email (optional)',
          preferredApps: 'Preferred Contact Apps (optional)',
          emailHelper: 'If you provide an email, your invoice will be sent automatically. If you leave it blank, we will contact you via your social handle.',
          phoneHelper: 'We will contact you via the phone number you provided above.',
          messenger: 'Visit m.me/asiabuddyapp and send "Follow up" to follow up on your inquiry.',
          submit: 'Submit',
          submitting: 'Submitting...'
        };
    }
  };

  const formLabels = getFormLabels((language || 'en').toLowerCase().slice(0, 2));

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
    const firstUserIndex = chatHistory.findIndex(m => m.role === 'user');
    const validHistory = firstUserIndex === -1 ? [] : chatHistory.filter((_, index) => index >= firstUserIndex);


    try {
      const response = await fetch('/api/booking-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: validHistory,
          language: language,
          salesperson_id,
          contextSummary: contextSummary,
          isCarRentalFlow: isCarRentalFlow
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      const data = await response.json();
      const botReply = data.response;

      // Check for [SHOW_CONTACT_FORM] trigger
      const showContactFormTrigger = '[SHOW_CONTACT_FORM]';
      let displayResponse = botReply;
      if (botReply.includes(showContactFormTrigger)) {
        displayResponse = botReply.replace(showContactFormTrigger, '');
        setShowContactForm(true);
      }

      // Check for [SHOW_FLIGHT_BUTTONS:origin=XXX,destination=YYY] trigger
      const flightButtonsTrigger = /\[SHOW_FLIGHT_BUTTONS:origin=([A-Z]{3}),destination=([A-Z]{3})\]/;
      const flightButtonsMatch = botReply.match(flightButtonsTrigger);
      if (flightButtonsMatch) {
        displayResponse = botReply.replace(flightButtonsTrigger, '');
        setFlightButtons({ origin: flightButtonsMatch[1], destination: flightButtonsMatch[2] });
      } else {
        setFlightButtons(null);
      }

      // Check for [SHOW_HOTEL_BUTTONS:city=CITYKEY] trigger
      const hotelButtonsTrigger = /\[SHOW_HOTEL_BUTTONS:city=([A-Za-z\s]+)\]/;
      const hotelButtonsMatch = botReply.match(hotelButtonsTrigger);
      if (hotelButtonsMatch) {
        displayResponse = botReply.replace(hotelButtonsTrigger, '');
        const cityKey = hotelButtonsMatch[1];
        // Validate city key exists in THAILAND_CITIES
        if (THAILAND_CITIES[cityKey]) {
          setHotelButtons(cityKey);
        } else {
          setHotelButtons(null);
        }
      } else {
        setHotelButtons(null);
      }

      setMessages(prev => [...prev, { role: 'assistant', content: displayResponse }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactFormSubmit = async () => {
    // Validate required fields
    const errors: { name?: string; phone?: string } = {};
    if (!contactDetails.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!contactDetails.phone.trim()) {
      errors.phone = 'Phone is required';
    }
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setIsSubmitting(true);

    console.log("[DEBUG] Inquiry submit payload", {
      salesperson_id,
      customer_name: contactDetails.name,
      phone: contactDetails.phone,
      email: contactDetails.email
    });

    try {
      console.log('Submitting inquiry with salesperson_id:', salesperson_id);
      const payload = {
        contactDetails: {
          name: contactDetails.name,
          phone: contactDetails.phone,
          email: contactDetails.email,
          socialHandles: contactDetails.socialHandles || 'Not provided',
        },
        chatHistory: messages.filter(m => m.role === 'user' || m.role === 'assistant'),
        agreedToShare: true,
        source: 'HumanOperatorChat',
        language: language,
        salesperson_id
      };
      console.log("[DEBUG] Sending inquiry request", payload);
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit inquiry');
      }

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: getSubmitConfirmationText(detectedLanguage)
      }]);
      setShowContactForm(false);
      setContactDetails({ name: '', phone: '', email: '', socialHandles: '' });
      setAgreedToShare(false);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Something went wrong. Please try again or contact us directly.' 
      }]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="w-full h-full flex flex-col bg-white md:rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-gold-deep to-amber-500 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Headphones size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest leading-none mb-1">AsiaBuddy Concierge</h4>
              <p className="text-[10px] opacity-90 font-medium tracking-tight">🟢 Online · 24/7 Live Support</p>
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
          className="flex-1 overflow-y-auto px-5 py-5 space-y-5 bg-gray-50"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {messages.map((message, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} w-full`}
            >
              <div className={`w-fit max-w-[85%] rounded-2xl py-4 px-5 shadow-sm ${
                message.role === 'user'
                  ? 'bg-gold-deep text-white rounded-tr-none mr-2 self-end'
                  : 'bg-white border border-gray-200 text-gray-900 rounded-tl-none ml-2 self-start'
              }`}>
                <div className="prose prose-base max-w-none prose-p:leading-loose prose-p:text-[15px]">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>{message.content}</ReactMarkdown>
                </div>
                {/* Show flight buttons for the last assistant message if triggered */}
                {message.role === 'assistant' && i === messages.length - 1 && flightButtons && (
                  <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
                    <a
                      href={`https://www.aviasales.com/search?origin_iata=${flightButtons.origin}&destination_iata=${flightButtons.destination}`}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="inline-flex items-center justify-center gap-2 bg-[#0D0D0D] text-[#D4AF37] border border-[#D4AF37] font-semibold py-2 px-4 rounded-lg hover:bg-[#1A1A1A] hover:shadow-lg transition-all duration-200 text-sm"
                    >
                      <ExternalLink size={14} />
                      Aviasales တွင် ရှာဖွေရန်
                    </a>
                    <a
                      href={`https://www.trip.com/flights/${iataToCity[flightButtons.origin] || flightButtons.origin}-to-${iataToCity[flightButtons.destination] || flightButtons.destination}/tickets-${flightButtons.origin}-${flightButtons.destination}?flighttype=S&dcity=${flightButtons.origin}&acity=${flightButtons.destination}&Allianceid=9417346&SID=325250647&trip_sub1=&trip_sub3=D18866801`}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="inline-flex items-center justify-center gap-2 bg-[#0D0D0D] text-[#D4AF37] border border-[#D4AF37] font-semibold py-2 px-4 rounded-lg hover:bg-[#1A1A1A] hover:shadow-lg transition-all duration-200 text-sm"
                    >
                      <ExternalLink size={14} />
                      Trip.com တွင် နှိုင်းယှဉ်ကြည့်ရန်
                    </a>
                  </div>
                )}

                {/* Show hotel buttons for the last assistant message if triggered */}
                {message.role === 'assistant' && i === messages.length - 1 && hotelButtons && (() => {
                  const cityData = THAILAND_CITIES[hotelButtons];
                  if (!cityData) return null;

                  // Build Agoda URL
                  const agodaCityId = cityData.agodaCityId;
                  const agodaUrl = `https://www.agoda.com/search?city=${agodaCityId}`;

                  // Build Trip.com hotel URL (same logic as HotelProviderRedirectCard)
                  const today = new Date();
                  const checkin = new Date(today);
                  checkin.setDate(today.getDate() + 7);
                  const checkout = new Date(checkin);
                  checkout.setDate(checkin.getDate() + 3);
                  const formatDate = (d: Date) => d.toISOString().split('T')[0];
                  const { cityId, provinceId, countryId } = cityData;
                  const searchValue = buildTripComSearchValue(cityId);
                  const tripComUrl = `https://www.trip.com/hotels/list?flexType=1&cityId=${cityId}&provinceId=${provinceId}&districtId=0&countryId=${countryId}&destName=${encodeURIComponent(hotelButtons)}&searchWord=${encodeURIComponent(hotelButtons)}&searchType=C&optionId=4&searchValue=${encodeURIComponent(searchValue)}&checkin=${formatDate(checkin)}&checkout=${formatDate(checkout)}&crn=1&adult=2&curr=USD&locale=en-XX&Allianceid=9417346&SID=325250647`;

                  return (
                    <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
                      <a
                        href={agodaUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="inline-flex items-center justify-center gap-2 bg-[#0D0D0D] text-[#D4AF37] border border-[#D4AF37] font-semibold py-2 px-4 rounded-lg hover:bg-[#1A1A1A] hover:shadow-lg transition-all duration-200 text-sm"
                      >
                        <ExternalLink size={14} />
                        Agoda တွင် ရှာဖွေရန်
                      </a>
                      <a
                        href={tripComUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="inline-flex items-center justify-center gap-2 bg-[#0D0D0D] text-[#D4AF37] border border-[#D4AF37] font-semibold py-2 px-4 rounded-lg hover:bg-[#1A1A1A] hover:shadow-lg transition-all duration-200 text-sm"
                      >
                        <ExternalLink size={14} />
                        Trip.com တွင် ဟိုတယ်ရှာဖွေရန်
                      </a>
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl py-4 px-5 rounded-tl-none ml-2 self-start flex items-center gap-2">
                <Loader2 size={14} className="animate-spin text-gold-deep" />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-5 bg-white border-t border-gray-200 flex-shrink-0 pb-[calc(1.25rem+env(safe-area-inset-bottom))] md:pb-5">
          {/* Quick Question Chips - only show for flights/hotels/tickets/activities */}
          {currentCategory && currentCategory !== 'rental' && chipConfig[currentCategory] && (
            <div className="mb-3 flex flex-wrap gap-2">
              {chipConfig[currentCategory].map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => {
                    setInput(chip.question);
                    handleSend();
                  }}
                  disabled={isLoading}
                  className="px-3 py-1.5 text-xs font-medium bg-[#0D0D0D] text-[#D4AF37] border border-[#D4AF37] rounded-full hover:bg-[#1A1A1A] hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          )}
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="w-full bg-gray-100 border border-transparent rounded-xl py-4 pl-5 pr-14 text-base focus:outline-none focus:border-gold-soft transition-all placeholder:text-gray-400"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-3 bg-gold-deep text-white rounded-lg hover:bg-gold-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </div>
          <div className="mt-2 text-center">
            <p className="text-[10px] text-gray-400">Average response time: 2-5 minutes</p>
          </div>
        </div>
      </div>

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

              <div className="space-y-4 overflow-y-auto max-h-[70vh]">
                {/* Consent Notice - Always shown first */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900 leading-relaxed">
                    {formNoticeText.notice}
                  </p>
                </div>

                {/* Checkbox - Must be checked before form fields appear */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreement"
                    checked={agreedToShare}
                    onChange={(e) => {
                      setAgreedToShare(e.target.checked);
                      setValidationErrors({});
                    }}
                    className="mt-1 w-4 h-4 text-gold-deep border-gray-300 rounded focus:ring-gold-soft cursor-pointer"
                  />
                  <label
                    htmlFor="agreement"
                    className="text-sm text-gray-700 leading-relaxed cursor-pointer"
                  >
                    {formNoticeText.agree}
                  </label>
                </div>

                {/* Form Fields - Only visible after checkbox is checked */}
                {agreedToShare && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {formLabels.fullName} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <UserIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            value={contactDetails.name}
                            onChange={(e) => {
                              setContactDetails({ ...contactDetails, name: e.target.value });
                              if (validationErrors.name) setValidationErrors({ ...validationErrors, name: undefined });
                            }}
                            placeholder="Your full name"
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-soft focus:border-transparent"
                          />
                        </div>
                        {validationErrors.name && (
                          <p className="mt-1 text-xs text-red-600">{validationErrors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {formLabels.phone} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            value={contactDetails.phone}
                            onChange={(e) => {
                              setContactDetails({ ...contactDetails, phone: e.target.value });
                              if (validationErrors.phone) setValidationErrors({ ...validationErrors, phone: undefined });
                            }}
                            placeholder="Your phone number"
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-soft focus:border-transparent"
                          />
                        </div>
                        {validationErrors.phone && (
                          <p className="mt-1 text-xs text-red-600">{validationErrors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {formLabels.email}
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
                        <p className="mt-1 text-xs text-gray-500">
                          {formLabels.emailHelper}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {formLabels.preferredApps}
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {['Viber', 'Line', 'Telegram', 'WhatsApp'].map((app) => (
                            <label key={app} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={contactDetails.socialHandles?.includes(app) ?? false}
                                onChange={(e) => {
                                  const current = contactDetails.socialHandles
                                    ? contactDetails.socialHandles.split(',').map((s: string) => s.trim()).filter(Boolean)
                                    : [];
                                  const updated = e.target.checked
                                    ? [...current, app]
                                    : current.filter((s: string) => s !== app);
                                  setContactDetails({ ...contactDetails, socialHandles: updated.join(', ') });
                                }}
                                className="w-4 h-4 accent-yellow-500"
                              />
                              <span className="text-sm text-gray-700">{app}</span>
                            </label>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          {formLabels.phoneHelper}
                        </p>
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg text-xs text-gray-600">
                          <strong>Messenger:</strong> {formLabels.messenger.split('m.me/asiabuddyapp').map((part, i) => 
                            i === 0 ? (
                              <span key={i}>{part}</span>
                            ) : (
                              <span key={i}>
                                <a href="https://m.me/asiabuddyapp" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">m.me/asiabuddyapp</a>
                                {part}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>

              {/* Submit Button - Outside scrollable container to ensure visibility */}
              {agreedToShare && (
                <button
                  type="button"
                  onClick={handleContactFormSubmit}
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gold-deep text-white font-semibold rounded-lg hover:bg-gold-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      {formLabels.submitting}
                    </>
                  ) : (
                    formLabels.submit
                  )}
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
