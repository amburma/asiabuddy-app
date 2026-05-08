const fs = require('fs');
const path = './src/i18n.ts';
let lines = fs.readFileSync(path, 'utf8').split('\n');

// Line 3242 is index 3241
console.log('Line 3242 was:', lines[3241]);
lines[3241] = '          "guides": "အဓိကလမ်းညွှန်များ"';
lines.splice(3242, 0, '      },', '  },', '  indonesian: {');

fs.writeFileSync(path, lines.join('\n'));
console.log('Fixed line 3242 in i18n.ts');
