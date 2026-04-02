// Pitch Set Theory - Interactive JavaScript Implementation

// ==================== PITCH CLASS ====================
// Convert numeric pitch class (0-11) to note name
const pitchClassNames = {
    0: "C",
    1: "Db",
    2: "D",
    3: "Eb",
    4: "E",
    5: "F",
    6: "F#",
    7: "G",
    8: "Ab",
    9: "A",
    10: "Bb",
    11: "B"
};

function toPitchClass(num) {
    const normalized = ((num % 12) + 12) % 12;
    return pitchClassNames[normalized];
}

function toNumber(noteName) {
    for (let [num, name] of Object.entries(pitchClassNames)) {
        if (name === noteName) return parseInt(num);
    }
    return -1;
}

// ==================== PITCH SET ====================
class PitchSet {
    constructor(pitches = []) {
        // Store as sorted set of unique pitch classes (0-11)
        this.pitches = [...new Set(pitches.map(p => ((p % 12) + 12) % 12))].sort((a, b) => a - b);
    }

    static fromNotes(noteNames) {
        const nums = noteNames.map(n => toNumber(n)).filter(n => n !== -1);
        return new PitchSet(nums);
    }

    toNotes() {
        return this.pitches.map(p => toPitchClass(p));
    }

    // Transposition: add n to all pitches
    transpose(n) {
        return new PitchSet(this.pitches.map(p => (p + n) % 12));
    }

    // Inversion: negate all pitches (12 - p) mod 12
    invert() {
        return new PitchSet(this.pitches.map(p => (12 - p) % 12));
    }

    // Transposition-Inversion: invert then transpose
    ti(n) {
        const inverted = this.invert();
        return inverted.transpose(n);
    }

    // Get the prime form (canonical form)
    // This is a simplified version that finds the most compact form
    getPrimeForm() {
        if (this.pitches.length === 0) return this;

        let bestForm = this;
        let bestNormal = this.getNormal();

        // Try all transpositions and their inversions
        for (let i = 0; i < 12; i++) {
            const transposed = this.transpose(i);
            const inverted = transposed.invert();

            const transNormal = transposed.getNormal();
            const invNormal = inverted.getNormal();

            // Compare which form is more "prime" (lexicographically smaller)
            if (this.isSmaller(transNormal, bestNormal)) {
                bestNormal = transNormal;
                bestForm = transposed;
            }
            if (this.isSmaller(invNormal, bestNormal)) {
                bestNormal = invNormal;
                bestForm = inverted;
            }
        }

        return bestForm;
    }

    // Get normal form (rotation of smallest intervals)
    getNormal() {
        const intervals = this.getIntervals();
        const rotations = [];

        for (let i = 0; i < intervals.length; i++) {
            const rotated = [...intervals.slice(i), ...intervals.slice(0, i)];
            rotations.push(rotated);
        }

        // Find lexicographically smallest rotation
        return rotations.reduce((smallest, current) =>
            this.isSmaller(current, smallest) ? current : smallest
        );
    }

    // Get intervals between pitches
    getIntervals() {
        if (this.pitches.length < 2) return this.pitches;
        const intervals = [];
        for (let i = 0; i < this.pitches.length; i++) {
            const next = this.pitches[(i + 1) % this.pitches.length];
            const curr = this.pitches[i];
            const interval = next > curr ? next - curr : (12 + next - curr);
            intervals.push(interval);
        }
        return intervals;
    }

    // Compare if array a is lexicographically smaller than b
    isSmaller(a, b) {
        for (let i = 0; i < Math.min(a.length, b.length); i++) {
            if (a[i] < b[i]) return true;
            if (a[i] > b[i]) return false;
        }
        return a.length < b.length;
    }

    // Get interval class vector (12-tone serial composition)
    getIntervalClassVector() {
        const vector = [0, 0, 0, 0, 0, 0];

        for (let i = 0; i < this.pitches.length; i++) {
            for (let j = i + 1; j < this.pitches.length; j++) {
                let interval = (this.pitches[j] - this.pitches[i]) % 12;
                const icv_index = Math.min(interval, 12 - interval) - 1;
                if (icv_index >= 0 && icv_index < 6) {
                    vector[icv_index]++;
                }
            }
        }

        return vector;
    }

    // Get cardinality (number of pitches)
    getCardinality() {
        return this.pitches.length;
    }

    toString() {
        return `{${this.toNotes().join(", ")}}`;
    }

    toNumbers() {
        return `{${this.pitches.join(", ")}}`;
    }

    isEmpty() {
        return this.pitches.length === 0;
    }
}

// ==================== GLOBAL STATE ====================
let currentPitchSet = new PitchSet();
let operationSequence = [];
let currentComposition = [];
let audioContext;
let isPlaying = false;
let playbackSchedule = null;
let highlightSchedules = []; // Track highlight update timers

// ==================== UI INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    initializePiano();
    updatePitchSetDisplay();

    const operationTypeSelect = document.getElementById('operationType');
    const operationAmountInput = document.getElementById('operationAmount');

    // Initial visibility
    operationAmountInput.style.display = operationTypeSelect.value === 'i' ? 'none' : 'block';

    operationTypeSelect.addEventListener('change', function() {
        operationAmountInput.style.display = this.value === 'i' ? 'none' : 'block';
    });

    const tempoSlider = document.getElementById('tempoSlider');
    if (tempoSlider) {
        tempoSlider.addEventListener('input', function() {
            document.getElementById('tempoValue').textContent = this.value;
        });
    }

    const reverbSlider = document.getElementById('reverbAmount');
    if (reverbSlider) {
        reverbSlider.addEventListener('input', function() {
            document.getElementById('reverbValue').textContent = this.value;
        });
    }
});

function initializePiano() {
    const pianoDiv = document.getElementById('pianoKeyboard');
    pianoDiv.innerHTML = '';

    for (let i = 0; i < 12; i++) {
        const key = document.createElement('div');
        key.className = 'key';
        key.innerHTML = `<div>${pitchClassNames[i]}</div><div class="key-label">${i}</div>`;
        key.id = `key-${i}`;
        key.onclick = () => togglePitch(i);
        pianoDiv.appendChild(key);
    }
}

function togglePitch(pitchNum) {
    if (currentPitchSet.pitches.includes(pitchNum)) {
        currentPitchSet.pitches = currentPitchSet.pitches.filter(p => p !== pitchNum);
    } else {
        currentPitchSet.pitches.push(pitchNum);
        currentPitchSet.pitches.sort((a, b) => a - b);
    }
    updatePitchSetDisplay();
}

function clearPitchSet() {
    currentPitchSet = new PitchSet();
    updatePitchSetDisplay();
    document.querySelectorAll('.key').forEach(k => k.classList.remove('active'));
}

function updatePitchSetDisplay() {
    const display = document.getElementById('currentPitchSet');

    if (currentPitchSet.isEmpty()) {
        display.textContent = 'Selected: {}';
    } else {
        display.textContent = `Selected: ${currentPitchSet.toString()} ${currentPitchSet.toNumbers()}`;
    }

    // Update piano keyboard highlighting
    document.querySelectorAll('.key').forEach((key, index) => {
        if (currentPitchSet.pitches.includes(index)) {
            key.classList.add('active');
        } else {
            key.classList.remove('active');
        }
    });
}

// ==================== PITCH CLASS OPERATIONS ====================
function convertPitchClass() {
    const input = document.getElementById('pcInput').value;
    const result = document.getElementById('pcResult');
    const resultContent = document.getElementById('pcResultContent');

    if (input === '' || input < 0 || input > 11) {
        resultContent.innerHTML = '<span style="color: red;">Please enter a number between 0 and 11</span>';
        result.style.display = 'block';
        return;
    }

    const num = parseInt(input);
    const noteName = toPitchClass(num);

    resultContent.innerHTML = `
        <strong>Number:</strong> ${num}<br>
        <strong>Note Name:</strong> ${noteName}<br>
        <strong>Octave Classes:</strong> ..., ${noteName}0, ${noteName}1, ${noteName}2, ...<br>
        <strong>Pitch Class:</strong> [${num}]₁₂
    `;
    result.style.display = 'block';
}

// ==================== TRANSFORMATIONS ====================
function applyTransposition() {
    if (currentPitchSet.isEmpty()) {
        showError('transposeResult', 'Please select at least one pitch');
        return;
    }

    const amount = parseInt(document.getElementById('transposeAmount').value);
    if (isNaN(amount) || amount < 0 || amount > 11) {
        showError('transposeResult', 'Please enter a number between 0 and 11');
        return;
    }

    const transposed = currentPitchSet.transpose(amount);
    displayTransformationResult('transposeResult', 'transposeResultSet', transposed, `T${amount}`);
}

function applyTI() {
    if (currentPitchSet.isEmpty()) {
        showError('tiResult', 'Please select at least one pitch');
        return;
    }

    const amount = parseInt(document.getElementById('tiAmount').value);
    if (isNaN(amount) || amount < 0 || amount > 11) {
        showError('tiResult', 'Please enter a number between 0 and 11');
        return;
    }

    const transformed = currentPitchSet.ti(amount);
    displayTransformationResult('tiResult', 'tiResultSet', transformed, `TI${amount}`);
}

function applyInversion() {
    if (currentPitchSet.isEmpty()) {
        showError('inversionResult', 'Please select at least one pitch');
        return;
    }

    const inverted = currentPitchSet.invert();
    displayTransformationResult('inversionResult', 'inversionResultSet', inverted, 'I (Inversion)');
}

function showPitchSetInfo() {
    if (currentPitchSet.isEmpty()) {
        showError('infoResult', 'Please select at least one pitch');
        return;
    }

    const card = document.getElementById('infoResult');
    const content = document.getElementById('infoResultContent');

    const icv = currentPitchSet.getIntervalClassVector();
    const primeForm = currentPitchSet.getPrimeForm();

    content.innerHTML = `
        <h4>Pitch Set Information</h4>
        <p><strong>Pitch Set:</strong> ${currentPitchSet.toString()}</p>
        <p><strong>Numeric Form:</strong> ${currentPitchSet.toNumbers()}</p>
        <p><strong>Cardinality (Size):</strong> ${currentPitchSet.getCardinality()}</p>
        <p><strong>Intervals:</strong> ${currentPitchSet.getIntervals().join(", ")}</p>
        <p><strong>Interval Class Vector:</strong> [${icv.join(", ")}]</p>
        <p><strong>Prime Form:</strong> ${primeForm.toString()}</p>
    `;
    card.style.display = 'block';
}

// ==================== UI HELPERS ====================
function displayTransformationResult(resultId, setId, pitchSet, operationName) {
    const resultDiv = document.getElementById(resultId);
    const setDiv = document.getElementById(setId);

    setDiv.innerHTML = `<strong>${operationName}:</strong> ${pitchSet.toString()} ${pitchSet.toNumbers()}`;
    resultDiv.style.display = 'block';
}

function showError(resultId, message) {
    const resultDiv = document.getElementById(resultId);
    const contentDiv = resultDiv.querySelector('[id$="Set"], [id$="Content"]') || resultDiv;

    if (contentDiv && contentDiv !== resultDiv) {
        contentDiv.innerHTML = `<span style="color: red;">${message}</span>`;
    } else {
        resultDiv.innerHTML = `<span style="color: red;">${message}</span>`;
    }
    resultDiv.style.display = 'block';
}

// ==================== COMPOSITION GENERATION ====================

function addOperation() {
    const type = document.getElementById('operationType').value;
    const amount = parseInt(document.getElementById('operationAmount').value);

    if (type !== 'i' && (isNaN(amount) || amount < 0 || amount > 11)) {
        alert('Please enter a valid amount (0-11)');
        return;
    }

    const op = {
        type: type,
        amount: type === 'i' ? null : amount
    };

    operationSequence.push(op);
    updateSequenceDisplay();
    document.getElementById('operationAmount').value = '';
}

function removeOperation(index) {
    operationSequence.splice(index, 1);
    updateSequenceDisplay();
}

function updateSequenceDisplay() {
    const container = document.getElementById('operationSequence');
    if (operationSequence.length === 0) {
        container.innerHTML = '<span style="color: #999;">No operations added yet</span>';
        return;
    }

    const items = operationSequence.map((op, i) => {
        const label = op.type === 'i' ? 'I' : (op.type === 't' ? `T${op.amount}` : `Ti${op.amount}`);
        return `<div class="sequence-item">${label}<span class="remove" onclick="removeOperation(${i})">×</span></div>`;
    });

    container.innerHTML = items.join('');
}

function generateComposition() {
    if (currentPitchSet.isEmpty()) {
        alert('Please select at least one pitch');
        return;
    }

    if (operationSequence.length === 0) {
        alert('Please add at least one operation to the sequence');
        return;
    }

    let result = currentPitchSet;
    const steps = [];
    const stepSequences = [];

    const octaveOffset = parseInt(document.getElementById('compositionOctaveOffset').value) || 60;

    // Store initial pitch set
    steps.push(`Starting pitch set: ${result.toString()}`);
    stepSequences.push(result.pitches.map(p => p + octaveOffset));

    // Apply each operation and store intermediate results
    for (const op of operationSequence) {
        if (op.type === 't') {
            result = result.transpose(op.amount);
            steps.push(`After T${op.amount}: ${result.toString()}`);
        } else if (op.type === 'ti') {
            result = result.ti(op.amount);
            steps.push(`After Ti${op.amount}: ${result.toString()}`);
        } else if (op.type === 'i') {
            result = result.invert();
            steps.push(`After I: ${result.toString()}`);
        }
        stepSequences.push(result.pitches.map(p => p + octaveOffset));
    }

    // Store all intermediate sequences for playback
    currentComposition = stepSequences;

    const output = document.getElementById('compositionOutput');
    let phraseHTML = '<h4>Composition Phrases (will highlight during playback)</h4><div class="phrase-container">';

    stepSequences.forEach((phrase, idx) => {
        const noteNames = phrase.map(p => toPitchClass(p % 12)).join(', ');
        const midiNotes = phrase.join(', ');
        phraseHTML += `
            <div class="phrase-box" id="phrase-${idx}">
                <div class="phrase-label">Step ${idx}</div>
                <div class="phrase-notes">${noteNames}</div>
                <div style="font-size: 0.75em; color: #999; margin-top: 5px;">MIDI: ${midiNotes}</div>
            </div>
        `;
    });

    phraseHTML += '</div>';
    output.innerHTML = phraseHTML;

    document.getElementById('compositionResult').style.display = 'block';
}

// ==================== PRESET COMPOSITIONS ====================

function loadPreset(presetName) {
    clearPitchSet();
    operationSequence = [];
    updateSequenceDisplay();

    if (presetName === 'piece1') {
        // Piece 1: [0,1,2,3]
        currentPitchSet.pitches = [0, 1, 2, 3];
        operationSequence = [
            { type: 't', amount: 10 },
            { type: 'ti', amount: 6 },
            { type: 't', amount: 4 },
            { type: 'ti', amount: 7 },
            { type: 'ti', amount: 8 },
            { type: 't', amount: 4 }
        ];
        document.getElementById('compositionOctaveOffset').value = 60;
        updatePitchSetDisplay();
        updateSequenceDisplay();
        setTimeout(() => generateComposition(), 100);
    }
}

// ==================== AUDIO PLAYBACK ====================

function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function createReverbImpulseResponse(duration = 2) {
    // Create a simple exponentially decaying impulse response for reverb
    const rate = audioContext.sampleRate;
    const length = rate * duration;
    const impulse = audioContext.createBuffer(2, length, rate);
    const left = impulse.getChannelData(0);
    const right = impulse.getChannelData(1);

    for (let i = 0; i < length; i++) {
        // Exponential decay with some early reflections
        const t = i / rate;
        const decay = Math.exp(-t * 2); // 2 second decay
        const noise = (Math.random() - 0.5) * 0.5;
        left[i] = noise * decay;
        right[i] = noise * decay * 0.9; // Slightly different for stereo
    }

    return impulse;
}

function midiToFreq(midiNote) {
    return 440 * Math.pow(2, (midiNote - 69) / 12);
}

function playComposition() {
    if (!Array.isArray(currentComposition) || currentComposition.length === 0) {
        alert('Please generate a composition first');
        return;
    }

    initAudioContext();
    stopComposition();
    clearHighlights();

    const bpm = parseInt(document.getElementById('tempoSlider').value);
    const shouldLoop = document.getElementById('loopComposition')?.checked ?? true;
    const isRoundMode = document.getElementById('roundMode')?.checked ?? false;
    const reverbAmount = parseInt(document.getElementById('reverbAmount')?.value ?? 40) / 100;

    const noteLength = (60 / bpm) * 0.7;
    const beatDuration = 60 / bpm;

    // Create reverb processor
    const dryGain = audioContext.createGain();
    const wetGain = audioContext.createGain();
    const convolver = audioContext.createConvolver();

    dryGain.connect(audioContext.destination);
    wetGain.connect(convolver);
    convolver.connect(audioContext.destination);

    // Set up reverb amount
    dryGain.gain.value = 1 - reverbAmount * 0.7;
    wetGain.gain.value = reverbAmount * 0.3;

    // Create impulse response
    const impulseResponse = createReverbImpulseResponse(2);
    convolver.buffer = impulseResponse;

    isPlaying = true;
    let phraseIndex = 0;
    let activePhraseLayers = []; // Track which phrases are currently playing

    const playPhrase = (phrase, startTime, layerId) => {
        for (let i = 0; i < phrase.length; i++) {
            const midiNote = phrase[i];
            const noteTime = startTime + i * beatDuration;

            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();

            osc.connect(gain);
            gain.connect(dryGain);
            gain.connect(wetGain);

            osc.frequency.value = midiToFreq(midiNote);
            osc.type = 'sine';

            // Smooth attack/release envelope
            const attackTime = 0.01;
            const releaseTime = 0.05;
            const peakGain = 0.2; // Slightly lower for layering

            gain.gain.setValueAtTime(0, noteTime);
            gain.gain.linearRampToValueAtTime(peakGain, noteTime + attackTime);
            gain.gain.linearRampToValueAtTime(0, noteTime + noteLength - releaseTime);
            gain.gain.setValueAtTime(0, noteTime + noteLength);

            osc.start(noteTime);
            osc.stop(noteTime + noteLength);
        }
    };

    const scheduleNotes = () => {
        if (!isPlaying) return;

        let time = audioContext.currentTime;

        if (isRoundMode) {
            // Round mode: layer phrases incrementally
            if (phraseIndex < currentComposition.length) {
                const phrase = currentComposition[phraseIndex];

                // Play all active phrases starting from current time
                for (let layer = 0; layer <= phraseIndex; layer++) {
                    const layerPhrase = currentComposition[layer];
                    const layerStartTime = time + (phraseIndex - layer) * (layerPhrase.length * beatDuration);
                    const delaySinceNow = (layerStartTime - audioContext.currentTime) * 1000;
                    const durationMs = layerPhrase.length * beatDuration * 1000;

                    playPhrase(layerPhrase, layerStartTime, layer);
                    scheduleHighlightUpdate(layer, delaySinceNow, durationMs);
                }

                phraseIndex++;
                const nextScheduleTime = (currentComposition[phraseIndex - 1].length * beatDuration) * 1000;
                playbackSchedule = setTimeout(scheduleNotes, nextScheduleTime);
            } else if (shouldLoop) {
                phraseIndex = 0;
                playbackSchedule = setTimeout(scheduleNotes, 100);
            } else {
                isPlaying = false;
            }
        } else {
            // Standard mode: play phrases sequentially
            if (phraseIndex < currentComposition.length) {
                const phrase = currentComposition[phraseIndex];
                const currentPhraseIndex = phraseIndex;
                const durationMs = phrase.length * beatDuration * 1000;

                playPhrase(phrase, time, 0);
                scheduleHighlightUpdate(currentPhraseIndex, 0, durationMs);

                phraseIndex++;
                const nextScheduleTime = (phrase.length * beatDuration) * 1000;
                playbackSchedule = setTimeout(scheduleNotes, nextScheduleTime);
            } else if (shouldLoop) {
                phraseIndex = 0;
                playbackSchedule = setTimeout(scheduleNotes, 100);
            } else {
                isPlaying = false;
            }
        }
    };

    scheduleNotes();
}

function clearHighlights() {
    document.querySelectorAll('.phrase-box').forEach(box => {
        box.classList.remove('active');
    });
}

function setHighlight(phraseIndex, isActive) {
    const phraseBox = document.getElementById(`phrase-${phraseIndex}`);
    if (phraseBox) {
        if (isActive) {
            phraseBox.classList.add('active');
        } else {
            phraseBox.classList.remove('active');
        }
    }
}

function scheduleHighlightUpdate(phraseIndex, delay, duration) {
    // Highlight phrase when it starts
    const highlightTimer = setTimeout(() => {
        if (isPlaying) setHighlight(phraseIndex, true);
    }, delay);
    highlightSchedules.push(highlightTimer);

    // Remove highlight when it ends
    const unhighlightTimer = setTimeout(() => {
        if (isPlaying) setHighlight(phraseIndex, false);
    }, delay + duration);
    highlightSchedules.push(unhighlightTimer);
}

function stopComposition() {
    isPlaying = false;
    if (playbackSchedule) clearTimeout(playbackSchedule);
    playbackSchedule = null;

    // Clear all highlight schedules
    highlightSchedules.forEach(timer => clearTimeout(timer));
    highlightSchedules = [];

    clearHighlights();
}
