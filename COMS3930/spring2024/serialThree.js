/*

you also need this code on the ESP32. 
change the code for whichever pin your button is on
note that some pins don't work when connected to web serial

-----

#define BUTTON 35

void setup() {
  Serial.begin(115200);
  pinMode(BUTTON, INPUT);
}

void loop() {
  Serial.print(digitalRead(BUTTON));
  delay(100);
}

*/


//when the user clicks anywhere on the page
document.addEventListener('click', async () => {
  // Prompt user to select any serial port.
  var port = await navigator.serial.requestPort();
  // be sure to set the baudRate to match the ESP32 code
  await port.open({ baudRate: 115200 });

  let decoder = new TextDecoderStream();
  inputDone = port.readable.pipeTo(decoder.writable);
  inputStream = decoder.readable;

  reader = inputStream.getReader();
  readLoop();

});

var inputButton = false;

async function readLoop() {
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      // Allow the serial port to be closed later.
      console.log("closing connection")
      reader.releaseLock();
      break;
    }
    console.log(value);
    if (value) {
      parsedVal = parseInt(value);
      if (!isNaN(parsedVal) && parsedVal == 1) {
        inputButton = true;
      }
      else {
        inputButton = false;
      }

    }
  }
};



// Create an empty scene
var scene = new THREE.Scene();

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 4;

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({antialias:true});

// Configure renderer clear color
renderer.setClearColor("#000000");

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

// Append Renderer to DOM
document.body.appendChild( renderer.domElement );

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

// Create a Cube Mesh with basic material
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: "#433F81" } );
var cube = new THREE.Mesh( geometry, material );

// Add cube to Scene
scene.add( cube );

// Render Loop
var render = function () {
  requestAnimationFrame( render );

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  if (inputButton) {
    cube.material.color.setHex(0xff0000)
  }
  else {
    cube.material.color.setHex(0xff00ff)
  }

  // Render the scene
  renderer.render(scene, camera);
};

render();
