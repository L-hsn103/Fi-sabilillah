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
        const msg = window.t ? window.t('toast_email_copied').replace('{email}', emailToCopy) : 'Official email copied: ' + emailToCopy;
        copyToClipboard(emailToCopy, msg);
      }
    });
  }

  if (cardEmailCopyBtn) {
    cardEmailCopyBtn.addEventListener('click', () => {
      if (typeof copyToClipboard === 'function') {
        const msg = window.t ? window.t('toast_email_copied_short') : 'Email copied to clipboard!';
        copyToClipboard(emailToCopy, msg);
      }
    });
  }

  if (quickCopyTrigger) {
    quickCopyTrigger.addEventListener('click', () => {
      if (typeof copyToClipboard === 'function') {
        const msg = window.t ? window.t('toast_email_copied_short') : 'Email copied to clipboard!';
        copyToClipboard(emailToCopy, msg);
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
        let msg = window.t ? window.t('toast_thank_you') : `Thank you, ${senderName}!`;
        msg = msg.replace('{name}', senderName).replace('{subject}', subject);
        showToast(msg);
      }
    });
  }
});
