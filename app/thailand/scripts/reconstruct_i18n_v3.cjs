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

// We'll look for the FIRST occurrence of each language in the file
// to extract its content. This should handle duplicates by always taking the first one.

const uiStartLine = 266;
let newContent = lines.slice(0, uiStartLine - 1).join('\n') + '\n';
newContent += 'export const UI_TRANSLATIONS: Record<ThaiLanguage, typeof ENGLISH_UI> = {\n';

const included = [];

function getSection(lang) {
    const startPattern = `  ${lang}: {`;
    const altStartPattern = `  ${lang}: ENGLISH_UI,`;
    
    let startIdx = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith(startPattern) || lines[i].startsWith(altStartPattern)) {
            startIdx = i;
            break;
        }
    }
    
    if (startIdx === -1) return null;
    
    if (lines[startIdx].includes('ENGLISH_UI')) {
        return `  ${lang}: ENGLISH_UI,`;
    }
    
    // Find matching closing brace
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
    
    if (endIdx === -1) return null;
    
    let section = lines.slice(startIdx, endIdx + 1).join('\n').trim();
    if (!section.endsWith(',')) section += ',';
    return section;
}

// Special case for English
newContent += '  english: ENGLISH_UI,\n';
included.push('english');

for (const lang of languages) {
    if (lang === 'english') continue;
    
    const section = getSection(lang);
    // Check if section is "reasonable" (not just a few lines, unless it's a fallback)
    if (section && (section.split('\n').length > 50 || section.includes('ENGLISH_UI'))) {
        newContent += '  ' + section.trim() + '\n';
        included.push(lang);
    }
}

// Fallbacks for anything that failed
for (const lang of languages) {
    if (!included.includes(lang)) {
        newContent += `  ${lang}: ENGLISH_UI,\n`;
    }
}

newContent += '};\n';

fs.writeFileSync(path, newContent);
console.log('Successfully reconstructed i18n.ts using brace counting');
