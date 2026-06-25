/*
  ===========================================================
  CLIENT CONFIG — edit this file to rebrand the whole site.
  Everything in here is the only stuff that changes per client.
  Colors live in styles.css (top of the file, --navy/--gold vars).
  ===========================================================
*/
const SITE = {
  brandName: "Luxe Beauty Lounge",
  logoText: "Luxe & Beauty",
  sinceYear: "2014",

  heroEyebrow: "Where Beauty Meets Relaxation",
  heroHeading: "Glow Like<br>Never Before.",
  heroSub: "Luxe Beauty Lounge is your sanctuary for hair, skin, and self-care — expert stylists, premium products, and an atmosphere made for unwinding.",

  stats: [
    { value: "11+", label: "Years of Beauty Care" },
    { value: "15,000+", label: "Clients Pampered" },
    { value: "4.8★", label: "Average Rating" }
  ],

  address: "17 Bourdillon Road, Ikoyi, Lagos",
  phone: "+234 800 333 2211",
  email: "book@luxebeautylounge.com",
  hours: "Tue–Sun: 9am – 8pm",

  footerTagline: "Glow like never before — since 2014."
};

// --- Binder: fills in any element marked with data-site / data-site-html ---
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-site]').forEach(el => {
    const key = el.getAttribute('data-site');
    if (SITE[key] !== undefined) el.textContent = SITE[key];
  });
  document.querySelectorAll('[data-site-html]').forEach(el => {
    const key = el.getAttribute('data-site-html');
    if (SITE[key] !== undefined) el.innerHTML = SITE[key];
  });

  document.title = SITE.brandName;
  document.querySelectorAll('[data-site="copyright"]').forEach(el => {
    el.textContent = `© ${new Date().getFullYear()} ${SITE.brandName}. All rights reserved.`;
  });

  const statsWrap = document.getElementById('hero-stats');
  if (statsWrap) {
    statsWrap.innerHTML = SITE.stats
      .map(s => `<div><strong>${s.value}</strong><span>${s.label}</span></div>`)
      .join('');
  }
});
