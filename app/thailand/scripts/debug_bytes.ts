import fs from 'fs';
const buf = fs.readFileSync('src/data/generalInformation.ts');
// Find the Chinese end markers
const searchStr = '时尚装扮或纹身。*`,';
const searchBuf = Buffer.from(searchStr, 'utf8');
const index = buf.indexOf(searchBuf);

if (index !== -1) {
    console.log('Found marker at byte:', index);
    const context = buf.slice(index, index + 200);
    console.log('Hex dump of 200 bytes starting from marker:');
    for (let i = 0; i < context.length; i++) {
        process.stdout.write(context[i].toString(16).padStart(2, '0') + ' ');
        if ((i + 1) % 16 === 0) console.log();
    }
    console.log();
    console.log('Raw string around marker (escaped):');
    console.log(JSON.stringify(context.toString('utf8')));
} else {
    console.log('Marker not found');
}
