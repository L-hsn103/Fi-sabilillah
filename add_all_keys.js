const fs = require('fs');

const htmlKeys = fs.readFileSync('/tmp/all_keys.txt', 'utf8').trim().split('\n');
const content = fs.readFileSync('src/js/translations.js', 'utf8');

// Find the closing brace of en object and bn object
const enEndMatch = content.match(/\n  \},\n  bn: \{/);
if (!enEndMatch) {
  console.error('Could not find en object end');
  process.exit(1);
}

const enInsertPos = enEndMatch.index + 1; // Position after \n before "  },"

// Find the last key in bn object (before closing })
const bnEndMatch = content.match(/\n  \}\n\};/);
if (!bnEndMatch) {
  console.error('Could not find bn object end');
  process.exit(1);
}

const bnInsertPos = bnEndMatch.index + 1;

// Build additions
let enAdditions = '';
let bnAdditions = '';

htmlKeys.forEach(key => {
  // Escape special chars in key for JS object property
  const safeKey = /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key) ? key : JSON.stringify(key);
  enAdditions += `    ${key}: "${val.en}",\n`;
  bnAdditions += `    ${key}: "${bnText}",\n`;
});

// Actually we need the actual text values. Let me redo this properly.
// Read all keys from HTML and get their text content
// But we don't have the text easily... Let me just add empty translations for now
// and fill them in later

console.log('Total HTML keys:', htmlKeys.length);

// Extract existing keys from translations.js
const existingKeys = new Set();
content.split('\n').forEach(line => {
  const m = line.match(/^[[:space:]]*([a-zA-Z_][a-zA-Z0-9_]*)\s*:/);
  if (m) existingKeys.add(m[1]);
});

const missingKeys = htmlKeys.filter(k => !existingKeys.has(k));
console.log('Missing keys:', missingKeys.length);

// For missing keys, we need English text. Let's extract text from HTML
// Actually, let's just add keys with empty/placeholder text and fix later
// For now, add keys with placeholder text

let enAdditions = '';
let bnAdditions = '';

missingKeys.forEach(key => {
  // Clean key name for JS identifier
  const cleanKey = /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key) ? key : JSON.stringify(key);
  enAdditions += `    ${key}: "MISSING_EN:${key}",\n`;
  bnAdditions += `    ${key}: "MISSING_BN:${key}",\n`;
});

// Insert
const newContent = content.replace(/\n  \},\n  bn: \{/, enAdditions + '\n  },\n  bn: {');
const finalContent = newContent.replace(/\n  \}\n\};/, bnAdditions + '\n  }\n};');

fs.writeFileSync('src/js/translations.js', finalContent);
console.log('Done!');
