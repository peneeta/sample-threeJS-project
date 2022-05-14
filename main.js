import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Scene is analogous to HTML container
const scene = new THREE.Scene();

// Camera shows perspective
// Arg 1 = FOV, Arg 2 = Aspect Ratio, Arg3 and 4 = View Frustrum
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

// Renderer to render the graphics (draws them to the site)
const renderer = new THREE.WebGLRenderer({
  // Set bg from HTML to this canvas
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene, camera);

// Creating a torus object
const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial( {color: 0xFF6347} );
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)

// Lighting
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

// Light and Grid Helpers
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

// Add stars randomly to the scene
function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star)

}

Array(200).fill().forEach(addStar)

// Setting the space background
const spaceTexture = new THREE.TextureLoader().load('./images/spacetexture.png');
scene.background = spaceTexture;

// Texture Mapping
const peneetaTexture = new THREE.TextureLoader().load('./images/me-charleston.png');

// Creating me as a texture
const peneeta = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: peneetaTexture})
);
scene.add(peneeta);

// Creating a Moon Object
const moonTexture = new THREE.TextureLoader().load('./images/moon.png');
// Normal texture creates illusion of moon craters/mountains
const normalTexture = new THREE.TextureLoader().load('./images/moonnormal.jpeg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({map: moonTexture, normalMap: normalTexture})
);
scene.add(moon);


// Recursive function that renders torus
function animate(){
  requestAnimationFrame(animate);

  // Torus rotation
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  // Grid motion
  controls.update();
  renderer.render(scene, camera);
}

animate()

