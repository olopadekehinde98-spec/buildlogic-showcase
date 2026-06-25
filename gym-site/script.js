const canvas = document.getElementById('bg');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 6);

const geo = new THREE.IcosahedronGeometry(1.6, 0);
const wireMat = new THREE.MeshBasicMaterial({ color: 0xff3b3b, wireframe: true, transparent: true, opacity: 0.85 });
const solidMat = new THREE.MeshBasicMaterial({ color: 0xff8a3b, transparent: true, opacity: 0.06 });
const wireMesh = new THREE.Mesh(geo, wireMat);
const solidMesh = new THREE.Mesh(geo, solidMat);
scene.add(wireMesh, solidMesh);

const sparkGeo = new THREE.BufferGeometry();
const sparkCount = 200;
const positions = new Float32Array(sparkCount * 3);
for (let i = 0; i < sparkCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 10;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
}
sparkGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const sparkMat = new THREE.PointsMaterial({ color: 0xff5a3b, size: 0.025, transparent: true, opacity: 0.7 });
const sparks = new THREE.Points(sparkGeo, sparkMat);
scene.add(sparks);

const mouse = { x: 0, y: 0 };
window.addEventListener('mousemove', (e) => {
  mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
  mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
});

function resizeRenderer() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resizeRenderer);
window.addEventListener('load', resizeRenderer);
setTimeout(resizeRenderer, 100);

function animate() {
  wireMesh.rotation.x += 0.004;
  wireMesh.rotation.y += 0.006;
  solidMesh.rotation.copy(wireMesh.rotation);
  sparks.rotation.y += 0.0008;
  camera.position.x += (mouse.x * 1.2 - camera.position.x) * 0.04;
  camera.position.y += (-mouse.y * 1.2 - camera.position.y) * 0.04;
  camera.lookAt(0, 0, 0);
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

gsap.to('.marquee-track', {
  xPercent: -50,
  ease: 'none',
  duration: 14,
  repeat: -1
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
