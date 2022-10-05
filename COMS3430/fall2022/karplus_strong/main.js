//code adapted from : https://github.com/joshreiss/Working-with-the-Web-Audio-API/blob/c330a5065be7931a5832c1936a2b7524f67d58b0/19%20Wonders%20of%20audio%20worklets/KarplusStrong/KarplusStrongV2.js
//changes: more readable code, added a lowpass filter
var audioCtx;
var noiseEnv;
var feedbackDelay;
const startButton = document.getElementById("start");

startButton.addEventListener('click', function () {
    if (!audioCtx) {
        initAudio();
        return;
    }
    else if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    else if (audioCtx.state === 'running') {
        audioCtx.suspend();
    }
}, false);

let initAudio = function () {
    audioCtx = new AudioContext()
    audioCtx.audioWorklet.addModule('modules.js').then(() => {

        let bufferSize = 10 * audioCtx.sampleRate,
            noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate),
            noiseOutputArray = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            noiseOutputArray[i] = (Math.random() * 2 - 1) * 0.5;
        }
        whiteNoise = audioCtx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;
        whiteNoise.start(0);

        noiseEnv = audioCtx.createGain()
        noiseEnv.gain.value = 0

        let output = audioCtx.createGain()

        feedbackDelay = new AudioWorkletNode(audioCtx, 'feedbackDelay-processor',
            {
                parameterData: { delayTime: 5, gain: 0.9 }
            })

        let lpf = audioCtx.createBiquadFilter()
        lpf.type = "lowpass"
        lpf.Q = 0.0001 // changing this doesnt seem to do anything, but in theory we do not want resonance for KPS

        whiteNoise.connect(noiseEnv).connect(output)
        noiseEnv.connect(lpf).connect(feedbackDelay).connect(output)

        output.connect(audioCtx.destination)

        document.getElementById("decaySlider").oninput = function () {
            feedbackDelay.parameters.get('gain').value = this.value
            document.getElementById("decayLabel").innerHTML = this.value
        }
        document.getElementById("delaySlider").oninput = function () {
            feedbackDelay.parameters.get('delayTime').value = this.value
            document.getElementById("delayLabel").innerHTML = this.value
        }
        document.getElementById("widthSlider").oninput = function () {
            document.getElementById("widthLabel").innerHTML = this.value
        }
    })

}
let playNote = function () {
    let blockSize = 128;
    var newDelay = Number(document.getElementById("delaySlider").value) + 1000 * blockSize / audioCtx.sampleRate
    feedbackDelay.parameters.get('delayTime').value = newDelay
    let now = audioCtx.currentTime
    noiseEnv.gain.setValueAtTime(0.8, now)
    noiseEnv.gain.linearRampToValueAtTime(0, now + document.getElementById("widthSlider").value / 1000)
}

window.onkeydown = playNote
