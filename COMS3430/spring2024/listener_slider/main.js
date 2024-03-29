
var audioCtx;
var osc;
const playButton = document.querySelector('button');

function initAudio() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)
    osc = audioCtx.createOscillator();
    osc.connect(audioCtx.destination);
    osc.start()
}

var slider = document.getElementById("pitch");

slider.addEventListener("input", function () {
    //osc.frequency.value = slider.value; this works, but the next line is better
    osc.frequency.exponentialRampToValueAtTime(slider.value, audioCtx.currentTime + 0.1);
}, false);

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
