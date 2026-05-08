const fs = require('fs');
const execSync = require('child_process').execSync;

const languages = [
  'myanmar', 'english', 'spanish', 'french', 'italian', 'german', 
  'portuguese', 'russian', 'hebrew', 'chinese', 'hindi', 'japanese', 
  'korean', 'thai', 'malay', 'indonesian', 'vietnamese', 'arabic',
  'bengali', 'dutch', 'filipino', 'farsi', 'polish', 'romanian', 
  'swedish', 'turkish'
];

const path = './src/i18n.ts';
const content = fs.readFileSync(path, 'utf8');
const linesArr = content.split('\n');

const grepOutput = execSync('grep -nE "^  [a-z]+: (\\{|ENGLISH_UI)" ' + path).toString();
const grepLines = grepOutput.trim().split('\n');

const foundLangs = grepLines.map(line => {
    const parts = line.split(':');
    const lineNum = parseInt(parts[0]);
    const lang = parts[1].trim().split(':')[0];
    return { lang, lineNum };
});

const ranges = [];
for (let i = 0; i < foundLangs.length; i++) {
    const start = foundLangs[i].lineNum;
    let end;
    if (i < foundLangs.length - 1) {
        end = foundLangs[i+1].lineNum - 1;
    } else {
        end = linesArr.length;
        for (let j = start; j < linesArr.length; j++) {
            if (linesArr[j].trim().startsWith('};')) {
                end = j;
                break;
            }
        }
    }
    
    const length = end - start + 1;
    // Japanese is definitely broken (21 lines)
    if (foundLangs[i].lang !== 'japanese' && length > 50) {
        ranges.push({ lang: foundLangs[i].lang, start, end });
    }
}

const uiStartLine = 266; 
let newContent = linesArr.slice(0, uiStartLine - 1).join('\n') + '\n';
newContent += 'export const UI_TRANSLATIONS: Record<ThaiLanguage, typeof ENGLISH_UI> = {\n';

const included = [];
for (const r of ranges) {
    if (r.lang === 'english') {
        newContent += '  english: ENGLISH_UI,\n';
        included.push('english');
    } else {
        let section = linesArr.slice(r.start - 1, r.end).join('\n').trim();
        // If the section ends with }; swap it for },
        if (section.endsWith('};')) {
            section = section.replace(/};\s*$/, '},');
        }
        // If it doesn't end with a comma, add it
        if (!section.endsWith(',')) {
            section += ',';
        }
        newContent += '  ' + section + '\n';
        included.push(r.lang);
    }
}

for (const lang of languages) {
    if (!included.includes(lang)) {
        newContent += `  ${lang}: ENGLISH_UI,\n`;
    }
}

newContent += '};\n';

fs.writeFileSync(path, newContent);
console.log('Successfully reconstructed i18n.ts');
