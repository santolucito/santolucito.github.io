

var audioCtx;
var osc;

const playButton = document.querySelector('button');
playButton.addEventListener('click', function() {

    if (audioCtx) {
        return;
    }

    audioCtx = new (window.AudioContext || window.webkitAudioContext)
    const globalGain = audioCtx.createGain();
    globalGain.gain.setValueAtTime(.4, audioCtx.currentTime);


    oscSteady = audioCtx.createOscillator();
    oscSteady.frequency.setValueAtTime(1200, audioCtx.currentTime);
    oscSteady.connect(globalGain).connect(audioCtx.destination);
    oscSteady.start();

    osc = audioCtx.createOscillator();
    osc.connect(globalGain).connect(audioCtx.destination);
    osc.start();
    
}, false);

// formula from log regression on image pixel pos at 400 Hz to 4000Hz
function mapToImageBounds(x) {
    var offsetTo400InImage = 57;
    return ((-2343+391.6*Math.log(x))+offsetTo400InImage);
}
function changePitch(newPitch) {
    osc.frequency.setValueAtTime(newPitch, audioCtx.currentTime);
    document.getElementById("freqLine").style.left = mapToImageBounds(newPitch)+"px";
    document.getElementById("currentFreq").innerHTML = newPitch;
    
}