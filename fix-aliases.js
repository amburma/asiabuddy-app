const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SCAN_DIRS = ['app', 'components', 'lib', 'data', 'types'];
const EXTENSIONS = ['.ts', '.tsx'];
const ALIAS_REGEX = /(from\s+|import\s*\(\s*)(['"])@\/([^'"]+)\2/g;

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.next') continue;
      walk(full, files);
    } else if (EXTENSIONS.includes(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

function toRelative(fromFile, aliasTarget) {
  const fromDir = path.dirname(fromFile);
  const targetPath = path.resolve(ROOT, aliasTarget);
  let rel = path.relative(fromDir, targetPath).split(path.sep).join('/');
  if (!rel.startsWith('.')) rel = './' + rel;
  return rel;
}

let totalFiles = 0;
let totalReplacements = 0;

for (const dir of SCAN_DIRS) {
  const dirPath = path.join(ROOT, dir);
  if (!fs.existsSync(dirPath)) continue;
  const files = walk(dirPath);
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    let changed = false;
    const newContent = content.replace(ALIAS_REGEX, (match, prefix, quote, aliasPath) => {
      changed = true;
      totalReplacements++;
      const relPath = toRelative(file, aliasPath);
      return `${prefix}${quote}${relPath}${quote}`;
    });
    if (changed) {
      fs.writeFileSync(file, newContent, 'utf8');
      totalFiles++;
      console.log('Updated:', path.relative(ROOT, file));
    }
  }
}

console.log(`\nDone. ${totalReplacements} import(s) fixed across ${totalFiles} file(s).`);
