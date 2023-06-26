var audioCtx;
var delay;

const playButton = document.querySelector('button');

playButton.addEventListener('click', async function () {

const audioCtx = new AudioContext();
if (navigator.mediaDevices) {
  navigator.mediaDevices.getUserMedia({"audio": true}).then((stream) => {
    const microphone = audioCtx.createMediaStreamSource(stream);
    // `microphone` can now act like any other AudioNode
  }).catch((err) => {
    // browser unable to access microphone
    // (check to see if microphone is attached)
  });
} else {
  // browser unable to access media devices
  // (update your browser)
}
  delay = audioCtx.createDelay(1);
  delay.delayTime = 0;
  const source = microphone
  source.connect(delay).connect(audioCtx.destination);
  source.connect(audioCtx.destination);
  source.buffer = audioBuffer;
  source.start();

});

function changeDelay(newDelay) {
  delay.delayTime.setValueAtTime(newDelay / 1000, audioCtx.currentTime);
  document.getElementById("delayValue").innerHTML = newDelay;
}
