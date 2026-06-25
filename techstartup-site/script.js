const canvas = document.getElementById('bg');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.6, 3.2);
camera.rotation.x = -0.35;

const grid = new THREE.GridHelper(40, 40, 0x36e0d6, 0x16302e);
grid.position.y = -1.2;
scene.add(grid);

const grid2 = new THREE.GridHelper(40, 40, 0x7c5cff, 0x18142e);
grid2.position.y = -1.2;
grid2.material.transparent = true;
grid2.material.opacity = 0.3;
scene.add(grid2);

const pointGeo = new THREE.BufferGeometry();
const pCount = 120;
const pPos = new Float32Array(pCount * 3);
for (let i = 0; i < pCount; i++) {
  pPos[i * 3] = (Math.random() - 0.5) * 12;
  pPos[i * 3 + 1] = Math.random() * 3;
  pPos[i * 3 + 2] = -Math.random() * 30;
}
pointGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
const pointMat = new THREE.PointsMaterial({ color: 0x36e0d6, size: 0.04, transparent: true, opacity: 0.7 });
const points = new THREE.Points(pointGeo, pointMat);
scene.add(points);

function resizeRenderer() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resizeRenderer);
window.addEventListener('load', resizeRenderer);
setTimeout(resizeRenderer, 100);

let t = 0;
function animate() {
  t += 0.01;
  grid.position.z = (t * 4) % 1;
  grid2.position.z = (t * 4) % 1;
  points.position.z = (t * 6) % 30;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

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

const glitchEl = document.querySelector('.glitch-text');
if (glitchEl) {
  gsap.timeline({ repeat: -1, repeatDelay: 4 })
    .to(glitchEl, { skewX: 8, x: -4, duration: 0.05 })
    .to(glitchEl, { skewX: -6, x: 4, duration: 0.05 })
    .to(glitchEl, { skewX: 0, x: 0, duration: 0.05 });
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
