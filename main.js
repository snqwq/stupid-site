// imports
import * as THREE from 'https://unpkg.com/three@160/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';

// variables
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const loader = new GLTFLoader();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// load model
loader.load('fish.glb', function (gltf) {
	scene.add(gltf.scene);
}, undefined, function (error) {
	console.error(error);
}
);

// make responsive
window.addEventListener('resize', function () {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
});

// animate	model spinning
function animateModel() {
	requestAnimationFrame(animateModel);
	scene.rotation.y += 0.01;
	scene.rotation.x += 0.005;
}

// lighting
const light = new THREE.AmbientLight(0x404040, 25); // soft white light
scene.add(light);

// camera
camera.position.z = 1;

// render
function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}
animate();
animateModel();
