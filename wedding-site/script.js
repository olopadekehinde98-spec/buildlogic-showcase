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

gsap.to('.px-1', {
  yPercent: 25,
  ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
});

gsap.utils.toArray('.mask-img').forEach((el, i) => {
  gsap.fromTo(el, { clipPath: 'inset(100% 0 0 0)' }, {
    clipPath: 'inset(0% 0 0 0)', duration: 1.1, delay: i * 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
  });
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
