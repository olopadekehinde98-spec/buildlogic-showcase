const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
gsap.registerPlugin(ScrollTrigger);
lenis.on('scroll', ScrollTrigger.update);

gsap.utils.toArray('.reveal').forEach((el, i) => {
  gsap.fromTo(el, { opacity: 0, y: 40 }, {
    opacity: 1, y: 0, duration: 0.8, delay: i * 0.03, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play reverse play reverse' }
  });
});

gsap.utils.toArray('.zig-row').forEach((row, i) => {
  const text = row.querySelector('.zig-text');
  const img = row.querySelector('.zig-img');
  const fromLeft = i % 2 === 0;
  gsap.fromTo(text, { opacity: 0, x: fromLeft ? -50 : 50 }, {
    opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: row, start: 'top 80%', toggleActions: 'play reverse play reverse' }
  });
  gsap.fromTo(img, { opacity: 0, scale: 0.85 }, {
    opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out',
    scrollTrigger: { trigger: row, start: 'top 80%', toggleActions: 'play reverse play reverse' }
  });
});

gsap.to('.stripe-bg', {
  backgroundPosition: '400px 400px',
  ease: 'none',
  scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: true }
});

gsap.to('.progress-fill', {
  width: '100%',
  ease: 'none',
  scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: true }
});

const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const button = form.querySelector('button');
    const original = button.textContent;
    button.textContent = 'Message Sent ✓';
    form.reset();
    setTimeout(() => { button.textContent = original; }, 2500);
  });
}
