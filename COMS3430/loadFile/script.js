
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

  var audioBuffer = await loadBuffer('../samples/barnard.mp3');
  const source = audioCtx.createBufferSource();
  source.connect(audioCtx.destination);
  source.buffer = audioBuffer;
  source.start();

});

