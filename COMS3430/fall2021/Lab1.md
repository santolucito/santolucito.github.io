---
layout: default
title: Lab1
---

# Lab 1 - Build your own keyboard (12 pts)

For this lab you will build your own keyboard on the web using WebAudio.
This assignment mostly serves give you a familiarity with the basic workflow and structure of working with WebAudio.

## the basics (4 pts)

To get started, we will build a simple keyboard interface that plays a single note.

To start, we initialize an audio context. We setup a gain node, and give ourselves a bit of room to avoid clipping

    document.addEventListener("DOMContentLoaded", function(event) {

        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

We need a map from keys to frequencies. The one provided below is a starting point, though you might wish to customize the mapping.

       const keyboardFrequencyMap = {
        '90': 261.625565300598634,  //Z - C
        '83': 277.182630976872096, //S - C#
        '88': 293.664767917407560,  //X - D
        '68': 311.126983722080910, //D - D#
        '67': 329.627556912869929,  //C - E
        '86': 349.228231433003884,  //V - F
        '71': 369.994422711634398, //G - F#
        '66': 391.995435981749294,  //B - G
        '72': 415.304697579945138, //H - G#
        '78': 440.000000000000000,  //N - A
        '74': 466.163761518089916, //J - A#
        '77': 493.883301256124111,  //M - B
        '81': 523.251130601197269,  //Q - C
        '50': 554.365261953744192, //2 - C#
        '87': 587.329535834815120,  //W - D
        '51': 622.253967444161821, //3 - D#
        '69': 659.255113825739859,  //E - E
        '82': 698.456462866007768,  //R - F
        '53': 739.988845423268797, //5 - F#
        '84': 783.990871963498588,  //T - G
        '54': 830.609395159890277, //6 - G#
        '89': 880.000000000000000,  //Y - A
        '55': 932.327523036179832, //7 - A#
        '85': 987.766602512248223,  //U - B
    }

Next we add listeners to the keys. These will add and remove ```activeOscillators```.

    window.addEventListener('keydown', keyDown, false);
    window.addEventListener('keyup', keyUp, false);

    activeOscillators = {}

    function keyDown(event) {
        const key = (event.detail || event.which).toString();
        if (keyboardFrequencyMap[key] && !activeOscillators[key]) {
          playNote(key);
        }
    }

    function keyUp(event) {
        const key = (event.detail || event.which).toString();
        if (keyboardFrequencyMap[key] && activeOscillators[key]) {
            activeOscillators[key].stop();
            delete activeOscillators[key];
        }
    }

Now we need a way to ```playNote(key)```, which will actually start the sound. For this, we start an oscillator, set the desired properties, and connect the new oscillator to the the ```audioCtx.destination```.

    function playNote(key) {
        const osc = audioCtx.createOscillator();
        osc.frequency.setValueAtTime(keyboardFrequencyMap[key], audioCtx.currentTime)
        osc.type = 'sine' //choose your favorite waveform
        osc.connect(audioCtx.destination)
        osc.start();
        activeOscillators[key] = osc
      }

If you would like further details, refer to the below tutorials. Be warned, these are good for reference, but may lead you a bit astray for the purposes of this lab:

[https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Simple_synth](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Simple_synth)

[https://medium.com/@mautayro/creating-a-basic-computer-keyboard-controlled-synthesizer-with-the-web-audio-api-8a3d0ab1d65e](https://medium.com/@mautayro/creating-a-basic-computer-keyboard-controlled-synthesizer-with-the-web-audio-api-8a3d0ab1d65e)

This will give you a really awful keyboard made with WebAudio.

## the next step (7 pts)

Once you have the basic keyboard working, you have a few extra challenges to pursue

1) Allow the user to choose a waveform from between sine and sawtooth, at least. (1 pt)

2) Implement ADSR envelopes for your notes so you don't get zero-ing clicks. You will need to add a gain node for this. It will be in between the osc and the audioCtx.

    const globalGain = audioCtx.createGain(); //this will control the volume of all notes
    globalGain.gain.setValueAtTime(0.8, audioCtx.currentTime)
    globalGain.connect(audioCtx.destination);
    //...
    osc.connect(gainNode).connect.(globalGain) //you will need a new gain node for each node to control the adsr of that note

In practice, it is the release part of ADSR that causes the most problems, so focus on that first, then tackle the rest of the envelope. The shape of the envelope can be hard-coded. You will want to explore the ```exponentialRampToValueAtTime()``` function (HINT: read the [documentation](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam/exponentialRampToValueAtTime) carefully, as well as the ```setTargetAtTime``` function. If you want a reference for a gorgeous front end keyboard that does not address this issue, see: [https://oscillator.js.org/](https://oscillator.js.org/). As an expectation calibration, this course will not teach or expect anything like this frontend, but will demand a higher standard of audio quality. (3 pts)

3) Try playing two notes at once. It sounds awful right? Now we enable polyphonic mode - allowing the user to play two keys at once. To do this, we need to make sure you are not "clipping" (no amp levels >1). (HINT: you may need to control the gain of each oscillator independently). You do not need to support more than 2 voices, but it is likely a good solution will be easy generalize anyway. For this assignment, do *not* use a DynamicsCompressorNode - you want a similar effect, but need to implement this manually. (3 pts)

## The extra step (1 pt)

Do something interesting with your keyboard. 
This is the creative part. 
Maybe playing a note sometimes randomly plays 2 notes at once?
Maybe the notes you play change the background color of the page?
Maybe allow for a different tuning system?
The sky is the limit - make this your own.

> NOTE: The 1 point for this part of the assignment is awarded completely subjectively. You are working in a creative domain - get comfortable working with underspecified constraints and arbitrary judgement.

