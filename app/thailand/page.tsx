"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Calculator, X, ArrowRight, PhoneCall, ShieldCheck, Map, Info, Star, Sun, Check, ListChecks, Languages, MessageCircle, MapPin } from 'lucide-react';

export default function ThailandPage() {
  const [showCurrency, setShowCurrency] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [showPhrases, setShowPhrases] = useState(false);
  const [usd, setUsd] = useState('');
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setCheckedItems(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  };

  const travelCards = [
    { id: 'emg', label: 'Emergency', sub: 'Tourist Police', icon: <PhoneCall size={22} />, color: '#e11d48', content: 'Tourist Police (1155) - ၂၄ နာရီပတ်လုံး အင်္ဂလိပ်စကားပြော ဝန်ဆောင်မှုရှိသည်။', action: () => window.location.href = 'tel:1155' },
    { id: 'sft', label: 'Safety', sub: 'Live Status', icon: <ShieldCheck size={22} />, color: '#2D5A27', content: 'လက်ရှိအချိန်တွင် အေးချမ်းပါသည်။ လူစည်ကားရာနေရာများတွင် အိတ်ကို သတိထားကိုင်ပါ။', action: null },
    { id: 'loc', label: 'Locations', sub: 'Top Destinations', icon: <MapPin size={22} />, color: '#D4AF37', content: 'Bangkok, Chiang Mai, Phuket, Pattaya.', action: null },
    { id: 'vsa', label: 'Visa Info', sub: 'For Myanmar', icon: <Info size={22} />, color: '#3b82f6', content: 'မြန်မာနိုင်ငံသားများ လေကြောင်းဖြင့်လာပါက ၁၄ ရက် ဗီဇာကင်းလွတ်ခွင့်ရှိသည်။', action: null }
  ];

  const thaiPhrases = [
    { thai: "Sawasdee (Krub/Ka)", mm: "မင်္ဂလာပါ", usage: "Greeting" },
    { thai: "Khob Khun (Krub/Ka)", mm: "ကျေးဇူးတင်ပါတယ်", usage: "Thank you" },
    { thai: "Tao Rai?", mm: "ဘယ်လောက်လဲ?", usage: "Price" },
    { thai: "A-roi", mm: "အရသာရှိတယ်", usage: "Food" },
    { thai: "Mai Phed", mm: "မစပ်ပါနဲ့", usage: "Food" }
  ];

  const checklistItems = ["Passport", "Air Ticket", "Cash/Card", "Insurance", "Power Bank"];

  return (
    <div style={{ 
      position: 'fixed', inset: 0, width: '100vw', height: '100vh', 
      backgroundColor: '#FDFCFB', overflow: 'hidden', display: 'flex', flexDirection: 'column',
      fontFamily: 'var(--font-inter), sans-serif'
    }}>
      
      {/* Background Decor */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.12 }}>
        <img src="/thailand.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="bg" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, #FDFCFB)' }}></div>
      </div>

      {/* Header Navigation */}
      <nav style={{ position: 'relative', zIndex: 50, display: 'flex', justifyContent: 'space-between', padding: '1.2rem clamp(1rem, 5vw, 5rem)', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '40px', height: '40px', backgroundColor: '#2D5A27', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 8px 16px rgba(45, 90, 39, 0.2)' }}>
            <Compass size={24} />
          </div>
          <span style={{ fontSize: '1.3rem', fontWeight: '900', letterSpacing: '-0.5px' }}>ASIA<span style={{ color: '#D4AF37' }}>BUDDY</span></span>
        </div>
        <div style={{ fontSize: '11px', fontWeight: '900', color: '#2D5A27', display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.9)', padding: '10px 18px', borderRadius: '50px', border: '1px solid #eee' }}>
          <Sun size={16} /> 32°C BANGKOK
        </div>
      </nav>

      {/* Main Container */}
      <div style={{ position: 'relative', zIndex: 10, flex: 1, overflowY: 'auto', paddingBottom: '140px' }}>
        <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', padding: '1.5rem clamp(1rem, 5vw, 5rem)', maxWidth: '1300px', margin: '0 auto', width: '100%', alignItems: 'center' }}>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
              <div style={{ width: '35px', height: '2px', backgroundColor: '#D4AF37' }}></div>
              <span style={{ color: '#D4AF37', fontSize: '11px', fontWeight: '900', letterSpacing: '4px' }}>EXPLORE 2026</span>
            </div>
            <h1 style={{ fontSize: 'clamp(3rem, 6.5vw, 7rem)', lineHeight: '0.85', fontWeight: '400', color: '#1a1a1a', marginBottom: '2.5rem', fontFamily: 'var(--font-playfair), serif' }}>
              Travel <br /> <span style={{ fontWeight: '700' }}>Thailand</span> <br /> <span style={{ color: '#2D5A27', fontStyle: 'italic' }}>Like a Local.</span>
            </h1>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <button onClick={() => setShowPhrases(true)} style={{ backgroundColor: '#D4AF37', color: 'white', border: 'none', padding: '1.2rem 2.2rem', borderRadius: '50px', cursor: 'pointer', fontWeight: '900', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 20px rgba(212, 175, 55, 0.3)' }}>
                LEARN THAI <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.2rem', width: '100%' }}>
            {travelCards.map((item, idx) => (
              <motion.div key={idx} whileHover={{ y: -5 }} whileTap={{ scale: 0.96 }} onClick={() => item.action ? item.action() : setActiveCard(activeCard === item.id ? null : item.id)}
                style={{ backgroundColor: activeCard === item.id ? item.color : 'white', padding: '1.8rem', borderRadius: '35px', boxShadow: '0 12px 35px rgba(0,0,0,0.04)', border: '1.5px solid #f0f0f0', display: 'flex', flexDirection: 'column', minHeight: '165px', cursor: 'pointer', gridColumn: activeCard === item.id ? 'span 2' : 'span 1', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
                <div style={{ color: activeCard === item.id ? 'white' : item.color, marginBottom: 'auto' }}>{item.icon}</div>
                <h4 style={{ margin: '15px 0 2px 0', fontSize: '1.1rem', fontWeight: '800', color: activeCard === item.id ? 'white' : '#1a1a1a' }}>{item.label}</h4>
                <p style={{ margin: 0, fontSize: '10px', color: activeCard === item.id ? 'rgba(255,255,255,0.7)' : '#bbb', fontWeight: '900', textTransform: 'uppercase' }}>{item.sub}</p>
                {activeCard === item.id && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: '12px', color: 'white', marginTop: '15px', lineHeight: '1.6', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '12px' }}>{item.content}</motion.p>}
              </motion.div>
            ))}
          </div>
        </main>
      </div>

      {/* Reusable Modals (Currency, Checklist, Phrases) */}
      <AnimatePresence>
        {showPhrases && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(15px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} style={{ backgroundColor: 'white', width: '100%', maxWidth: '420px', padding: '40px', borderRadius: '45px', position: 'relative' }}>
              <button onClick={() => setShowPhrases(false)} style={{ position: 'absolute', top: '30px', right: '30px', border: 'none', background: 'none', cursor: 'pointer' }}><X size={28} /></button>
              <h2 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '25px', color: '#2D5A27' }}>Common Thai</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {thaiPhrases.map((p, i) => (
                  <div key={i} style={{ padding: '15px 20px', borderRadius: '22px', backgroundColor: '#f8f8f8', border: '1px solid #f0f0f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '15px', fontWeight: '900', color: '#1a1a1a' }}>{p.thai}</span>
                      <span style={{ fontSize: '9px', fontWeight: '900', color: '#D4AF37', textTransform: 'uppercase' }}>{p.usage}</span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#666', fontWeight: '600' }}>{p.mm}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {showCurrency && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(15px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
             <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} style={{ backgroundColor: 'white', width: '100%', maxWidth: '380px', padding: '45px', borderRadius: '50px', textAlign: 'center', position: 'relative' }}>
               <button onClick={() => setShowCurrency(false)} style={{ position: 'absolute', top: '30px', right: '30px', border: 'none', background: 'none', cursor: 'pointer' }}><X size={28} /></button>
               <h2 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '30px' }}>Currency Tool</h2>
               <input type="number" value={usd} onChange={(e) => setUsd(e.target.value)} style={{ width: '100%', padding: '20px', borderRadius: '25px', border: '2px solid #f0f0f0', fontSize: '28px', textAlign: 'center', marginBottom: '30px', outline: 'none', fontWeight: '900' }} placeholder="USD" />
               <div style={{ backgroundColor: '#2D5A27', color: 'white', padding: '30px', borderRadius: '35px', boxShadow: '0 20px 40px rgba(45, 90, 39, 0.2)' }}>
                 <p style={{ margin: 0, fontSize: '11px', opacity: 0.8, fontWeight: '800' }}>TOTAL BAHT</p>
                 <h4 style={{ margin: '10px 0 0 0', fontSize: '42px', fontWeight: '900' }}>฿ {usd ? (parseFloat(usd) * 35.42).toLocaleString() : '0'}</h4>
               </div>
             </motion.div>
           </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Navigation */}
      <div style={{ position: 'fixed', bottom: '25px', left: '50%', transform: 'translateX(-50%)', width: 'calc(100% - 40px)', maxWidth: '440px', height: '75px', backgroundColor: '#1a1a1a', borderRadius: '35px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 60, boxShadow: '0 25px 50px rgba(0,0,0,0.4)', padding: '0 15px', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ color: '#D4AF37', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' }}><Compass size={24} /><span style={{ fontSize: '9px', fontWeight: '900' }}>EXPLORE</span></div>
        <div onClick={() => setShowCurrency(true)} style={{ color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', opacity: 0.8 }}><Calculator size={24} /><span style={{ fontSize: '9px', fontWeight: '900' }}>CONVERT</span></div>
        <div onClick={() => setShowPhrases(true)} style={{ color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', opacity: 0.8 }}><Languages size={24} /><span style={{ fontSize: '9px', fontWeight: '900' }}>PHRASES</span></div>
      </div>
    </div>
  );
}