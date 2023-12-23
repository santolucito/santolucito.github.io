
var audioCtx;
var osc;
const playButton = document.querySelector('button');

function initAudio() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)
    osc = audioCtx.createOscillator();
    gainNode = audioCtx.createGain();
    gainNode.gain.value = 0;
    osc.connect(gainNode).connect(audioCtx.destination);
    osc.start()
}


WebMidi.enable(function (err) {
    if (err) console.log("An error occurred", err);

    WebMidi.inputs[0].addListener("noteon", "all", function (e) {
        gainNode.gain.setTargetAtTime(1, audioCtx.currentTime, 0.01);
    });

    WebMidi.inputs[0].addListener("noteoff", "all", function (e) {
        gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0.2);
    });

});

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

}, false);
