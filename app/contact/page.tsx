"use client";

import React, { useState, useEffect } from 'react';
import { UI_TRANSLATIONS } from '../../lib/i18n';
import { SupportedLanguage } from '../../types/country';
import Link from 'next/link';
import { Home } from 'lucide-react';

const SERVICE_VALUES = ['tour', 'flight', 'hotel', 'car', 'taxi', 'tickets'] as const;
const SOCIAL_VALUES = ['whatsapp', 'line', 'viber', 'telegram'] as const;
const COUNTRY_VALUES = ['thailand', 'vietnam'] as const;

export default function ContactPage() {
  const [language, setLanguage] = useState<SupportedLanguage>('EN');
  const [mounted, setMounted] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'thailand',
    serviceType: '',
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
    
    // Validate Vietnam selection
    if (formData.country === 'vietnam') {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Construct payload matching API expectations
      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        socials: formData.socialApps,
        services: formData.serviceType ? [formData.serviceType] : [],
        otherService: formData.message, // Mapping free-text message to otherService field
        language: language.toLowerCase(),
        country: formData.country
      };

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

  const isVietnamSelected = formData.country === 'vietnam';

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
      <main className="max-w-2xl mx-auto px-6 py-16">
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
              <option value="thailand">{contact?.countryThailand || 'Thailand'}</option>
              <option value="vietnam">{contact?.countryVietnam || 'Vietnam (Coming Soon)'}</option>
            </select>
            {isVietnamSelected && (
              <p className="mt-2 text-sm text-amber-600 font-medium">
                {contact?.vietnamNotAvailable || 'Vietnam services are coming soon. Please select Thailand for immediate assistance.'}
              </p>
            )}
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
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-colors text-[#0D0D0D]"
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
            disabled={isSubmitting || isVietnamSelected}
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
