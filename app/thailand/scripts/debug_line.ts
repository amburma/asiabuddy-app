import fs from 'fs';
const content = fs.readFileSync('src/data/generalInformation.ts', 'utf8');
const lines = content.split('\n');
const line = lines[630]; 
console.log(`Line 631 (length ${line.length}):`, line);
console.log(`Line 631 codes:`, line.split('').map(c => c.charCodeAt(0)).join(','));
