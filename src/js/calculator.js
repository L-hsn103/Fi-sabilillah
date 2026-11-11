/**
 * Fi Sabilillah - Micro-Donation & Empowerment Impact Calculator
 */
function updateCalculator(monthlyVal) {
  const sliderDisplayVal = document.getElementById('slider-display-val');
  const calcAnnualVal = document.getElementById('calc-annual-val');
  const calcImpactDescription = document.getElementById('calc-impact-description');
  if (!sliderDisplayVal || !calcAnnualVal || !calcImpactDescription) return;

  const annualVal = monthlyVal * 12;
  sliderDisplayVal.textContent = `${monthlyVal.toLocaleString()} ৳ ${window.t ? window.t('calc_per_month') : '/ month'}`;
  calcAnnualVal.textContent = `${annualVal.toLocaleString()} ৳ ${window.t ? window.t('calc_per_year') : '/ year'}`;

  let impactText = '';
  const impactLabel = window.t ? window.t('calc_impact_label') : 'Empowerment Impact:';
  if (monthlyVal <= 100) {
    impactText = `
      <strong>${impactLabel}</strong> Provides baseline vocational supplies (thread, tailoring supplies, basic toolsets) and emergency relief ration packages for families affected by sudden hardship.
    `;
  } else if (monthlyVal <= 500) {
    impactText = `
      <strong>${impactLabel}</strong> In 1 year (${annualVal.toLocaleString()} ৳), this fully finances a complete heavy-duty sewing machine or micro-trade seed cart, transitioning an unemployed household into an independent income-generating unit.
    `;
  } else if (monthlyVal <= 1500) {
    impactText = `
      <strong>${impactLabel}</strong> Enables 2–3 sustainable small business start-ups (e.g., roadside micro-grocer, mobile repair kit, poultry micro-incubator) plus educational supplies for children to prevent school dropouts.
    `;
  } else {
    impactText = `
      <strong>${impactLabel}</strong> Transforms 5+ families with comprehensive vocational equipment, trade mentorship, and emergency health rehabilitation under the strict oversight of Article 6 programs.
    `;
  }
  calcImpactDescription.innerHTML = impactText;
}

document.addEventListener('DOMContentLoaded', () => {
  const impactSlider = document.getElementById('impact-slider');
  const presetButtons = document.querySelectorAll('.calc-preset');

  if (impactSlider) {
    impactSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      presetButtons.forEach(b => b.classList.remove('bg-brand-700', 'text-white'));
      updateCalculator(val);
    });
  }

  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = parseInt(btn.getAttribute('data-val'), 10);
      if (impactSlider) impactSlider.value = val;
      presetButtons.forEach(b => b.classList.remove('bg-brand-700', 'text-white'));
      btn.classList.add('bg-brand-700', 'text-white');
      updateCalculator(val);
    });
  });
});
