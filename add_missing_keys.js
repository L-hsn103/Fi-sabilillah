const fs = require('fs');

const htmlKeys = fs.readFileSync('/tmp/all_keys.txt', 'utf8').trim().split('\n');

const content = fs.readFileSync('src/js/translations.js', 'utf8');

// Extract existing EN keys
const existingEnKeys = new Set();
content.split('\n').forEach(line => {
  const match = line.match(/^[[:space:]]*([a-zA-Z_][a-zA-Z0-9_]*)\s*:/);
  if (match) existingEnKeys.add(match[1]);
});

console.log('Existing EN keys:', existingEnKeys.size);
console.log('HTML keys:', htmlKeys.length);

// Find missing keys
const missingKeys = htmlKeys.filter(k => !existingEnKeys.has(k));
console.log('Missing keys:', missingKeys.length);

// Read current file to find insertion point (before closing } of en object)
const enObjectEnd = content.indexOf('  bn: {');
if (enInsertLine === -1) {
  // Find bn: {
  const bnMatch = content.match(/\n  bn: \{/);
  if (bnMatch) bnInsertLine = bnMatch.index;
}

console.log('bn: { found at:', bnInsertLine);

// Build additions - insert before "  bn: {"
const enAdditions = Object.entries(keysData).map(([key, val]) => {
  const escaped = val.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  return `    ${key}: "${escaped}",\n`;
}).join('');

// Insert before "  bn: {"
const newContent = content.replace(/\n  bn: \{/, enAdditions + '\n  bn: {');

fs.writeFileSync('src/js/translations.js', newContent);
console.log('EN keys added successfully');
