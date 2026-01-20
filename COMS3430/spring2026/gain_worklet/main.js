
async function loadBuffer(bufferURL) {
    //better to have a try/catch block here, but for simplicity...
    const response = await fetch(bufferURL);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    return audioBuffer;
}

const playButton = document.querySelector('button');

playButton.addEventListener('click', async function () {

    audioCtx = new AudioContext()

    var audioBuffer = await loadBuffer('../../fall2020/samples/barnard.mp3');
    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;

    await audioCtx.audioWorklet.addModule("worklet.js");
    let myGain = new AudioWorkletNode(audioCtx, "gain-processor");

    document.getElementById("gainSlider").oninput = function () {
        myGain.parameters.get('gain').value = this.value
        GainLabel.innerHTML = this.value
    }

    source.start();
    source.connect(myGain)
    myGain.connect(audioCtx.destination)


});