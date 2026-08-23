"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { UI_TRANSLATIONS } from '../../lib/i18n';
import { SupportedLanguage } from '../../types/country';
import { countries } from '../../data/countries';
import Link from 'next/link';
import { Home } from 'lucide-react';

// SVG Icons for contact methods
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const ViberIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    <path d="M2 12l2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2"></path>
  </svg>
);

const TelegramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 2L11 13"></path>
    <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const LineIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    <path d="M8 12h8"></path>
  </svg>
);

const SERVICE_VALUES = ['tour', 'flight', 'hotel', 'car', 'taxi', 'tickets'] as const;
const SOCIAL_VALUES = ['whatsapp', 'line', 'viber', 'telegram'] as const;
const COUNTRY_VALUES = countries.filter(c => c.status === 'live').map(c => c.id) as readonly string[];

export default function ContactPage() {
  const searchParams = useSearchParams();
  const referrerUrl = searchParams.get('ref');
  const tourSlug = searchParams.get('tour');
  
  const [language, setLanguage] = useState<SupportedLanguage>('EN');
  const [mounted, setMounted] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'thailand',
    serviceType: (referrerUrl || tourSlug) ? 'tour' : '',
    message: '',
    socialApps: [] as string[]
  });
  

  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const savedLang = (localStorage.getItem('language') || 'EN').toUpperCase() as SupportedLanguage;
    setLanguage(savedLang);
    setMounted(true);
  }, []);

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.EN;
  const contact = t.contact || UI_TRANSLATIONS.EN.contact;

  const handleLanguageChange = (langCode: string) => {
    const upper = langCode.toUpperCase() as SupportedLanguage;
    localStorage.setItem('language', langCode);
    setLanguage(upper);
    document.cookie = `NEXT_LOCALE=${upper}; path=/; max-age=31536000; SameSite=Lax`;
    window.location.reload();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Construct payload matching API expectations
      const payload: any = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        socials: formData.socialApps,
        services: formData.serviceType ? [formData.serviceType] : [],
        otherService: formData.message, // Mapping free-text message to otherService field
        language: language.toLowerCase(),
        country: formData.country
      };

      // Use referrerUrl as carrier for tour link
      const tourPageUrl = tourSlug 
        ? `https://asiabuddy.app/${formData.country}/tours/${tourSlug}` 
        : referrerUrl; // fallback to whatever `ref` param was passed, if any
      
      if (tourPageUrl) {
        payload.referrerUrl = tourPageUrl;
      }

      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        if (process.env.NODE_ENV === 'development') {
          console.error('API Error:', errorData);
        }
        throw new Error(errorData.error || 'Submission failed');
      }

      const result = await response.json();

      setSubmitStatus('success');
      
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        country: 'thailand',
        serviceType: '',
        message: '',
        socialApps: []
      });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Submission error:', error);
      }
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      {/* Header with Language Selector */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-serif text-[#C9A84C] leading-none">AsiaBuddy</h1>
            <p className="text-[8px] uppercase tracking-[0.4em] font-bold text-gray-400 mt-1">{t.brand?.subtitle || 'AsiaBuddy Services'}</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Home Icon */}
            <Link
              href="/thailand"
              aria-label="Go to homepage"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 text-gray-600 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
            >
              <Home size={18} />
            </Link>

            {/* Language Selector */}
            <div className="relative inline-block text-left z-50">
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-[#0D0D0D]/90 text-[#F5F0E8] border border-[#C9A84C]/30 rounded px-2.5 py-1 text-sm font-sans focus:outline-none focus:border-[#C9A84C] cursor-pointer hover:border-[#C9A84C]/60 transition-colors"
            >
              <option value="EN">🇬🇧 English</option>
              <option value="TH">🇹🇭 ไทย</option>
              <option value="MM">🇲🇲 မြန်မာ</option>
              <option value="DE">🇩🇪 Deutsch</option>
              <option value="FR">🇫🇷 Français</option>
              <option value="ES">🇪🇸 Español</option>
            </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Sales Agent Contact Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-16 h-[1px] bg-[#C9A84C]/50" />
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#C9A84C]">
                Sales Agents
              </span>
              <span className="w-16 h-[1px] bg-[#C9A84C]/50" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0D0D0D] mb-3">
              Contact Our Team
            </h2>
            <p className="text-gray-600 text-sm font-light">
              Reach out to our local sales representatives in your region
            </p>
          </div>

          {/* Agent Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Myanmar Card */}
            <div className="bg-[#0D0D0D] border border-[#C9A84C]/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🇲🇲</span>
                <h3 className="text-lg font-serif font-bold text-[#F5F0E8]">Myanmar</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A84C] mb-1">Address</p>
                  <p className="text-[#F5F0E8]/80 text-sm">North Dagon Township, Yangon, Myanmar</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A84C] mb-1">Mobile</p>
                  <div className="space-y-1">
                    <a href="tel:+9595033846" className="flex items-center gap-2 text-[#F5F0E8]/80 text-sm hover:text-[#C9A84C] transition-colors">
                      <PhoneIcon />
                      <span>+9595033846</span>
                    </a>
                    <a href="tel:+959789721970" className="flex items-center gap-2 text-[#F5F0E8]/80 text-sm hover:text-[#C9A84C] transition-colors">
                      <PhoneIcon />
                      <span>+959789721970</span>
                    </a>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <a href="viber://chat?number=+9595033846" className="flex items-center justify-center w-9 h-9 rounded-full border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0D0D] transition-colors" title="Viber">
                    <ViberIcon />
                  </a>
                  <a href="https://t.me/+9595033846" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0D0D] transition-colors" title="Telegram">
                    <TelegramIcon />
                  </a>
                  <a href="mailto:aung.tm77@gmail.com" className="flex items-center justify-center w-9 h-9 rounded-full border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0D0D] transition-colors" title="Email">
                    <EmailIcon />
                  </a>
                </div>
              </div>
            </div>

            {/* Thailand Card */}
            <div className="bg-[#0D0D0D] border border-[#C9A84C]/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🇹🇭</span>
                <h3 className="text-lg font-serif font-bold text-[#F5F0E8]">Thailand</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A84C] mb-1">Mobile</p>
                  <a href="tel:+85362900683" className="flex items-center gap-2 text-[#F5F0E8]/80 text-sm hover:text-[#C9A84C] transition-colors">
                    <PhoneIcon />
                    <span>+85362900683</span>
                  </a>
                </div>
                <div className="flex gap-3 pt-2">
                  <a href="viber://chat?number=+85362900683" className="flex items-center justify-center w-9 h-9 rounded-full border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0D0D] transition-colors" title="Viber">
                    <ViberIcon />
                  </a>
                  <a href="https://wa.me/85362900683" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0D0D] transition-colors" title="WhatsApp">
                    <WhatsAppIcon />
                  </a>
                  <a href="https://line.me/ti/p/NHANa-7WDU" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0D0D] transition-colors" title="LINE">
                    <LineIcon />
                  </a>
                  <a href="mailto:th@asiabuddy.app" className="flex items-center justify-center w-9 h-9 rounded-full border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0D0D] transition-colors" title="Email">
                    <EmailIcon />
                  </a>
                </div>
              </div>
            </div>

            {/* Germany Card */}
            <div className="bg-[#0D0D0D] border border-[#C9A84C]/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🇩🇪</span>
                <h3 className="text-lg font-serif font-bold text-[#F5F0E8]">Germany</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A84C] mb-1">Address</p>
                  <p className="text-[#F5F0E8]/80 text-sm">Altenberge, Germany</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A84C] mb-1">Mobile</p>
                  <a href="tel:+1793956759" className="flex items-center gap-2 text-[#F5F0E8]/80 text-sm hover:text-[#C9A84C] transition-colors">
                    <PhoneIcon />
                    <span>+1793956759</span>
                  </a>
                </div>
                <div className="flex gap-3 pt-2">
                  <a href="viber://chat?number=+1793956759" className="flex items-center justify-center w-9 h-9 rounded-full border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0D0D] transition-colors" title="Viber">
                    <ViberIcon />
                  </a>
                  <a href="https://wa.me/1793956759" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0D0D] transition-colors" title="WhatsApp">
                    <WhatsAppIcon />
                  </a>
                  <a href="https://line.me/ti/p/M7yYfwHsWN" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0D0D] transition-colors" title="LINE">
                    <LineIcon />
                  </a>
                  <a href="https://t.me/+1793956759" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0D0D] transition-colors" title="Telegram">
                    <TelegramIcon />
                  </a>
                  <a href="mailto:asiabuddyapp@gmail.com" className="flex items-center justify-center w-9 h-9 rounded-full border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0D0D] transition-colors" title="Email">
                    <EmailIcon />
                  </a>
                </div>
              </div>
            </div>

            {/* Hong Kong & Macau Card */}
            <div className="bg-[#0D0D0D] border border-[#C9A84C]/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🇭🇰🇲🇴</span>
                <h3 className="text-lg font-serif font-bold text-[#F5F0E8]">Hong Kong & Macau</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A84C] mb-1">Mobile</p>
                  <a href="tel:+85362900683" className="flex items-center gap-2 text-[#F5F0E8]/80 text-sm hover:text-[#C9A84C] transition-colors">
                    <PhoneIcon />
                    <span>+85362900683</span>
                  </a>
                </div>
                <div className="flex gap-3 pt-2">
                  <a href="viber://chat?number=+85362900683" className="flex items-center justify-center w-9 h-9 rounded-full border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0D0D] transition-colors" title="Viber">
                    <ViberIcon />
                  </a>
                  <a href="https://wa.me/85362900683" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0D0D] transition-colors" title="WhatsApp">
                    <WhatsAppIcon />
                  </a>
                  <a href="https://line.me/ti/p/NHANa-7WDU" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0D0D] transition-colors" title="LINE">
                    <LineIcon />
                  </a>
                  <a href="mailto:th@asiabuddy.app" className="flex items-center justify-center w-9 h-9 rounded-full border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0D0D] transition-colors" title="Email">
                    <EmailIcon />
                  </a>
                </div>
              </div>
            </div>

            {/* UK Card - Empty State */}
            <div className="bg-[#0D0D0D] border border-[#C9A84C]/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🇬🇧</span>
                <h3 className="text-lg font-serif font-bold text-[#F5F0E8]">United Kingdom</h3>
              </div>
              <div className="flex items-center justify-center py-8">
                <p className="text-[#F5F0E8]/60 text-sm text-center">
                  Contact details coming soon
                </p>
              </div>
              {/* TODO: Insert UK agent data here when available */}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <div className="max-w-2xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-[#C9A84C]/30" />
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#0D0D0D]">
                AsiaBuddy
              </span>
              <span className="w-12 h-[1px] bg-[#C9A84C]/30" />
            </div>
            <h2 className="text-4xl md:text-5xl mb-4 tracking-tight leading-none text-[#0D0D0D] font-serif font-bold">
              {contact?.title || 'Contact Us'}
            </h2>
            <p className="text-gray-600 font-light text-sm leading-relaxed tracking-wide">
              {contact?.subtitle || 'Send us your inquiry and we\'ll get back to you shortly'}
            </p>
          </div>

          {/* Referrer URL Display */}
          {(referrerUrl || tourSlug) && (
            <div className="mb-6 p-4 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-lg">
              <p className="text-sm font-semibold text-[#0D0D0D] mb-1">
                Inquiring about:
              </p>
              <p className="text-sm text-gray-600 break-all">
                {tourSlug 
                  ? `https://asiabuddy.app/${formData.country}/tours/${tourSlug}` 
                  : referrerUrl}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-[#0D0D0D] mb-2">
                {contact?.name || 'Full Name'} <span className="text-[#C9A84C]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-colors text-[#0D0D0D] placeholder-gray-400"
                placeholder={contact?.name || 'Full Name'}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-[#0D0D0D] mb-2">
                {contact?.email || 'Email Address'}
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-colors text-[#0D0D0D] placeholder-gray-400"
                placeholder={contact?.email || 'Email Address'}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-[#0D0D0D] mb-2">
                {contact?.phone || 'Phone Number'} <span className="text-[#C9A84C]">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-colors text-[#0D0D0D] placeholder-gray-400"
                placeholder="+66 812 345 6789"
              />
              <p className="mt-1.5 text-xs text-gray-500">
                {contact?.phoneHint || 'Include country code (e.g., +66 for Thailand, +95 for Myanmar)'}
              </p>
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-semibold text-[#0D0D0D] mb-2">
                {contact?.country || 'Service Country'} <span className="text-[#C9A84C]">*</span>
              </label>
              <select
                required
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value as any })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-colors text-[#0D0D0D]"
              >
                {countries.filter(c => c.status === 'live').map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Service Type */}
            <div>
              <label className="block text-sm font-semibold text-[#0D0D0D] mb-2">
                {contact?.serviceType || 'Service Type'} <span className="text-[#C9A84C]">*</span>
              </label>
              <select
                required
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                disabled={referrerUrl !== null}
                className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-colors text-[#0D0D0D] ${referrerUrl !== null ? 'bg-gray-50 cursor-not-allowed' : ''}`}
              >
                <option value="">{contact?.serviceType || 'Select a service...'}</option>
                <option value="tour">{contact?.serviceTour || '🗺️ Tour Package'}</option>
                <option value="flight">{contact?.serviceFlight || '✈️ Flight Ticket'}</option>
                <option value="hotel">{contact?.serviceHotel || '🏨 Hotel Booking'}</option>
                <option value="car">{contact?.serviceCar || '🚗 Car Rental'}</option>
                <option value="taxi">{contact?.serviceTaxi || '🚕 Taxi/Transfer'}</option>
                <option value="tickets">{contact?.serviceTickets || '🎟️ Attraction Tickets'}</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-[#0D0D0D] mb-2">
                {contact?.message || 'Your Message'} <span className="text-[#C9A84C]">*</span>
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-colors text-[#0D0D0D] placeholder-gray-400 resize-none"
                placeholder={contact?.messagePlaceholder || 'Tell us about your travel plans or questions...'}
              />
            </div>

            {/* Social Apps (Optional) */}
            <div>
              <label className="block text-sm font-semibold text-[#0D0D0D] mb-2">
                {contact?.socialApp || 'Preferred Social Apps (Optional)'}
              </label>
              <div className="space-y-2">
                {SOCIAL_VALUES.map((app) => {
                  const appLabels: Record<string, string> = {
                    whatsapp: contact?.socialWhatsApp || 'WhatsApp',
                    line: contact?.socialLINE || 'LINE',
                    viber: contact?.socialViber || 'Viber',
                    telegram: contact?.socialTelegram || 'Telegram'
                  };
                  return (
                    <label key={app} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        value={app}
                        checked={formData.socialApps.includes(app)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, socialApps: [...formData.socialApps, app] });
                          } else {
                            setFormData({ ...formData, socialApps: formData.socialApps.filter(a => a !== app) });
                          }
                        }}
                        className="w-4 h-4 rounded border-gray-300 text-[#C9A84C] focus:ring-[#C9A84C] focus:ring-offset-0"
                      />
                      <span className="text-sm text-gray-700">{appLabels[app]}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#C9A84C] to-[#B8943E] text-white px-10 py-4 rounded-full shadow-lg font-bold transition-all duration-300 hover:shadow-xl hover:from-[#B8943E] hover:to-[#A78330] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-[#C9A84C] disabled:hover:to-[#B8943E]"
            >
              {isSubmitting ? (contact?.submitting || 'Sending...') : (contact?.submit || 'Send Inquiry')}
            </button>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
                {contact?.success || 'Thank you! Your inquiry has been sent successfully. We\'ll get back to you soon.'}
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                {contact?.error || 'Something went wrong. Please try again or contact us directly.'}
              </div>
            )}
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0D0D0D] text-[#F5F0E8] py-8 px-6 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} AsiaBuddy. {t.brand?.subtitle || 'AsiaBuddy Services'}
          </p>
        </div>
      </footer>
    </div>
  );
}
