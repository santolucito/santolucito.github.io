
var audioCtx;


async function loadBuffer(bufferURL) {
  //better to have a try/catch block here, but for simplicity...
  const response = await fetch(bufferURL);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  return audioBuffer;
}

const playButton = document.querySelector('button');

playButton.addEventListener('click', async function() {

  audioCtx = new AudioContext()

  const panner = new PannerNode(audioCtx);
  panner.panningModel = 'HRTF';
  panner.positionY.value = 0.01; // being at y = 0 can be tricky
  
  // Creates a circular motion for HRTF panning
  let x = 0;
  let z = 0;
  const moveInCircle = () => {
    const later = audioCtx.currentTime + 0.016; // 1 frame is ~16ms
    panner.positionX.linearRampToValueAtTime(Math.sin(x), later);
    panner.positionZ.linearRampToValueAtTime(Math.cos(z), later);
    x += 0.01; // speed of x-axis movement
    z += 0.01; // speed of z-axis movement
    requestAnimationFrame(moveInCircle);
  };

  var audioBuffer = await loadBuffer('../samples/barnard.mp3');
  const source = audioCtx.createBufferSource();
  source.connect(panner).connect(audioCtx.destination);
  source.buffer = audioBuffer;
  source.start();
  moveInCircle();

});

