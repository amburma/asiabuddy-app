const fs = require('fs');
const path = require('path');

const base64Path = path.join(__dirname, 'NotoSansMyanmar-Regular.base64.txt');
const outputPath = path.join(__dirname, 'notoSansMyanmarBase64.ts');

const base64Content = fs.readFileSync(base64Path, 'utf-8').trim();

const tsContent = `// Noto Sans Myanmar font (Regular weight)
// Source: Google Fonts - https://fonts.google.com/noto/specimen/Noto+Sans+Myanmar
// License: SIL Open Font License (OFL-1.1) - https://scripts.sil.org/OFL
// Downloaded from: https://github.com/google/fonts/raw/main/ofl/notosansmyanmar/NotoSansMyanmar%5Bwdth%2Cwght%5D.ttf

// Base64 string embedded directly - no runtime file reading required for Next.js build
export const notoSansMyanmarBase64 = "${base64Content}";
`;

fs.writeFileSync(outputPath, tsContent, 'utf-8');

console.log('Font base64 embedded successfully in notoSansMyanmarBase64.ts');
console.log(`Base64 length: ${base64Content.length}`);
