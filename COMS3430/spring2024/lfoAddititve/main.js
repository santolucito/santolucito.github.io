
var audioCtx;

function initAM() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)

    //do something better than manually writing these out (i.e. create an array for the oscs) 
    var osc1 = audioCtx.createOscillator();
    var osc2 = audioCtx.createOscillator();
    var osc3 = audioCtx.createOscillator();
    var osc4 = audioCtx.createOscillator();
    var osc5 = audioCtx.createOscillator();
    osc1.frequency.value = 1 * 440;
    osc2.frequency.value = (2 * 440) + Math.random() * 15;
    osc3.frequency.value = (3 * 440) + Math.random() * 15;
    osc4.frequency.value = (4 * 440) - Math.random() * 15;
    osc5.frequency.value = (5 * 440) - Math.random() * 15;

    const globalGain = audioCtx.createGain();
    globalGain.gain.value = 0.0001;

    osc1.connect(globalGain)
    osc2.connect(globalGain);
    osc3.connect(globalGain);
    osc4.connect(globalGain);
    osc5.connect(globalGain);
    globalGain.connect(audioCtx.destination);

    globalGain.gain.setTargetAtTime(0.25, audioCtx.currentTime, 0.05);
    globalGain.gain.setTargetAtTime(0.0001, audioCtx.currentTime + 0.2, 1);
    osc1.start();
    osc2.start();
    osc3.start();
    osc4.start();
    osc5.start();

    var lfo = audioCtx.createOscillator();
    lfo.frequency.value = 0.5;
    lfoGain = audioCtx.createGain();
    lfoGain.gain.value = 8;
    lfo.connect(lfoGain).connect(osc2.frequency);
    lfo.start();

    var lfo2 = audioCtx.createOscillator();
    lfo2.frequency.value = 0.7;
    lfoGain2 = audioCtx.createGain();
    lfoGain2.gain.value = 10;
    lfo2.connect(lfoGain).connect(osc5.frequency);
    lfo2.start();
    
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
