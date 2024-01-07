
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

playButton.addEventListener('click', function () {

    initAudio();

}, false);


function draw() {
    globalAnalyser.fftSize = 2048;
    var bufferLength = globalAnalyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    globalAnalyser.getByteTimeDomainData(dataArray);

    var canvas = document.querySelector("#globalVisualizer");
    var canvasCtx = canvas.getContext("2d");

    requestAnimationFrame(draw);

    globalAnalyser.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = "white";
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = "rgb(0, 0, 0)";

    canvasCtx.beginPath();

    var sliceWidth = canvas.width * 1.0 / bufferLength;
    var x = 0;

    for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0;
        var y = v * canvas.height / 2;
        if (i === 0) {
            canvasCtx.moveTo(x, y);
        } else {
            canvasCtx.lineTo(x, y);
        }
        x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
}
