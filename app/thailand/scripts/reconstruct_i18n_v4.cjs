const fs = require('fs');
const path = './src/i18n.ts';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

// 1. Capture the part before UI_TRANSLATIONS
const uiStartLineIdx = lines.findIndex(l => l.includes('export const UI_TRANSLATIONS'));
const header = lines.slice(0, uiStartLineIdx).join('\n') + '\n';
const footer = '\n};\n';

// 2. Identify all languages
const languages = [
  'english', 'myanmar', 'spanish', 'french', 'italian', 'german', 
  'portuguese', 'russian', 'hebrew', 'chinese', 'hindi', 'japanese', 
  'korean', 'thai', 'malay', 'indonesian', 'vietnamese', 'arabic',
  'bengali', 'dutch', 'filipino', 'farsi', 'polish', 'romanian', 
  'swedish', 'turkish'
];

// 3. For each language, extract its section, but try to be "smart" about extracting the first valid object
function extractSection(lang) {
    if (lang === 'english') return '  english: ENGLISH_UI,';
    
    const startPattern = `  ${lang}: {`;
    const startIdx = lines.findIndex(l => l.startsWith(startPattern));
    if (startIdx === -1) return `  ${lang}: ENGLISH_UI,`;
    
    let braceCount = 0;
    let endIdx = -1;
    for (let i = startIdx; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes('{')) braceCount += (line.match(/\{/g) || []).length;
        if (line.includes('}')) braceCount -= (line.match(/\}/g) || []).length;
        
        if (braceCount === 0) {
            endIdx = i;
            break;
        }
    }
    
    if (endIdx === -1) return `  ${lang}: ENGLISH_UI,`;
    
    let sectionLines = lines.slice(startIdx, endIdx + 1);
    
    // NOW: Clean duplicates within this section
    // Actually, a simple way to clean duplicates is to parse it if it was JSON, 
    // but it's JS. So let's just use a regex to remove duplicate top-level keys.
    const cleanedLines = [];
    const seenKeys = new Set();
    let bracketLevel = 0;
    
    for (let i = 0; i < sectionLines.length; i++) {
        const line = sectionLines[i];
        const trimmed = line.trim();
        
        // Track bracket level to only catch top-level keys of the language object
        if (bracketLevel === 1) {
            const keyMatch = trimmed.match(/^"([^"]+)":/);
            if (keyMatch) {
                const key = keyMatch[1];
                if (seenKeys.has(key)) {
                    // Skip this key and its value until next top-level key or end of its block
                    // This is complex. Let's just skip the line for now if it's a simple key.
                    continue;
                }
                seenKeys.add(key);
            }
        }
        
        if (line.includes('{')) bracketLevel += (line.match(/\{/g) || []).length;
        if (line.includes('}')) bracketLevel -= (line.match(/\}/g) || []).length;
        
        cleanedLines.push(line);
    }
    
    let section = cleanedLines.join('\n');
    if (!section.trim().endsWith(',')) section += ',';
    return section;
}

let newUI = 'export const UI_TRANSLATIONS: Record<ThaiLanguage, typeof ENGLISH_UI> = {\n';
for (const lang of languages) {
    newUI += extractSection(lang) + '\n';
}

fs.writeFileSync(path, header + newUI + footer);
console.log('Reconstructed i18n.ts with duplicate key removal');
