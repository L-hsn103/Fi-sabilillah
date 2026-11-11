const fs = require('fs');
const path = require('path');

const htmlFiles = ['index.html', ...fs.readdirSync('pages').filter(f => f.endsWith('.html'))];

// Extract all data-i18n keys and their text content from HTML files
const keyToText = new Map();

htmlFiles.forEach(file => {
  const content = fs.readFileSync(path.join('pages', file), 'utf8') || fs.readFileSync(file, 'utf8');
  // Match elements with data-i18n and capture their text content
  const regex = /<([a-zA-Z]+)([^>]*data-i18n="([^"]+)"[^>]*)>([^<]*)<\/\1>/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const key = match[3];
    const text = match[4].trim();
    if (text && key) {
      keyToText.set(key, text);
    }
  }
  
  // Also match self-closing or elements with children (just get key)
  const regex2 = /data-i18n="([^"]+)"/g;
  let match2;
  while ((match2 = regex2.exec(content)) !== null) {
    if (!keyToText.has(match2[1])) {
      keyToText.set(match2[1], match2[1]); // Use key as text fallback
    }
  }
});

console.log('Total keys found:', keyToText.size);

const keyToTextMap = Object.fromEntries(keyToText);
fs.writeFileSync('key_to_text.json', JSON.stringify(keyToText, null, 2));
