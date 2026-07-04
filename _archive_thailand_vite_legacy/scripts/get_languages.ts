import fs from 'fs';
const content = fs.readFileSync('src/i18n.ts', 'utf-8');
const matches = content.match(/^\s{2}([a-z]+): \{/gm);
if (matches) {
    const keys = matches.map(m => m.trim().replace(': {', ''));
    console.log(JSON.stringify(keys));
} else {
    console.log("No matches found");
}
