const fs = require('fs');
const path = './src/i18n.ts';
let content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

const standardPlaceholder = '"placeholder": "Ask anything about Thailand..."';
const burmesePlaceholder = '"placeholder": "Please ask specific questions related to travel."';

let currentLang = '';
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect language section
    const match = line.match(/^\s+([a-z]+): \{/);
    if (match) {
        currentLang = match[1];
    }
    
    // If it's a chat placeholder
    if (line.includes('"placeholder":')) {
        if (currentLang === 'myanmar') {
            lines[i] = line.split(standardPlaceholder).join(burmesePlaceholder);
        } else if (currentLang !== 'english' && currentLang !== '') {
            // Revert others if they were changed
            lines[i] = line.split(burmesePlaceholder).join(standardPlaceholder);
        }
    }
}

fs.writeFileSync(path, lines.join('\n'));
console.log('Successfully corrected placeholders in i18n.ts');
