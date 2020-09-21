
var audioCtx;
var biquadFilter;
var whiteNoise;

function initLFOs() {
    var lfo1 = audioCtx.createOscillator();
    modulationIndex = audioCtx.createGain();
    modulationIndex.gain.value = Math.floor(Math.random()*500);
    lfo1.frequency.value = Math.floor(Math.random()*10);
    lfo1.connect(modulationIndex).connect(biquadFilter.frequency);
    lfo1.connect(modulationIndex).connect(biquadFilter.Q);
    lfo1.start()
}

function initFM() {
    whiteNoise.stop()
    var carrier = audioCtx.createOscillator();
    modulatorFreq = audioCtx.createOscillator();
    modulationIndex = audioCtx.createGain();
    modulationIndex.gain.value = 100;
    modulatorFreq.frequency.value = 100;
    modulatorFreq.connect(modulationIndex);
    modulationIndex.connect(carrier.frequency)

    modulatorFreq2 = audioCtx.createOscillator();
    modulationIndex2 = audioCtx.createGain();
    modulationIndex2.gain.value = 100;
    modulatorFreq2.frequency.value = 200;
    modulatorFreq2.connect(modulationIndex2);
    modulationIndex2.connect(carrier.frequency)

    carrier.start();
    modulatorFreq.start();
    modulatorFreq2.start();
    carrier.connect(biquadFilter).connect(audioCtx.destination);
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
    biquadFilter.gain.setValueAtTime(25, audioCtx.currentTime);

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
playButton.addEventListener('click', function() {

    if(!audioCtx) {
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

const fmButton = document.getElementById('fm');
fmButton.addEventListener('click', function() {
    
    if(audioCtx.state = 'running'){
        initFM();
        console.log("FM")
    }
})


const lfos = document.getElementById('lfos');
lfos.addEventListener('click', function() {
    
    if(audioCtx.state = 'running'){
        initLFOs();
    }
})