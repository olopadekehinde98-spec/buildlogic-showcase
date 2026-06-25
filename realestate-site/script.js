const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
gsap.registerPlugin(ScrollTrigger);
lenis.on('scroll', ScrollTrigger.update);

document.querySelectorAll('.hero, .section').forEach((section) => {
  const targets = section.querySelectorAll('.reveal');
  gsap.timeline({
    scrollTrigger: { trigger: section, start: 'top 65%', toggleActions: 'play reverse play reverse' }
  }).to(targets, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1 });
});

document.querySelectorAll('.tilt-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, { rotateY: px * 14, rotateX: -py * 14, duration: 0.4, ease: 'power2.out', transformPerspective: 800 });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power3.out' });
  });
});

gsap.to('.blueprint-bg', {
  backgroundPosition: '600px 600px',
  ease: 'none',
  scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: true }
});

ScrollTrigger.create({
  trigger: 'main',
  start: 'top top',
  end: 'bottom bottom',
  onUpdate: (self) => {
    document.querySelector('.progress-fill').style.width = `${self.progress * 100}%`;
  }
});

document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const button = form.querySelector('button');
    const original = button.textContent;
    button.textContent = 'Request Sent ✓';
    form.reset();
    setTimeout(() => { button.textContent = original; }, 2500);
  });
});
