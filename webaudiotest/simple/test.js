
var audioCtx;

const playButton = document.querySelector('button');
playButton.addEventListener('click', function() {

    audioCtx = new (window.AudioContext || window.webkitAudioContext)

    const globalGain = audioCtx.createGain();
    globalGain.gain.setValueAtTime(0, audioCtx.currentTime)
    globalGain.connect(audioCtx.destination);

    var osc = audioCtx.createOscillator();   
    osc.connect(globalGain);
    osc.start();


}, false);