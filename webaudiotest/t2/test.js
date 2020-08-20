
var audioCtx;

function initAM() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)
    var carrier = audioCtx.createOscillator();
    var modulatorFreq = audioCtx.createOscillator();
    modulatorFreq.frequency.value = 100;

    const modulated = audioCtx.createGain();

    modulatorFreq.connect(modulated.gain);
    carrier.connect(modulated)
    
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = 1

    const pannerOptions = { pan: 0 };
	const pannerNode = new StereoPannerNode(audioCtx, pannerOptions);

    modulated.connect(pannerNode).connect(gainNode).connect(audioCtx.destination);

    carrier.start();
    modulatorFreq.start();

}

function initFM() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)
    var carrier = audioCtx.createOscillator();
    var modulatorFreq = audioCtx.createOscillator();

    const modulationIndex = audioCtx.createGain();
    modulationIndex.gain.value = 100;
    modulatorFreq.frequency.value = 100;

    modulatorFreq.connect(modulationIndex);
    modulationIndex.connect(carrier.frequency)
    
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = 1

    const pannerOptions = { pan: 0 };
	const pannerNode = new StereoPannerNode(audioCtx, pannerOptions);

    carrier.connect(pannerNode).connect(gainNode).connect(audioCtx.destination);

    carrier.start();
    modulatorFreq.start();
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