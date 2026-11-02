/**
 * Fi Sabilillah - Responsive Navigation & Header Actions
 */
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const menuIconBars = document.getElementById('menu-icon-bars');
  const menuIconClose = document.getElementById('menu-icon-close');

  if (mobileMenuToggle && mobileMenuDrawer) {
    mobileMenuToggle.addEventListener('click', () => {
      const isOpen = !mobileMenuDrawer.classList.contains('hidden');
      if (isOpen) {
        mobileMenuDrawer.classList.add('hidden');
        if (menuIconBars) menuIconBars.classList.remove('hidden');
        if (menuIconClose) menuIconClose.classList.add('hidden');
      } else {
        mobileMenuDrawer.classList.remove('hidden');
        if (menuIconBars) menuIconBars.classList.add('hidden');
        if (menuIconClose) menuIconClose.classList.remove('hidden');
      }
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuDrawer.classList.add('hidden');
        if (menuIconBars) menuIconBars.classList.remove('hidden');
        if (menuIconClose) menuIconClose.classList.add('hidden');
      });
    });
  }
});
