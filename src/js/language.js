/**
 * Fi Sabilillah - Language Switcher (EN / BN)
 * English and Bangla are two completely separate language modes.
 * Works on dynamically loaded components (navbar/footer) via fetch.
 */
let currentLang = 'en';

function getTranslation(key) {
  if (typeof translations !== 'undefined' && translations[currentLang] && translations[currentLang][key]) {
    return translations[currentLang][key];
  }
  const otherLang = currentLang === 'en' ? 'bn' : 'en';
  if (typeof translations !== 'undefined' && translations[otherLang] && translations[otherLang][key]) {
    return translations[otherLang][key];
  }
  return key;
}

window.t = getTranslation;

function setLanguage(lang) {
  currentLang = lang;
  try {
    localStorage.setItem('fi_sabilillah_lang', lang);
  } catch (e) {}

  const currentLangLabel = document.getElementById('current-lang-label');
  const mobileLangLabel = document.getElementById('mobile-lang-label');
  const mobileLangLabelInDrawer = document.getElementById('mobile-lang-label-in-drawer');
  const otherLangLabel = lang === 'en' ? 'বাংলা' : 'English';

  if (currentLangLabel) currentLangLabel.textContent = otherLangLabel;
  if (mobileLangLabel) mobileLangLabel.textContent = otherLangLabel;
  if (mobileLangLabelInDrawer) mobileLangLabelInDrawer.textContent = otherLangLabel;

  document.documentElement.lang = lang;
  document.documentElement.classList.toggle('lang-bn', lang === 'bn');

  if (typeof document.title !== 'undefined') {
    const titleKey = 'site_title';
    const title = getTranslation(titleKey);
    if (title && title !== titleKey) document.title = title;
  }

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    const desc = getTranslation('meta_description');
    if (desc && desc !== 'meta_description') metaDesc.content = desc;
  }

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const elLang = el.getAttribute('data-i18n-lang');
    const translation = getTranslation(key);

    if (elLang && elLang !== lang) {
      el.style.display = 'none';
      return;
    }
    el.style.display = '';

    if (translation && translation !== key) {
      const tag = el.tagName;
      const hasElementChildren = el.querySelector(':scope > *') !== null;
      if (tag === 'INPUT' || tag === 'TEXTAREA') {
        el.placeholder = translation;
      } else if (tag === 'OPTION') {
        el.textContent = translation;
      } else if (!hasElementChildren) {
        el.innerHTML = translation;
      } else if (translation.indexOf('<') !== -1) {
        el.innerHTML = translation;
      }
      // Also translate alt attribute if present
      if (el.hasAttribute('alt')) {
        el.setAttribute('alt', translation);
      }
      // Also translate aria-label if present
      if (el.hasAttribute('aria-label')) {
        el.setAttribute('aria-label', translation);
      }
      // Also translate title attribute if present
      if (el.hasAttribute('title')) {
        el.setAttribute('title', translation);
      }
    }
  });

  if (typeof __setNavCurrentLang === 'function') {
    __setNavCurrentLang(lang);
  }

  if (typeof __setActivitiesLang === 'function') {
    __setActivitiesLang(lang);
  }

  if (typeof renderArticles === 'function') {
    renderArticles();
  }
  if (typeof updateCalculator === 'function') {
    const slider = document.getElementById('impact-slider');
    updateCalculator(slider ? parseInt(slider.value, 10) : 50);
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
