
var audioCtx;
var biquadFilter;
var dry;
var wet;

async function loadBuffer(bufferURL) {
  //better to have a try/catch block here, but for simplicity...
  const response = await fetch(bufferURL);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  return audioBuffer;
}

function updateFreq(val) {
  biquadFilter.frequency.value = val;
};

function updateMix(val) {
  wet.gain.value = val/100;
  dry.gain.value = 1-(val/100);
};

const playButton = document.querySelector('button');

playButton.addEventListener('click', async function() {

  audioCtx = new AudioContext()

  var audioBuffer = await loadBuffer('../samples/disco.wav');
  const source = audioCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.start();

  
  biquadFilter = audioCtx.createBiquadFilter();

  biquadFilter.type = "allpass";
  biquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);
  biquadFilter.gain.setValueAtTime(50, audioCtx.currentTime);
  biquadFilter.Q.setValueAtTime(2, audioCtx.currentTime);

  dry = audioCtx.createGain();
  wet = audioCtx.createGain();
  dry.gain.value = 0.5
  wet.gain.value = 0.5

  source.connect(dry).connect(audioCtx.destination);
  source.connect(wet).connect(biquadFilter).connect(audioCtx.destination);

});

