/**
 * Fi Sabilillah - Hybrid Navigation System
 * Desktop navbar with dropdowns + Mobile drawer with expandable sections.
 * Handles relative paths from both root and /pages/ subdirectory.
 */

const NAV_LINKS = [
  { key: 'nav_home', label: 'Home', href: 'index.html', hasDropdown: false },
  { key: 'nav_about', label: 'About Us', href: 'pages/about.html', hasDropdown: true,
    dropdown: [
      { key: 'nav_who_we_are', label: 'Who We Are', href: 'pages/about.html#who-we-are' },
      { key: 'nav_vision_mission', label: 'Vision & Mission', href: 'pages/about.html#vision-mission' },
      { key: 'nav_core_values', label: 'Core Values', href: 'pages/about.html#core-values' }
    ]
  },
  { key: 'nav_programs', label: 'Our Programs', href: 'pages/programs.html', hasDropdown: false },
  { key: 'nav_governance', label: 'Governance', href: 'pages/governance.html', hasDropdown: true,
    dropdown: [
      { key: 'nav_org_structure', label: 'Organizational Structure', href: 'pages/governance.html#org-structure' },
      { key: 'nav_exec_council', label: 'Executive Council', href: 'pages/governance.html#exec-council' },
      { key: 'nav_membership', label: 'Membership', href: 'pages/membership.html' }
    ]
  },
  { key: 'nav_resources', label: 'Resources', href: 'pages/constitution.html', hasDropdown: true,
    dropdown: [
      { key: 'nav_constitution', label: 'Constitution', href: 'pages/constitution.html' },
      { key: 'nav_transparency', label: 'Transparency', href: 'pages/transparency.html' },
      { key: 'nav_activities', label: 'Activities & Updates', href: 'pages/activities.html' }
    ]
  },
  { key: 'nav_contact', label: 'Contact', href: 'pages/contact.html', hasDropdown: false }
];

function getBasePath() {
  const path = window.location.pathname;
  if (path.includes('/pages/')) {
    return '../';
  }
  return './';
}

function resolveHref(href) {
  const base = getBasePath();
  if (href === 'index.html') {
    return base === '../' ? '../index.html' : 'index.html';
  }
  // When already in /pages/, strip the 'pages/' prefix for correct relative paths
  if (base === '../' && href.startsWith('pages/')) {
    return href.replace('pages/', '');
  }
  return base + href;
}

function setActiveState() {
  const path = window.location.pathname;
  const isHome = path.endsWith('/') || path.endsWith('index.html');
  const pageName = path.split('/').pop();

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('text-brand-700', 'bg-brand-50', 'font-semibold');
    link.classList.add('text-slate-600');
  });

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.classList.remove('text-brand-700', 'bg-brand-50', 'font-semibold');
    link.classList.add('text-slate-800');
  });

  if (isHome) {
    const homeLink = document.querySelector('.nav-link[data-target="index.html"]');
    const mobileHome = document.querySelector('.mobile-nav-link[data-target="index.html"]');
    if (homeLink) { homeLink.classList.remove('text-slate-600'); homeLink.classList.add('text-brand-700', 'bg-brand-50', 'font-semibold'); }
    if (mobileHome) { mobileHome.classList.remove('text-slate-800'); mobileHome.classList.add('text-brand-700', 'bg-brand-50', 'font-semibold'); }
    return;
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    const target = link.getAttribute('data-target');
    if (target && pageName === target) {
      link.classList.remove('text-slate-600');
      link.classList.add('text-brand-700', 'bg-brand-50', 'font-semibold');
    }
  });

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    const target = link.getAttribute('data-target');
    if (target && pageName === target) {
      link.classList.remove('text-slate-800');
      link.classList.add('text-brand-700', 'bg-brand-50', 'font-semibold');
    }
  });
}

function buildDesktopNav() {
  const container = document.getElementById('desktop-nav');
  if (!container) return;

  container.innerHTML = '';

  NAV_LINKS.forEach(item => {
    const href = resolveHref(item.href);
    const target = item.href;

    if (item.hasDropdown) {
      const wrapper = document.createElement('div');
      wrapper.className = 'relative group';

      const btn = document.createElement('button');
      btn.className = 'nav-link px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-700 rounded-lg hover:bg-white/60 transition flex items-center gap-1';
      btn.setAttribute('data-target', target);
      btn.setAttribute('aria-haspopup', 'true');
      btn.setAttribute('aria-expanded', 'false');

      const labelSpan = document.createElement('span');
      labelSpan.setAttribute('data-i18n', item.key);
      labelSpan.textContent = item.label;
      btn.appendChild(labelSpan);

      const arrow = document.createElement('span');
      arrow.className = 'w-3 h-3 ml-1 text-slate-400 transition-transform group-hover:rotate-180';
      arrow.innerHTML = '<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>';
      btn.appendChild(arrow);

      const dropdown = document.createElement('div');
      dropdown.className = 'absolute hidden top-full left-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50';
      dropdown.setAttribute('aria-label', `${item.label} submenu`);

      item.dropdown.forEach(sub => {
        const subHref = resolveHref(sub.href);
        const subBtn = document.createElement('button');
        subBtn.className = 'dropdown-item w-full px-4 py-2 text-xs text-left text-slate-600 hover:bg-brand-50 hover:text-brand-700 transition';
        subBtn.setAttribute('data-target', sub.href);
        subBtn.setAttribute('data-href', subHref);
        const subLabel = document.createElement('span');
        subLabel.setAttribute('data-i18n', sub.key);
        subLabel.textContent = sub.label;
        subBtn.appendChild(subLabel);
        dropdown.appendChild(subBtn);
      });

      wrapper.appendChild(btn);
      wrapper.appendChild(dropdown);
      container.appendChild(wrapper);

      // Dropdown toggle
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = !dropdown.classList.contains('hidden');
        closeAllDropdowns();
        if (!isOpen) {
          dropdown.classList.remove('hidden');
          btn.setAttribute('aria-expanded', 'true');
          btn.classList.add('text-brand-700', 'bg-brand-50', 'font-semibold');
        } else {
          btn.setAttribute('aria-expanded', 'false');
          btn.classList.remove('text-brand-700', 'bg-brand-50', 'font-semibold');
        }
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) {
          dropdown.classList.add('hidden');
          btn.setAttribute('aria-expanded', 'false');
          btn.classList.remove('text-brand-700', 'bg-brand-50', 'font-semibold');
        }
      });

      // Dropdown item clicks
      dropdown.querySelectorAll('.dropdown-item').forEach(itemBtn => {
        itemBtn.addEventListener('click', () => {
          dropdown.classList.add('hidden');
          btn.setAttribute('aria-expanded', 'false');
          btn.classList.remove('text-brand-700', 'bg-brand-50', 'font-semibold');
          closeMobileMenu();
          const targetHref = itemBtn.getAttribute('data-href');
          if (targetHref) {
            window.location.href = targetHref;
          }
        });
      });
    } else {
      const link = document.createElement('a');
      link.className = 'nav-link px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-700 rounded-lg hover:bg-white/60 transition';
      link.href = href;
      link.setAttribute('data-target', target);
      link.setAttribute('data-i18n', item.key);
      link.textContent = item.label;
      container.appendChild(link);

      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    }
  });
}

function buildMobileNav() {
  const container = document.querySelector('#mobile-menu-drawer .flex.flex-col.gap-3');
  if (!container) return;

  container.innerHTML = '';

  NAV_LINKS.forEach(item => {
    if (item.hasDropdown) {
      // Mobile dropdown section
      const section = document.createElement('div');
      section.className = 'border-b border-slate-100 pb-3 mb-3';

      const headerBtn = document.createElement('button');
      headerBtn.className = 'mobile-nav-header w-full flex items-center justify-between py-3 text-base font-medium text-slate-800 hover:text-brand-700 transition';
      headerBtn.setAttribute('aria-expanded', 'false');
      headerBtn.setAttribute('aria-controls', `mobile-dropdown-${item.key}`);

      const headerLabel = document.createElement('span');
      headerLabel.setAttribute('data-i18n', item.key);
      headerLabel.textContent = item.label;
      headerBtn.appendChild(headerLabel);

      const headerArrow = document.createElement('svg');
      headerArrow.className = 'w-4 h-4 text-slate-400 transition-transform';
      headerArrow.innerHTML = '<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>';
      headerBtn.appendChild(headerArrow);

      const dropdown = document.createElement('div');
      dropdown.id = `mobile-dropdown-${item.key}`;
      dropdown.className = 'hidden mt-2 space-y-1';

      item.dropdown.forEach(sub => {
        const subLink = document.createElement('a');
        subLink.className = 'mobile-nav-link block px-4 py-2.5 text-sm text-slate-600 hover:bg-brand-50 hover:text-brand-700 transition rounded-lg';
        subLink.href = resolveHref(sub.href);
        subLink.setAttribute('data-target', sub.href);
        subLink.setAttribute('data-i18n', sub.key);
        subLink.textContent = sub.label;
        subLink.addEventListener('click', () => {
          dropdown.classList.add('hidden');
          headerBtn.setAttribute('aria-expanded', 'false');
          headerArrow.classList.remove('rotate-180');
          closeMobileMenu();
        });
        dropdown.appendChild(subLink);
      });

      headerBtn.addEventListener('click', () => {
        const isOpen = !dropdown.classList.contains('hidden');
        dropdown.classList.toggle('hidden');
        headerBtn.setAttribute('aria-expanded', String(!isOpen));
        headerArrow.classList.toggle('rotate-180');
      });

      section.appendChild(headerBtn);
      section.appendChild(dropdown);
      container.appendChild(section);
    } else {
      const link = document.createElement('a');
      link.className = 'mobile-nav-link text-base font-medium text-slate-800 hover:text-brand-700 py-2 border-b border-slate-100';
      link.href = resolveHref(item.href);
      link.setAttribute('data-target', item.href);
      link.setAttribute('data-i18n', item.key);
      link.textContent = item.label;
      link.addEventListener('click', closeMobileMenu);
      container.appendChild(link);
    }
  });

  // Language switcher in mobile
  const langSection = document.createElement('div');
  langSection.className = 'pt-4 border-t border-slate-100';

  const langBtn = document.createElement('button');
  langBtn.className = 'mobile-lang-btn w-full py-3 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-between border border-slate-200/60 bg-white/80 backdrop-blur-md';
  langBtn.id = 'mobile-lang-btn-in-drawer';

  const langLabel = document.createElement('span');
  langLabel.id = 'mobile-lang-label-in-drawer';
  langLabel.textContent = 'বাংলা';
  langBtn.appendChild(langLabel);

  const langIcon = document.createElement('svg');
  langIcon.className = 'w-4 h-4 text-brand-700';
  langIcon.innerHTML = '<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>';
  langBtn.appendChild(langIcon);

  langBtn.addEventListener('click', () => {
    const newLang = currentLang === 'en' ? 'bn' : 'en';
    if (typeof setLanguage === 'function') {
      setLanguage(newLang);
    }
    closeMobileMenu();
  });

  langSection.appendChild(langBtn);

  // Join Us CTA in mobile
  const ctaSection = document.createElement('div');
  ctaSection.className = 'pt-4';

  const ctaBtn = document.createElement('button');
  ctaBtn.className = 'mobile-apply-btn w-full py-3 rounded-xl bg-brand-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md hover:bg-brand-800 transition';
  ctaBtn.id = 'mobile-drawer-apply-btn';
  ctaBtn.setAttribute('data-i18n', 'nav_cta_apply');
  ctaBtn.textContent = 'Join / Apply';
  ctaSection.appendChild(ctaBtn);

  container.appendChild(langSection);
  container.appendChild(ctaSection);
}

function closeAllDropdowns() {
  document.querySelectorAll('.absolute.top-full').forEach(el => {
    el.classList.add('hidden');
  });
  document.querySelectorAll('.nav-link[aria-haspopup="true"]').forEach(btn => {
    btn.setAttribute('aria-expanded', 'false');
    btn.classList.remove('text-brand-700', 'bg-brand-50', 'font-semibold');
  });
}

function closeMobileMenu() {
  const drawer = document.getElementById('mobile-menu-drawer');
  const toggle = document.getElementById('mobile-menu-toggle');
  const iconBars = document.getElementById('menu-icon-bars');
  const iconClose = document.getElementById('menu-icon-close');

  if (drawer) drawer.classList.add('hidden');
  if (toggle) toggle.setAttribute('aria-expanded', 'false');
  if (iconBars) iconBars.classList.remove('hidden');
  if (iconClose) iconClose.classList.add('hidden');
}

function initMobileToggle() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-menu-drawer');
  const iconBars = document.getElementById('menu-icon-bars');
  const iconClose = document.getElementById('menu-icon-close');

  if (!toggle || !drawer) return;

  toggle.addEventListener('click', () => {
    const isOpen = !drawer.classList.contains('hidden');
    if (isOpen) {
      drawer.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
      if (iconBars) iconBars.classList.remove('hidden');
      if (iconClose) iconClose.classList.add('hidden');
    } else {
      drawer.classList.remove('hidden');
      toggle.setAttribute('aria-expanded', 'true');
      if (iconBars) iconBars.classList.add('hidden');
      if (iconClose) iconClose.classList.remove('hidden');
    }
  });

  // Close mobile menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
      closeAllDropdowns();
    }
  });
}

function initLanguageSwitcher() {
  const btn = document.getElementById('lang-toggle-btn');
  const label = document.getElementById('current-lang-label');

  // Language toggle handled by language.js initLanguage() to avoid double-toggle
  // Keep only the currentLang sync bridge for language.js
  window.__navCurrentLang = () => currentLang;
  window.__setNavCurrentLang = (lang) => { currentLang = lang; };
}

function updateLangLabels(lang) {
  currentLang = lang;
  const label = document.getElementById('current-lang-label');
  const mobileLabel = document.getElementById('mobile-lang-label');
  const mobileLabelInDrawer = document.getElementById('mobile-lang-label-in-drawer');
  const otherLabel = lang === 'en' ? 'বাংলা' : 'English';

  if (label) label.textContent = otherLabel;
  if (mobileLabel) mobileLabel.textContent = otherLabel;
  if (mobileLabelInDrawer) mobileLabelInDrawer.textContent = otherLabel;
}

function initApplyButton() {
  const basePath = getBasePath();
  const membershipHref = basePath === '../' ? '../pages/membership.html' : 'pages/membership.html';

  // If membership.js is loaded, it handles the apply button via window.openModal
  if (typeof window.openModal === 'function') {
    return;
  }

  function handleApplyClick(e) {
    const modal = document.getElementById('membership-modal');
    if (modal) {
      e.preventDefault();
      modal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
      closeMobileMenu();
    } else {
      window.location.href = membershipHref;
    }
  }

  const navApplyBtn = document.getElementById('nav-apply-btn');
  if (navApplyBtn) {
    navApplyBtn.addEventListener('click', handleApplyClick);
  }

  const mobileApplyBtn = document.getElementById('mobile-drawer-apply-btn');
  if (mobileApplyBtn) {
    mobileApplyBtn.addEventListener('click', handleApplyClick);
  }
}

function initNavigation() {
  const basePath = getBasePath();

  // Re-resolve all existing nav links that may have been rendered
  document.querySelectorAll('.nav-link[data-target], .mobile-nav-link[data-target]').forEach(link => {
    const target = link.getAttribute('data-target');
    if (target) {
      link.href = resolveHref(target);
    }
  });

  buildDesktopNav();
  buildMobileNav();
  initMobileToggle();
  initLanguageSwitcher();
  initApplyButton();
  setActiveState();
}
