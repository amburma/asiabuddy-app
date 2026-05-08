const fs = require('fs');
const path = './src/data/destinations.ts';
let content = fs.readFileSync(path, 'utf8');

const anchor = "import { Destination, ThaiLanguage } from '../types';";
const firstOccurrence = content.indexOf(anchor);
const secondOccurrence = content.indexOf(anchor, firstOccurrence + 1);

if (secondOccurrence !== -1) {
    // We want to keep everything BEFORE secondOccurrence
    // But we need to make sure we close the object.
    const cleanContent = content.substring(0, secondOccurrence).trim();
    // Ensure it ends with };
    if (!cleanContent.endsWith('};')) {
        // Find the last }, and replace it with };
        const lastBrace = cleanContent.lastIndexOf('}');
        const finalContent = cleanContent.substring(0, lastBrace + 1) + ';';
        fs.writeFileSync(path, finalContent);
    } else {
        fs.writeFileSync(path, cleanContent);
    }
    console.log('Sliced destinations.ts at second occurrence of imports');
} else {
    console.log('Could not find second occurrence of imports');
}
