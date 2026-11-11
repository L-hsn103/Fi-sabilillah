/**
 * Fi Sabilillah - Shared Component Loader
 * Loads navbar and footer HTML via fetch, injects into page,
 * then initializes navigation and language for that page.
 * Uses relative paths so pages in /pages/ and root both work.
 */

function getComponentBasePath() {
  const path = window.location.pathname;
  if (path.includes('/pages/')) {
    return '../';
  }
  return './';
}

function fixRelativePaths(element, basePath) {
  // Fix image sources
  element.querySelectorAll('img[src]').forEach(img => {
    const src = img.getAttribute('src');
    if (src && src.startsWith('public/')) {
      img.setAttribute('src', basePath + src);
    }
  });

  // Fix anchor hrefs that are relative page links
  element.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:')) {
      // If href is a page link (index.html or pages/*.html), fix it
      if (href === 'index.html') {
        a.setAttribute('href', basePath === '../' ? '../index.html' : 'index.html');
      } else if (href.startsWith('pages/')) {
        a.setAttribute('href', basePath + href);
      }
    }
  });
}

async function loadComponent(url, containerId) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`Component load failed: ${url} (${response.status})`);
      return;
    }
    const html = await response.text();
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = html;
      fixRelativePaths(container, getComponentBasePath());
    }
  } catch (err) {
    console.warn(`Component load error: ${url}`, err);
  }
}

async function initComponents() {
  const basePath = getComponentBasePath();

  await loadComponent(`${basePath}components/navbar.html`, 'navbar-container');
  await loadComponent(`${basePath}components/footer.html`, 'footer-container');

  if (typeof initNavigation === 'function') {
    initNavigation();
  }
  if (typeof initLanguage === 'function') {
    initLanguage();
  }
}

document.addEventListener('DOMContentLoaded', initComponents);
