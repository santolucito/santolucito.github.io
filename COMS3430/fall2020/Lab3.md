---
layout: default
title: Lab3
---

# Lab 3 - Farnell synthesis (12 pts)

In our previous labs, you built your own keyboard and synthesizer.
Now we leave that behind and move to a different type of synthesis, looking at procedural sounds and audio effects.

This lab should be turned in on Canvas by Monday Midnight (AoE).


## Part I: Reading unfamiliar languages (4 pts)

For the first part, you will work as a pair with a classmate (when you submit, make a note of who you were working with) to recreate a classic SuperCollider program in WebAudio.
But wait you say, we never covered SuperCollider.
Indeed! One of the joys of working in audio (and programming in general) is that you will often want to leverage material that does not exactly fit your context.
In this lab we will slowly work up to more complex challenges, with fewer resources for you to rely upon.

The sound you will create is a "babbling brook". The code provided here:

    {RHPF.ar(LPF.ar(BrownNoise.ar(), 400), LPF.ar(BrownNoise.ar(), 14) * 400 + 500, 0.03, 0.1)}.play

Is should sound like this: 

<audio controls>
  <source src="sounds/babbling.wav" type="audio/wav">
</audio>

This is a simplified version of the [original code](https://github.com/supercollider/supercollider/blob/3287b55edfc670caefda0a0056f48b1319075b3c/examples/demonstrations/babbling%20brook.scd), so it sounds a bit more like bubbles at this point, but close enough.

You will notice some items we have covered before (```RHPF``` and ```LPF```) and others we have not ```BrownNoise```.
To help you a bit, to generate Brown Noise, you can use the code below:

    var bufferSize = 10 * audioCtx.sampleRate,
    noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate),
    output = noiseBuffer.getChannelData(0);

    var lastOut = 0;
    for (var i = 0; i < bufferSize; i++) {
        var brown = Math.random() * 2 - 1;
      
        output[i] = (lastOut + (0.02 * brown)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
    }

    brownNoise = audioCtx.createBufferSource();
    brownNoise.buffer = noiseBuffer;
    brownNoise.loop = true;
    brownNoise.start(0);

See if you can intuit the meaning of the arguments for ```LPF```.
You can look at the [docs for RHPF](https://doc.sccode.org/Classes/RHPF.html) to learn how this is being used.
The main question facing you is, how do you adapt this to the BiquadNode in WebAudio

## Part II: Reading high level descriptions (4 pts)

Next you will create your own sound from scratch (this part is individual, but work together as much as you like).
Look to Farnell, *Designing Sound* Part IV: Practicals. 
This book is available through the Columbia Library website.
There are a number of descriptions of how to generate various sounds. 
Pick one and try to implement it.
Some are easier than others - choose the right level of challenge for you.

Note: a number of the descriptions take a physical modelling approach, which can be a bit exhausting to implement.
Pick the sound, read the description of the sound, and implement it as you see fit.
This may or may not involve using the same approach outlined in the book.

This is a very open ended assignment.
You may uncomfortable with this.
Acknowledge that discomfort and forge ahead.
Ask questions to your peers and me.
There are no "right" answers here (there are "wrong" answers though).
The goal of this part of the assignment is to push you outside of your comfort zone.
Think creatively - if your sound does not match exactly what you envisioned, can you repurpose it as another sound?

## the writeup (3 pts)

Write a short blog describing the sound you were aiming to recreate, and walking through the key parts of your code.

Include an image of the audio signal graph. This can be generated with the WebAudio visualizer Chrome extension, or drawn by hand. (1 pt)

Explain your process and experience.
What were the types of synthesis you use, how do they fit together, and why did you made these choices? (2 pts)

## the extra step (1pt)

This point is for free this time.
This is a hard lab, you deserve it.
