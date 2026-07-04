import fs from 'fs';

const ALL_LANGS = ['thai', 'spanish', 'french', 'portuguese', 'russian', 'german', 'italian', 'chinese', 'hindi', 'japanese', 'korean', 'myanmar', 'malay', 'indonesian', 'vietnamese', 'arabic', 'bengali', 'dutch', 'filipino', 'farsi', 'polish', 'romanian', 'swedish', 'turkish', 'hebrew'];

// We need a baseline i18n.ts. I'll construct it carefully.
const ENGLISH_UI = {
  menu: 'Menu',
  menuCategories: {
    travel: 'Travel Planning',
    guides: 'Essential Guides',
    transport: 'Transport',
    essentialApps: 'Essential Apps',
    tools: 'Travel Tools'
  },
  start: 'Start Journey',
  explore: 'Explore',
  concierge: 'Concierge',
  hero: 'Explore the Magic Now',
  heroSub: 'Timeless hospitality, your digital Thai guide.',
  sacredAesthetic: 'Sacred Aesthetic',
  toolbox: '',
  emergency: 'Emergency & Safety Advice',
  touristPolice: 'Tourist Police',
  assistance: 'Call for immediate help (24/7)',
  contactNow: 'Contact Now',
  tabs: {
    mustVisit: 'Must Visit Places',
    dining: 'Dining & Food Experiences',
    otherExperiences: 'Other Experiences',
    uniqueActivities: 'Unique Activities',
    hiddenGems: 'Hidden Gems',
    information: 'Information'
  },
  labels: {
    etiquette: 'Etiquette',
    advisory: 'Advisory',
    vibe: 'Vibe'
  },
  infoLink: 'for more information click here',
  infoModalTitle: 'Thailand Essential Guide',
  transport: {
    title: 'Ask any transport information in Thailand that you want to know.',
    detailsTitle: 'Transport',
    transportGuideLink: 'Transport in Thailand For more information',
    appsGuideLink: 'Essential Apps and Websites for Transport in Thailand. For more information, click here!',
    modalTitle: 'Thailand Nationwide Transport Guide',
    suggestions: [
      'How to use Grab in Thailand?',
      'Is the BTS easy to navigate?',
      'How much is a Tuk-tuk ride?',
      'Which app is better: Bolt or Grab?'
    ]
  },
  tools: {
    currency: 'Currency (THB)',
    phrases: 'Essential Phrases',
    etiquette: 'Thai Etiquette',
    laws: 'Key Laws',
    amount: 'Amount',
    currencyLabel: 'Currency',
    serviceMinded: 'Service Minded'
  },
  welcome: 'Welcome from Thailand. Combining local wisdom and technology, we will provide the best guidance, from Thailands iconic landmarks to its hidden beauties.',
  chat: {
    title: 'Thai Concierge',
    status: 'Service Mind • Professional Guidance',
    welcome: '"Sawasdee khrap. How can I assist your Thai journey today?"',
    placeholder: 'Ask anything about Thailand...',
    hint: 'Ask about temples, dining, or logistics',
    processing: 'Processing...',
    safe: 'Secure, law-compliant concierge interface',
    advice: '24/7 Professional Service Mind Advice'
  },
  footer: {
    by: 'By AsiaBuddy Services',
    tagline: 'Dedicated to preserving the integrity of Thai heritage while facilitating world-class visitor experiences.',
    officialHelp: 'Official Help',
    rights: '© 2024 AsiaBuddy travel services. All rights reserved.',
    explore: 'Explore',
    services: 'Services',
    bangkokGuide: 'Bangkok Guide',
    phuketBeaches: 'Phuket Beaches',
    chiangMaiTemples: 'Chiang Mai Temples',
    emergencyContacts: 'Emergency Contacts',
    digitalConcierge: 'Digital Concierge',
    languagePhrases: 'Language Phrases',
    scamAlerts: 'Scam Alerts',
    privacyPolicy: 'Privacy Policy',
    legalTerms: 'Legal Terms',
    culturalGuide: 'Cultural Guide',
    officialService: 'Official AsiaBuddy Service',
    liveEstimates: 'Live Estimates',
    estimatesDisclaimer: 'Rates are estimates only',
    preservance: 'Preserving Excellence in Thai Hospitality',
    shoppingGuide: 'Thailand Shopping Guide',
    transportAppsGuide: 'Transportation Apps Guide'
  },
  booking: {
    link: 'Book car rentals, bus tickets, flight tickets, and entrance fees.',
    chatTitle: 'Ask for details to book car, bus, flight and entrance.',
    welcome: 'Ask for details to book car, bus, flight and entrance.',
    initialMessage: 'Ask for details to book car, bus, flight and entrance.',
    placeholder: 'Ask about cars, tickets or entrance...',
    disclaimer: 'Service prices and ticket rates may change over time.',
    estimateNotice: 'Please note: All prices provided are estimates only.',
    suggestions: [
      'How much for a daily car rental?',
      'Bus ticket booking to Chiang Mai',
      'Flight tickets from Bangkok to Phuket',
      'Grand Palace entrance fee'
    ]
  },
  visa: { title: 'Visa Rules', link: 'Visa Rules', modalTitle: 'Visa Rules' },
  medical: { title: 'Medical Guide', chatTitle: 'Medical Guide', detailsTitle: 'Medical Guide', guideLink: 'Medical Guide', modalTitle: 'Medical Guide', suggestions: [] },
  nightlife: { title: 'Nightlife Guide', chatTitle: 'Nightlife Guide', detailsTitle: 'Nightlife Guide', guideLink: 'Nightlife Guide', modalTitle: 'Nightlife Guide', suggestions: [] },
  vatRefund: { title: 'VAT Refund Guide', description: 'Min spend 2k THB. Look for signs.', link: 'VAT Refund' },
  travelTypes: { title: 'Travel Types', link: 'Travel Types', modalTitle: 'Travel Types' },
  accommodation: { title: 'Accommodation', detailsTitle: 'Accommodation', guideLink: 'Accommodation', modalTitle: 'Accommodation', suggestions: [] },
  weather: { title: 'Weather', updateFrequency: '🔄', climate: 'Thailand', alerts: '', tip: '', humidity: 'Humidity', uvIndex: 'UV Index', wind: 'Wind', high: 'High', alertsLabel: 'Alerts', tipLabel: 'Tip', timeSuffix: 'ICT' },
  food: { title: 'Food', detailsTitle: 'Food', guideLink: 'Food', modalTitle: 'Food', suggestions: [] },
  shopping: { title: 'Shopping', chatTitle: 'Shopping', detailsTitle: 'Shopping', guideLink: 'Shopping', modalTitle: 'Shopping', suggestions: [] }
};

const titles: any = {
  thai: { vatRefund: "คู่มือการขอคืนภาษี", visa: "กฎระเบียบวีซ่า", medical: "ท่องเที่ยวเชิงการแพทย์", nightlife: "คู่มือท่องเที่ยวยามค่ำคืน", travelTypes: "ประเภทการเดินทาง", emergency: "เหตุฉุกเฉิน", touristPolice: "ตำรวจท่องเที่ยว", assistance: "ขอความช่วยเหลือ", contactNow: "ติดต่อ" },
  spanish: { vatRefund: "Guía de Reembolso de IVA", visa: "Reglas de Visa", medical: "Turismo Médico", nightlife: "Vida Nocturna", travelTypes: "Tipos de Viaje", emergency: "Emergencias", touristPolice: "Policía Turística", assistance: "Asistencia", contactNow: "Contacto" },
  // ... more can be added
};

const getLocalized = (lang: string) => {
    const t = titles[lang] || titles.thai; // fallback
    return {
        ...ENGLISH_UI,
        emergency: t.emergency || ENGLISH_UI.emergency,
        touristPolice: t.touristPolice || ENGLISH_UI.touristPolice,
        assistance: t.assistance || ENGLISH_UI.assistance,
        contactNow: t.contactNow || ENGLISH_UI.contactNow,
        visa: { title: t.visa || "Visa Rules", link: "Visa Rules", modalTitle: t.visa || "Visa Rules" },
        medical: { title: t.medical || "Medical Guide", chatTitle: t.medical || "Medical Guide", detailsTitle: t.medical || "Medical Guide", guideLink: t.medical || "Medical Guide", modalTitle: t.medical || "Medical Guide", suggestions: [] },
        nightlife: { title: t.nightlife || "Nightlife Guide", chatTitle: t.nightlife || "Nightlife Guide", detailsTitle: t.nightlife || "Nightlife Guide", guideLink: t.nightlife || "Nightlife Guide", modalTitle: t.nightlife || "Nightlife Guide", suggestions: [] },
        vatRefund: { title: t.vatRefund || "VAT Refund Guide", description: "Min spend 2k THB. Look for signs.", link: "VAT Refund" },
        travelTypes: { title: t.travelTypes || "Travel Types", link: t.travelTypes || "Travel Types", modalTitle: t.travelTypes || "Travel Types" },
        accommodation: { title: "Accommodation", detailsTitle: "Accommodation", guideLink: "Accommodation", modalTitle: "Accommodation", suggestions: [] },
        weather: { title: "Weather", updateFrequency: "🔄", climate: "Thailand", alerts: "", tip: "", humidity: "Humidity", uvIndex: "UV Index", wind: "Wind", high: "High", alertsLabel: "Alerts", tipLabel: "Tip", timeSuffix: "ICT" },
        food: { title: "Food", detailsTitle: "Food", guideLink: "Food", modalTitle: "Food", suggestions: [] },
        shopping: { title: "Shopping", chatTitle: "Shopping", detailsTitle: "Shopping", guideLink: "Shopping", modalTitle: "Shopping", suggestions: [] }
    };
};

let output = `import { ThaiLanguage } from './types';\n\nconst ENGLISH_UI = ${JSON.stringify(ENGLISH_UI, null, 2)};\n\nexport const UI_TRANSLATIONS: Record<ThaiLanguage, typeof ENGLISH_UI> = {\n  english: ENGLISH_UI,`;

ALL_LANGS.forEach(lang => {
    output += `\n  ${lang}: ${JSON.stringify(getLocalized(lang), null, 4).replace(/\n/g, '\n  ')},`;
});

output += `\n};\n`;

fs.writeFileSync('src/i18n.ts', output);
