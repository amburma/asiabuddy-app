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

function flatten(obj, prefix = '') {
    let results = {};
    for (let k in obj) {
        if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
            Object.assign(results, flatten(obj[k], prefix + k + '.'));
        } else {
            results[prefix + k] = obj[k];
        }
    }
    return results;
}

const flatEnglish = flatten(ENGLISH_UI);

function getLanguageBlock(lang) {
    const startPattern = `  ${lang}: {`;
    const startIdx = content.indexOf(startPattern);
    if (startIdx === -1) return null;
    
    // Find next language or end of object
    let nextStartIdx = content.length;
    for (const l of languages) {
        if (l === lang) continue;
        const lIdx = content.indexOf(`  ${l}: {`, startIdx + 10);
        if (lIdx !== -1 && lIdx < nextStartIdx) nextStartIdx = lIdx;
    }
    const endIdx = content.indexOf('};', startIdx + 10);
    if (endIdx !== -1 && endIdx < nextStartIdx) nextStartIdx = endIdx;
    
    return content.substring(startIdx, nextStartIdx);
}

function findValue(block, keyPath) {
    const parts = keyPath.split('.');
    const lastKey = parts[parts.length - 1];
    
    // Search for "key": value in the block
    // We use a regex that handles strings, arrays, and objects (roughly)
    const regex = new RegExp(`"${lastKey}"\\s*:\\s*([^\\n,]+)`, 'm');
    const match = block.match(regex);
    if (match) {
        let val = match[1].trim();
        // If it's a string, it might have been truncated by the regex
        if (val.startsWith('"')) {
            const strRegex = new RegExp(`"${lastKey}"\\s*:\\s*("(?:[^"\\\\]|\\\\.)*")`, 'm');
            const strMatch = block.match(strRegex);
            if (strMatch) return strMatch[1];
        }
        // If it's an array
        if (val.startsWith('[')) {
            let braceCount = 0;
            let arrayStr = '';
            const startIdx = block.indexOf('[', block.indexOf(`"${lastKey}"`));
            for (let i = startIdx; i < block.length; i++) {
                if (block[i] === '[') braceCount++;
                if (block[i] === ']') braceCount--;
                arrayStr += block[i];
                if (braceCount === 0) break;
            }
            return arrayStr;
        }
        return val;
    }
    return null;
}

function reconstruct(obj, langBlock, prefix = '') {
    let newObj = {};
    for (let k in obj) {
        const fullKey = prefix + k;
        if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
            newObj[k] = reconstruct(obj[k], langBlock, fullKey + '.');
        } else {
            const found = findValue(langBlock, fullKey);
            let val = null;
            if (found) {
                try {
                    val = eval('(' + found + ')');
                } catch (e) {
                    val = null;
                }
            }
            
            // Type validation: if it was an array in English, it MUST be an array here
            if (Array.isArray(obj[k])) {
                if (Array.isArray(val)) {
                    newObj[k] = val;
                } else {
                    newObj[k] = obj[k]; // Fallback to English
                }
            } else if (typeof obj[k] === 'string') {
                if (typeof val === 'string') {
                    newObj[k] = val;
                } else {
                    newObj[k] = obj[k]; // Fallback to English
                }
            } else {
                newObj[k] = val !== null ? val : obj[k];
            }
        }
    }
    return newObj;
}

const header = content.substring(0, content.indexOf('export const UI_TRANSLATIONS'));
let finalOutput = header + 'export const UI_TRANSLATIONS: Record<ThaiLanguage, typeof ENGLISH_UI> = {\n';
finalOutput += '  english: ENGLISH_UI,\n';

for (const lang of languages) {
    const block = getLanguageBlock(lang);
    if (!block) {
        finalOutput += `  ${lang}: ENGLISH_UI,\n`;
        continue;
    }
    const langObj = reconstruct(ENGLISH_UI, block);
    
    // Hardcode some fixes for ThaiGuide requirements
    if (lang === 'myanmar') {
        langObj.chat.placeholder = "Please ask specific questions related to travel.";
    }
    langObj.chat.welcome = "Sawasdee khrap. I'm ThaiGuide from AsiaBuddy.app. How may I assist you today?";
    
    finalOutput += `  ${lang}: ${JSON.stringify(langObj, null, 4)},\n`;
}

finalOutput += '};\n';
fs.writeFileSync(path, finalOutput);
console.log('Robustly reconstructed i18n.ts');
