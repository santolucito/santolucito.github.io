
var audioCtx;

var discoSource;

var churchIR;
var gateIR;

var source;

async function loadBuffer(bufferURL) {
  //better to have a try/catch block here, but for simplicity...
  const response = await fetch(bufferURL);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  return audioBuffer;
}

const sourceControl = document.getElementById('impulse')
sourceControl.addEventListener('change', function(event) {
  if(event.target.value == "gate"){
    reverb.buffer = gateIR;
  }
  else {
    reverb.buffer = churchIR;
  }
});

const playButton = document.querySelector('button');

playButton.addEventListener('click', async function() {

  audioCtx = new AudioContext()

  discoSource = await loadBuffer('../samples/disco.wav');
  source = audioCtx.createBufferSource();
  source.connect(audioCtx.destination);
  source.buffer = discoSource;
  source.start();

  gateIR = await loadBuffer('../samples/reverse-gate.mp3');
  churchIR = await loadBuffer('../samples/big-church.mp3');
  reverb = audioCtx.createConvolver();
  reverb.buffer = gateIR;
  
  dry = audioCtx.createGain();
  wet = audioCtx.createGain();
  dry.gain.value = 0.5;
  wet.gain.value = 0.5;

  source.connect(dry).connect(audioCtx.destination);
  source.connect(reverb).connect(wet).connect(audioCtx.destination);


});


