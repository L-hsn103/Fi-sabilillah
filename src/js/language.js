/**
 * Fi Sabilillah - Language Switcher (EN / BN)
 */
let currentLang = 'en';

function setLanguage(lang) {
  currentLang = lang;
  try {
    localStorage.setItem('fi_sabilillah_lang', lang);
  } catch (e) {}

  const currentLangLabel = document.getElementById('current-lang-label');
  const mobileLangLabel = document.getElementById('mobile-lang-label');
  const otherLangLabel = lang === 'en' ? 'বাংলা' : 'English';

  if (currentLangLabel) currentLangLabel.textContent = otherLangLabel;
  if (mobileLangLabel) mobileLangLabel.textContent = otherLangLabel;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (typeof translations !== 'undefined' && translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  if (typeof renderArticles === 'function') {
    renderArticles();
  }
}

function initLanguage() {
  let savedLang = 'en';
  try {
    savedLang = localStorage.getItem('fi_sabilillah_lang') || 'en';
  } catch (e) {
    savedLang = 'en';
  }
  setLanguage(savedLang);

  const langToggleBtn = document.getElementById('lang-toggle-btn');
  const mobileLangBtn = document.getElementById('mobile-lang-btn');

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      setLanguage(currentLang === 'en' ? 'bn' : 'en');
    });
  }
  if (mobileLangBtn) {
    mobileLangBtn.addEventListener('click', () => {
      setLanguage(currentLang === 'en' ? 'bn' : 'en');
    });
  }
}
