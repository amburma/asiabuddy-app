import fs from 'fs';

let content = fs.readFileSync('src/i18n.ts', 'utf-8');

// Fix the "  ," to "    },"
content = content.replace(/  ,$/gm, '    },');

// Fix missing commas between sections if needed? 
// Actually the main error was TS1005: ',' expected at the end.

// Let's check the end of the file
if (!content.trim().endsWith('};')) {
    content = content.trim() + '\n};';
}

fs.writeFileSync('src/i18n.ts', content);
