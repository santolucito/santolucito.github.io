
var audioCtx;
var osc;
var gainNode;


function midiToFreq(m) {
    return Math.pow(2, (m - 69) / 12) * 440;
}


function playNote(note) {
    gainNode.gain.setTargetAtTime(1, audioCtx.currentTime + note.startTime, 0.01)
    osc.frequency.setTargetAtTime(midiToFreq(note.pitch), audioCtx.currentTime + note.startTime, 0.001)
    gainNode.gain.setTargetAtTime(0, audioCtx.currentTime + note.endTime, 0.01)

}

function genNotes() {
    var noteList = [{ pitch: 60, startTime: 0, endTime: 0.2 }]
    timeIncr = noteList[0].endTime

    for (let i = 1; i < 15; i++) {
        var newNote = JSON.parse(JSON.stringify(noteList[i - 1]));
        console.log(newNote)
        if (Math.random() < 0.7) {
            newNote.pitch += 1;
        }
        else {
            newNote.pitch -= 1;
        }
        newNote.startTime += timeIncr;
        newNote.endTime += timeIncr;
        const newNoteCopy = newNote;
        noteList.push(newNoteCopy);
    }
    console.log(noteList)

    return noteList;

}

const playButton = document.querySelector('button');
playButton.addEventListener('click', function () {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)
    osc = audioCtx.createOscillator();
    gainNode = audioCtx.createGain();
    osc.connect(gainNode).connect(audioCtx.destination);
    osc.start()
    gainNode.gain.value = 0;


    const playRandWalk = () => {
        noteList = genNotes();
        noteList.forEach(note => {
            playNote(note);
        });
        setTimeout(playRandWalk, noteList[noteList.length - 1].endTime * 1000);
    };

    playRandWalk()

}, false);
