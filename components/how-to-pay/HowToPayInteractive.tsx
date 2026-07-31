"use client";

import React, { useState, useEffect } from 'react';
import { Building2, CreditCard, Smartphone, Send, Phone, MessageCircle, ExternalLink, Shield } from 'lucide-react';
import { UI_TRANSLATIONS } from '../../lib/i18n';
import { SupportedLanguage } from '../../types/country';
import Navbar from '../shared/Navbar';
import { countries } from '../../data/countries';

interface HowToPayInteractiveProps {
  // No props needed - all data is fetched client-side
}

export default function HowToPayInteractive({}: HowToPayInteractiveProps) {
  const [language, setLanguage] = useState<SupportedLanguage>('EN');
  const [mounted, setMounted] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  useEffect(() => {
    const savedLang = (localStorage.getItem('language') || 'EN').toUpperCase() as SupportedLanguage;
    setLanguage(savedLang);
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.EN;
  const howToPay = t.howToPay || UI_TRANSLATIONS.EN.howToPay;
  
  const liveCountries = countries.filter(c => c.status === 'live');

  return (
    <>
      <Navbar country={undefined} language={language} showRootHomeButton={true} />
      <div className="min-h-screen bg-[#F5F0E8]">
        <main className="max-w-7xl mx-auto px-6 py-16">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-16 h-[1px] bg-[#C9A84C]/50" />
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#C9A84C]">
                Payment Guide
              </span>
              <span className="w-16 h-[1px] bg-[#C9A84C]/50" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              {howToPay.hero.title}
            </h1>
            <div className="w-24 h-1 bg-[#C9A84C] mx-auto mb-6" />
            <p className="text-lg md:text-xl text-[#0D0D0D]/70 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              {howToPay.hero.subtitle}
            </p>
          </section>

          {/* 5-Step Process */}
          <section className="mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {[
                { key: 'step1' },
                { key: 'step2' },
                { key: 'step3' },
                { key: 'step4' },
                { key: 'step5' }
              ].map((step, index) => {
                const stepData = howToPay.steps[step.key as keyof typeof howToPay.steps];
                return (
                  <div key={step.key} className="bg-[#0D0D0D] p-6 rounded-lg border border-[#C9A84C]/20">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#C9A84C] text-[#0D0D0D] font-bold text-xl mb-4" style={{ fontFamily: 'DM Mono, monospace' }}>
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-serif font-bold text-[#F5F0E8] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {stepData.title}
                    </h3>
                    <p className="text-sm text-[#F5F0E8]/80" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {stepData.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Security Notice */}
          <section className="mb-16">
            <div className="bg-[#F5F0E8] border-2 border-[#C9A84C] rounded-lg p-8 flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-[#C9A84C]/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#C9A84C]" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-[#0D0D0D] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Security Notice
                </h3>
                <p className="text-[#0D0D0D] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {howToPay.securityNotice}
                </p>
              </div>
            </div>
          </section>

          {/* Company Details */}
          <section className="mb-16">
            <div className="bg-[#0D0D0D] rounded-lg p-8 border border-[#C9A84C]/20">
              <h2 className="text-2xl font-serif font-bold text-[#F5F0E8] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Company Details
              </h2>
              
              <div className="space-y-6">
                {/* Registration Number */}
                {/* registration number pending — add here once available, do not hardcode a placeholder value */}
                {/* 
                <div className="bg-[#0D0D0D]/50 p-4 rounded border border-[#C9A84C]/10">
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#C9A84C] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {howToPay.companyDetails.registrationLabel}
                  </p>
                  <p className="text-[#F5F0E8]/60 text-sm italic" style={{ fontFamily: 'Inter, sans-serif' }}>
                    [Registration number to be provided]
                  </p>
                </div>
                */}

                {/* Office Address */}
                <div className="bg-[#0D0D0D]/50 p-4 rounded border border-[#C9A84C]/10">
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#C9A84C] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {howToPay.companyDetails.addressLabel}
                  </p>
                  <iframe
                    src="https://www.google.com/maps?q=Altenberge,+Germany&output=embed"
                    width="100%"
                    height="350"
                    style={{ border: 0, borderRadius: '8px' }}
                    loading="lazy"
                    title="AsiaBuddy office location"
                    className="mb-4"
                  />
                  <p className="text-[#F5F0E8] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Altenberge, Germany
                  </p>
                </div>

                {/* Official Contact */}
                <div className="bg-[#0D0D0D]/50 p-4 rounded border border-[#C9A84C]/10">
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#C9A84C] mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {howToPay.companyDetails.contactLabel}
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://wa.me/491793956759"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-[#C9A84C]/10 hover:bg-[#C9A84C]/20 px-4 py-2 rounded transition-colors"
                      aria-label="Contact via WhatsApp"
                    >
                      <MessageCircle className="w-5 h-5 text-[#C9A84C]" />
                      <span className="text-[#F5F0E8] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>WhatsApp</span>
                    </a>
                    <a
                      href="https://t.me/+491793956759"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-[#C9A84C]/10 hover:bg-[#C9A84C]/20 px-4 py-2 rounded transition-colors"
                      aria-label="Contact via Telegram"
                    >
                      <Send className="w-5 h-5 text-[#C9A84C]" />
                      <span className="text-[#F5F0E8] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>Telegram</span>
                    </a>
                    <a
                      href="tel:+491793956759"
                      className="flex items-center gap-2 bg-[#C9A84C]/10 hover:bg-[#C9A84C]/20 px-4 py-2 rounded transition-colors"
                      aria-label="Call via phone"
                    >
                      <Phone className="w-5 h-5 text-[#C9A84C]" />
                      <span className="text-[#F5F0E8] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>Phone</span>
                    </a>
                  </div>
                  <p className="text-[#F5F0E8]/60 text-xs mt-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                    +49 179 3956759
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Payment Methods */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif font-bold text-[#0D0D0D]" style={{ fontFamily: 'Playfair Display, serif' }}>
                Accepted Payment Methods
              </h2>
            </div>
            
            {/* Country Selector */}
            <div className="mb-8">
              <div className="flex flex-wrap justify-center gap-3">
                {liveCountries.map((country) => (
                  <button
                    key={country.id}
                    onClick={() => setSelectedCountry(country.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                      selectedCountry === country.id
                        ? 'bg-[#C9A84C] text-[#0D0D0D] border-[#C9A84C]'
                        : 'bg-white text-[#0D0D0D] border-[#C9A84C]/30 hover:border-[#C9A84C]/60'
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <span className="text-xl">{country.flag}</span>
                    <span className="font-medium">{country.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Payment Method Icons */}
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { key: 'bankTransfer', Icon: Building2 },
                { key: 'kbzPay', Icon: Smartphone },
                { key: 'wave', Icon: Smartphone },
                { key: 'card', Icon: CreditCard }
              ].map((method) => {
                return (
                  <div key={method.key} className="flex items-center gap-3 bg-white px-6 py-4 rounded-lg border border-[#C9A84C]/30 shadow-sm">
                    <method.Icon className="w-6 h-6 text-[#C9A84C]" />
                    <span className="text-[#0D0D0D] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {howToPay.paymentMethods[method.key as keyof typeof howToPay.paymentMethods]}
                    </span>
                  </div>
                );
              })}
            </div>
            
            {/* CTA Button */}
            {selectedCountry && (
              <div className="mt-6 text-center">
                <a
                  href={`https://wa.me/491793956759?text=${encodeURIComponent(`Hi, I'd like to get payment/bank details for ${liveCountries.find(c => c.id === selectedCountry)?.name}, please.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#0D0D0D] px-6 py-3 rounded-lg font-medium hover:bg-[#C9A84C]/90 transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <MessageCircle className="w-5 h-5" />
                  {howToPay.paymentMethods.getInfoButton.replace('{country}', liveCountries.find(c => c.id === selectedCountry)?.name || '')}
                </a>
              </div>
            )}
            
            <p className="text-center text-[#0D0D0D]/50 text-sm mt-4 italic" style={{ fontFamily: 'Inter, sans-serif' }}>
              Payment details are provided privately on your official invoice
            </p>
          </section>

          {/* Social Proof */}
          <section>
            <div className="max-w-2xl mx-auto">
              <div className="bg-[#F5F0E8] border-2 border-[#C9A84C] rounded-lg p-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <ExternalLink className="w-8 h-8 text-[#C9A84C]" />
                  <h2 className="text-2xl font-serif font-bold text-[#0D0D0D]" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {howToPay.socialProof?.headline || "Trusted by 950K+ followers on Facebook"}
                  </h2>
                </div>
                {/* TODO: KIM to drop the actual screenshot file into /public/images/ with this exact filename */}
                <img 
                  src="/images/facebook-950k-followers.png" 
                  alt="AsiaBuddy Facebook Page — 950K+ followers"
                  className="mx-auto rounded-lg shadow-md mb-6 max-w-full h-auto"
                />
                <a
                  href="https://www.facebook.com/asiabuddyapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#C9A84C] hover:text-[#C9A84C]/80 transition-colors font-medium"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <ExternalLink className="w-5 h-5" />
                  Visit our Facebook Page
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}