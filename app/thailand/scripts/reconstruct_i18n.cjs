const fs = require('fs');

const languages = [
  'myanmar', 'english', 'spanish', 'french', 'italian', 'german', 
  'portuguese', 'russian', 'hebrew', 'chinese', 'hindi', 'japanese', 
  'korean', 'thai', 'malay', 'indonesian', 'vietnamese', 'arabic',
  'bengali', 'dutch', 'filipino', 'farsi', 'polish', 'romanian', 
  'swedish', 'turkish'
];

const path = './src/i18n.ts';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

// Capture everything before UI_TRANSLATIONS starts
const uiStartLine = 265; // up to line 265 (one before export const...)
let newContent = lines.slice(0, uiStartLine).join('\n') + '\n';

// I'll manually define which ranges to take for each language to be safe
// Based on the grep output
const ranges = [
    { lang: 'english', start: 267, end: 267 }, // Special case
    { lang: 'thai', start: 268, end: 529 },
    { lang: 'spanish', start: 530, end: 861 },
    { lang: 'french', start: 862, end: 1123 },
    { lang: 'portuguese', start: 1124, end: 1385 },
    { lang: 'russian', start: 1386, end: 1647 },
    { lang: 'german', start: 1648, end: 1909 },
    { lang: 'italian', start: 1910, end: 2171 },
    { lang: 'chinese', start: 2172, end: 2433 },
    { lang: 'hindi', start: 2434, end: 2695 },
    { lang: 'japanese', start: 2696, end: 2716 },
    { lang: 'myanmar', start: 2717, end: 2975 },
    { lang: 'korean', start: 2976, end: 3237 },
    // Skip 3238-3244 (Myanmar duplicate)
    // 3245-3519 (Indonesian duplicate?) -> Wait, 3520 is Malay.
    { lang: 'malay', start: 3520, end: 3782 },
    { lang: 'indonesian', start: 3783, end: 4044 },
    { lang: 'vietnamese', start: 4045, end: 4307 },
    { lang: 'arabic', start: 4308, end: 4570 },
    { lang: 'bengali', start: 4571, end: 4832 },
    { lang: 'dutch', start: 4833, end: 5093 },
    { lang: 'filipino', start: 5094, end: 5354 },
    { lang: 'farsi', start: 5355, end: 5615 },
    { lang: 'polish', start: 5616, end: 5876 },
    { lang: 'romanian', start: 5877, end: 6137 },
    { lang: 'swedish', start: 6138, end: 6398 },
    { lang: 'turkish', start: 6399, end: 6659 },
    { lang: 'hebrew', start: 6660, end: 6920 }
];

newContent += 'export const UI_TRANSLATIONS: Record<ThaiLanguage, typeof ENGLISH_UI> = {\n';

for (const r of ranges) {
    if (r.lang === 'english') {
        newContent += '  english: ENGLISH_UI,\n';
    } else {
        // Take lines and append
        const section = lines.slice(r.start - 1, r.end).join('\n');
        newContent += section + '\n';
        if (!section.trim().endsWith(',')) {
            newContent += ',\n';
        }
    }
}

// Check for missing languages and add them as English fallbacks
const included = ranges.map(r => r.lang);
for (const lang of languages) {
    if (!included.includes(lang)) {
        newContent += `  ${lang}: ENGLISH_UI,\n`;
    }
}

newContent += '};\n';

fs.writeFileSync(path, newContent);
console.log('Successfully reconstructed i18n.ts');
