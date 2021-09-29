
var audioCtx;
var biquadFilter;
var whiteNoise;

function initLFOQ() {
    var lfo1 = audioCtx.createOscillator();
    modulationIndex = audioCtx.createGain();
    modulationIndex.gain.value = 100;
    lfo1.frequency.value = 0.2;
    lfo1.connect(modulationIndex).connect(biquadFilter.Q);
    lfo1.start()
}

function initLFOF() {
    var lfo1 = audioCtx.createOscillator();
    modulationIndex = audioCtx.createGain();
    modulationIndex.gain.value = 200;
    lfo1.frequency.value = 0.1;
    lfo1.connect(modulationIndex).connect(biquadFilter.frequency);
    lfo1.start()
}

function initBiquad() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)

    var bufferSize = 10 * audioCtx.sampleRate,
        noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate),
        output = noiseBuffer.getChannelData(0);
    for (var i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }
    whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;
    whiteNoise.start(0);

    biquadFilter = audioCtx.createBiquadFilter();

    biquadFilter.type = "lowpass";
    biquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);
    biquadFilter.gain.setValueAtTime(0, audioCtx.currentTime);

    whiteNoise.connect(biquadFilter).connect(audioCtx.destination);


}

function changeFilterType(filterType) {
    biquadFilter.type = filterType;
}

function updateFreq(val) {
    biquadFilter.frequency.value = val;
};
function updateIndex(val) {
    biquadFilter.gain.value = val;
};
function updateQ(val) {
    biquadFilter.Q.value = val;
};

const playButton = document.getElementById('start');
playButton.addEventListener('click', function () {

    if (!audioCtx) {
        initBiquad();
        return;
    }

    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    if (audioCtx.state === 'running') {
        audioCtx.suspend();
    }

}, false);


const lfoq = document.getElementById('lfoQ');
lfoq.addEventListener('click', function () {

    if (audioCtx.state = 'running') {
        initLFOQ();
    }
})

const lfof = document.getElementById('lfoF');
lfof.addEventListener('click', function () {

    if (audioCtx.state = 'running') {
        initLFOF();
    }
})
