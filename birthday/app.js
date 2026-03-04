import * as THREE from "./assets/vendor/three.module.js";

const body = document.body;
const name = body.dataset.name || "Friend";
const birthday = body.dataset.birthday || "2026-03-05T00:00:00+00:00";

const heroName = document.getElementById("hero-name");
const footerName = document.getElementById("footer-name");
heroName.textContent = name;
footerName.textContent = name;

const scrollGallery = document.getElementById("scroll-gallery");
const scrollMessage = document.getElementById("scroll-message");
scrollGallery.addEventListener("click", () => {
  document.getElementById("gallery").scrollIntoView({ behavior: "smooth" });
});
scrollMessage.addEventListener("click", () => {
  document.getElementById("message").scrollIntoView({ behavior: "smooth" });
});

const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.18 }
);
revealElements.forEach((el) => observer.observe(el));

const loveRain = document.querySelector(".love-rain");
if (loveRain) {
  const hearts = Array.from({ length: 36 });
  hearts.forEach(() => {
    const heart = document.createElement("span");
    heart.className = "love-float";
    heart.textContent = "♥";
    const size = 10 + Math.random() * 16;
    heart.style.fontSize = `${size}px`;
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${8 + Math.random() * 10}s`;
    heart.style.animationDelay = `${-Math.random() * 8}s`;
    heart.style.opacity = `${0.4 + Math.random() * 0.6}`;
    loveRain.appendChild(heart);
  });
}

if (window.gsap) {
  gsap.from(".hero-title", { y: 30, opacity: 0, duration: 1.2, ease: "power3.out" });
  gsap.from(".hero-subtext", { y: 16, opacity: 0, duration: 1, delay: 0.2 });
  gsap.from(".hero-cta", { y: 10, opacity: 0, duration: 0.9, delay: 0.35 });
  gsap.from(".balloon", {
    y: 60,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    delay: 0.4,
  });
}

const typewriter = document.getElementById("typewriter");
const message = typewriter.dataset.message || "Wishing you endless joy.";
let typeIndex = 0;
function typeStep() {
  if (typeIndex <= message.length) {
    typewriter.textContent = message.slice(0, typeIndex);
    typeIndex += 1;
    setTimeout(typeStep, 30);
  }
}

const messageObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        typeStep();
        messageObserver.disconnect();
      }
    });
  },
  { threshold: 0.4 }
);
messageObserver.observe(typewriter);

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

const photoCards = document.querySelectorAll(".photo-card");
photoCards.forEach((card) => {
  card.addEventListener("click", () => openLightbox(card.dataset.full));
});

const lockOverlay = document.getElementById("lock-overlay");
const lockDays = document.getElementById("lock-days");
const lockHours = document.getElementById("lock-hours");
const lockMinutes = document.getElementById("lock-minutes");
const lockSeconds = document.getElementById("lock-seconds");

function updateLock() {
  const target = new Date(birthday).getTime();
  const now = Date.now();
  const diff = target - now;
  if (diff <= 0) {
    if (lockOverlay) {
      lockOverlay.classList.remove("show");
      lockOverlay.setAttribute("aria-hidden", "true");
      body.classList.remove("locked");
    }
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  if (lockDays) lockDays.textContent = String(days).padStart(2, "0");
  if (lockHours) lockHours.textContent = String(hours).padStart(2, "0");
  if (lockMinutes) lockMinutes.textContent = String(minutes).padStart(2, "0");
  if (lockSeconds) lockSeconds.textContent = String(seconds).padStart(2, "0");

  if (lockOverlay) {
    lockOverlay.classList.add("show");
    lockOverlay.setAttribute("aria-hidden", "false");
    body.classList.add("locked");
  }
}

updateLock();
setInterval(updateLock, 1000);

const confettiCanvas = document.getElementById("confetti-canvas");
const confettiCtx = confettiCanvas.getContext("2d");
const fireworksCanvas = document.getElementById("fireworks-canvas");
const fireworksCtx = fireworksCanvas.getContext("2d");
let confettiPieces = [];
let fireworks = [];

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  fireworksCanvas.width = window.innerWidth;
  fireworksCanvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createConfetti() {
  const colors = ["#ffd1f0", "#fce28f", "#91d4ff", "#f7b5ff", "#a2f2ff"];
  confettiPieces = Array.from({ length: 180 }, () => ({
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * confettiCanvas.height - confettiCanvas.height,
    size: 4 + Math.random() * 6,
    speed: 1 + Math.random() * 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    tilt: Math.random() * 10,
    rotation: Math.random() * Math.PI,
  }));
}

function confettiBurst() {
  const colors = ["#ffd1f0", "#fce28f", "#91d4ff", "#f7b5ff", "#a2f2ff"];
  const burst = Array.from({ length: 70 }, () => ({
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * confettiCanvas.height * 0.4,
    size: 5 + Math.random() * 6,
    speed: 3 + Math.random() * 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    tilt: Math.random() * 10,
    rotation: Math.random() * Math.PI,
  }));
  confettiPieces = confettiPieces.concat(burst);
  if (confettiPieces.length > 320) {
    confettiPieces = confettiPieces.slice(-320);
  }
}

function updateConfetti() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiPieces.forEach((piece) => {
    piece.y += piece.speed;
    piece.rotation += 0.02;
    piece.x += Math.sin(piece.y * 0.01) * 0.6;
    if (piece.y > confettiCanvas.height + 20) {
      piece.y = -20;
    }
    confettiCtx.save();
    confettiCtx.translate(piece.x, piece.y);
    confettiCtx.rotate(piece.rotation);
    confettiCtx.fillStyle = piece.color;
    confettiCtx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 1.6);
    confettiCtx.restore();
  });
  requestAnimationFrame(updateConfetti);
}

createConfetti();
updateConfetti();

function launchFirework() {
  const colors = ["#ffd27c", "#f7b0ff", "#6fc0ff", "#ffb7d9"];
  const x = Math.random() * fireworksCanvas.width;
  const y = (0.2 + Math.random() * 0.4) * fireworksCanvas.height;
  const particles = Array.from({ length: 40 }, () => ({
    x,
    y,
    radius: 2 + Math.random() * 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    velocityX: (Math.random() - 0.5) * 6,
    velocityY: (Math.random() - 0.5) * 6,
    life: 60 + Math.random() * 20,
  }));
  fireworks.push(particles);
}

function updateFireworks() {
  fireworksCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
  fireworks.forEach((burst, index) => {
    burst.forEach((particle) => {
      particle.x += particle.velocityX;
      particle.y += particle.velocityY;
      particle.life -= 1;
      particle.radius *= 0.98;
      fireworksCtx.beginPath();
      fireworksCtx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      fireworksCtx.fillStyle = particle.color;
      fireworksCtx.fill();
    });
    fireworks[index] = burst.filter((particle) => particle.life > 0);
  });
  fireworks = fireworks.filter((burst) => burst.length > 0);
  requestAnimationFrame(updateFireworks);
}

updateFireworks();

const surpriseBtn = document.getElementById("surprise-btn");
const surprise3d = document.querySelector(".surprise-3d");
const surpriseCanvas = document.getElementById("surprise-canvas");
let surpriseInitialized = false;

function initSurprise3D() {
  if (surpriseInitialized) return;
  surpriseInitialized = true;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 1.4, 4.2);

  const renderer = new THREE.WebGLRenderer({
    canvas: surpriseCanvas,
    antialias: true,
    alpha: true,
  });

  function resizeRenderer() {
    const rect = surpriseCanvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  resizeRenderer();
  window.addEventListener("resize", resizeRenderer);

  const ambient = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0xfff0d6, 1.1);
  keyLight.position.set(3, 4, 2);
  scene.add(keyLight);

  const fillLight = new THREE.PointLight(0x8bcaff, 0.8, 12);
  fillLight.position.set(-3, 2, 3);
  scene.add(fillLight);

  const cake = new THREE.Group();

  const layerMaterial1 = new THREE.MeshStandardMaterial({
    color: 0xffcfe8,
    metalness: 0.15,
    roughness: 0.35,
  });
  const layerMaterial2 = new THREE.MeshStandardMaterial({
    color: 0xbfe6ff,
    metalness: 0.15,
    roughness: 0.35,
  });
  const layerMaterial3 = new THREE.MeshStandardMaterial({
    color: 0xfff1b5,
    metalness: 0.2,
    roughness: 0.3,
  });
  const frostingMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.08,
    roughness: 0.2,
  });
  const candleMaterial = new THREE.MeshStandardMaterial({
    color: 0xff9ecf,
    metalness: 0.25,
    roughness: 0.3,
  });

  const layer1 = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.3, 0.5, 48), layerMaterial1);
  layer1.position.y = -0.4;
  const layer2 = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.0, 0.45, 48), layerMaterial2);
  layer2.position.y = 0.1;
  const layer3 = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.75, 0.4, 48), layerMaterial3);
  layer3.position.y = 0.55;

  const frosting = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.82, 0.18, 48), frostingMaterial);
  frosting.position.y = 0.85;

  const dripMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.05,
    roughness: 0.25,
  });
  const drips = new THREE.Group();
  for (let i = 0; i < 8; i += 1) {
    const drip = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.18, 12), dripMaterial);
    const angle = (i / 8) * Math.PI * 2;
    drip.position.set(Math.cos(angle) * 0.74, 0.72, Math.sin(angle) * 0.74);
    drips.add(drip);
  }

  const candle = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.35, 24), candleMaterial);
  candle.position.y = 1.15;
  const flame = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0xffd37a, emissive: 0xffb347, emissiveIntensity: 1.2 })
  );
  flame.position.y = 1.35;

  const trailGroup = new THREE.Group();
  const trailParticles = [];
  for (let i = 0; i < 18; i += 1) {
    const particle = new THREE.Mesh(
      new THREE.SphereGeometry(0.035, 10, 10),
      new THREE.MeshStandardMaterial({
        color: 0xfff1c4,
        emissive: 0xffc36b,
        emissiveIntensity: 1.1,
        transparent: true,
        opacity: 0.8,
      })
    );
    particle.position.set(
      (Math.random() - 0.5) * 0.12,
      1.38 + Math.random() * 0.4,
      (Math.random() - 0.5) * 0.12
    );
    particle.userData = {
      speed: 0.004 + Math.random() * 0.01,
      drift: (Math.random() - 0.5) * 0.002,
      life: 0.6 + Math.random() * 0.6,
    };
    trailGroup.add(particle);
    trailParticles.push(particle);
  }

  const sprinkles = new THREE.Group();
  const sprinkleColors = [0xff7eb6, 0x7ed3ff, 0xffc96b, 0xa88bff, 0x7dffb2];
  for (let i = 0; i < 30; i += 1) {
    const sprinkle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 0.12, 8),
      new THREE.MeshStandardMaterial({
        color: sprinkleColors[i % sprinkleColors.length],
        metalness: 0.1,
        roughness: 0.4,
      })
    );
    const angle = Math.random() * Math.PI * 2;
    const radius = 0.35 + Math.random() * 0.35;
    sprinkle.position.set(Math.cos(angle) * radius, 0.95 + Math.random() * 0.2, Math.sin(angle) * radius);
    sprinkle.rotation.z = Math.random() * Math.PI;
    sprinkle.rotation.x = Math.random() * Math.PI;
    sprinkles.add(sprinkle);
  }

  cake.add(layer1, layer2, layer3, frosting, drips, sprinkles, candle, flame, trailGroup);

  const sparkleGeometry = new THREE.SphereGeometry(0.08, 16, 16);
  const sparkleMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffe7b5,
    emissiveIntensity: 1.2,
  });
  const sparkles = new THREE.Group();
  for (let i = 0; i < 12; i += 1) {
    const sparkle = new THREE.Mesh(sparkleGeometry, sparkleMaterial);
    sparkle.position.set(
      (Math.random() - 0.5) * 2,
      1.0 + Math.random() * 1.2,
      (Math.random() - 0.5) * 2
    );
    sparkles.add(sparkle);
  }
  scene.add(sparkles);

  scene.add(cake);

  function animate() {
    cake.rotation.y += 0.01;
    cake.position.y = Math.sin(Date.now() * 0.002) * 0.05;
    flame.scale.setScalar(0.9 + Math.sin(Date.now() * 0.01) * 0.1);
    trailParticles.forEach((particle) => {
      particle.position.y += particle.userData.speed;
      particle.position.x += particle.userData.drift;
      particle.material.opacity -= 0.006;
      if (particle.material.opacity <= 0) {
        particle.position.set(
          (Math.random() - 0.5) * 0.12,
          1.38,
          (Math.random() - 0.5) * 0.12
        );
        particle.material.opacity = 0.8;
      }
    });
    sparkles.children.forEach((sparkle, index) => {
      sparkle.position.y += 0.005 + index * 0.0006;
      sparkle.material.emissiveIntensity = 0.8 + Math.sin(Date.now() * 0.003 + index) * 0.4;
      if (sparkle.position.y > 3) sparkle.position.y = 1.0;
    });
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();
}

surpriseBtn.addEventListener("click", () => {
  if (body.classList.contains("locked")) return;
  surpriseBtn.classList.add("hide");
  surprise3d.classList.add("show");
  initSurprise3D();
  confettiBurst();
  fireworksCanvas.style.opacity = "1";
  let bursts = 0;
  const interval = setInterval(() => {
    launchFirework();
    launchFirework();
    bursts += 1;
    if (bursts > 10) {
      clearInterval(interval);
      setTimeout(() => {
        fireworksCanvas.style.opacity = "0";
      }, 2400);
    }
  }, 220);
});

const audio = document.getElementById("birthday-audio");
const musicToggle = document.getElementById("music-toggle");
let musicEnabled = false;

async function toggleMusic() {
  try {
    if (!musicEnabled) {
      await audio.play();
      musicEnabled = true;
      musicToggle.setAttribute("aria-pressed", "true");
      musicToggle.querySelector(".icon").textContent = "❚❚";
    } else {
      audio.pause();
      musicEnabled = false;
      musicToggle.setAttribute("aria-pressed", "false");
      musicToggle.querySelector(".icon").textContent = "♪";
    }
  } catch (error) {
    console.warn("Autoplay blocked. User interaction required.", error);
  }
}

musicToggle.addEventListener("click", toggleMusic);

window.addEventListener("load", () => {
  audio.volume = 0.6;
  audio
    .play()
    .then(() => {
      musicEnabled = true;
      musicToggle.setAttribute("aria-pressed", "true");
      musicToggle.querySelector(".icon").textContent = "❚❚";
    })
    .catch(() => {
      musicEnabled = false;
    });
});

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  body.classList.toggle("theme-dark");
  const isDark = body.classList.contains("theme-dark");
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.querySelector(".icon").textContent = isDark ? "☾" : "☼";
});

const shareBtn = document.getElementById("share-btn");
shareBtn.addEventListener("click", async () => {
  const shareData = {
    title: `Happy Birthday ${name}`,
    text: "Celebrate this beautiful day!",
    url: window.location.href,
  };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(window.location.href);
      shareBtn.querySelector(".label").textContent = "Copied";
      setTimeout(() => {
        shareBtn.querySelector(".label").textContent = "Share";
      }, 1500);
    }
  } catch (error) {
    console.warn("Share canceled", error);
  }
});

const downloadBtn = document.getElementById("download-btn");

function roundRectPath(ctx, x, y, w, h, r) {
  if (ctx.roundRect) {
    ctx.roundRect(x, y, w, h, r);
    return;
  }
  const min = Math.min(w, h) / 2;
  const radius = Math.min(r, min);
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
}

async function downloadGallery() {
  const images = Array.from(document.querySelectorAll(".photo-card img"));
  const canvas = document.createElement("canvas");
  const columns = 3;
  const rows = 2;
  const width = 1200;
  const height = 800;
  const padding = 16;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#1a1030";
  ctx.fillRect(0, 0, width, height);

  const cellWidth = (width - padding * (columns + 1)) / columns;
  const cellHeight = (height - padding * (rows + 1)) / rows;

  const loaded = await Promise.all(
    images.map(
      (img) =>
        new Promise((resolve) => {
          const image = new Image();
          image.onload = () => resolve(image);
          image.src = img.src;
        })
    )
  );

  loaded.slice(0, columns * rows).forEach((image, index) => {
    const row = Math.floor(index / columns);
    const col = index % columns;
    const x = padding + col * (cellWidth + padding);
    const y = padding + row * (cellHeight + padding);
    ctx.save();
    ctx.beginPath();
    roundRectPath(ctx, x, y, cellWidth, cellHeight, 20);
    ctx.clip();
    ctx.drawImage(image, x, y, cellWidth, cellHeight);
    ctx.restore();
  });

  canvas.toBlob((blob) => {
    if (!blob) return;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "birthday-memories.png";
    link.click();
    URL.revokeObjectURL(link.href);
  });
}

downloadBtn.addEventListener("click", downloadGallery);
