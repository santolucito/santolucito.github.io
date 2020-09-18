---
layout: default
title: Lab2
---

# Lab 2 - Build your own synth (12 pts)

In our previous lab, you built your own keyboard, but the sounds were a bit lackluster - we were only using one oscillator at a time per key press.
To make things more interesting, we will start playing with more complex sounds.

## the basics (8 pts)

you will need to three implement types of audio synthesis

- **Additive synthesis**: The frequencies and amplitudes can be hardcoded. Include at least 3 partials, all shaped by the same envelope. (2 pts)
- **AM synthesis**: The carrier frequency should be the frequency associated with the key you press. The modulation frequency can be hardcoded. (3 pts)
- **FM synthesis**: The carrier frequency should be the frequency associated with the key you press. The modulation frequency can be hardcoded. (3 pts) 

These can be three distinct modes, or can be combined in some way that is interesting to you.
Ideally, experiment a bit, and find something that is musically motivating to you.
Whatever you do, connect it to your keyboard to replace the single oscillator that was previously driving the keyboard.
Be careful of clipping! If clipping is an artistic choice for your synth, you must also have a mode that does not allow clipping.

Example code for AM and FM synthesis is WebAudio is avaible here: [http://marksantolucito.com/COMS3430/](http://marksantolucito.com/COMS3430/)

## the next steps (3 pts)

### LFOs (1 pts)
Use a LFO to add complexity to some part of your synth.

### Interaction (2 pts)
With your synthesis modes created, you need a way to interface with the hardcoded parameters of synthesis. 
Build a front-end (textbox or range input is fine) that allows users to control some (or all, but no less than 2) parameters of the three modes of synthesis.
These parameters could be the mix between synthesis methods, the number of partials to add in additive synthesis, the value of the modulation frequency, the ADSR envelope, etc.

## the extra step (1pt)

Make a recording with you new instrument - this can be either a demo, or a piece of music.
Use a tool that records the audio directly from your device - do not use your phone to record your laptop speakers.
If you feel so inclined, you could even record a few tracks on top of each other and stitch them together (no need for this though).
Post your recording in our class Discord server on the #showcase channel (no code posting for now please, just recordings).
There will be no judgement on the musicality/creativity/etc of this recording. This step is just graded for completion.
