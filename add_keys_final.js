const fs = require('fs');

const keysData = JSON.parse(fs.readFileSync('new_i18n_keys.json', 'utf8'));

// Read current file
let content = fs.readFileSync('src/js/translations.js', 'utf8');
let lines = content.split('\n');

// Find insertion points
let enInsertLine = -1;
let bnInsertLine = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('membership_pledge_label: "Pledge:"') && enInsertLine === -1) {
    enInsertLine = i; // Insert after this line
  }
  if (lines[i].includes('membership_pledge_label: "প্রতিশ্রুতি:"') && bnInsertLine === -1) {
    bnInsertLine = i; // Insert after this line
  }
}

console.log('EN insert after line:', enInsertLine + 1);
console.log('BN insert after line:', bnInsertLine + 1);

// Build additions
let enAdditions = '';
let bnAdditions = '';

Object.entries(keysData).forEach(([key, val]) => {
  const enText = val.en;
  const bnText = enText; // fallback to English
  const quotedKey = /^\d/.test(key) ? `"${key}"` : key;
  
  enAdditions += `    ${quotedKey}: "${enText}",\n`;
  bnAdditions += `    ${quotedKey}: "${bnText}",\n`;
});

// Insert EN additions after enInsertLine
lines.splice(enInsertLine + 1, 0, enAdditions);

// Recalculate bnInsertLine since we added lines
bnInsertLine += enAdditions.split('\n').length - 1;

// Insert BN additions after bnInsertLine
lines.splice(bnInsertLine + 1, 0, bnAdditions);

content = lines.join('\n');
fs.writeFileSync('src/js/translations.js', content, 'utf8');
console.log('Added', Object.keys(keysData).length, 'keys to both sections');
console.log('File now has', lines.length + enAdditions.split('\n').length + bnAdditions.split('\n').length, 'lines');
