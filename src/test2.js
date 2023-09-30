import * as THREE from "../node_modules/three/build/three.module.js";

// Scene, camera, and renderer setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a curve from the image
const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-1, -1, 0),
  new THREE.Vector3(-0.5, -0.5, 0),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0.5, 0.5, 0),
  new THREE.Vector3(1, 1, 0),
]);

// Create a tube geometry to represent the curve
const tubeGeometry = new THREE.TubeGeometry(curve, 100, 0.1, 20, false);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const tubeMesh = new THREE.Mesh(tubeGeometry, material);
scene.add(tubeMesh);

// Set camera position
camera.position.set(0, 0, 10);

// Animation loop
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

// Start the animation loop
animate();
