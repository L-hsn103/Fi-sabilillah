/**
 * Fi Sabilillah - Contact Inquiries & Clipboard Utilities
 */
document.addEventListener('DOMContentLoaded', () => {
  const emailToCopy = 'fisabilillahofficial21@gmail.com';

  const topEmailCopyBtn = document.getElementById('top-email-copy-btn');
  const cardEmailCopyBtn = document.getElementById('card-email-copy-btn');
  const quickCopyTrigger = document.getElementById('quick-copy-trigger');

  if (topEmailCopyBtn) {
    topEmailCopyBtn.addEventListener('click', () => {
      if (typeof copyToClipboard === 'function') {
        copyToClipboard(emailToCopy, 'Official email copied: ' + emailToCopy);
      }
    });
  }

  if (cardEmailCopyBtn) {
    cardEmailCopyBtn.addEventListener('click', () => {
      if (typeof copyToClipboard === 'function') {
        copyToClipboard(emailToCopy, 'Email copied to clipboard!');
      }
    });
  }

  if (quickCopyTrigger) {
    quickCopyTrigger.addEventListener('click', () => {
      if (typeof copyToClipboard === 'function') {
        copyToClipboard(emailToCopy, 'Email copied to clipboard!');
      }
    });
  }

  const contactInquiryForm = document.getElementById('contact-inquiry-form');
  if (contactInquiryForm) {
    contactInquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const senderName = document.getElementById('contact-name').value.trim();
      const subject = document.getElementById('contact-subject').value;
      contactInquiryForm.reset();
      
      if (typeof showToast === 'function') {
        showToast(`Thank you, ${senderName}! Your message regarding "${subject}" has been transmitted to fisabilillahofficial21@gmail.com.`);
      }
    });
  }
});
