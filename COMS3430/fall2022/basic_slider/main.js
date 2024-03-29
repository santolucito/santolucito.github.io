
var audioCtx;
var osc;
const playButton = document.querySelector('button');

function initAudio() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)
    osc = audioCtx.createOscillator();
    osc.connect(audioCtx.destination);
    osc.start()
}

playButton.addEventListener('click', function () {

    if (!audioCtx) {
        initAudio();
        return;
    }
    else if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    else if (audioCtx.state === 'running') {
        audioCtx.suspend();
    }

    let pitch = document.getElementById("pitch").value
    osc.frequency.setValueAtTime(pitch, audioCtx.currentTime);

}, false);