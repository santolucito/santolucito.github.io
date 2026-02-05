
var audioCtx;
var analyser;
var oscillators = [];
var gains = [];

var compData = [
    { freq: 220, amp: 0.8 },
    { freq: 440, amp: 0.5 },
    { freq: 880, amp: 0.0 }
];

var timeDomainCanvas = document.getElementById("timeDomain");
var timeDomainCtx = timeDomainCanvas.getContext("2d");
var freqDomainCanvas = document.getElementById("freqDomain");
var freqDomainCtx = freqDomainCanvas.getContext("2d");

var TIME_W = timeDomainCanvas.width;
var TIME_H = timeDomainCanvas.height;
var FREQ_W = freqDomainCanvas.width;
var FREQ_H = freqDomainCanvas.height;

function initAudio() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    analyser.connect(audioCtx.destination);

    for (var i = 0; i < compData.length; i++) {
        var osc = audioCtx.createOscillator();
        var gain = audioCtx.createGain();
        osc.frequency.setValueAtTime(compData[i].freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(compData[i].amp * 0.3, audioCtx.currentTime);
        osc.connect(gain).connect(analyser);
        osc.start();
        oscillators.push(osc);
        gains.push(gain);
    }

    updateFreqResLabel();
    draw();
}

function updateComp(index, param, val) {
    if (param === 'freq') {
        compData[index].freq = Number(val);
        document.getElementById('freq' + index).textContent = val;
        if (oscillators[index]) {
            oscillators[index].frequency.setValueAtTime(Number(val), audioCtx.currentTime);
        }
    } else if (param === 'amp') {
        compData[index].amp = Number(val) / 100;
        document.getElementById('amp' + index).textContent = val;
        if (gains[index]) {
            gains[index].gain.setValueAtTime(compData[index].amp * 0.3, audioCtx.currentTime);
        }
    }
}

function updateFFTSize(val) {
    if (analyser) {
        analyser.fftSize = Number(val);
        updateFreqResLabel();
    }
}

function updateFreqResLabel() {
    if (audioCtx && analyser) {
        var res = audioCtx.sampleRate / analyser.fftSize;
        document.getElementById('freqRes').textContent = res.toFixed(1);
        var maxFreq = audioCtx.sampleRate / 2;
        document.getElementById('freqAxisLabel').textContent =
            "X-axis: 0 Hz to " + maxFreq + " Hz (" + analyser.frequencyBinCount + " bins, " + res.toFixed(1) + " Hz each)";
    }
}

const playButton = document.getElementById('start');
playButton.addEventListener('click', function () {
    if (!audioCtx) {
        initAudio();
        return;
    }

    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    } else if (audioCtx.state === 'running') {
        audioCtx.suspend();
    }
}, false);


function draw() {
    requestAnimationFrame(draw);
    drawTimeDomain();
    drawFreqDomain();
}

function drawTimeDomain() {
    var bufferLength = analyser.fftSize;
    var dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);

    timeDomainCtx.fillStyle = "white";
    timeDomainCtx.fillRect(0, 0, TIME_W, TIME_H);

    timeDomainCtx.lineWidth = 2;
    timeDomainCtx.strokeStyle = "rgb(0, 0, 0)";
    timeDomainCtx.beginPath();

    var sliceWidth = TIME_W / bufferLength;
    var x = 0;

    for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0;
        var y = v * TIME_H / 2;
        if (i === 0) {
            timeDomainCtx.moveTo(x, y);
        } else {
            timeDomainCtx.lineTo(x, y);
        }
        x += sliceWidth;
    }

    timeDomainCtx.lineTo(TIME_W, TIME_H / 2);
    timeDomainCtx.stroke();
}

function drawFreqDomain() {
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    freqDomainCtx.fillStyle = "rgb(0, 0, 0)";
    freqDomainCtx.fillRect(0, 0, FREQ_W, FREQ_H);

    var barWidth = (FREQ_W / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * 2;

        freqDomainCtx.fillStyle = "rgb(" + (barHeight + 100) + ",50,50)";
        freqDomainCtx.fillRect(x, FREQ_H - barHeight / 2, barWidth, barHeight);

        x += barWidth + 1;
    }

    // Draw frequency labels for each active component
    freqDomainCtx.fillStyle = "rgba(255, 255, 255, 0.9)";
    freqDomainCtx.font = "12px monospace";
    var maxFreq = audioCtx.sampleRate / 2;
    for (var i = 0; i < compData.length; i++) {
        if (compData[i].amp > 0) {
            var binIndex = Math.round(compData[i].freq / maxFreq * bufferLength);
            var labelX = binIndex * (barWidth + 1);
            if (labelX < FREQ_W - 50) {
                freqDomainCtx.fillText(compData[i].freq + " Hz", labelX, 15);
            }
        }
    }
}
