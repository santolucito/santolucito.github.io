
var audioCtx;
var delay;

async function loadBuffer(bufferURL) {
  //better to have a try/catch block here, but for simplicity...
  const response = await fetch(bufferURL);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  return audioBuffer;
}

const playButton = document.querySelector('button');

playButton.addEventListener('click', async function () {

  audioCtx = new AudioContext()
  delay = audioCtx.createDelay(1);
  delay.delayTime = 0;
  var audioBuffer = await loadBuffer('../../fall2020/samples/barnard.mp3');
  const source = audioCtx.createBufferSource();
  source.connect(delay).connect(audioCtx.destination);
  source.connect(audioCtx.destination);
  source.buffer = audioBuffer;
  source.start();

});

function changeDelay(newDelay) {
  delay.delayTime.setValueAtTime(newDelay / 1000, audioCtx.currentTime);
  document.getElementById("delayValue").innerHTML = newDelay;
}
