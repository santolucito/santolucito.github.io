---
layout: default
title: Lab5
---

# Lab 5 - Automated Composition (12 pts)

This lab should be turned in on by Nov 24.

For this lab you will implement two automated composition techniques and reflect on the experience
First, you will use the ```magenta.js``` library to implement neural network-driven composition.
Then, you will implement one of the three automated composition techniques we discussed this week from scratch.
As a reminder, these are:

- Markov Chain Learning
- Cellular Automata
- Pitch Set Theory

## Part I (2 pts)

For this, you will start with the code at [Demo: Magenta](./magenta). Walk through this code to understand what is happening (it is gratuitously commented). You can check the reference material cited below for more information.

You task is to hook this up to your synth from Lab2 (or a classmate's synth if you are not happy with your Lab2 synth).

The tutorial on which this code is based: https://hello-magenta.glitch.me/

Full API reference for Magenta.js is here:
https://magenta.github.io/magenta-js/music/globals.html

There is more you can do with Magenta.js. Check out some demos here: https://magenta.tensorflow.org/demos/web/

## Part II (6 pts)

Now we implement automated composition from scratch. Choose from below:

- Markov Chain Learning
- Cellular Automata
- Pitch Set Theory

All of these options can run as a static process that generates a sequence of notes, then plays them back. You do not need anything to continuously play back. Of course, you are welcome to go above and beyond if you like (it is not a huge step, and makes the tool more fun). The descriptions below are the bare minimum requirements you should meet.

You may use utility libraries are necessary. For example, you may use a matrix multiplication library, but not a markov chain library.

### Markov Chain Learning

You must be able to learn an n-th order markov chain from input data. You may use the TWINKLE_TWINKLE input data from the magenta example, or, if you prefer, use the [```blobToNoteSequence```](https://magenta.github.io/magenta-js/music/modules/_core_midi_io_.html#blobtonotesequence) function to read in MIDI files.

### Cellular Automata

This approach is purely generative, no input data needed. You must implement a 2D cellular automata, then map the output to notes, which you play back. There is a large creative space in how the mapping actually works - find something that motivates you. Similarly, you do not need to stick to any particular rules for the automata generation - remember that cellular automata are more general than the Game of Life. You should have some basic (can be very basic) visualization so we can see some aspect (even if not all aspects) of the state of the CA over time.

### Pitch Set Theory

Use pitch set theory to automate a composition. You will need to implement functions for transpose, inverse, and retrograde of a pitch class sequence. Then, implement a function that takes an initial pitch class set, and randomly applies the aforementioned operations to generate a composition. The user should be able to change some aspect of the composition from the interface (e.g. the input pitch class sequence).

You do not need to implement a normalization procedure. You can assume the input pitch set classes are already in normal form.

Check the course slides for more information on pitch set theory resources.

## Part II Extra Step (1 pt)

Go above and beyond the expectations above.
This point will be awarded to the top ~10% of submissions.

## Part III (3 pts)

Write about your experience in this lab in a blog post.
Please use at least the bare minimum amount of formatting (e.g. ```<p></p>``` tags).
This blog post should be readable by someone outside of this class, but knowledgeable in WedAudio.
As a reference for the style of writing you should emulate, see [https://magenta.tensorflow.org/pianogenie](https://magenta.tensorflow.org/pianogenie).
The blog post should be more than just a rehashing of material covered in class. 
For example, what insights did you gain from programming this yourself beyond what we covered in class?
