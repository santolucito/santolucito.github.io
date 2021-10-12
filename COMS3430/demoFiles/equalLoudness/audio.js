
var audioCtx;
var gainNode;
const playRefTone = document.getElementById('refTone');
const playNewTone = document.getElementById('newTone');

function playTone(toneFreq, toneAmp) {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)
    }
    
    osc = audioCtx.createOscillator();
    gainNode = audioCtx.createGain();
    osc.connect(gainNode).connect(audioCtx.destination);
    gainNode.gain.value = toneAmp;
    osc.frequency.value = toneFreq;
    osc.start();
    osc.stop(audioCtx.currentTime + 0.5)

}

playRefTone.addEventListener('click', function() {
    playTone(440, 0.2);
}, false);

playNewTone.addEventListener('click', function() {
    playTone(document.getElementById("currentFreq").value, document.getElementById("gainLevel").value/100)
}, false);
