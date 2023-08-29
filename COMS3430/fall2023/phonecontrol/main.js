const evtSource = new EventSource("http://161.35.14.211:8889", {});

evtSource.onmessage = function (event) {
    console.log("message: " + event.data)
    parsed_data = JSON.parse(event.data)
    val = parsed_data["lsm6dso accelerometer"][1]
    modulatorFreq.frequency.value = val;
}

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
playButton.addEventListener('click', function () {

    if (!audioCtx) {
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
