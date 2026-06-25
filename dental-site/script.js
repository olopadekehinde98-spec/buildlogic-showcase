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

gsap.utils.toArray('.fan-card').forEach((el, i) => {
  gsap.fromTo(el, { opacity: 0, y: 60, rotate: 0, scale: 0.9 }, {
    opacity: 1, y: 0, rotate: 'var(--rot)', scale: 1, duration: 0.9, delay: i * 0.08, ease: 'back.out(1.6)',
    scrollTrigger: { trigger: '.fan-stack', start: 'top 80%', toggleActions: 'play reverse play reverse' }
  });
});

document.querySelectorAll('.blob').forEach((blob, i) => {
  gsap.to(blob, {
    x: () => (Math.random() - 0.5) * 160,
    y: () => (Math.random() - 0.5) * 160,
    duration: 12 + i * 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
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
