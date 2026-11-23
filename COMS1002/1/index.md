# Module 2: Visuals

In this module we keep live coding in [Rattle](https://forg-lab.github.io/rattle/), but now the code draws as well as plays.
In Rattle, **a shape is a note**: `circle()` is timed exactly like `play()`, so a shape written next to a sound lands on that sound.
We use this to build audiovisual performances where the picture follows the music.

During the creation process, some of the key questions we ask are:

- What does a visual add to a live coding performance? Who is it for — the audience, or the performer?
- How do we tie what we see to what we hear, so the picture is not just decoration?
- What does it mean to be an artist vs a programmer?

Resources:

- [Rattle visuals tutorial](https://forg-lab.github.io/rattle/visuals-tutorial.html) (lessons 1–6, about 30 minutes)
- [Rattle docs — Visuals section](https://forg-lab.github.io/rattle/docs.html)
- In the Rattle menu: the demos **visuals**, **orbits**, **particles**, and **cellular automaton, drawn**

<a name="project2"></a>

## Project 2: Live coding visuals with Rattle

- Due XX, 11:59pm

Your goal is to experience first-hand the practice of live coding audio *and* visuals together.
You will be using Rattle and will record a video, with audio, of you live coding a piece where the picture follows the music.

During your performance, you must:

- Code, live, in real-time. **Show your code** and **show your visuals**.
- Improvise, though you can plan most of the piece ahead of time. Even with most of the code pre written in a separate window, you should experiment with new values for random seeds, loops, pitch values, colors, shapes, etc during the "performance"
- Generally, adhere to the Live Code Manifesto

Audio features you *must* use (same as Project 1):

- setting a random seed (3 points)
- sync'ing live loops (3 points)
- loops inside a live loop, for example ```for i in range(4):``` (3 points)
- play samples (3 points)
- use a synth (3 points)

Visual features you *must* use:

- draw shapes in at least 2 live loops, each shape written next to the sound it belongs to (5 points)
- use a musical choice to drive the picture — e.g. the same random index that picks a note also picks the shape's `y`, `hue`, or number of sides (5 points)
- use motion: at least one of `vx`, `vy`, `vr`, or `spin` (5 points)
- change the frame state during the performance: `trails()`, `mirror()`, `glow()`, or `bg()` (5 points)

The recording should last roughly 10 minutes (10 points). Note that in order to achieve this length, you will need to improvise a bit with your code in real-time. Do not plan out all 10 minutes exactly ahead of time, but instead have "goalposts" as discussed in class (5 points). Demonstrate familiarity with a core subset of the language, including several of `circle`, `rect`, `poly`, `line`, and `arc` (5 points). Make sure to have a focus on building an audiovisual "scene" where sound and picture belong together, as opposed to music with an unrelated screensaver behind it (5 points).

### Key tips

- Turn on visuals with the **visuals** button in the header (or `Cmd/Ctrl+Shift+V`). The picture is drawn *behind* your code.
- Use the **code** slider in the header to fade the editor so both your code and your visuals are readable in the recording. `Cmd/Ctrl+\` hides the code completely and brings it back — fine for a moment, but the code must be visible for most of the performance.
- Shapes fade after `life` beats (1 by default). If things vanish too fast, try a longer `life` or `trails(0.9)`.
- Keep the shape count sane. A `for` loop that draws dozens of shapes every quarter beat with `mirror(12)` will slow down.
- Make a short (30 sec) recording first to make sure your screen share and audio recording are working correctly
- If you use zoom, make sure to share screen and share computer audio before recording
- You do not need to include your camera/face in the recording.
- Use headphones when recording so that you are sure you are recording the computer audio directly, and not through your microphone. Mute your microphone so we only hear the computer audio.

### What to hand in?

- A link to the public posted video recording of your live code performance in Rattle. The description field of the video should contain a short (at least 2 paragraphs, more if you like) write-up highlighting interesting moments in the performance or lines of code you thought were creative — in particular, explain how your visuals are connected to your audio. Submit this link as a .txt file.

### How am I graded?

Rubric

- 60 points - Technical Sophistication. Does your project utilize your programming skills in an effective way? Have you gone significantly beyond any example code you have used? Is this "your" work?
- 30 points - Documentation. Did you record properly (sound recorded directly from sound card of computer using share sound, 10 points). Have you shown your complete code *and* your visuals during the performance (10 points)? Have you posted the recording so that is publicly viewable (5 points)? Does the video description include the write-up described above (5 points)?
Does the documentation highlight both the artistic aspect of your work, as well as the technical sophistication? Your work should be equally well appreciated by both a technical and non-technical audience.
- 10 points - Creativity. This is a subjective measure. You need to get comfortable with your work being judged in a subjective manner when working in Computing in Arts. To score full points here, you will need to put significant time into practicing live coding. Try to gain a level of fluency with Rattle that allows you to explore new creative ideas — in sound and in image — during your performance.

<hr>

## Lecture 2-1: Visuals in Rattle

How does Rattle draw? We cover the coordinate system (`-1..1` from the center, y up), the shapes (`circle`, `rect`, `poly`, `line`, `arc`), color as `hue`/`sat`/`val`, and why a shape behaves like a note: it is timestamped like `play()`, then grows, moves, and fades over its `life` in beats.
We also cover frame state — `trails`, `glow`, `mirror`, `bg` — and how the renderer turns one event per beat into smooth animation without any per-frame code.

```python
use_bpm(112)

@live_loop("look")
def look():
    bg(hue=0.62, sat=0.6, val=0.03)
    trails(0.82)                       # try 0, or 0.96
    glow(1)
    mirror(6)                          # try 1, 3, 12
    sleep(4)

@live_loop("drums", sync="look")
def drums():
    sample("bd", amp=1.1)
    circle(y=-0.5, r=0.08, hue=0.08, life=1.2, vr=0.4, fill=0, width=0.012)
    sleep(0.5)
    sample("hat", amp=0.35)
    circle(x=rrand(-0.9, 0.9), y=-0.2, vy=1.1, r=0.012, hue=0.5, life=2.5)
    sleep(0.5)
```


## Lecture 2-2: Live coding audiovisual performance

What changes when a live coding performance has something to look at besides the code?
We look at audiovisual live coding practice, and at mapping: which musical values (pitch, rhythm, density, a random choice) should drive which visual values (position, color, size, motion) — and when a mapping is meaningful versus arbitrary.

Creativity and Code. Context in digital art.
How can code itself be a visual artistic object? When the code is projected over the picture, which one is the artwork?
How do we tackle issues of artistic ownership of art generated by an algorithm?

<a name="lab1"></a>

## Lab 2-1: Live Coding Visuals

The goal of this lab is for you to learn Rattle's visuals, practice live coding them, and make a short recording.

**Part 1.** Work through lessons 1–6 of the [Rattle visuals tutorial](https://forg-lab.github.io/rattle/visuals-tutorial.html). Each lesson has code you can edit and run right on the page. (Use **Update**, not Play, to swap in new code while it runs.)

**Part 2.** In the Rattle app, turn on **visuals** and start from this code. It picks a note at random and draws a circle each time — but every circle is the same circle in the same place. The picture knows nothing about the music. Your job is to make the circle follow the note.

```python
use_bpm(100)

notes = scale("c4", "major_pentatonic")

@live_loop("tune")
def tune():
    i = rrand_i(0, len(notes) - 1)
    play(notes[i], release=0.3)
    circle(x=0, y=0, r=0.1, hue=0.5, life=1)       # <- change this line
    sleep(0.5)
```

`i` is which note of the scale was picked: 0 is the lowest, and the highest is `len(notes) - 1`.

1. Higher notes should appear higher on the screen. Make `y` depend on `i`, so the lowest note is near the bottom (`-1`) and the highest is near the top (`1`). **Before you run it, predict where each note will land.**
2. Each note should have its own color. `hue` runs from 0 to 1 around the color wheel. Make `hue` depend on `i` too.
3. Make it move. Try `vr=0.3` (grows as it fades), `vx=1` (drifts sideways), or `life=3` (lives longer) — then combine them. Or swap `circle` for `poly(n=..., ...)` and let `i` choose the number of sides.
4. Add a second `live_loop` with a drum `sample` and a shape that goes with it, synced to `"tune"`.

### To turn in:

Record a short video of you live coding your Part 2 code — less than 30 seconds is fine. Make sure both your code and your visuals are visible (use the **code** slider in the header) and that the audio is recorded directly from your computer. Post your video recording publicly, and save the link. For the lab, simply submit the link in a .txt file!

<hr>

## Lecture 2-3:


## Lecture 2-4:


## Lab 2-2:

