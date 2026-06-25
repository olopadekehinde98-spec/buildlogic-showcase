/* ---------- Smooth scroll ---------- */
const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
gsap.registerPlugin(ScrollTrigger);
lenis.on('scroll', ScrollTrigger.update);

/* ---------- Wireframe rotating globe ---------- */
const canvas = document.getElementById('globe-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.set(0, 0, 5.5);

const globe = new THREE.Mesh(
  new THREE.SphereGeometry(1.8, 28, 28),
  new THREE.MeshBasicMaterial({ color: 0x2dd4bf, wireframe: true, transparent: true, opacity: 0.55 })
);
scene.add(globe);

const glowDots = [];
const dotGeo = new THREE.SphereGeometry(0.035, 8, 8);
const dotMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
for (let i = 0; i < 8; i++) {
  const dot = new THREE.Mesh(dotGeo, dotMat);
  const lat = (Math.random() - 0.5) * Math.PI;
  const lon = Math.random() * Math.PI * 2;
  const r = 1.8;
  dot.position.set(r * Math.cos(lat) * Math.cos(lon), r * Math.sin(lat), r * Math.cos(lat) * Math.sin(lon));
  glowDots.push(dot);
  globe.add(dot);
}

function resizeGlobe() {
  const wrap = document.querySelector('.hero-globe');
  if (!wrap) return;
  const w = wrap.clientWidth, h = wrap.clientHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resizeGlobe);
window.addEventListener('load', resizeGlobe);
setTimeout(resizeGlobe, 100);
setTimeout(resizeGlobe, 500);

function animateGlobe() {
  globe.rotation.y += 0.0025;
  renderer.render(scene, camera);
  requestAnimationFrame(animateGlobe);
}
animateGlobe();

/* ---------- Reveal animations ---------- */
gsap.utils.toArray('.reveal').forEach((el, i) => {
  gsap.fromTo(el, { opacity: 0, y: 40 }, {
    opacity: 1, y: 0, duration: 0.8, delay: i * 0.03, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play reverse play reverse' }
  });
});

/* ---------- Bento tiles scale-in ---------- */
gsap.utils.toArray('.bento-tile').forEach((el, i) => {
  gsap.fromTo(el, { opacity: 0, scale: 0.92 }, {
    opacity: 1, scale: 1, duration: 0.7, delay: i * 0.07, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play reverse play reverse' }
  });
});

/* ---------- Sticky-pin process steps ---------- */
const processPin = document.querySelector('.process-pin');
const steps = document.querySelectorAll('.proc-step');
if (processPin && steps.length) {
  ScrollTrigger.create({
    trigger: processPin,
    start: 'top top',
    end: () => `+=${steps.length * 400}`,
    pin: true,
    scrub: true,
    onUpdate: (self) => {
      const idx = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
      steps.forEach((s, i) => s.classList.toggle('active', i === idx));
    }
  });
}

/* ---------- Map route draw ---------- */
const mapRoute = document.querySelector('.map-route');
if (mapRoute) {
  const len = mapRoute.getTotalLength();
  mapRoute.style.strokeDasharray = len;
  mapRoute.style.strokeDashoffset = len;
  gsap.to(mapRoute, {
    strokeDashoffset: 0,
    duration: 1.6,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.map-wrap', start: 'top 75%' }
  });
}

/* ---------- Magnetic buttons ---------- */
document.querySelectorAll('.magnetic').forEach((el) => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: 'power3.out' });
  });
});

/* ---------- Coverage stat count-up ---------- */
gsap.utils.toArray('.coverage-stats .stat strong').forEach((el) => {
  const text = el.textContent.trim();
  const num = parseFloat(text);
  const suffix = text.replace(/[0-9.]/g, '');
  if (isNaN(num)) return;
  gsap.fromTo(el, { textContent: 0 }, {
    textContent: num,
    duration: 1.6,
    ease: 'power1.out',
    snap: { textContent: suffix === '%' ? 0.1 : 1 },
    onUpdate: function () {
      el.textContent = (suffix === '%' ? parseFloat(this.targets()[0].textContent).toFixed(1) : Math.floor(this.targets()[0].textContent)) + suffix;
    },
    scrollTrigger: { trigger: el, start: 'top 85%' }
  });
});

/* ---------- Scroll progress ---------- */
gsap.to('.progress-fill', {
  width: '100%',
  ease: 'none',
  scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: true }
});

/* ---------- Forms (demo only) ---------- */
document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const button = form.querySelector('button');
    const original = button.textContent;
    button.textContent = 'Quote Request Sent ✓';
    form.reset();
    setTimeout(() => { button.textContent = original; }, 2500);
  });
});
