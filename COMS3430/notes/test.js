
var audioCtx;
var osc;
var gainNode;


function midiToFreq(m) {
    return Math.pow(2, (m - 69) / 12) * 440;
}


function playNote(note) {
    gainNode.gain.setTargetAtTime(1, note.startTime, 0.001)
    osc.frequency.setTargetAtTime(midiToFreq(note.pitch), note.startTime, 0.001)
    gainNode.gain.setTargetAtTime(0, note.endTime, 0.001)

}

const playButton = document.querySelector('button');
playButton.addEventListener('click', function() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)
    osc = audioCtx.createOscillator();
    gainNode = audioCtx.createGain();
    osc.connect(gainNode).connect(audioCtx.destination);
    osc.start()
    gainNode.gain.value = 0;

    noteList =  [{pitch: 64, startTime: 0, endTime: 0.9}
                ,{pitch: 62, startTime: 1, endTime: 1.9}
                ,{pitch: 60, startTime: 2, endTime: 2.9}
                ]
    noteList.forEach(note => {
        playNote(note);
    });
}, false);