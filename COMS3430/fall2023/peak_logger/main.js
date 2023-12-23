
var audioCtx;
var osc;
var globalAnalyser;
const playButton = document.querySelector('button');

function initAudio() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)
    osc = audioCtx.createOscillator();
    myGain = audioCtx.createGain();
    myGain.gain.value = 0.1;
    globalAnalyser = audioCtx.createAnalyser();
    myGain.connect(globalAnalyser);
    osc.connect(myGain).connect(audioCtx.destination);
    osc.start();
    draw();
}

var slider = document.getElementById("gain");
slider.addEventListener("input", function () {
    myGain.gain.exponentialRampToValueAtTime(slider.value/1000.0, audioCtx.currentTime + 0.1);
}, false);

playButton.addEventListener('click', function () {
    initAudio();
}, false);

var maxAlltime = 0
function draw() {
    globalAnalyser.fftSize = 2048;
    var bufferLength = globalAnalyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    globalAnalyser.getByteTimeDomainData(dataArray);

    //values range 0-255, over the range -1,1, so we find the max value from a frame, and then scale
    var maxValue = (dataArray.reduce((max, curr) => (curr > max ? curr : max)) - 128) / 127.0;
    console.log(maxValue);
    if (maxValue > maxAlltime){
        maxAlltime = maxValue;
        console.log("New record! -> " + maxAlltime);
    }
    
    requestAnimationFrame(draw);

}
