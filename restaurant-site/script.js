/* ---------- Smooth scroll ---------- */
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
lenis.on('scroll', ScrollTrigger.update);
gsap.registerPlugin(ScrollTrigger);

/* ---------- Rising embers background ---------- */
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let W, H, embers = [];
const EMBER_COUNT = 70;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
window.addEventListener('load', resize);
resize();

function spawnEmber() {
  return {
    x: Math.random() * W,
    y: H + Math.random() * 100,
    r: Math.random() * 2.5 + 0.8,
    speed: Math.random() * 0.8 + 0.3,
    drift: (Math.random() - 0.5) * 0.6,
    flicker: Math.random() * Math.PI * 2,
    hue: Math.random() > 0.5 ? [255, 138, 76] : [255, 197, 110]
  };
}
embers = Array.from({ length: EMBER_COUNT }, spawnEmber);

function draw() {
  ctx.clearRect(0, 0, W, H);
  embers.forEach((e) => {
    e.y -= e.speed;
    e.x += e.drift;
    e.flicker += 0.1;
    if (e.y < -20) Object.assign(e, spawnEmber(), { y: H + 20 });
    const alpha = 0.4 + Math.sin(e.flicker) * 0.3;
    ctx.fillStyle = `rgba(${e.hue[0]},${e.hue[1]},${e.hue[2]},${Math.max(alpha, 0.1)})`;
    ctx.beginPath();
    ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(draw);
}
draw();

/* ---------- Scroll progress ---------- */
ScrollTrigger.create({
  trigger: 'main',
  start: 'top top',
  end: 'bottom bottom',
  onUpdate: (self) => {
    document.querySelector('.progress-fill').style.width = `${self.progress * 100}%`;
  }
});

/* ---------- Reveal animations ---------- */
document.querySelectorAll('.hero, .section').forEach((section) => {
  const targets = section.querySelectorAll('.reveal');
  gsap.timeline({
    scrollTrigger: { trigger: section, start: 'top 65%', toggleActions: 'play reverse play reverse' }
  }).to(targets, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1 });
});

/* ---------- Rotating dish wheel ---------- */
const wheel = document.querySelector('.dish-wheel');
if (wheel) {
  const slots = wheel.querySelectorAll('.dish-slot');
  const radius = 220;
  slots.forEach((slot, i) => {
    const angle = (i / slots.length) * Math.PI * 2;
    gsap.set(slot, {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius * 0.4,
      scale: 0.85
    });
  });
  gsap.to(wheel, {
    rotation: 360,
    duration: 24,
    repeat: -1,
    ease: 'none',
    transformOrigin: 'center center'
  });
  slots.forEach((slot) => {
    gsap.to(slot, { rotation: -360, duration: 24, repeat: -1, ease: 'none' });
  });
}

/* ---------- Forms (demo only, no backend) ---------- */
document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const button = form.querySelector('button');
    const original = button.textContent;
    button.textContent = 'Reservation Sent ✓';
    form.reset();
    setTimeout(() => { button.textContent = original; }, 2500);
  });
});
