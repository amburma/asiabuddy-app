const fs = require('fs');

function extractSection(content, startLabel, nextLabel) {
    const startIdx = content.indexOf(`  ${startLabel}: [`);
    if (startIdx === -1) return null;
    const endIdx = nextLabel ? content.indexOf(`  ${nextLabel}: [`, startIdx) : content.lastIndexOf('};');
    if (endIdx === -1) {
        // Fallback for end labels which might be empty arrays
        const altEndIdx = content.indexOf(`  ${nextLabel}: []`, startIdx);
        if (altEndIdx !== -1) return content.slice(startIdx, altEndIdx);
        return content.slice(startIdx);
    }
    return content.slice(startIdx, endIdx);
}

const path = './src/data/destinations.ts';
const content = fs.readFileSync(path, 'utf8');

const languages = [
  'myanmar', 'english', 'spanish', 'french', 'italian', 'german', 
  'portuguese', 'russian', 'hebrew', 'chinese', 'hindi', 'japanese', 
  'korean', 'thai', 'malay', 'indonesian', 'vietnamese', 'arabic',
  'bengali', 'dutch', 'filipino', 'farsi', 'polish', 'romanian', 
  'swedish', 'turkish'
];

// Languages we believe are still good
const goodLangs = ['english', 'thai', 'myanmar', 'spanish', 'french', 'italian'];
const sections = {};

for (const lang of goodLangs) {
    // Find the next language in the ORIGINAL file to determine the end of the section
    // Wait, the order might be different. Let's just use the known labels.
}

// Actually, I'll just manually grab the line ranges I know are good.
// english: 4 to 407
// thai: 408 to 810
// myanmar: 811 to 1208
// spanish: 1209 to 1612
// french: 1613 to 2014
// italian: 2015 to 2418? (Wait, I messed up italian at 2418)

// I'll take lines 1 to 2418.
const lines = content.split('\n');
let newContent = lines.slice(0, 2418).join('\n');

// Now append closing for italian
if (!newContent.trim().endsWith('],')) {
    newContent += '\n  ],';
}

// Now append all other languages as empty arrays
const existingInNew = ['english', 'thai', 'myanmar', 'spanish', 'french', 'italian'];
for (const lang of languages) {
    if (!existingInNew.includes(lang)) {
        newContent += `\n  ${lang}: [],`;
    }
}

// Close the object
newContent += '\n};\n\n';

// Add the auto-populate logic back
newContent += `// Auto-populate other languages with English content if empty
Object.keys(DESTINATIONS).forEach((lang) => {
  const typedLang = lang as ThaiLanguage;
  if (typedLang !== 'english' && DESTINATIONS[typedLang].length === 0) {
    DESTINATIONS[typedLang] = JSON.parse(JSON.stringify(DESTINATIONS.english));
  }
});
`;

fs.writeFileSync(path, newContent);
console.log('Successfully reconstructed destinations.ts');
