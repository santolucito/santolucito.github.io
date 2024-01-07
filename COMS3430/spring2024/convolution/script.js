
var audioCtx;

var sourceDisco;
var sourceHilltop;
var sourceSel;

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

const sourceSelector = document.getElementById('audio')
sourceSelector.addEventListener('change', function (event) {
  console.log(event.target.value);
  if(event.target.value == "Barnard"){
    sourceHilltop.connect(sourceSel);
    sourceDisco.disconnect();

  }
  else {
    sourceDisco.connect(sourceSel);
    sourceHilltop.disconnect();

  }
}, false);

const playButton = document.querySelector('button');

playButton.addEventListener('click', async function() {

  audioCtx = new AudioContext()

  sourceSel = audioCtx.createGain();

  discoSource = await loadBuffer('../../fall2020/samples/disco.wav');
  sourceDisco = audioCtx.createBufferSource();
  sourceDisco.loop = true;
  sourceDisco.connect(sourceSel);
  sourceDisco.buffer = discoSource;
  sourceDisco.start();

  hilltop = await loadBuffer('../../fall2020/samples/barnard.mp3');
  sourceHilltop = audioCtx.createBufferSource();
  sourceHilltop.loop = true;
  //sourceHilltop.connect(audioCtx.destination); - only connect when we switch to this through interface
  sourceHilltop.buffer = hilltop;
  sourceHilltop.start();

  gateIR = await loadBuffer('../../fall2020/samples/reverse-gate.mp3');
  churchIR = await loadBuffer('../../fall2020/samples/big-church.mp3');
  reverb = audioCtx.createConvolver();
  reverb.buffer = gateIR;
  
  dry = audioCtx.createGain();
  wet = audioCtx.createGain();
  dry.gain.value = 0.5;
  wet.gain.value = 0.5;

  sourceSel.connect(dry).connect(audioCtx.destination);
  sourceSel.connect(reverb).connect(wet).connect(audioCtx.destination);


});


