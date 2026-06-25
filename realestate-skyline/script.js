const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  success.classList.add('show');
  form.reset();
  setTimeout(() => success.classList.remove('show'), 5000);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i % 4 * 90);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const layerBack = document.querySelector('.layer-back');
const layerMid = document.querySelector('.layer-mid');
const layerFront = document.querySelector('.layer-front');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (layerBack) layerBack.style.transform = `translateY(${y * 0.25}px)`;
  if (layerMid) layerMid.style.transform = `translateY(${y * 0.45}px)`;
  if (layerFront) layerFront.style.transform = `translateY(${y * 0.7}px)`;
});
