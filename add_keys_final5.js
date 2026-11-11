const fs = require('fs');

const keysData = JSON.parse(fs.readFileSync('new_i18n_keys.json', 'utf8'));

let content = fs.readFileSync('src/js/translations.js', 'utf8');
let lines = content.split('\n');

// Find insertion points
let enInsertLine = -1;
let bnInsertLine = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('prog_priority_badge: "Priority"') && enInsertLine === -1) {
    enInsertLine = i;
  }
  if (lines[i].includes('prog_priority_badge: "অগ্রাধিকার"') && bnInsertLine === -1) {
    bnInsertLine = i;
  }
}

console.log('EN insert after line:', enInsertLine + 1);
console.log('BN insert after line:', bnInsertLine + 1);

let enAdditions = '';
let bnAdditions = '';

Object.entries(keysData).forEach(([key, val]) => {
  const enText = val.en;
  const bnText = enText; // fallback to English
  const quotedKey = /^\d/.test(key) ? `"${key}"` : key;
  // Escape backslashes, double quotes, and replace non-ASCII with \uXXXX
  const enEscaped = enText.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/[^\x00-\x7F]/g, ch => '\\u' + ch.codePointAt(0).toString(16).padStart(4, '0'));
  const bnEscaped = bnText.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/[^\x00-\x7F]/g, ch => '\\u' + ch.codePointAt(0).toString(16).padStart(4, '0'));
  enAdditions += `    ${quotedKey}: "${enEscaped}",\n`;
  bnAdditions += `    ${quotedKey}: "${bnEscaped}",\n`;
});

lines.splice(enInsertLine + 1, 0, enAdditions);
bnInsertLine += enAdditions.split('\n').length - 1;
lines.splice(bnInsertLine + 1, 0, bnAdditions);

fs.writeFileSync('src/js/translations.js', lines.join('\n'));
console.log('Successfully added', Object.keys(keysData).length, 'keys to translations.js');
