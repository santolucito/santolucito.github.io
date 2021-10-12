
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

const sourceSelector = document.getElementById('audio')
sourceSelector.addEventListener('change', function (event) {
  console.log(event.target.value);
  if(event.target.value == "Barnard"){
    sourceHilltop.connect(sourceSel);
    sourceDisco.disconnect();
    sourceString.disconnect();

  }
  else if (event.target.value == "Disco") {
    sourceDisco.connect(sourceSel);
    sourceHilltop.disconnect();
    sourceString.disconnect();
  }
  else{
    sourceString.connect(sourceSel);
    sourceHilltop.disconnect();
    sourceDisco.disconnect();

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
  sourceHilltop.buffer = hilltop;
  sourceHilltop.start();

  var audioBuffer = await loadBuffer('../../fall2020/samples/string.wav');
  sourceString = audioCtx.createBufferSource();
  sourceString.loop = true;
  sourceString.buffer = audioBuffer;
  sourceString.start();

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

  sourceSel.connect(dry).connect(audioCtx.destination);
  sourceSel.connect(wet).connect(bi1).connect(bi2).connect(bi3).connect(bi4).connect(audioCtx.destination);

});

