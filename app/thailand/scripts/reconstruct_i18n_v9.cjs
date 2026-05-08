const fs = require('fs');

const path = './src/i18n.ts';
const content = fs.readFileSync(path, 'utf8');

// Capture English
const englishStart = content.indexOf('const ENGLISH_UI = {');
const englishEnd = content.indexOf('};', englishStart) + 2;
const englishStr = content.substring(englishStart, englishEnd).replace('const ENGLISH_UI = ', '').trim();
const ENGLISH_UI = eval('(' + (englishStr.endsWith(';') ? englishStr.slice(0, -1) : englishStr) + ')');

const TIER1_LANGS = ['english', 'myanmar', 'thai', 'spanish', 'german', 'french'];

const languages = [
  'myanmar', 'thai', 'spanish', 'german', 'french', 
  'chinese', 'japanese', 'korean', 'russian', 'italian', 
  'portuguese', 'hebrew', 'arabic', 'hindi', 'vietnamese', 
  'indonesian', 'malay', 'filipino', 'bengali', 'dutch', 
  'polish', 'turkish', 'swedish', 'romanian', 'farsi'
];

const header = content.substring(0, content.indexOf('export const UI_TRANSLATIONS'));
let output = header + 'export const UI_TRANSLATIONS: Record<ThaiLanguage, typeof ENGLISH_UI> = {\n';
output += '  english: ENGLISH_UI,\n';

const customTranslations = {
    myanmar: {
        chat: {
            welcome: "Sawasdee khrap. AsiaBuddy.app မှ ThaiGuide ပါ။ ဘာများကူညီပေးရမလဲ။",
            placeholder: "ခရီးသွားနှင့်ပတ်သက်သော သီးသန့် မေးခွန်းများမေးပါ။",
            title: "Thai Concierge",
            status: "Service Mind • Professional Guidance",
            hint: "ဘုရားကျောင်းများ၊ အစားအသောက် သို့မဟုတ် လမ်းပန်းဆက်သွယ်ရေးအကြောင်း မေးမြန်းပါ။"
        },
        start: "စတင်ပါ",
        explore: "ရှာဖွေစူးစမ်းခြင်း",
        concierge: "ဝန်ဆောင်မှုအဖွဲ့",
        menuCategories: {
            "travel": "ခရီးစဉ်စီစဉ်ခြင်း",
            "guides": "အဓိကလမ်းညွှันများ",
            "transport": "သယ်ယူပို့ဆောင်ရေး",
            "essentialApps": "အဓိက အက်ပ်များ",
            "tools": "ခရီးသွားကိရိယာများ"
        }
    },
    thai: {
        chat: {
            welcome: "สวัสดีครับ ThaiGuide จาก AsiaBuddy.app ยินดีให้บริการครับ มีอะไรให้ช่วยไหมครับ?",
            placeholder: "สอบถามข้อมูลการท่องเที่ยวไทย...",
            title: "บริการคอนเซียร์จ",
            status: "Service Mind • การดูแลระดับมืออาชีพ",
            hint: "ถามเกี่ยวกับวัด ร้านอาหาร หรือการเดินทาง"
        },
        start: "เริ่ม",
        explore: "สำรวจ",
        concierge: "คอนเซียร์จ",
        menuCategories: {
            "travel": "การวางแผนท่องเที่ยว",
            "guides": "คู่มือที่จำเป็น",
            "transport": "การเดินทาง",
            "essentialApps": "แอปที่จำเป็น",
            "tools": "เครื่องมือเดินทาง"
        }
    },
    spanish: {
        chat: {
            welcome: "Sawasdee khrap. Soy ThaiGuide de AsiaBuddy.app. ¿En qué puedo ayudarte hoy?",
            placeholder: "Pregunta cualquier cosa sobre Tailandia...",
            title: "Conserje Tailandés",
            status: "Service Mind • Guía Profesional",
            hint: "Pregunta sobre templos, comida o transporte"
        },
        start: "Comenzar",
        explore: "Explorar",
        concierge: "Conserje",
        menuCategories: {
            "travel": "Planificación de viajes",
            "guides": "Guías esenciales",
            "transport": "Transporte",
            "essentialApps": "Apps esenciales",
            "tools": "Herramientas de viaje"
        }
    },
    german: {
        chat: {
            welcome: "Sawasdee khrap. Ich bin ThaiGuide von AsiaBuddy.app. Wie kann ich Ihnen heute helfen?",
            placeholder: "Fragen Sie alles über Thailand...",
            title: "Thai Concierge",
            status: "Service Mind • Professionelle Beratung",
            hint: "Fragen Sie nach Tempeln, Essen oder Logistik"
        },
        start: "Starten",
        explore: "Erkunden",
        concierge: "Concierge",
        menuCategories: {
            "travel": "Reiseplanung",
            "guides": "Wichtige Leitfäden",
            "transport": "Transport",
            "essentialApps": "Wichtige Apps",
            "tools": "Reise-Tools"
        }
    },
    french: {
        chat: {
            welcome: "Sawasdee khrap. Je suis ThaiGuide d'AsiaBuddy.app. Comment puis-je vous aider aujourd'hui ?",
            placeholder: "Posez vos questions sur la Thaïlande...",
            title: "Concierge Thaïlandais",
            status: "Service Mind • Guide Professionnel",
            hint: "Questions sur les temples, la cuisine ou les transports"
        },
        start: "Démarrer",
        explore: "Explorer",
        concierge: "Concierge",
        menuCategories: {
            "travel": "Planification de voyage",
            "guides": "Guides essentiels",
            "transport": "Transport",
            "essentialApps": "Apps essentielles",
            "tools": "Outils de voyage"
        }
    }
};

for (const lang of languages) {
    let langObj = JSON.parse(JSON.stringify(ENGLISH_UI));
    
    if (TIER1_LANGS.includes(lang)) {
        if (customTranslations[lang]) {
            Object.keys(customTranslations[lang]).forEach(key => {
                if (typeof customTranslations[lang][key] === 'object' && !Array.isArray(customTranslations[lang][key])) {
                    langObj[key] = { ...langObj[key], ...customTranslations[lang][key] };
                } else {
                    langObj[key] = customTranslations[lang][key];
                }
            });
        }
    } else {
        // Tier 2 - Coming Soon
        const comingSoon = "Coming Soon";
        langObj.chat.welcome = "We are currently perfecting the experience for our six core languages to ensure top-tier quality. This language is coming soon — thank you for your patience!";
        langObj.chat.placeholder = comingSoon;
        langObj.chat.title = comingSoon;
        langObj.chat.status = comingSoon;
        langObj.chat.hint = "Under optimization";
        langObj.start = comingSoon;
        langObj.explore = comingSoon;
        langObj.concierge = comingSoon;
        langObj.hero = comingSoon;
        langObj.heroSub = comingSoon;
        langObj.emergency = comingSoon;
    }

    output += `  ${lang}: ${JSON.stringify(langObj, null, 2)},\n`;
}

output += '};\n';
fs.writeFileSync(path, output);
console.log('Fixed i18n.ts with absolute Tier 1/2 logic and custom strings');
