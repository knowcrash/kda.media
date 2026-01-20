// Header scroll effect
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Contact overlay toggle
const contactToggle = document.getElementById('contact-toggle');
const contactOverlay = document.getElementById('contact-overlay');

contactToggle.addEventListener('click', () => {
  contactOverlay.classList.toggle('active');
  contactToggle.classList.toggle('active');
});

// Close overlay when clicking outside the content
contactOverlay.addEventListener('click', (e) => {
  if (e.target === contactOverlay) {
    contactOverlay.classList.remove('active');
    contactToggle.classList.remove('active');
  }
});
