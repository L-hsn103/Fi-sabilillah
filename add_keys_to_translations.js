const fs = require('fs');

const keysData = JSON.parse(fs.readFileSync('new_i18n_keys.json', 'utf8'));

// Read current translations.js
let content = fs.readFileSync('src/js/translations.js', 'utf8');

// Build additions for EN section (before line 422, the closing } of en object)
let enAdditions = '\n';
let bnAdditions = '\n';

Object.entries(keysData).forEach(([key, val]) => {
  const enText = val.en;
  // Use English as BN fallback - better than showing key name
  const bnText = enText;
  // Quote keys that start with digits (not valid JS identifiers)
  const quotedKey = /^\d/.test(key) ? `"${key}"` : key;
  
  enAdditions += `    ${quotedKey}: "${enText}",\n`;
  bnAdditions += `    ${quotedKey}: "${bnText}",\n`;
});

// Insert EN additions before the closing } of en object (line 422: "  },")
// We need to find the last key in EN section and add after it
const enEndMarker = '    membership_pledge_label: "Pledge:",\n  },\n  bn: {';
content = content.replace(enEndMarker, enEndMarker + enAdditions);

// Insert BN additions before the closing } of bn object (line 839: "  }")
const bnEndMarker = '    membership_pledge_label: "প্রতিশ্রুতি:",\n  }';
content = content.replace(bnEndMarker, bnEndMarker + bnAdditions);

fs.writeFileSync('src/js/translations.js', content, 'utf8');
console.log('Added', Object.keys(keysData).length, 'keys to both EN and BN sections');
console.log('EN additions added before line 422');
console.log('BN additions added before line 839');
