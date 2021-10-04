
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

function updateMix(val) {
  wet.gain.value = val/100;
  dry.gain.value = 1-(val/100);
};

function makeBiquad(){
  biquadFilter = audioCtx.createBiquadFilter();
  biquadFilter.type = "allpass";
  biquadFilter.frequency.value = 1000;
  biquadFilter.Q.setValueAtTime(2, audioCtx.currentTime);
  return biquadFilter;
}
const playButton = document.querySelector('button');

playButton.addEventListener('click', async function() {

  audioCtx = new AudioContext()

  var audioBuffer = await loadBuffer('../../fall2020/samples/string.wav');
  const source = audioCtx.createBufferSource();
  source.loop = true;
  source.buffer = audioBuffer;
  source.start();

  bi1 = makeBiquad();
  bi2 = makeBiquad();
  bi3 = makeBiquad();
  bi4 = makeBiquad();

  dry = audioCtx.createGain();
  wet = audioCtx.createGain();
  dry.gain.value = 0.5
  wet.gain.value = 0.5

  lfo = audioCtx.createOscillator()
  lfo.frequency.value = 1
  lfo.start();
  lfoGain = audioCtx.createGain();
  lfoGain.gain.value = 750
  lfo.connect(lfoGain).connect(bi1.frequency);
  lfo.connect(lfoGain).connect(bi2.frequency);
  lfo.connect(lfoGain).connect(bi3.frequency);
  lfo.connect(lfoGain).connect(bi4.frequency);

  source.connect(dry).connect(audioCtx.destination);
  source.connect(wet).connect(bi1).connect(bi2).connect(bi3).connect(bi4).connect(audioCtx.destination);

});

