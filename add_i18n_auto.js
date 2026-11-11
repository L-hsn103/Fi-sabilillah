const fs = require('fs');
const path = require('path');

const baseDir = '.';
const files = [
  'index.html',
  'pages/about.html',
  'pages/activities.html',
  'pages/constitution.html',
  'pages/contact.html',
  'pages/governance.html',
  'pages/membership.html',
  'pages/programs.html',
  'pages/transparency.html'
];

// Tags whose text content should get data-i18n
const textTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'button', 'a', 'span', 'div', 'li', 'td', 'th', 'label', 'legend', 'option'];

const newKeys = {};

function getKeyFromText(text) {
  // Generate a key from the text: lowercase, replace spaces with _, remove special chars
  let key = text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');
  // Limit length
  if (key.length > 50) key = key.substring(0, 50);
  return key || 'unnamed';
}

for (const file of files) {
  const filePath = path.join(baseDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // We need to process elements that have text content but no data-i18n
  // Strategy: find all opening tags, check if they have data-i18n, if not check if they have text content
  
  // This is complex with regex. Let's use a simpler approach:
  // Find all elements that match <tag ...>text</tag> where the tag doesn't have data-i18n
  
  for (const tag of textTags) {
    // Match <tag ...>text</tag> where tag doesn't already have data-i18n
    // This regex is imperfect but good enough for most cases
    const regex = new RegExp(`(<${tag}\\s(?!.*?\\sdata-i18n=)[^>]*>)([^<]+)(<\\/${tag}>)`, 'g');
    
    content = content.replace(regex, (match, openTag, text, closeTag) => {
      // Skip if text is just whitespace or numbers/symbols only
      if (!/[a-zA-Z]/.test(text)) return match;
      
      // Skip URLs and email addresses
      if (text.includes('@') || text.includes('http') || text.includes('www.')) return match;
      
      // Skip very short text (1-2 chars) unless it's meaningful
      if (text.trim().length < 2 && !/[a-zA-Z]/.test(text.trim())) return match;
      
      const key = getKeyFromText(text);
      const uniqueKey = key + '_' + file.replace(/[^a-zA-Z0-9]/g, '_') + '_' + Math.random().toString(36).substr(2, 4);
      
      newKeys[uniqueKey] = { en: text.trim(), file: file };
      
      return openTag + ' data-i18n="' + uniqueKey + '"' + text + closeTag;
    });
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Processed: ' + file);
}

// Output all new keys
console.log('\n=== NEW KEYS FOR EN SECTION ===');
Object.entries(newKeys).forEach(([key, val]) => {
  console.log(`    ${key}: "${val.en}",`);
});

console.log('\n=== NEW KEYS FOR BN SECTION ===');
Object.entries(newKeys).forEach(([key, val]) => {
  console.log(`    ${key}: "${val.en}",  // NEED BANGLA TRANSLATION`);
});

fs.writeFileSync('new_i18n_keys.json', JSON.stringify(newKeys, null, 2));
console.log('\nSaved to new_i18n_keys.json');
