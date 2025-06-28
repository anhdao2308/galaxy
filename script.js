// SETUP SCENE
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 20;

const controls = new THREE.OrbitControls(camera, renderer.domElement);

// TẠO SAO
const stars = [];
const geometry = new THREE.SphereGeometry(0.3, 12, 12);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

for (let i = 0; i < 80; i++) {
  const star = new THREE.Mesh(geometry, material.clone());
  star.position.set(
    (Math.random() - 0.5) * 60,
    (Math.random() - 0.5) * 60,
    (Math.random() - 0.5) * 60
  );
  scene.add(star);
  stars.push(star);
}

// TƯƠNG TÁC CLICK
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
window.addEventListener("click", (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(stars);
  if (intersects.length > 0) {
    const star = intersects[0].object;
    gsap.to(star.scale, {
      x: 2,
      y: 2,
      z: 2,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
    });
    document.getElementById("label").textContent =
      "💖 Một lời chúc đang gửi đến bạn!";
  }
});

// ANIMATE
function animate() {
  stars.forEach((star) => {
    star.rotation.x += 0.001;
    star.rotation.y += 0.001;
  });
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

// RESIZE
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// SAO NHỎ (particles)
tsParticles.load("bg", {
  fullScreen: { enable: false },
  background: { color: "#000" },
  particles: {
    number: { value: 50 },
    size: { value: 1 },
    move: { enable: true, speed: 0.1 },
    opacity: { value: 0.5 },
    color: { value: "#ffffff" },
  },
});
