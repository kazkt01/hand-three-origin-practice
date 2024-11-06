import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/OBJLoader.js";

// Create a scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

// Instantiate OBJLoader
const loader = new OBJLoader();

// Array to hold loaded objects
const objects = [];

// Function to load OBJ file and add to scene
const loadObject = (path, position) => {
  loader.load(
    path,
    (obj) => {
      obj.position.copy(position);
      scene.add(obj);
      objects.push(obj); // Store the object in the array
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
      console.error(error);
    }
  );
};

// Load multiple objects with different positions
loadObject("obj/16834_hand_v1_NEW.obj", new THREE.Vector3(0, 0, 0));
// loadObject("obj/16834_hand_v1_NEW.obj", new THREE.Vector3(50, 0, 0));
// loadObject("obj/16834_hand_v1_NEW.obj", new THREE.Vector3(-50, 0, 0));

// Set up camera position
camera.position.z = 30;

// Add lights
const ambientLight = new THREE.AmbientLight(0x333333, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Set up OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate all objects
  objects.forEach((obj) => {
    obj.rotation.x += 0.01;
    obj.rotation.y += 0.01;
  });

  controls.update();
  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
