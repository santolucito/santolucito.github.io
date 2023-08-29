
var audioCtx;



var modulatorFreq;
var modulationIndex;

function initFM() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)
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

    carrier.connect(audioCtx.destination);

    carrier.start();
    modulatorFreq.start();
    modulatorFreq2.start();
}

function updateFreq(val) {
    modulatorFreq.frequency.value = val;
};
function updateIndex(val) {
    modulationIndex.gain.value = val;
};

function updateFreq2(val) {
    modulatorFreq2.frequency.value = val;
};
function updateIndex2(val) {
    modulationIndex2.gain.value = val;
};



const playButton = document.querySelector('button');
playButton.addEventListener('click', function() {

    if(!audioCtx) {
        initFM();
        return;
	}

    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    if (audioCtx.state === 'running') {
        audioCtx.suspend();
    }

}, false);
