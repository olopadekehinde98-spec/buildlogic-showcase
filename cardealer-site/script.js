const canvas = document.getElementById('bg');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.2, 6);

const carGroup = new THREE.Group();
const bodyMat = new THREE.MeshBasicMaterial({ color: 0xe63946, wireframe: true });
const body = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.7, 1.4), bodyMat);
const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.6, 1.3), bodyMat);
cabin.position.set(-0.2, 0.6, 0);
const wheelGeo = new THREE.TorusGeometry(0.35, 0.12, 8, 16);
const wheelMat = new THREE.MeshBasicMaterial({ color: 0xffb703, wireframe: true });
const wheelPositions = [[-1.1, -0.4, 0.75], [1.1, -0.4, 0.75], [-1.1, -0.4, -0.75], [1.1, -0.4, -0.75]];
wheelPositions.forEach(([x, y, z]) => {
  const wheel = new THREE.Mesh(wheelGeo, wheelMat);
  wheel.position.set(x, y, z);
  carGroup.add(wheel);
});
carGroup.add(body, cabin);
scene.add(carGroup);

const lineMat = new THREE.LineBasicMaterial({ color: 0xff6b6b, transparent: true, opacity: 0.4 });
const speedLines = new THREE.Group();
for (let i = 0; i < 30; i++) {
  const y = (Math.random() - 0.5) * 4;
  const z = (Math.random() - 0.5) * 4;
  const geo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-8, y, z), new THREE.Vector3(8, y, z)
  ]);
  speedLines.add(new THREE.Line(geo, lineMat));
}
scene.add(speedLines);

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
  carGroup.rotation.y = Math.sin(t * 0.5) * 0.5 + 0.3;
  carGroup.position.y = Math.sin(t * 1.4) * 0.05;
  speedLines.children.forEach((line, i) => {
    line.position.x -= 0.06 + (i % 5) * 0.01;
    if (line.position.x < -8) line.position.x = 8;
  });
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

const railSection = document.querySelector('.rail-section');
const railTrack = document.querySelector('.rail-track');
if (railSection && railTrack) {
  const getScrollAmount = () => railTrack.scrollWidth - window.innerWidth + 96;
  gsap.to(railTrack, {
    x: () => -getScrollAmount(),
    ease: 'none',
    scrollTrigger: {
      trigger: railSection,
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
