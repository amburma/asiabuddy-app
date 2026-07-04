import fs from 'fs';

const titles: any = {
  english: {
    vatRefund: "VAT Refund Guide for Travelers",
    visa: "Visa Rules",
    medical: "Medical Travel Guide",
    nightlife: "Nightlife Guide",
    travelTypes: "Thailand Travel Types",
    accommodation: "Accommodation Guide",
    weather: "Weather: Thailand",
    food: "Food Guide",
    shopping: "Shopping Guide"
  },
  thai: {
    vatRefund: "คู่มือการขอคืนภาษี (VAT Refund)",
    visa: "กฎระเบียบวีซ่า",
    medical: "คู่มือการท่องเที่ยวเชิงการแพทย์",
    nightlife: "คู่มือท่องเที่ยวยามค่ำคืน",
    travelTypes: "ประเภทการเดินทางในไทย",
    accommodation: "คู่มือที่พัก",
    weather: "สภาพอากาศ: ประเทศไทย",
    food: "คู่มืออาหารไทย",
    shopping: "คู่มือการช้อปปิ้ง",
    emergency: "เหตุฉุกเฉกและคำแนะนำด้านความปลอดภัย",
    touristPolice: "ตำรวจท่องเที่ยว",
    assistance: "โทรขอความช่วยเหลือทันที (24/7)",
    contactNow: "ติดต่อทันที"
  },
  spanish: {
    vatRefund: "Guía de Reembolso de IVA",
    visa: "Reglas de Visa",
    medical: "Guía de Turismo Médico",
    nightlife: "Guía de Vida Nocturna",
    travelTypes: "Tipos de Viaje a Tailandia",
    accommodation: "Guía de Alojamiento",
    weather: "Clima: Tailandia",
    food: "Guía Gastronómica",
    shopping: "Guía de Compras",
    emergency: "Emergencias y Seguridad",
    touristPolice: "Policía Turística",
    assistance: "Llamada de ayuda inmediata (24/7)",
    contactNow: "Contactar Ahora"
  },
  french: {
    vatRefund: "Guide de Remboursement de la TVA",
    visa: "Règles de Visa",
    medical: "Guide du Tourisme Médical",
    nightlife: "Guide de la Vie Nocturne",
    travelTypes: "Types de Voyage en Thaïlande",
    accommodation: "Guide d'Hébergement",
    weather: "Météo : Thaïlande",
    food: "Guide Gastronomique",
    shopping: "Guide de Shopping",
    emergency: "Urgences et Sécurité",
    touristPolice: "Police Touristique",
    assistance: "Appel d'urgence (24/7)",
    contactNow: "Contacter Maintenant"
  },
  italian: {
    vatRefund: "Guida al Rimborso IVA",
    visa: "Regole del Visto",
    medical: "Guida al Turismo Medico",
    nightlife: "Guida alla Vita Notturna",
    travelTypes: "Tipi di Viaggio in Thailandia",
    accommodation: "Guida agli Alloggi",
    weather: "Meteo: Thailandia",
    food: "Guida al Cibo",
    shopping: "Guida allo Shopping",
    emergency: "Emergenza e Sicurezza",
    touristPolice: "Polizia Turistica",
    assistance: "Chiama per aiuto immediato (24/7)",
    contactNow: "Contatta Ora"
  },
  german: {
    vatRefund: "Mehrwertsteuer-Rückerstattung",
    visa: "Visumregeln",
    medical: "Medizinischer Reiseführer",
    nightlife: "Nachtleben-Führer",
    travelTypes: "Reisearten in Thailand",
    accommodation: "Unterkunftsführer",
    weather: "Wetter: Thailand",
    food: "Kulinarischer Führer",
    shopping: "Shopping-Führer",
    emergency: "Notfall & Sicherheit",
    touristPolice: "Touristenpolizei",
    assistance: "Soforthilfe rufen (24/7)",
    contactNow: "Jetzt Kontaktieren"
  },
  portuguese: {
    vatRefund: "Guia de Reembolso de IVA",
    visa: "Reglas de Visto",
    medical: "Guia de Turismo Médico",
    nightlife: "Guia de Vida Nocturna",
    travelTypes: "Tipos de Viagem na Tailândia",
    accommodation: "Guia de Acomodação",
    weather: "Clima: Tailândia",
    food: "Guia de Gastronomia",
    shopping: "Guia de Compras",
    emergency: "Emergência e Segurança",
    touristPolice: "Polícia Turística",
    assistance: "Ligar para ajuda imediata (24/7)",
    contactNow: "Contatar Agora"
  },
  russian: {
    vatRefund: "Возврат НДС для туристов",
    visa: "Правила получения визы",
    medical: "Медицинский туризм",
    nightlife: "Ночная жизнь",
    travelTypes: "Типы путешествий",
    accommodation: "Жилье в Таиланде",
    weather: "Погода: Таиланд",
    food: "Гид по еде",
    shopping: "Гид по покупкам",
    emergency: "Экстренная помощь и безопасность",
    touristPolice: "Туристическая полиция",
    assistance: "Позвонить для помощи (24/7)",
    contactNow: "Связаться сейчас"
  },
  chinese: {
    vatRefund: "游客退税指南",
    visa: "签证规则",
    medical: "医疗旅游指南",
    nightlife: "夜生活指南",
    travelTypes: "泰国旅游类型",
    accommodation: "住宿指南",
    weather: "天气：泰国",
    food: "美食指南",
    shopping: "购物指南",
    emergency: "紧急与安全建议",
    touristPolice: "旅游警察",
    assistance: "立即通话 (24/7)",
    contactNow: "立即联系"
  },
  japanese: {
    vatRefund: "免税手続きガイド",
    visa: "ビザのルール",
    medical: "メディカルツーリズム",
    nightlife: "ナイトライフガイド",
    travelTypes: "タイ旅行の種類",
    accommodation: "宿泊ガイド",
    weather: "天気：タイ",
    food: "グルメガイド",
    shopping: "ショッピングガイド",
    emergency: "緊急・安全アドバイス",
    touristPolice: "観光警察",
    assistance: "緊急ヘルプ (24/7)",
    contactNow: "今すぐ連絡"
  },
  korean: {
    vatRefund: "부가가치세 환급 안내",
    visa: "비자 규칙",
    medical: "의료 관광 가이드",
    nightlife: "나이트라이프 가이드",
    travelTypes: "태국 여행 유형",
    accommodation: "숙박 가이드",
    weather: "날씨: 태국",
    food: "음식 가이드",
    shopping: "쇼핑 가이드",
    emergency: "긴급 및 안전 조언",
    touristPolice: "관광 경찰",
    assistance: "즉시 도움 요청 (24/7)",
    contactNow: "지금 연락하기"
  },
  vietnamese: {
    vatRefund: "Hướng dẫn Hoàn thuế VAT",
    visa: "Quy định Visa",
    medical: "Hướng dẫn Du lịch Y tế",
    nightlife: "Hướng dẫn Đời sống về đêm",
    travelTypes: "Các loại hình du lịch",
    accommodation: "Hướng dẫn Chỗ ở",
    weather: "Thời tiết: Thái Lan",
    food: "Hướng dẫn Ẩm thực",
    shopping: "Hướng dẫn Mua sắm"
  },
  indonesian: {
    vatRefund: "Panduan Pengembalian PPN",
    visa: "Aturan Visa",
    medical: "Panduan Wisata Medis",
    nightlife: "Panduan Kehidupan Malam",
    travelTypes: "Jenis Perjalanan",
    accommodation: "Panduan Akomodasi",
    weather: "Cuaca: Thailand",
    food: "Panduan Kuliner",
    shopping: "Panduan Belanja"
  },
  malay: {
    vatRefund: "Panduan Bayaran Balik VAT",
    visa: "Peraturan Visa",
    medical: "Panduan Pelancongan Perubatan",
    nightlife: "Panduan Kehidupan Malam",
    travelTypes: "Jenis Pelancongan",
    accommodation: "Panduan Penginapan",
    weather: "Cuaca: Thailand",
    food: "Panduan Makanan",
    shopping: "Panduan Membeli-belah"
  },
  arabic: {
    vatRefund: "دليل استرداد ضريبة القيمة المضافة",
    visa: "قواعد التأشيرة",
    medical: "دليل السياحة الطبية",
    nightlife: "دليل الحياة الليلية",
    travelTypes: "أنواع السفر",
    accommodation: "دليل الإقامة",
    weather: "الطقس: تايلاند",
    food: "دليل الطعام",
    shopping: "دليل التسوق"
  },
  hindi: {
    vatRefund: "वैट रिफंड गाइड",
    visa: "वीजा नियम",
    medical: "चिकित्सा यात्रा गाइड",
    nightlife: "नाइटलाइफ़ गाइड",
    travelTypes: "यात्रा के प्रकार",
    accommodation: "आवास गाइड",
    weather: "मौसम: थाईलैंड",
    food: "भोजन गाइड",
    shopping: "खरीदारी गाइड"
  },
  bengali: {
    vatRefund: "ভ্যাট রিফান্ড গাইড",
    visa: "ভিসা নিয়ম",
    medical: "মেডিকেল ট্রাভেল গাইড",
    nightlife: "নাইটলাইফ গাইড",
    travelTypes: "ভ্রমণের ধরণ",
    accommodation: "আবাসন নির্দেশিকা",
    weather: "আবহাওয়া: থাইল্যান্ড",
    food: "ফুড গাইড",
    shopping: "শপিং গাইড"
  }
};

const ALL_LANGUAGES = ['thai', 'spanish', 'french', 'portuguese', 'russian', 'german', 'italian', 'chinese', 'hindi', 'japanese', 'korean', 'myanmar', 'malay', 'indonesian', 'vietnamese', 'arabic', 'bengali', 'dutch', 'filipino', 'farsi', 'polish', 'romanian', 'swedish', 'turkish', 'hebrew'];

ALL_LANGUAGES.forEach(lang => {
  if (!titles[lang]) {
    titles[lang] = { ...titles.english };
  }
});

const getVatRefund = (lang: string) => ({
  title: titles[lang].vatRefund,
  description: lang === 'english' ? "Look for 'VAT Refund for Tourists' signs. Min spend 2k THB." : titles[lang].vatRefund,
  link: "VAT Refund"
});

const getVisa = (lang: string) => ({
  title: titles[lang].visa,
  link: "Visa Rules",
  modalTitle: titles[lang].visa
});

const getMedical = (lang: string) => ({
  title: titles[lang].medical,
  chatTitle: titles[lang].medical,
  detailsTitle: titles[lang].medical,
  guideLink: titles[lang].medical,
  modalTitle: titles[lang].medical,
  suggestions: []
});

const getNightlife = (lang: string) => ({
  title: titles[lang].nightlife,
  chatTitle: titles[lang].nightlife,
  detailsTitle: titles[lang].nightlife,
  guideLink: titles[lang].nightlife,
  modalTitle: titles[lang].nightlife,
  suggestions: []
});

const getTravelTypes = (lang: string) => ({
  title: titles[lang].travelTypes,
  link: titles[lang].travelTypes,
  modalTitle: titles[lang].travelTypes
});

const getAccommodation = (lang: string) => ({
  title: titles[lang].accommodation,
  detailsTitle: titles[lang].accommodation,
  guideLink: titles[lang].accommodation,
  modalTitle: titles[lang].accommodation,
  suggestions: []
});

const getWeather = (lang: string) => ({
  title: titles[lang].weather,
  updateFrequency: "🔄",
  climate: "Thailand",
  alerts: "",
  tip: "",
  humidity: "Humidity",
  uvIndex: "UV Index",
  wind: "Wind",
  high: "High",
  alertsLabel: "Alerts",
  tipLabel: "Tip",
  timeSuffix: "ICT"
});

const getFood = (lang: string) => ({
  title: titles[lang].food,
  detailsTitle: titles[lang].food,
  guideLink: titles[lang].food,
  modalTitle: titles[lang].food,
  suggestions: []
});

const getShopping = (lang: string) => ({
  title: titles[lang].shopping,
  chatTitle: titles[lang].shopping,
  detailsTitle: titles[lang].shopping,
  guideLink: titles[lang].shopping,
  modalTitle: titles[lang].shopping,
  suggestions: []
});

let content = fs.readFileSync('src/i18n.ts', 'utf-8');

// Ensure ENGLISH_UI has the correct order
const englishSections = `
  visa: ${JSON.stringify(getVisa('english'), null, 4).replace(/\n/g, '\n  ')},
  medical: ${JSON.stringify(getMedical('english'), null, 4).replace(/\n/g, '\n  ')},
  nightlife: ${JSON.stringify(getNightlife('english'), null, 4).replace(/\n/g, '\n  ')},
  vatRefund: ${JSON.stringify(getVatRefund('english'), null, 4).replace(/\n/g, '\n  ')},
  travelTypes: ${JSON.stringify(getTravelTypes('english'), null, 4).replace(/\n/g, '\n  ')},
  accommodation: ${JSON.stringify(getAccommodation('english'), null, 4).replace(/\n/g, '\n  ')},
  weather: ${JSON.stringify(getWeather('english'), null, 4).replace(/\n/g, '\n  ')},
  food: ${JSON.stringify(getFood('english'), null, 4).replace(/\n/g, '\n  ')},
  shopping: ${JSON.stringify(getShopping('english'), null, 4).replace(/\n/g, '\n  ')},`;

const englishBookingIdx = content.indexOf('booking: {', content.indexOf('const ENGLISH_UI'));
const englishVatStart = content.indexOf('vatRefund: {', content.indexOf('const ENGLISH_UI'));

if (englishVatStart !== -1 && englishVatStart < englishBookingIdx) {
    content = content.slice(0, englishVatStart) + englishSections + content.slice(englishBookingIdx);
}

ALL_LANGUAGES.forEach(lang => {
    const langStart = content.search(new RegExp(`^\\s{2}${lang}: \\{`, 'm'));
    if (langStart === -1) return;
    
    const nextLangMatch = content.slice(langStart + 10).match(/^\s{2}[a-z]+: \{/m);
    const langEnd = nextLangMatch ? langStart + 10 + nextLangMatch.index! : content.lastIndexOf('};');
    
    let langBlock = content.slice(langStart, langEnd);
    
    // Update top level keys if provided
    ['emergency', 'touristPolice', 'assistance', 'contactNow', 'toolbox'].forEach(key => {
       const val = key === 'toolbox' ? '' : (titles[lang][key] || '');
       if (val !== undefined || key === 'toolbox') {
          const re = new RegExp(`^\\s{4}${key}: '.*?',?\\n?`, 'm');
          if (langBlock.match(re)) {
            langBlock = langBlock.replace(re, `    ${key}: '${val}',\n`);
          } else {
            // Find start of object to insert
            const insertIdx = langBlock.indexOf('{') + 1;
            langBlock = langBlock.slice(0, insertIdx) + `\n    ${key}: '${val}',` + langBlock.slice(insertIdx);
          }
       }
    });

    // Remove old sections
    const sections = ['vatRefund', 'visa', 'medical', 'nightlife', 'travelTypes', 'accommodation', 'weather', 'food', 'shopping'];
    sections.forEach(sec => {
        const re = new RegExp(`^\\s{4}${sec}: \\{[\\s\\S]*?^\\s{4}\\},?\\n?`, 'm');
        langBlock = langBlock.replace(re, '');
    });

    const bookingIdx = langBlock.indexOf('booking: {');
    if (bookingIdx !== -1) {
        const langSections = `
    visa: ${JSON.stringify(getVisa(lang), null, 8).replace(/\n/g, '\n    ').slice(0, -4)},
    medical: ${JSON.stringify(getMedical(lang), null, 8).replace(/\n/g, '\n    ').slice(0, -4)},
    nightlife: ${JSON.stringify(getNightlife(lang), null, 8).replace(/\n/g, '\n    ').slice(0, -4)},
    vatRefund: ${JSON.stringify(getVatRefund(lang), null, 8).replace(/\n/g, '\n    ').slice(0, -4)},
    travelTypes: ${JSON.stringify(getTravelTypes(lang), null, 8).replace(/\n/g, '\n    ').slice(0, -4)},
    accommodation: ${JSON.stringify(getAccommodation(lang), null, 8).replace(/\n/g, '\n    ').slice(0, -4)},
    weather: ${JSON.stringify(getWeather(lang), null, 8).replace(/\n/g, '\n    ').slice(0, -4)},
    food: ${JSON.stringify(getFood(lang), null, 8).replace(/\n/g, '\n    ').slice(0, -4)},
    shopping: ${JSON.stringify(getShopping(lang), null, 8).replace(/\n/g, '\n    ').slice(0, -4)},\n    `;
        langBlock = langBlock.slice(0, bookingIdx) + langSections + langBlock.slice(bookingIdx);
    }
    
    content = content.slice(0, langStart) + langBlock + content.slice(langEnd);
});

fs.writeFileSync('src/i18n.ts', content);
