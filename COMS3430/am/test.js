
var audioCtx;

function initAM() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)
    var carrier = audioCtx.createOscillator();
    var modulatorFreq = audioCtx.createOscillator();
    modulatorFreq.frequency.value = 100;
    carrier.frequency.value = 440;

    const modulated = audioCtx.createGain();
    const depth = audioCtx.createGain();
    depth.gain.value = 0.5 //scale modulator output to [-0.5, 0.5]
    modulated.gain.value = 1.0 - depth.gain.value; //modulated signal now has output gain at [0,1]

    modulatorFreq.connect(depth).connect(modulated.gain);
    carrier.connect(modulated)
    modulated.connect(audioCtx.destination);
    
    carrier.start();
    modulatorFreq.start();

}


const playButton = document.querySelector('button');
playButton.addEventListener('click', function() {

    if(!audioCtx) {
        initAM();
        return;
	}

    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    if (audioCtx.state === 'running') {
        audioCtx.suspend();
    }

}, false);