# Module 3: Hardware

In this module we take live coding off the keyboard.
A [micro:bit](https://microbit.org) is a small programmable board with buttons, an accelerometer, a light sensor and more.
Plugged into [Rattle](https://forg-lab.github.io/rattle/), it becomes an instrument: its readings flow into your code the same way a slider does, so tilting, shaking, or covering the board changes the music and the picture as it plays.

During the creation process, some of the key questions we ask are:

- What makes a physical interface feel like an *instrument* rather than a remote control?
- How do we map gestures to sound and image so the mapping is expressive, not arbitrary?
- When a performer holds an instrument and the code runs on its own, who (or what) is performing?

Resources:

- [Rattle docs — micro:bit section](https://forg-lab.github.io/rattle/docs.html)
- [controller.py](https://github.com/forg-lab/rattle/blob/main/microbit/controller.py) — the program you flash onto the board
- [Rattle micro:bit guide and troubleshooting](https://github.com/forg-lab/rattle/tree/main/microbit)
- In the Rattle menu: the demo **micro:bit**

You will need **Chrome or Edge** (Safari and Firefox cannot talk to the board) and a USB cable that carries data, not just power.

<a name="project3"></a>

## Project 3: Live coding with a micro:bit

- Due XX, 11:59pm

Your goal is to perform a live coded piece in Rattle where a micro:bit is part of the instrument.
You will record a video, with audio, of you performing — live coding *and* playing the board.

During your performance, you must:

- Code, live, in real-time. **Show your code**, your visuals, **and the board in your hand**.
- Improvise, though you can plan most of the piece ahead of time. You should change both your code and the way you use the board during the "performance"
- Generally, adhere to the Live Code Manifesto

Audio and visual features you *must* use (carried over from Projects 1 and 2):

- sync'ing live loops (3 points)
- loops inside a live loop, for example ```for i in range(4):``` (3 points)
- play samples and use a synth (3 points)
- draw shapes next to the sounds they belong to (3 points)
- use a random seed, motion (`vx`, `vy`, `vr`, `spin`), or frame state (`trails`, `mirror`, `glow`, `bg`) (3 points)

Hardware features you *must* use:

- a continuous reading (e.g. `mb("tilt_x", lo, hi)`) that changes the sound (5 points)
- the same or another reading that changes the picture (5 points)
- at least one trigger with `hit()` (button, shake, or logo) (5 points)
- **modify `controller.py`** to send at least one new channel that it does not send already — for example the compass heading, the temperature, the microphone's sound level (micro:bit V2), or a sensor wired to a pin — and use it in your piece (5 points)

The recording should last roughly 10 minutes (10 points). Do not plan out all 10 minutes exactly ahead of time, but instead have "goalposts" as discussed in class (5 points). Design the mapping so that the board feels like an instrument — for example, letting tilt choose *where in a scale* a figure sits rather than just turning a filter knob (5 points). Make sure gesture, sound, and picture belong together as one performance (5 points).

### Key tips

- Flash the board and test the connection well before you record. The panel in the bottom-left corner of Rattle shows each channel as it arrives — if it moves when you tilt the board, everything is working.
- Channels carry values from **0 to 1**. Scale on the board (`unit()` in `controller.py` does this), then map in Rattle with `mb(name, lo, hi)`. A new channel that sits at `1.00` and never moves is sending raw values above 1.
- Use a scale that cannot play a wrong note (e.g. pentatonic) when a tilt picks the notes.
- Only one tab can hold the board at a time. If Rattle says the port is busy, close the other tab.
- The board has to be visible, so for this project you need a camera: a webcam overlay on your screen recording, or a phone filming the board next to the screen. Audio should still be recorded directly from the computer.
- Make a short (30 sec) recording first to check that screen, camera, and audio all come through.

### What to hand in?

- A link to the public posted video recording of your performance. The description field of the video should contain a short (at least 2 paragraphs, more if you like) write-up highlighting interesting moments in the performance and explaining your mappings: which gesture controls what, and why you chose it.
- Your modified `controller.py`.

Submit the link in a .txt file along with your `controller.py`.

### How am I graded?

Rubric

- 60 points - Technical Sophistication. Does your project utilize your programming skills in an effective way? Have you gone significantly beyond any example code you have used? Is this "your" work?
- 30 points - Documentation. Did you record properly (sound recorded directly from the computer, 10 points)? Have you shown your code, your visuals, and the board in use during the performance (10 points)? Have you posted the recording so that it is publicly viewable (10 points)?
Does the documentation highlight both the artistic aspect of your work, as well as the technical sophistication? Your work should be equally well appreciated by both a technical and non-technical audience.
- 10 points - Creativity. This is a subjective measure. You need to get comfortable with your work being judged in a subjective manner when working in Computing in Arts. To score full points here, spend time practicing with the board until you can play it with intention, not just wave it around.

<hr>

## Lecture 3-1: Hardware and sensors

What is on a micro:bit, and how does a reading get from a sensor into a note?
We cover the accelerometer, buttons, light sensor, and pins; how the board sends one `name,value` line at a time over the USB cable; why every channel carries 0..1; and the difference between things that **vary** (`mb()`) and things that **happen** (`hit()`).
We also look at latency: Rattle runs a quarter of a second ahead of what you hear, so a button press lands on the next step of your loop's grid.

```python
@live_loop("bass")
def bass():
    play(36, cutoff=mb("tilt_y", 45, 105), release=0.4)
    if hit("a"):
        sample("clap")
    sleep(0.25)
```


## Lecture 3-2: Designing an instrument

Mapping is the art of hardware performance.
Hanging tilt off a cutoff works, but the music stays the same music, slightly brighter — the board feels like a knob because it *is* a knob.
We look at mappings that make a board feel like an instrument: tilt choosing where in a scale a figure sits, one axis stretching a figure apart, covering the board to flood it with reverb, and the same gesture driving sound and picture at once.

How do audiences read a performer holding an instrument versus a performer typing?
What do we lose, and gain, when the code keeps playing even if the performer holds still?

<a name="lab3"></a>

## Lab 3-1: Hello, micro:bit

The goal of this lab is to get a micro:bit talking to Rattle, play it, and make a short recording.

**Part 1: flash the board.**

1. Plug the micro:bit into your computer with a USB cable. (If nothing works later, try another cable first — some only charge.)
2. In Chrome or Edge, open [python.microbit.org](https://python.microbit.org).
3. Delete everything in its editor and paste in the whole of [controller.py](https://github.com/forg-lab/rattle/blob/main/microbit/controller.py).
4. Click **Send to micro:bit** and pick the board. The lights flicker for a few seconds while it flashes.
5. In [Rattle](https://forg-lab.github.io/rattle/), click **micro:bit** in the header and pick the board. Tilt it and watch `tilt_x` and `tilt_y` move in the panel in the bottom-left corner.

**Part 2: play it.** Run this code, turn on **visuals**, and play the board.

```python
use_bpm(112)

notes = scale("e2", "minor_pentatonic", num_octaves=3)

@live_loop("lead")
def lead():
    use_synth("pluck")
    here = int(mb("tilt_x", 0, 7))       # tilt walks up and down the scale
    for step in (0, 2, 4, 2):
        play(notes[here + step], release=0.45, cutoff=mb("tilt_y", 60, 112))
        circle(x=mb("tilt_x", -0.9, 0.9), y=-0.6 + step * 0.2,
               r=0.05, vr=0.3, hue=mb("tilt_x", 0.45, 0.95), life=2)
        sleep(0.25)

@live_loop("hits", sync="lead")
def hits():
    if hit("a"):
        sample("clap")
    sleep(0.125)
```

1. **Before you tilt it, predict** what tilting left/right and away/toward will do to the sound and to the picture. Then try it.
2. Make button B do something different from button A — a sample, and a shape.
3. Make `tilt_y` stretch the arpeggio apart: replace `(0, 2, 4, 2)` with steps that depend on `int(mb("tilt_y", 1, 4))`.
4. Cover the light sensor (the LEDs) with your hand. Use `mb("light", 0.55, 0.0)` as the `room=` of the `play` so covering the board floods it with reverb. Why are the numbers backwards?

### To turn in:

Record a short video — less than 30 seconds is fine — showing your screen (code and visuals) and the board in your hand as you play it, with audio recorded directly from your computer. Post your video recording publicly, and save the link. For the lab, simply submit the link in a .txt file!

<hr>

## Lecture 3-3:


## Lecture 3-4:


## Lab 3-2:

