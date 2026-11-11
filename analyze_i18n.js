const fs = require('fs');
const path = require('path');

const pagesDir = 'pages';
const files = ['index.html', ...fs.readdirSync(pagesDir).filter(f => f.endsWith('.html')).map(f => path.join(pagesDir, f))];

console.log('Processing files:', files);

// For each file, find hardcoded English text without data-i18n
// and suggest data-i18n keys

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  console.log('\n=== ' + file + ' ===');
  
  // Find text content in elements that don't have data-i18n
  // This is a simplified approach - we look for common patterns
  
  // Find title tags
  const titleMatches = content.match(/<title>([^<]+)<\/title>/g);
  if (titleMatches) {
    titleMatches.forEach(m => {
      const text = m.replace('<title>', '').replace('</title>', '');
      console.log('  TITLE:', text);
    });
  }
  
  // Find meta description
  const metaMatches = content.match(/<meta name="description" content="([^"]+)"/g);
  if (metaMatches) {
    metaMatches.forEach(m => {
      const text = m.replace(/<meta name="description" content="/, '').replace('"\/>', '');
      console.log('  META_DESC:', text);
    });
  }
  
  // Find aria-label attributes
  const ariaMatches = content.match(/aria-label="([^"]+)"/g);
  if (ariaMatches) {
    ariaMatches.forEach(m => {
      const text = m.replace(/aria-label="/, '').replace('"', '');
      console.log('  ARIA_LABEL:', text);
    });
  }
  
  // Find title attributes
  const titleMatches2 = content.match(/title="([^"]+)"/g);
  if (titleMatches2) {
    titleMatches2.forEach(m => {
      const text = m.replace(/title="/, '').replace('"', '');
      console.log('  TITLE_ATTR:', text);
    });
  }
  
  // Find alt attributes on images
  const altMatches = content.match(/alt="([^"]+)"/g);
  if (altMatches) {
    altMatches.forEach(m => {
      const text = m.replace(/alt="/, '').replace('"', '');
      if (text && text !== 'Fi Sabilillah Logo') {
        console.log('  ALT:', text);
      }
    });
  }
}

console.log('\nDone');
