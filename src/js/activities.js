/**
 * Fi Sabilillah - Activities & Updates
 * Category filtering and simple detail-view interface.
 * Works with dynamically loaded content via translation system.
 */

let currentFilter = 'all';

function renderActivities() {
  const listContainer = document.getElementById('activities-list');
  const emptyContainer = document.getElementById('activities-empty');
  const detailView = document.getElementById('activity-detail-view');
  const detailContent = document.getElementById('activity-detail-content');

  if (!listContainer) return;

  // If detail view is open, show it instead
  if (!detailView.classList.contains('hidden')) {
    return;
  }

  const filtered = activitiesData.filter(act => {
    return currentFilter === 'all' || act.category === currentFilter;
  });

  listContainer.innerHTML = '';

  if (filtered.length === 0) {
    listContainer.classList.add('hidden');
    emptyContainer.classList.remove('hidden');
    return;
  }

  listContainer.classList.remove('hidden');
  emptyContainer.classList.add('hidden');

  filtered.forEach(act => {
    const card = document.createElement('article');
    card.className = 'bg-white/60 rounded-2xl p-5 sm:p-6 border border-white/60 shadow-sm cursor-pointer hover:bg-brand-50/50 transition group';
    card.setAttribute('data-id', act.id);
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Activity: ${currentLang === 'en' ? act.titleEn : act.titleBn}`);

    const dateDisplay = new Date(act.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

    card.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex-1 min-w-0">
          <span class="text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2 py-0.5 rounded mb-2 block">
            ${t(`activities_filter_${act.category}`) || act.category}
          </span>
          <h3 class="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-700 transition">
            ${currentLang === 'en' ? act.titleEn : act.titleBn}
          </h3>
          <p class="text-xs text-slate-600 leading-relaxed mb-3">
            ${currentLang === 'en' ? act.descEn : act.descBn}
          </p>
          <div class="flex items-center gap-2 text-[10px] text-slate-500">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>${dateDisplay}</span>
          </div>
        </div>
        <div class="ml-4 sm:ml-0">
          <span class="text-xs font-bold text-brand-700" data-i18n="activities_read_more">${t('activities_read_more')}</span>
          <svg class="w-4 h-4 text-slate-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
        </div>
      </div>
    `;

    card.addEventListener('click', () => openActivityDetail(act));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openActivityDetail(act);
      }
    });

    listContainer.appendChild(card);
  });
}

function openActivityDetail(act) {
  const detailView = document.getElementById('activity-detail-view');
  const detailContent = document.getElementById('activity-detail-content');
  const listContainer = document.getElementById('activities-list');
  const emptyContainer = document.getElementById('activities-empty');

  if (!detailView || !detailContent) return;

  const dateDisplay = new Date(act.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  detailContent.innerHTML = `
    <div class="bg-white/60 rounded-3xl p-6 sm:p-10 border border-white/60 shadow-sm max-w-3xl mx-auto">
      <div class="flex items-start justify-between mb-6">
        <span class="text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
          ${t(`activities_filter_${act.category}`) || act.category}
        </span>
        <span class="text-[10px] text-slate-500 font-medium">${dateDisplay}</span>
      </div>
      <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
        ${currentLang === 'en' ? act.titleEn : act.titleBn}
      </h2>
      <div class="text-sm text-slate-600 leading-relaxed mb-8">
        ${currentLang === 'en' ? act.descEn : act.descBn}
      </div>
      ${act.image ? `<img src="${act.image}" alt="${currentLang === 'en' ? act.titleEn : act.titleBn}" class="w-full h-64 object-cover rounded-xl mb-6">` : ''}
    </div>
  `;

  listContainer.classList.add('hidden');
  emptyContainer.classList.add('hidden');
  detailView.classList.remove('hidden');
  detailView.scrollIntoView({ behavior: 'smooth' });
}

function closeActivityDetail() {
  const detailView = document.getElementById('activity-detail-view');
  const listContainer = document.getElementById('activities-list');
  const emptyContainer = document.getElementById('activities-empty');

  if (!detailView) return;

  detailView.classList.add('hidden');
  document.getElementById('activity-detail-content').innerHTML = '';

  const filtered = activitiesData.filter(act => {
    return currentFilter === 'all' || act.category === currentFilter;
  });

  if (filtered.length === 0) {
    listContainer.classList.add('hidden');
    emptyContainer.classList.remove('hidden');
  } else {
    listContainer.classList.remove('hidden');
    emptyContainer.classList.add('hidden');
    renderActivities();
  }
}

function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-brand-50', 'text-brand-700');
        b.classList.add('text-slate-600');
      });
      btn.classList.remove('text-slate-600');
      btn.classList.add('bg-brand-50', 'text-brand-700');
      currentFilter = btn.getAttribute('data-category');
      renderActivities();
    });
  });
}

function setActivitiesLang(lang) {
  currentLang = lang;
  renderActivities();
}

document.addEventListener('DOMContentLoaded', () => {
  const backBtn = document.getElementById('back-to-activities');
  if (backBtn) {
    backBtn.addEventListener('click', closeActivityDetail);
  }

  // Expose for language.js to call on language change
  window.__setActivitiesLang = setActivitiesLang;

  initFilters();
  renderActivities();
});
