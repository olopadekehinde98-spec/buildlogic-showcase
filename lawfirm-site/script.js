const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let W, H, particles = [];
const COUNT = 90;
const ACCENT = [201, 162, 74];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

particles = Array.from({ length: COUNT }, () => ({
  x: Math.random() * W,
  y: Math.random() * H,
  vx: (Math.random() - 0.5) * 0.25,
  vy: (Math.random() - 0.5) * 0.25,
  r: Math.random() * 1.6 + 0.6
}));

const mouse = { x: -9999, y: -9999 };
window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });

function draw() {
  ctx.clearRect(0, 0, W, H);
  for (const p of particles) {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
  }
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    for (let j = i + 1; j < particles.length; j++) {
      const b = particles[j];
      const dx = p.x - b.x, dy = p.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 140) {
        const alpha = (1 - dist / 140) * 0.18;
        ctx.strokeStyle = `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
    const dmx = p.x - mouse.x, dmy = p.y - mouse.y;
    const dm = Math.sqrt(dmx * dmx + dmy * dmy);
    if (dm < 180) {
      const alpha = (1 - dm / 180) * 0.35;
      ctx.strokeStyle = `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},${alpha})`;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }
    ctx.fillStyle = `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},0.7)`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(draw);
}
draw();

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

gsap.utils.toArray('.timeline-item').forEach((el, i) => {
  const fromLeft = i % 2 === 0;
  gsap.fromTo(el, { opacity: 0, x: fromLeft ? -70 : 70 }, {
    opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play reverse play reverse' }
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
    button.textContent = 'Message Sent \u2713';
    form.reset();
    setTimeout(() => { button.textContent = original; }, 2500);
  });
}
