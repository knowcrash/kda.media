// Autoplay fallback for browsers with strict autoplay policies
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
  heroVideo.play().catch(() => {
    // Autoplay blocked - play on first user interaction
    document.addEventListener('click', () => heroVideo.play(), { once: true });
  });
}

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

// Photo carousel
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
let current = 0;

function goTo(index) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}

let timer;
function resetTimer() {
  clearTimeout(timer);
  timer = setTimeout(() => { goTo(current + 1); resetTimer(); }, 10000);
}

document.querySelector('.carousel-prev')?.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
document.querySelector('.carousel-next')?.addEventListener('click', () => { goTo(current + 1); resetTimer(); });
dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); resetTimer(); }));

const carousel = document.querySelector('.photo-carousel');
let touchStartX = 0;
carousel?.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
carousel?.addEventListener('touchend', (e) => {
  const delta = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(delta) > 40) { goTo(delta > 0 ? current + 1 : current - 1); resetTimer(); }
});

resetTimer();
