
var audioCtx;

https://ourcodeworld.com/articles/read/413/how-to-create-a-volume-meter-measure-the-sound-level-in-the-browser-with-javascript

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
    
    carrier.connect(audioCtx.destination);

    carrier.start();
    modulatorFreq.start();
}

function updateFreq(val) {
    modulatorFreq.frequency.value = val;
};
function updateIndex(val) {
    modulationIndex.gain.value = val;
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