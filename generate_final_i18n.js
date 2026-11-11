const fs = require('fs');

const keysData = JSON.parse(fs.readFileSync('new_i18n_keys.json', 'utf8'));

// Comprehensive English to Bangla translation mapping
const keysData = JSON.parse(fs.readFileSync('new_i18n_keys.json', 'utf8'));

let enAdditions = '';
let bnAdditions = '';

Object.entries(keysData).forEach(([key, val]) => {
  const enText = val.en;
  const bnText = enToBn[enText] || enText; // fallback to English if no Bangla translation
  
  enAdditions += `    ${key}: "${enText}",\n`;
  bnAdditions += `    ${key}: "${bnText}",\n`;
});

console.log('=== EN ADDITIONS ===');
console.log(enAdditions);
console.log('\n=== BN ADDITIONS ===');
console.log(bnAdditions);

// Save both
fs.writeFileSync('en_additions.txt', enAdditions);
fs.writeFileSync('bn_additions.txt', bnAdditions);
console.log('\nTotal keys:', Object.keys(keysData).length);
