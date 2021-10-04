
var audioCtx;

const playGrain = (bufferSource, startPos) => {
  const source = audioCtx.createBufferSource();
  const amp = audioCtx.createGain();
  source.connect(amp).connect(audioCtx.destination);
  source.buffer = bufferSource;

  const now = audioCtx.currentTime;
  const duration = bufferSource.duration * Math.random()* 0.02;
  amp.gain.setValueAtTime(0.0, now);
  amp.gain.linearRampToValueAtTime(
      Math.random()*0.5, now + duration * 0.1);
  amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  source.playbackRate.value = Math.random()*0.5+0.1;
  source.start(
      now,
      startPos,
      duration);
};

const playButton = document.querySelector('button');

async function loadBuffer(bufferURL) {
  const response = await fetch(bufferURL);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  return audioBuffer;
}

playButton.addEventListener('click', async function() {

  audioCtx = new AudioContext()

  var audioBuffer = await loadBuffer('../../fall2020/samples/barnard.mp3');

  const generateGrains = (startPos) => {
    // Genearates 4 grains per frame (~16.7ms)
    for (let i = 0; i < 4; ++i) {
      playGrain(audioBuffer, startPos);
    }
    requestAnimationFrame(function() {generateGrains((startPos+.02)%audioBuffer.duration)});
  };

  generateGrains(0);
});

