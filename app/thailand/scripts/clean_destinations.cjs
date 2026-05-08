const fs = require('fs');
const path = './src/data/destinations.ts';
let content = fs.readFileSync(path, 'utf8');

// The file should start with imports
const startIdx = content.indexOf('import { Destination, ThaiLanguage }');
const endIdx = content.indexOf('};', startIdx + 100);

if (startIdx !== -1 && endIdx !== -1) {
    const cleanContent = content.substring(startIdx, endIdx + 2);
    fs.writeFileSync(path, cleanContent);
    console.log('Cleaned destinations.ts');
} else {
    console.log('Could not find boundaries for destinations.ts');
}
