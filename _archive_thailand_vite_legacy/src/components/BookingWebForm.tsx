'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, Send, ChevronRight, User, Phone, Mail,
  Loader2, CheckCircle2, AlertCircle, Sparkles,
  Map, Plane, Hotel, Car, Ticket, ArrowRight,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
type Language = 'EN' | 'TH' | 'MM' | 'ES' | 'FR' | 'DE';

const LANGUAGE_MAP: Record<Language, {
  name: string;
  greeting: string;
  errorMsg: string;
  outOfScope: string;
}> = {
  EN: {
    name: 'English',
    greeting: 'Hello! I would like to travel to Thailand.',
    errorMsg: '❌ Something went wrong. Please try again.',
    outOfScope: 'Sorry, I can only assist with Thailand travel.',
  },
  MM: {
    name: 'Burmese (မြန်မာဘာသာ)',
    greeting: 'မင်္ဂလာပါ။ ကျွန်တော်/မ ထိုင်းနိုင်ငံ ခရီးသွားချင်ပါတယ်။',
    errorMsg: '❌ တစ်ခုခု မှားယွင်းသွားပါတယ်။ ခဏနေပြီး ထပ်ကြိုးစားကြည့်ပါ။',
    outOfScope: 'ထိုင်းခရီးစဉ်နှင့် သက်ဆိုင်သောမေးခွန်းများသာ ဖြေဆိုနိုင်ပါသည်။',
  },
  TH: {
    name: 'Thai (ภาษาไทย)',
    greeting: 'สวัสดีครับ ผมอยากไปเที่ยวประเทศไทย',
    errorMsg: '❌ เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
    outOfScope: 'ขออภัย ฉันช่วยได้เฉพาะเรื่องการท่องเที่ยวไทยเท่านั้น',
  },
  ES: {
    name: 'Spanish (Español)',
    greeting: 'Hola, me gustaría viajar a Tailandia.',
    errorMsg: '❌ Algo salió mal. Por favor, inténtalo de nuevo.',
    outOfScope: 'Lo siento, solo puedo ayudar con viajes a Tailandia.',
  },
  FR: {
    name: 'French (Français)',
    greeting: 'Bonjour, je voudrais voyager en Thaïlande.',
    errorMsg: '❌ Une erreur est survenue. Veuillez réessayer.',
    outOfScope: 'Désolé, je ne peux aider que pour les voyages en Thaïlande.',
  },
  DE: {
    name: 'German (Deutsch)',
    greeting: 'Hallo, ich möchte nach Thailand reisen.',
    errorMsg: '❌ Etwas ist schiefgelaufen. Bitte versuche es erneut.',
    outOfScope: 'Entschuldigung, ich kann nur bei Thailand-Reisen helfen.',
  },
};
type ServiceKey = 'tour' | 'flight' | 'hotel' | 'car' | 'tickets';
type SocialKey  = 'Viber' | 'Telegram' | 'WhatsApp' | 'Line';
type ChatRole   = 'user' | 'assistant';

interface ChatMessage { role: ChatRole; text: string; }
interface FormData {
  name: string; phone: string; email: string;
  socials: SocialKey[]; services: ServiceKey[]; otherService: string;
}
interface Props { language?: Language; onClose: () => void; salesperson_id?: string; }

// ─── Constants ────────────────────────────────────────────────────────────────
const SOCIALS: SocialKey[]   = ['Viber', 'Telegram', 'WhatsApp', 'Line'];
const SOCIAL_EMOJI: Record<SocialKey, string> = {
  Viber: '💬', Telegram: '✈️', WhatsApp: '📱', Line: '💚',
};

const SERVICES: { key: ServiceKey; label: string; icon: React.ReactNode }[] = [
  { key: 'tour',    label: 'Tour Package',       icon: <Map    size={15} /> },
  { key: 'flight',  label: 'Flight Ticket',      icon: <Plane  size={15} /> },
  { key: 'hotel',   label: 'Hotel Booking',      icon: <Hotel  size={15} /> },
  { key: 'car',     label: 'Car Rental',         icon: <Car    size={15} /> },
  { key: 'tickets', label: 'Attraction Tickets', icon: <Ticket size={15} /> },
];

// ─── Backend API call for inquiry submission ───────────────────────────────────
async function submitInquiry(formData: FormData, chatSummary: string, salesperson_id?: string | null): Promise<boolean> {
  const response = await fetch('https://asiabuddy.app/api/inquiry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...formData,
      chatSummary,
      qa: [],
      salesperson_id: salesperson_id || null,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Inquiry submission failed');
  }

  return true;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BookingWebForm({ language = 'EN', onClose, salesperson_id }: Props) {
  // Steps: 'chat' → 'form' → 'success'
  const [step, setStep]           = useState<'chat' | 'form' | 'success'>('chat');
  const [messages, setMessages]   = useState<ChatMessage[]>([]);
  const [input, setInput]         = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [form, setForm]           = useState<FormData>({
    name: '', phone: '', email: '', socials: [], services: [], otherService: '',
  });
  const [errors, setErrors]       = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  // Opening greeting on mount (static message, no AI call)
  useEffect(() => {
    const lang = LANGUAGE_MAP[language];
    setMessages([{ role: 'assistant', text: lang.greeting }]);
  }, []);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, aiLoading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || aiLoading) return;
    setInput('');
    const userMsg: ChatMessage = { role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    
    // Simple echo response - no API call
    setAiLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setMessages((prev) => [...prev, {
        role: 'assistant',
        text: 'Thank you for your message! Please proceed to fill in your booking details below.',
      }]);
    } catch (error: any) {
      console.error('Chat error:', error);
      setMessages((prev) => [...prev, {
        role: 'assistant',
        text: LANGUAGE_MAP[language].errorMsg,
      }]);
    } finally {
      setAiLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  // Form validation
  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim())         e.name     = 'Name is required';
    if (!form.phone.trim())        e.phone    = 'Phone is required';
    if (!form.services.length)     e.services = 'Select at least one service';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      const chatSummary = messages
        .map((m) => `${m.role === 'user' ? 'Customer' : 'AsiaBuddy'}: ${m.text}`)
        .join('\n');

      const res = await fetch('https://asiabuddy.app/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, chatSummary, qa: [], language, salesperson_id: salesperson_id || null }),
      });
      if (!res.ok) throw new Error();
      setStep('success');
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleSocial   = (s: SocialKey)   => setForm((f) => ({ ...f, socials:  f.socials.includes(s)  ? f.socials.filter((x) => x !== s)  : [...f.socials, s]  }));
  const toggleService  = (s: ServiceKey)  => setForm((f) => ({ ...f, services: f.services.includes(s) ? f.services.filter((x) => x !== s) : [...f.services, s] }));

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Modal shell */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 28 }}
        transition={{ type: 'spring', damping: 26, stiffness: 240 }}
        className="relative w-full max-w-lg flex flex-col rounded-3xl overflow-hidden shadow-2xl"
        style={{ maxHeight: '92vh', background: '#f8f6f1' }}
      >
        {/* ── Header ── */}
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #1a3a2a 0%, #2d5a3d 100%)' }}
        >
          <div className="flex items-center gap-3">
            {/* Avatar pulse */}
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-lg">
                🌺
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-emerald-900" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none">AsiaBuddy Concierge</p>
              <p className="text-emerald-300 text-[10px] mt-0.5 font-medium">
                {step === 'chat' ? '🟢 Online · 24/7 Live Support' : step === 'form' ? 'Booking Details' : 'Confirmed!'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* ── Step indicator pills ── */}
        <div className="flex gap-1.5 px-5 py-2.5 flex-shrink-0" style={{ background: '#1a3a2a' }}>
          {(['chat', 'form', 'success'] as const).map((s, i) => (
            <div
              key={s}
              className={`h-1 rounded-full flex-1 transition-all duration-500 ${
                step === s ? 'bg-amber-400' :
                (step === 'form' && i === 0) || step === 'success' ? 'bg-emerald-500' : 'bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* ── STEP: CHAT ── */}
        <AnimatePresence mode="wait">
          {step === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col flex-grow overflow-hidden"
            >
              {/* Messages */}
              <div
                className="flex-grow overflow-y-auto px-4 py-4 space-y-3"
                style={{
                  background: 'linear-gradient(180deg, #f0ede4 0%, #f8f6f1 100%)',
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4c9a0' fill-opacity='0.08'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0 5.5 4.5 10 10 10s10-4.5 10-10-4.5-10-10-10-10 4.5-10 10z'/%3E%3C/g%3E%3C/svg%3E\")",
                }}
              >
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-full bg-emerald-800 flex items-center justify-center text-sm flex-shrink-0 mb-0.5">
                        🌺
                      </div>
                    )}
                    <div
                      className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                        msg.role === 'user'
                          ? 'bg-emerald-700 text-white rounded-br-sm'
                          : 'bg-white text-gray-800 rounded-bl-sm border border-amber-100/60'
                      }`}
                      style={{ fontFamily: "'Noto Sans Myanmar', 'Pyidaungsu', sans-serif" }}
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }}
                    />
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {aiLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="flex items-end gap-2"
                  >
                    <div className="w-7 h-7 rounded-full bg-emerald-800 flex items-center justify-center text-sm flex-shrink-0">
                      🌺
                    </div>
                    <div className="bg-white border border-amber-100/60 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center gap-1.5">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, delay: d * 0.15, repeat: Infinity }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Proceed to Book CTA — shows after 2+ exchanges */}
              {messages.length >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  className="px-4 pt-2 flex-shrink-0"
                  style={{ background: '#f8f6f1' }}
                >
                  <button
                    onClick={() => setStep('form')}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all text-white shadow-md"
                    style={{ background: 'linear-gradient(135deg, #b5940f 0%, #d4a017 100%)' }}
                  >
                    <ArrowRight size={14} />
                    ဆက်လက်မှာကြမည် · Proceed to Book
                  </button>
                </motion.div>
              )}

              {/* Input bar */}
              <div
                className="px-4 py-3 flex gap-2 items-end flex-shrink-0 border-t border-amber-100/40"
                style={{ background: '#f8f6f1' }}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  placeholder="မေးချင်တာ ရေးပါ… (မြန်မာ / English)"
                  className="flex-grow bg-white border border-amber-200/60 rounded-2xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder:text-gray-400 transition-all shadow-inner"
                  style={{ fontFamily: "'Noto Sans Myanmar', 'Pyidaungsu', sans-serif" }}
                  disabled={aiLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={aiLoading || !input.trim()}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0 transition-all disabled:opacity-40"
                  style={{ background: 'linear-gradient(135deg, #1a3a2a 0%, #2d5a3d 100%)' }}
                >
                  {aiLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP: FORM ── */}
          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              className="flex-grow overflow-y-auto px-5 py-5 space-y-5"
              style={{ background: 'linear-gradient(180deg, #f0ede4 0%, #f8f6f1 100%)' }}
            >
              <div className="text-center mb-1">
                <p className="text-[10px] uppercase tracking-[0.35em] text-emerald-700 font-bold">Booking Details</p>
                <h3 className="text-base font-bold text-gray-800 mt-0.5">သင့်အချက်အလက်များ ဖြည့်ပါ</h3>
              </div>

              <Field label="အမည် · Full Name" required error={errors.name}>
                <InputIcon icon={<User size={14} />}>
                  <input className={iCls(!!errors.name)} placeholder="Your full name" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </InputIcon>
              </Field>

              <Field label="ဖုန်းနံပါတ် · Phone" required error={errors.phone}>
                <InputIcon icon={<Phone size={14} />}>
                  <input className={iCls(!!errors.phone)} placeholder="+66 xx xxx xxxx" value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </InputIcon>
              </Field>

              <Field label="အီးမေးလ် · Email">
                <InputIcon icon={<Mail size={14} />}>
                  <input className={iCls(false)} placeholder="optional" type="email" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </InputIcon>
              </Field>

              <Field label="ဆက်သွယ်မည့် App">
                <div className="flex flex-wrap gap-2">
                  {SOCIALS.map((s) => (
                    <button key={s} type="button" onClick={() => toggleSocial(s)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                        form.socials.includes(s)
                          ? 'bg-emerald-700 border-emerald-700 text-white'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-emerald-400'
                      }`}>
                      {SOCIAL_EMOJI[s]} {s}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="လိုချင်သော ဝန်ဆောင်မှု" required error={errors.services}>
                <div className="grid grid-cols-2 gap-2">
                  {SERVICES.map(({ key, label, icon }) => (
                    <button key={key} type="button" onClick={() => toggleService(key)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
                        form.services.includes(key)
                          ? 'bg-emerald-700 border-emerald-700 text-white shadow-sm'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-emerald-400'
                      }`}>
                      {icon} {label}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="အခြားတောင်းဆိုချက်">
                <textarea className={iCls(false) + ' resize-none'} rows={2}
                  placeholder="အထူးမေးလိုသည်များ..."
                  value={form.otherService}
                  onChange={(e) => setForm({ ...form, otherService: e.target.value })} />
              </Field>

              {submitError && (
                <div className="flex items-center gap-2 text-red-500 text-xs bg-red-50 rounded-xl px-3 py-2 border border-red-100">
                  <AlertCircle size={13} /> {submitError}
                </div>
              )}

              <button type="button" onClick={handleSubmit} disabled={submitting}
                className="w-full py-3.5 rounded-2xl font-bold uppercase tracking-widest text-sm text-white flex items-center justify-center gap-2 transition-all disabled:opacity-60 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #1a3a2a 0%, #2d5a3d 100%)' }}>
                {submitting
                  ? <><Loader2 size={15} className="animate-spin" /> Sending…</>
                  : <><Send size={15} /> Inquiry ပို့မည်</>}
              </button>

              <p className="text-center text-[10px] text-gray-400 italic">
                No Telegram needed · AsiaBuddy Team will contact you within 24hrs
              </p>
            </motion.div>
          )}

          {/* ── STEP: SUCCESS ── */}
          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
              className="flex-grow flex flex-col items-center justify-center text-center px-8 py-12 gap-5"
              style={{ background: 'linear-gradient(180deg, #f0ede4 0%, #f8f6f1 100%)' }}
            >
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12, delay: 0.1 }}
                className="w-20 h-20 rounded-full bg-emerald-100 border-2 border-emerald-200 flex items-center justify-center text-4xl"
              >
                🌺
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-emerald-900 mb-2">Inquiry Sent! ✅</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs"
                  style={{ fontFamily: "'Noto Sans Myanmar', 'Pyidaungsu', sans-serif" }}>
                  သင့် Inquiry ကို AsiaBuddy Team လက်ခံရရှိပါပြီ။{' '}
                  <span className="font-semibold text-emerald-700">
                    {form.socials.length ? form.socials.join(', ') : 'Phone'}
                  </span>{' '}
                  မှတဆင့် <span className="font-semibold">၂၄ နာရী</span> အတွင်း ဆက်သွယ်ပါမည်။
                </p>
              </div>
              <div className="w-full bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-left space-y-1.5">
                <p className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold mb-2">Summary</p>
                {[['Name', form.name], ['Phone', form.phone], form.email && ['Email', form.email]].filter(Boolean).map(([l, v]) => (
                  <div key={l as string} className="flex justify-between text-xs">
                    <span className="text-gray-400">{l as string}</span>
                    <span className="text-gray-700 font-semibold">{v as string}</span>
                  </div>
                ))}
              </div>
              <button onClick={onClose}
                className="w-full py-3.5 rounded-2xl font-bold text-sm text-white uppercase tracking-widest transition-all shadow-md"
                style={{ background: 'linear-gradient(135deg, #1a3a2a 0%, #2d5a3d 100%)' }}>
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="px-5 py-2 text-center text-[9px] text-gray-400 italic flex-shrink-0 border-t border-amber-100/30"
          style={{ background: '#f0ede4' }}>
          AsiaBuddy.app · Official Travel Concierge · Secure & Private
        </div>
      </motion.div>
    </div>
  );
}

// ─── Tiny helpers ─────────────────────────────────────────────────────────────
function iCls(err: boolean) {
  return `w-full border ${err ? 'border-red-400 bg-red-50' : 'border-amber-200/60 bg-white'} rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all`;
}

function Field({ label, required, error, children }: {
  label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 flex gap-1">
        {label}{required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {error && <p className="text-[11px] text-red-500 flex items-center gap-1"><AlertCircle size={11} />{error}</p>}
    </div>
  );
}

function InputIcon({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
      <div style={{ paddingLeft: '2rem' }} className="[&>input]:pl-8 [&>input]:w-full">{children}</div>
    </div>
  );
}

// Very minimal Markdown renderer (bold + bullets only — safe for chat)
function renderMarkdown(text: string): string {
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^[\-\*] (.+)$/gm, '<li class="ml-3 list-disc">$1</li>')
    .replace(/\n/g, '<br />');
}
