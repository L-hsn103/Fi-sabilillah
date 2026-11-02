/**
 * Fi Sabilillah - Interactive Constitution Explorer
 */
let showBengaliVerbatim = true;
let selectedChapter = 'all';

function renderArticles() {
  const articlesContainer = document.getElementById('articles-container');
  const constSearchInput = document.getElementById('const-search-input');
  if (!articlesContainer) return;

  const searchTerm = constSearchInput ? constSearchInput.value.toLowerCase().trim() : '';
  
  if (typeof constitutionData === 'undefined') {
    articlesContainer.innerHTML = '<p class="text-center text-slate-500 py-8">Constitution data not loaded.</p>';
    return;
  }

  const filtered = constitutionData.filter(item => {
    const matchesChap = selectedChapter === 'all' || item.chapter.toString() === selectedChapter;
    const matchesSearch = !searchTerm || 
      item.titleEn.toLowerCase().includes(searchTerm) ||
      item.titleBn.toLowerCase().includes(searchTerm) ||
      item.textEn.toLowerCase().includes(searchTerm) ||
      item.textBn.toLowerCase().includes(searchTerm) ||
      `article ${item.article}`.includes(searchTerm) ||
      `ধারা ${item.article}`.includes(searchTerm);
    return matchesChap && matchesSearch;
  });

  if (filtered.length === 0) {
    articlesContainer.innerHTML = `
      <div class="glass-card rounded-2xl p-8 text-center text-slate-500">
        <svg class="w-10 h-10 mx-auto text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <p class="text-sm font-semibold">No constitutional clauses match your search.</p>
        <p class="text-xs text-slate-400 mt-1">Try searching for "নির্বাচন", "তহবিল", "সদস্যপদ", or "50".</p>
      </div>
    `;
    return;
  }

  articlesContainer.innerHTML = filtered.map(item => {
    const formattedBengali = item.textBn.replace(/\n/g, '<br>');
    const formattedEnglish = item.textEn.replace(/\n/g, '<br>');

    return `
      <div class="glass-card rounded-2xl p-5 sm:p-6 transition-all duration-200">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-md bg-brand-100 text-brand-800 text-xs font-bold flex items-center justify-center shrink-0">
              ${item.article}
            </span>
            <h4 class="text-sm font-bold text-slate-900">
              ${typeof currentLang !== 'undefined' && currentLang === 'bn' ? item.titleBn : item.titleEn}
              <span class="text-xs font-normal text-slate-400 ml-1">(${typeof currentLang !== 'undefined' && currentLang === 'bn' ? item.chapterTitleBn : item.chapterTitleEn})</span>
            </h4>
          </div>
          <span class="text-[11px] font-semibold text-gold-700 bg-gold-50 px-2 py-0.5 rounded-full border border-gold-200/60 self-start sm:self-auto">
            Article ${item.article}
          </span>
        </div>

        <div class="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
          ${formattedEnglish}
        </div>

        ${showBengaliVerbatim ? `
          <div class="mt-3 pt-3 border-t border-slate-100/80 bg-brand-50/40 rounded-xl p-3.5 border border-brand-100/50">
            <div class="flex items-center justify-between text-[11px] font-bold text-brand-800 mb-1 font-bengali">
              <span>${item.titleBn} (মূল সংবিধান পাঠ):</span>
            </div>
            <div class="text-xs text-slate-800 leading-relaxed font-bengali">
              ${formattedBengali}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const chapterTabs = document.querySelectorAll('.chap-tab');
  const constSearchInput = document.getElementById('const-search-input');
  const showAllBtn = document.getElementById('show-all-articles-btn');
  const toggleVerbatimBtn = document.getElementById('toggle-bengali-verbatim-btn');
  const printConstitutionBtn = document.getElementById('print-constitution-btn');

  chapterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      chapterTabs.forEach(t => {
        t.classList.remove('bg-brand-700', 'text-white');
        t.classList.add('text-slate-700');
      });
      tab.classList.remove('text-slate-700');
      tab.classList.add('bg-brand-700', 'text-white');
      selectedChapter = tab.getAttribute('data-chap');
      renderArticles();
    });
  });

  if (constSearchInput) {
    constSearchInput.addEventListener('input', () => {
      renderArticles();
    });
  }

  if (showAllBtn) {
    showAllBtn.addEventListener('click', () => {
      if (constSearchInput) constSearchInput.value = '';
      selectedChapter = 'all';
      chapterTabs.forEach((t, i) => {
        if (i === 0) {
          t.classList.add('bg-brand-700', 'text-white');
          t.classList.remove('text-slate-700');
        } else {
          t.classList.remove('bg-brand-700', 'text-white');
          t.classList.add('text-slate-700');
        }
      });
      renderArticles();
    });
  }

  if (toggleVerbatimBtn) {
    toggleVerbatimBtn.addEventListener('click', () => {
      showBengaliVerbatim = !showBengaliVerbatim;
      toggleVerbatimBtn.classList.toggle('text-brand-700', showBengaliVerbatim);
      renderArticles();
    });
  }

  if (printConstitutionBtn) {
    printConstitutionBtn.addEventListener('click', () => {
      window.print();
    });
  }
});
