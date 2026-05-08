const fs = require('fs');
const path = './src/i18n.ts';
let content = fs.readFileSync(path, 'utf8');

const oldWelcome = '"welcome": "\\"Sawasdee khrap. How can I assist your Thai journey today?\\""';
const newWelcome = '"welcome": "\\"Sawasdee khrap. I\'m ThaiGuide from AsiaBuddy.app. How may I assist you today?\\""';

content = content.split(oldWelcome).join(newWelcome);

const lines = content.split('\n');
// We want to find the placeholder in the myanmar section
let inMyanmar = false;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('myanmar: {')) inMyanmar = true;
    if (inMyanmar && lines[i].includes('}:')) inMyanmar = false; // End of section
    
    if (inMyanmar && lines[i].includes('"placeholder": "Ask anything about Thailand..."')) {
        lines[i] = lines[i].replace('"placeholder": "Ask anything about Thailand..."', '"placeholder": "Please ask specific questions related to travel."');
    }
}

fs.writeFileSync(path, lines.join('\n'));
console.log('Successfully updated i18n.ts');
