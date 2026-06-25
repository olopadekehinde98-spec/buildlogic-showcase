const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
gsap.registerPlugin(ScrollTrigger);
lenis.on('scroll', ScrollTrigger.update);

const routePath = document.getElementById('route-path');
if (routePath) {
  const len = routePath.getTotalLength();
  routePath.style.strokeDasharray = len;
  routePath.style.strokeDashoffset = len;
  gsap.to(routePath, {
    strokeDashoffset: 0,
    ease: 'none',
    scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: true }
  });
}

gsap.utils.toArray('.reveal').forEach((el, i) => {
  gsap.fromTo(el, { opacity: 0, y: 40 }, {
    opacity: 1, y: 0, duration: 0.8, delay: i * 0.03, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play reverse play reverse' }
  });
});

const conveyor = document.querySelector('.conveyor');
if (conveyor) {
  const getScrollAmount = () => conveyor.scrollWidth - window.innerWidth + 96;
  gsap.to(conveyor, {
    x: () => -getScrollAmount(),
    ease: 'none',
    scrollTrigger: {
      trigger: '.conveyor-wrap',
      start: 'top top',
      end: () => `+=${getScrollAmount()}`,
      pin: true,
      scrub: true,
      invalidateOnRefresh: true
    }
  });
}

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
