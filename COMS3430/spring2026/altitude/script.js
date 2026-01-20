
var audioCtx;
var panner;

// Set up the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
document.body.appendChild(renderer.domElement);

// Create axes
const axesHelper = new THREE.AxesHelper(1);
scene.add(axesHelper);

function createLabel(text, x, y, z) {
  const label = createTextMesh(text);
  label.position.set(x, y, z);
  return label;
}


// Load font
const fontLoader = new THREE.FontLoader();
fontLoader.load('https://cdn.jsdelivr.net/npm/three@0.133.0/examples/fonts/helvetiker_regular.typeface.json', function (font) {
  // Create labels for axes
  const labelX = createLabel('X', 1, 0, 0, font);
  const labelY = createLabel('Y', 0, 1, 0, font);
  const labelZ = createLabel('Z', 0, 0, 1, font);
  scene.add(labelX);
  scene.add(labelY);
  scene.add(labelZ);
});

function createLabel(text, x, y, z, font) {
  const label = createTextMesh(text, font);
  label.position.set(x, y, z);
  return label;
}

function createTextMesh(text, font) {
  const geometry = new THREE.TextGeometry(text, {
    font: font,
    size: 0.5,
    height: 0.1,
  });
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}
// Load torso model
const loader = new THREE.GLTFLoader();
loader.load('./LeePerrySmith.glb', function (gltf) {
  gltf.scene.traverse(function (child) {
    if (child.isMesh) {
      child.material = new THREE.MeshBasicMaterial({ color: 0xF99D31 }); // Use MeshBasicMaterial
      child.scale.set(0.1, 0.1, 0.1);
      child.rotation.set(0, 0, 0);
    }
  });
  gltf.scene.position.set(0, 0, 0); // Place the model at the origin
  scene.add(gltf.scene);
});

// Create vector
const vector = new THREE.Vector3(0, 0, 1); // Example vector
const origin = new THREE.Vector3(0, 0, 0);
var arrowHelper = new THREE.ArrowHelper(vector.clone().normalize(), origin, vector.length(), 0xff0000);
scene.add(arrowHelper);

// Set camera position
camera.position.z = 10;

// Add orbit controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

async function loadBuffer(bufferURL) {
  //better to have a try/catch block here, but for simplicity...
  const response = await fetch(bufferURL);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  return audioBuffer;
}

const randomizeButton = document.getElementById('randomizeButton');
randomizeButton.addEventListener('click', async function () {

  const getRand = (() => (Math.random() * 2) - 1)
  xPos = getRand()
  yPos = getRand()
  zPos = getRand()
  panner.positionX.value = xPos
  panner.positionY.value = yPos
  panner.positionZ.value = zPos
  scene.remove(arrowHelper);
  const newVector = new THREE.Vector3(-xPos, yPos, -zPos); // x and z and reversed between webaudio and threejs
  arrowHelper = new THREE.ArrowHelper(newVector.clone().normalize(), origin, newVector.length(), 0xff0000);
  scene.add(arrowHelper);
  console.log(xPos, yPos, zPos)
});

const playButton = document.getElementById('playButton');
playButton.addEventListener('click', async function () {

  audioCtx = new AudioContext()
  panner = new PannerNode(audioCtx);
  panner.panningModel = 'HRTF';
  panner.positionX.value = 0; // being at x = 0 means out centered left-right (left is negative - see https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/positionX)
  panner.positionY.value = 0.01; // being at y (height)= 0 can be tricky
  panner.positionZ.value = -1; // being at z = -1 means out in front of us (+1 is behind us)


  var audioBuffer = await loadBuffer('../../fall2020/samples/barnard.mp3');
  const source = audioCtx.createBufferSource();
  source.connect(panner).connect(audioCtx.destination);
  source.buffer = audioBuffer;
  source.start();
  document.getElementById('randomizeButton').disabled = false;
});

