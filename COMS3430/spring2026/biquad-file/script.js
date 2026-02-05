var audioCtx;
var biquadFilter;
var source;
var analyser;
var audioBuffer;
var isPlaying = false;
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
    lfo1.start();
}

function initLFOF() {
    var lfo1 = audioCtx.createOscillator();
    modulationIndex = audioCtx.createGain();
    modulationIndex.gain.value = 2000;
    lfo1.frequency.value = 0.1;
    lfo1.connect(modulationIndex).connect(biquadFilter.frequency);
    lfo1.start();
}

async function loadBuffer(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return await audioCtx.decodeAudioData(arrayBuffer);
}

async function initBiquad() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    audioBuffer = await loadBuffer('../../fall2020/samples/barnard.mp3');

    biquadFilter = audioCtx.createBiquadFilter();
    biquadFilter.type = "lowpass";
    biquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);
    biquadFilter.gain.setValueAtTime(0, audioCtx.currentTime);

    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    draw();

    startPlayback();
}

function startPlayback() {
    source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.loop = true;
    source.connect(biquadFilter);
    biquadFilter.connect(analyser);
    analyser.connect(audioCtx.destination);
    source.start();
    isPlaying = true;
}

function stopPlayback() {
    if (source) {
        source.stop();
        source.disconnect();
    }
    isPlaying = false;
}

function changeFilterType(filterType) {
    biquadFilter.type = filterType;
}

function updateFreq(val) {
    biquadFilter.frequency.value = val;
}

function updateIndex(val) {
    biquadFilter.gain.value = val;
}

function updateQ(val) {
    biquadFilter.Q.value = val;
}

const playButton = document.getElementById('start');
playButton.addEventListener('click', async function () {
    if (!audioCtx) {
        await initBiquad();
        return;
    }

    if (isPlaying) {
        stopPlayback();
        audioCtx.suspend();
    } else {
        await audioCtx.resume();
        startPlayback();
    }
}, false);

const lfoq = document.getElementById('lfoQ');
lfoq.addEventListener('click', function () {
    if (audioCtx && audioCtx.state === 'running') {
        initLFOQ();
    }
});

const lfof = document.getElementById('lfoF');
lfof.addEventListener('click', function () {
    if (audioCtx && audioCtx.state === 'running') {
        initLFOF();
    }
});

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
}
