// =============================================
// ULTRA MASTER AI — COMPLETE SCRIPT
// =============================================

// ========== INTRO HANDLER ==========
window.addEventListener('load', () => {
  const introOverlay = document.getElementById('intro-overlay');
  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    introOverlay.classList.add('fade-out');
    introOverlay.addEventListener('transitionend', () => {
      introOverlay.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
    document.body.style.height = '500vh'; // scrollable area
  }, 5000);
});

// ========== SCROLL-DRIVEN PLANET FLYBY ==========
const cameraRig = document.getElementById('cameraRig');
const solarSystms = document.querySelectorAll('.solar_systm');
const planetCount = solarSystms.length;

function updateCamera() {
  const scrollY = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const progress = Math.min(scrollY / maxScroll, 1);

  const minZ = 0;
  const maxZ = -18400;
  const currentZ = minZ + (maxZ - minZ) * progress;
  cameraRig.style.setProperty('--camera-z', `${currentZ}px`);

  // Find closest planet to camera
  let activeIndex = 0;
  let minDistance = Infinity;
  solarSystms.forEach((systm, index) => {
    const planetZ = parseFloat(getComputedStyle(systm).getPropertyValue('--planet-z')) || 0;
    const worldZ = planetZ + currentZ;
    const distance = Math.abs(worldZ);
    if (distance < minDistance) {
      minDistance = distance;
      activeIndex = index;
    }
  });

  solarSystms.forEach(s => s.classList.remove('active'));
  if (solarSystms[activeIndex]) {
    solarSystms[activeIndex].classList.add('active');
  }
}

window.addEventListener('scroll', updateCamera);
window.addEventListener('resize', updateCamera);
updateCamera();

// ========== MOUSE GLOW TRACKING ==========
const mouseGlow = document.getElementById('mouseGlow');
document.addEventListener('mousemove', (e) => {
  mouseGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
});

// ========== CANVAS STARFIELD ==========
const canvas = document.createElement('canvas');
canvas.id = 'starCanvas';
document.body.prepend(canvas);
const ctx = canvas.getContext('2d');

canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';
canvas.style.pointerEvents = 'none';

let stars = [];
const STAR_COUNT = 250;

function initStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.8 + 0.3,
      speed: Math.random() * 0.4 + 0.1,
      opacity: Math.random() * 0.9 + 0.1
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
    ctx.fill();
    star.y += star.speed;
    if (star.y > canvas.height + 5) {
      star.y = -5;
      star.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(drawStars);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', () => {
  resizeCanvas();
  initStars();
});

resizeCanvas();
initStars();
drawStars();