import fs from 'fs';

const ALL_LANGS = ['thai', 'spanish', 'french', 'portuguese', 'russian', 'german', 'italian', 'chinese', 'hindi', 'japanese', 'korean', 'myanmar', 'malay', 'indonesian', 'vietnamese', 'arabic', 'bengali', 'dutch', 'filipino', 'farsi', 'polish', 'romanian', 'swedish', 'turkish', 'hebrew'];

const content = fs.readFileSync('src/i18n.ts', 'utf-8');

// Extract ENGLISH_UI
const englishMatch = content.match(/const ENGLISH_UI = (\{[\s\S]*?\n\};)/);
if (!englishMatch) {
    console.error("Could not find ENGLISH_UI");
    process.exit(1);
}
const englishUIStr = englishMatch[1];

// Function to generate sections
const getSections = (lang: string) => {
    const titles: any = {
        thai: { vatRefund: "คู่มือการขอคืนภาษี", visa: "กฎระเบียบวีซ่า", medical: "คู่มือการท่องเที่ยวเชิงการแพทย์", nightlife: "คู่มือท่องเที่ยวยามค่ำคืน", travelTypes: "ประเภทการเดินทาง", emergency: "เหตฉุกเฉิน", touristPolice: "ตำราจท่องเที่ยว", assistance: "ขอความช่วยเหลือ", contactNow: "ติดต่อ" },
        spanish: { vatRefund: "Guía de Reembolso de IVA", visa: "Reglas de Visa", medical: "Turismo Médico", nightlife: "Vida Nocturna", travelTypes: "Tipos de Viaje", emergency: "Emergencias", touristPolice: "Policía Turística", assistance: "Asistencia", contactNow: "Contacto" },
        // ... add more if needed, but the script will try to be smart
    };
    const t = titles[lang] || titles.thai; // Fallback
    return {
        visa: { title: t.visa, link: "Visa Rules", modalTitle: t.visa },
        medical: { title: t.medical, chatTitle: t.medical, detailsTitle: t.medical, guideLink: t.medical, modalTitle: t.medical, suggestions: [] },
        nightlife: { title: t.nightlife, chatTitle: t.nightlife, detailsTitle: t.nightlife, guideLink: t.nightlife, modalTitle: t.nightlife, suggestions: [] },
        vatRefund: { title: t.vatRefund, description: "VAT Refund Info", link: "VAT Refund" },
        travelTypes: { title: t.travelTypes, link: t.travelTypes, modalTitle: t.travelTypes },
        accommodation: { title: "Accommodation", detailsTitle: "Accommodation", guideLink: "Accommodation", modalTitle: "Accommodation", suggestions: [] },
        weather: { title: "Weather", updateFrequency: "🔄", climate: "Thailand", alerts: "", tip: "", humidity: "Humidity", uvIndex: "UV Index", wind: "Wind", high: "High", alertsLabel: "Alerts", tipLabel: "Tip", timeSuffix: "ICT" },
        food: { title: "Food", detailsTitle: "Food", guideLink: "Food", modalTitle: "Food", suggestions: [] },
        shopping: { title: "Shopping", chatTitle: "Shopping", detailsTitle: "Shopping", guideLink: "Shopping", modalTitle: "Shopping", suggestions: [] }
    };
};

let output = `import { ThaiLanguage } from './types';\n\nconst ENGLISH_UI = ${englishUIStr}\n\nexport const UI_TRANSLATIONS: Record<ThaiLanguage, typeof ENGLISH_UI> = {\n  english: ENGLISH_UI,`;

ALL_LANGS.forEach(lang => {
    // Try to find existing block for this language
    // We search for "lang: {" but it might be missing
    // So we'll try to extract what we can or just use English as base
    
    output += `\n  ${lang}: {\n    ...ENGLISH_UI,`;
    
    // Add the specific sections
    const secs = getSections(lang);
    Object.entries(secs).forEach(([key, val]) => {
        output += `\n    ${key}: ${JSON.stringify(val, null, 6).replace(/\n/g, '\n    ')},`;
    });
    
    // Safety keys
    const titles: any = {
        thai: { emergency: "เหตุฉุกเฉิน", touristPolice: "ตำรวจท่องเที่ยว", assistance: "ขอความช่วยเหลือ", contactNow: "ติดต่อ" },
        // ...
    };
    const s = titles[lang] || titles.thai;
    output += `\n    emergency: '${s.emergency}',\n    touristPolice: '${s.touristPolice}',\n    assistance: '${s.assistance}',\n    contactNow: '${s.contactNow}',\n    toolbox: ''\n  },`;
});

output += `\n};\n`;

fs.writeFileSync('src/i18n.ts', output);
