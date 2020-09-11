
var audioCtx;

const playButton = document.querySelector('button');
playButton.addEventListener('click', function() {

    audioCtx = new (window.AudioContext || window.webkitAudioContext)
    var osc = audioCtx.createOscillator();
    
    osc.connect(audioCtx.destination);

    osc.start();


}, false);