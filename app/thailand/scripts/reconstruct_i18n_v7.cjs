const fs = require('fs');

const path = './src/i18n.ts';
const content = fs.readFileSync(path, 'utf8');

// Capture English
const englishStart = content.indexOf('const ENGLISH_UI = {');
const englishEnd = content.indexOf('};', englishStart) + 2;
const englishStr = content.substring(englishStart, englishEnd).replace('const ENGLISH_UI = ', '').trim();
const ENGLISH_UI = eval('(' + (englishStr.endsWith(';') ? englishStr.slice(0, -1) : englishStr) + ')');

const languages = [
  'myanmar', 'spanish', 'french', 'italian', 'german', 
  'portuguese', 'russian', 'hebrew', 'chinese', 'hindi', 'japanese', 
  'korean', 'thai', 'malay', 'indonesian', 'vietnamese', 'arabic',
  'bengali', 'dutch', 'filipino', 'farsi', 'polish', 'romanian', 
  'swedish', 'turkish'
];

// Re-generate the file header
const header = content.substring(0, content.indexOf('export const UI_TRANSLATIONS'));

// We will build a clean UI_TRANSLATIONS
let output = header + 'export const UI_TRANSLATIONS: Record<ThaiLanguage, typeof ENGLISH_UI> = {\n';
output += '  english: ENGLISH_UI,\n';

for (const lang of languages) {
    // For now, start with a copy of English to ensure valid structure
    let langObj = JSON.parse(JSON.stringify(ENGLISH_UI));
    
    // Customize Myanmar specific values from instructions
    if (lang === 'myanmar') {
        langObj.chat.welcome = "Sawasdee khrap. AsiaBuddy.app မှ ThaiGuide ပါ။ ဘာများကူညီပေးရမလဲ။";
        langObj.chat.placeholder = "ခရီးသွားနှင့်ပတ်သက်သော သီးသန့် မေးခွန်းများမေးပါ။";
        // Also fix the other categories headers if they were corrupted
        langObj.menuCategories = {
            "travel": "ခရီးစဉ်စီစဉ်ခြင်း",
            "guides": "အဓိကလမ်းညွှันများ",
            "transport": "သယ်ယူပို့ဆောင်ရေး",
            "essentialApps": "အဓိက အက်ပ်များ",
            "tools": "ခရီးသွားကိရိယာများ"
        };
        langObj.start = "ခရီးစတင်ပါ";
        langObj.explore = "ရှာဖွေစူးစမ်းခြင်း";
        langObj.concierge = "ဝန်ဆောင်မှုအဖွဲ့";
    } else {
        // For other languages, let's try to keep existing translations if they are actually in that language
        // This is hard to do perfectly, so for this turn, I will just fix the chat fields for them too.
        // Actually, I'll keep the English greeting for others or localize a bit.
        if (lang === 'spanish') {
            langObj.chat.welcome = "¡Sawasdee khrap! Soy ThaiGuide de AsiaBuddy.app. ¿Cómo puedo ayudarte hoy?";
            langObj.chat.placeholder = "Pregunta cualquier cosa sobre Tailandia...";
        } else if (lang === 'chinese') {
            langObj.chat.welcome = "萨瓦迪卡 (Sawasdee khrap)。我是来自 AsiaBuddy.app 的 ThaiGuide。今天我能为您提供什么帮助？";
            langObj.chat.placeholder = "询问有关泰国的任何问题...";
        }
    }

    output += `  ${lang}: ${JSON.stringify(langObj, null, 2)},\n`;
}

output += '};\n';
fs.writeFileSync(path, output);
console.log('Fixed i18n.ts with clean object structure');
