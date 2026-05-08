const fs = require('fs');
const path = './src/i18n.ts';
const content = fs.readFileSync(path, 'utf8');

// Capture English as master template
const englishStart = content.indexOf('const ENGLISH_UI');
const englishEnd = content.indexOf('};', englishStart) + 2;
const englishStr = content.substring(englishStart, englishEnd);

// We need to be able to get a proper object from this.
// Since it's a JS object literal, we can try to wrap it in a function and return it.
const getEnglish = new Function(englishStr + ' return ENGLISH_UI;');
const ENGLISH_UI = getEnglish();

const languages = [
  'english', 'myanmar', 'spanish', 'french', 'italian', 'german', 
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

const masterKeys = Object.keys(flatten(ENGLISH_UI));

// Function to extract a key's value from a language block string using regex
function getValue(block, keyPath) {
    const parts = keyPath.split('.');
    let currentBlock = block;
    let value = null;

    // This is hard to do with regex for deep objects.
    // Let's just try to find the key in the block.
    const lastKey = parts[parts.length - 1];
    const regex = new RegExp(`"${lastKey}"\\s*:\\s*(.*)`, 'm');
    const match = currentBlock.match(regex);
    if (match) {
        let valStr = match[1].trim();
        if (valStr.endsWith(',')) valStr = valStr.slice(0, -1);
        try {
            // Try to eval it
            return eval('(' + valStr + ')');
        } catch (e) {
            return null;
        }
    }
    return null;
}

// Re-capture header
const uiStartIdx = content.indexOf('export const UI_TRANSLATIONS');
const header = content.substring(0, uiStartIdx);

let output = header + 'export const UI_TRANSLATIONS: Record<ThaiLanguage, typeof ENGLISH_UI> = {\n';

for (const lang of languages) {
    if (lang === 'english') {
        output += '  english: ENGLISH_UI,\n';
        continue;
    }
    
    // Extract lang block
    const startPattern = `  ${lang}: {`;
    const startIdx = content.indexOf(startPattern);
    if (startIdx === -1) {
        output += `  ${lang}: ENGLISH_UI,\n`;
        continue;
    }
    
    // Find end of block by brace counting
    let braceCount = 0;
    let endIdx = -1;
    for (let i = startIdx; i < content.length; i++) {
        if (content[i] === '{') braceCount++;
        if (content[i] === '}') braceCount--;
        if (braceCount === 0) {
            endIdx = i;
            break;
        }
    }
    const block = content.substring(startIdx, endIdx + 1);
    
    // For now, let's just use the block but try to make sure it's valid.
    // If it was already broken, this won't help much if I just copy it.
    // But v4 was the one that broke it more.
    
    output += `  ${lang}: ${block},\n`;
}

output += '};\n';
fs.writeFileSync(path, output);
console.log('Re-reconstructed i18n.ts');
