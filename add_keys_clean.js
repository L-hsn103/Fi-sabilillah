const fs = require('fs');

const keysData = JSON.parse(fs.readFileSync('new_i18n_keys.json', 'utf8'));

const content = fs.readFileSync('src/js/translations.js', 'utf8');
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

if (enInsertLine === -1 || bnInsertLine === -1) {
  console.error('Could not find insertion points!');
  process.exit(1);
}

// Build additions - escape special characters
let enAdditions = '';
let bnAdditions = '';

Object.entries(keysData).forEach(([key, val]) => {
  const enEscaped = val.en.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
  const bnEscaped = val.bn.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
  const cleanKey = /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key) ? key : JSON.stringify(key);
  enAdditions += `    ${cleanKey}: "${enEscaped}",\n`;
  bnAdditions += `    ${cleanKey}: "${bnEscaped}",\n`;
});

lines.splice(enInsertLine + 1, 0, enAdditions);
bnInsertLine += enAdditions.split('\n').length - 1;
lines.splice(bnInsertLine + 1, 0, bnAdditions);

fs.writeFileSync('src/js/translations.js', lines.join('\n'));
console.log('Successfully added', Object.keys(keysData).length, 'keys');
