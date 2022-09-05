
var audioCtx;
var biquadFilter;
var whiteNoise;
var analyser;
var canvasCtx = document.getElementById("visualizer").getContext("2d");
var dataArray;
var WIDTH = 800;
var HEIGHT = 300;
var bufferLength;

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
        output[i] = (Math.random() * 2 - 1) * 0.5;
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


    analyser = audioCtx.createAnalyser();
    biquadFilter.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 256;
    bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);
    dataArray = new Uint8Array(bufferLength);

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    draw();

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


function draw() {
    drawVisual = requestAnimationFrame(draw);

    analyser.getByteFrequencyData(dataArray);

    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * 2;

        canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
        canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight);

        x += barWidth + 1;
    }
};
