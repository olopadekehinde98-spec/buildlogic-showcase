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

/* ---------- Illusion shader background (rose strands) ---------- */
const canvas = document.getElementById('bg');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

const uniforms = {
  uTime: { value: 0 },
  uMouse: { value: new THREE.Vector2(0, 0) },
  uScroll: { value: 0 },
  uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
};

const fragmentShader = `
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;

  float strand(vec2 uv, float offset, float freq, float amp, float speed, float thickness) {
    float y = sin(uv.x * freq + uTime * speed + offset) * amp
            + sin(uv.x * freq * 2.0 + uTime * speed * 1.5 + offset) * amp * 0.4;
    float d = abs(uv.y - y);
    return smoothstep(thickness, 0.0, d);
  }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= uResolution.x / uResolution.y;
    uv += uMouse * 0.05;
    uv.y += uScroll * 0.3;

    vec3 colA = vec3(1.0, 0.49, 0.78);
    vec3 colB = vec3(0.84, 0.64, 1.0);
    vec3 color = vec3(0.0);

    for (int i = 0; i < 4; i++) {
      float fi = float(i);
      float glow = strand(uv, fi * 2.0, 1.0 + fi * 0.32, 0.45 - fi * 0.06, 0.15 + fi * 0.035, 0.023 + fi * 0.01);
      vec3 mixed = mix(colA, colB, fi / 3.0);
      color += mixed * glow * (0.5 - fi * 0.07);
    }

    float vignette = smoothstep(1.4, 0.2, length(uv));
    color *= vignette;
    gl_FragColor = vec4(color, clamp(length(color), 0.0, 1.0));
  }
`;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader, transparent: true });
const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
scene.add(plane);

let mouseX = 0, mouseY = 0;
window.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

const clock = new THREE.Clock();
gsap.ticker.add(() => {
  uniforms.uTime.value = clock.getElapsedTime();
  uniforms.uMouse.value.x += (mouseX - uniforms.uMouse.value.x) * 0.05;
  uniforms.uMouse.value.y += (-mouseY - uniforms.uMouse.value.y) * 0.05;
  renderer.render(scene, camera);
});

function resizeRenderer() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', resizeRenderer);
window.addEventListener('load', resizeRenderer);
setTimeout(resizeRenderer, 100);

/* ---------- Scroll progress ---------- */
ScrollTrigger.create({
  trigger: 'main',
  start: 'top top',
  end: 'bottom bottom',
  onUpdate: (self) => {
    document.querySelector('.progress-fill').style.width = `${self.progress * 100}%`;
    uniforms.uScroll.value = self.progress;
  }
});

/* ---------- Reveal animations ---------- */
document.querySelectorAll('.hero, .section').forEach((section) => {
  const targets = section.querySelectorAll('.reveal');
  gsap.timeline({
    scrollTrigger: { trigger: section, start: 'top 65%', toggleActions: 'play reverse play reverse' }
  }).to(targets, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1 });
});

/* ---------- Forms (demo only, no backend) ---------- */
document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const button = form.querySelector('button');
    const original = button.textContent;
    button.textContent = 'Booking Sent ✓';
    form.reset();
    setTimeout(() => { button.textContent = original; }, 2500);
  });
});
