
var audioCtx;



var modulatorFreq;
var modulationIndex;

function initFM() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)
    var carrier = audioCtx.createOscillator();
    modulatorFreq = audioCtx.createOscillator();

    modulationIndex = audioCtx.createGain();
    modulationIndex.gain.value = 100;
    modulatorFreq.frequency.value = 500;

    modulatorFreq.connect(modulationIndex);
    modulationIndex.connect(carrier.frequency)
    
    carrier.connect(audioCtx.destination);

    carrier.start();
    modulatorFreq.start();

    var lfo = audioCtx.createOscillator();
    lfo.frequency.value = 2;
    lfoGain = audioCtx.createGain();
    lfoGain.gain.value = 300;
    lfo.connect(lfoGain).connect(modulatorFreq.frequency);
    lfo.start();
    
}


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


