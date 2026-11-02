/**
 * Fi Sabilillah - Membership Application Modal & Logic (Article 7)
 */
document.addEventListener('DOMContentLoaded', () => {
  const membershipModal = document.getElementById('membership-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalCancelBtn = document.getElementById('modal-cancel-btn');
  const membershipAppForm = document.getElementById('membership-app-form');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const menuIconBars = document.getElementById('menu-icon-bars');
  const menuIconClose = document.getElementById('menu-icon-close');

  function openModal() {
    if (!membershipModal) return;
    membershipModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  function closeModal() {
    if (!membershipModal) return;
    membershipModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  const navApplyBtn = document.getElementById('nav-apply-btn');
  const heroApplyBtn = document.getElementById('hero-apply-btn');
  const sectionApplyBtn = document.getElementById('section-apply-btn');
  const mobileDrawerApplyBtn = document.getElementById('mobile-drawer-apply-btn');

  if (navApplyBtn) navApplyBtn.addEventListener('click', openModal);
  if (heroApplyBtn) heroApplyBtn.addEventListener('click', openModal);
  if (sectionApplyBtn) sectionApplyBtn.addEventListener('click', openModal);
  if (mobileDrawerApplyBtn) {
    mobileDrawerApplyBtn.addEventListener('click', () => {
      if (mobileMenuDrawer) mobileMenuDrawer.classList.add('hidden');
      if (menuIconBars) menuIconBars.classList.remove('hidden');
      if (menuIconClose) menuIconClose.classList.add('hidden');
      openModal();
    });
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalCancelBtn) modalCancelBtn.addEventListener('click', closeModal);

  if (membershipModal) {
    membershipModal.addEventListener('click', (e) => {
      if (e.target === membershipModal) {
        closeModal();
      }
    });
  }

  if (membershipAppForm) {
    membershipAppForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const applicantAge = document.getElementById('app-age').value;
      const refMember = document.getElementById('app-referral').value.trim();

      if (parseInt(applicantAge, 10) < 16) {
        if (typeof showToast === 'function') {
          showToast('Minimum age must be 16 years (Article 7)', 'info');
        }
        return;
      }

      const appRefNumber = 'FS-' + Math.floor(100000 + Math.random() * 900000);
      closeModal();
      membershipAppForm.reset();
      
      if (typeof showToast === 'function') {
        showToast(`Application received! Ref: ${appRefNumber}. Executive Council will review your referral with ${refMember}.`);
      }
    });
  }
});
