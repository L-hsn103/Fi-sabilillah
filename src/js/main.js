/**
 * Fi Sabilillah - Main Entry Point & Notification System
 */

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `pointer-events-auto flex items-center gap-2 px-4 py-3 rounded-2xl glass-card text-xs font-semibold shadow-xl border ${
    type === 'success' ? 'border-brand-500 text-brand-900 bg-white/95' : 'border-slate-300 text-slate-800 bg-white/95'
  } transform transition-all duration-300 translate-y-2 opacity-0`;
  
  const icon = type === 'success' 
    ? `<svg class="w-4 h-4 text-brand-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`
    : `<svg class="w-4 h-4 text-gold-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;

  toast.innerHTML = `${icon}<span>${message}</span>`;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function copyToClipboard(text, successMsg) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg);
    }).catch(() => {
      fallbackCopy(text, successMsg);
    });
  } else {
    fallbackCopy(text, successMsg);
  }
}

function fallbackCopy(text, successMsg) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(successMsg);
    } catch (err) {
      showToast((window.t ? window.t('toast_address') : 'Address: ').replace('{text}', text), 'info');
    }
  document.body.removeChild(textArea);
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderArticles === 'function') {
    renderArticles();
  }
  if (typeof updateCalculator === 'function') {
    updateCalculator(50);
  }
  document.querySelectorAll('.faq-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const icon = btn.querySelector('svg');
      const isHidden = answer.classList.contains('hidden');

      document.querySelectorAll('.faq-answer').forEach(a => a.classList.add('hidden'));
      document.querySelectorAll('.faq-toggle svg').forEach(i => i.classList.remove('rotate-180'));

      if (isHidden) {
        answer.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
        btn.setAttribute('aria-expanded', 'true');
      } else {
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });
});
