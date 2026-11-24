# Module 1: Audio


Here we look at code as a performative interface. 
Looking beyond code as a fixed object, we find artistic value in the process of code evolution.
We explore experience of writing code in front of an audience and accepting imperfection.
In a more practical sense, this is particularly good training for coding interviews.

<a name="project1"></a>

## Project 1: Live coding with Rattle

- Due Nov XX, 11:59pm

Your goal is to experience first-hand the practice of live coding.
You will be using Rattle and will record a video with audio of you live coding.

During your performance, you must:

- Code, live, in real-time. **Show your code**.
- Improvise, though you can plan most of the piece ahead of time. Even with most of the code pre written in a separate window, you should be experiment with new values for random seeds, loops, pitch values, etc during the "performance"
- Generally, adhere to the Live Code Manifesto
- Rerun and stop your code with the keyboard, not the buttons: `Cmd+Enter` (`Ctrl+Enter` on Windows) reruns your code while it keeps playing, and `Cmd+.` (`Ctrl+.`) stops everything. Do not click the Run/Stop buttons (2 points)

Some language features you *must** use include:

- setting a random seed (5 points)
- sync'ing live loops (5 points)
- loops inside a live loop, for example ```for i in range(4):``` (5 points)
- play samples (5 points)
- use a synth (5 points)

The recording should last roughly 10 minutes (8 points). Note that in order to achieve this length, you will need to improvise a bit with your code in real-time. Do not plan out all 10 minutes exactly ahead of time, but instead have "goalposts" as discussed in class (10 points). Demonstrate familiarity with a core subset of the language (10 points). Make sure to have a focus on building a "soundscape" as a opposed to replicating your favorite sound (5 points).

### Key tips

- Practice with the hotkeys from day one: `Cmd+Enter` to rerun, `Cmd+.` to stop. Rerunning swaps in your new code without stopping the music; clicking Stop and then Run restarts everything and breaks the flow of the performance.
- Make a short (30 sec) recording first to make sure your screen share and audio recording work working correctly
- If you use zoom, make sure to share screen and share computer audio before recoding
- You do not need to include your camera/face in the recording.
- Use headphones when recording so that you are sure you are recording the computer audio directly, and not through your microphone. Mute your microphone so we only hear the computer audio (unless you intentionally want to use ```live_audio```).


### What to hand in?

- A link to the public posted video recording of your live code performance in Rattle. The description field of the video should contain a short (at least 2 paragraphs, more if you like) write-up highlighting interesting moments in the performance or lines of code you thought were creative. Submit this link as a .txt file.

### How am I graded?

Rubric

- 60 points - Technical Sophistication. Does your project utilize your programming skills in an effective way? Have you gone significantly beyond any example code you have used? Is this "your" work?
- 30 points - Documentation. Did you record properly (sound recorded directly from sound card of computer using share sound 10 points). Have you shown your complete code during the performance (10 points)? Have you posted the recording so that is publicly viewable (5 points)? Does the video description include the write-up described above (5 points)?
Does the documentation highlight both the artistic aspect of your work, as well as the technical sophistication? Your work should be equally well appreciated by both a technical and non-technical audience. 
- 10 points - Creativity. This is a subjective measure. You need to get comfortable with your work being judged in a subjective manner when working in Computing in Arts. To score full points here, you will need to put significant time into practicing live coding. Try to gain a level of fluency with Rattle that allows you to explore new creative ideas during your performance.

<hr> 

## Lecture 1-1: Technicals of Audio  

https://docs.google.com/presentation/d/1x-KvHXgALg_QjKiBMyzYV6LRfhywaWjB7rKLcB3P13Q/edit?usp=sharing

What is digital audio? How is sound represented in a computer?
What new challenges arise in programming audio as opposed to non-time domain programming?


## Lecture 1-2: Live coding How to 

<a name="lab2"></a>

## Lab: Rattle

The goal of this lab is for you to practice live coding in Rattle, learn the basic interface, and make a short recording. 


**Use the hotkeys, not the buttons.** Rerun your code with `Cmd+Enter` (`Ctrl+Enter` on Windows) — the music keeps playing and your new code takes over. Stop everything with `Cmd+.` (`Ctrl+.`). Get in the habit now; the projects require it.

Start from this code. The **outer loop** picks a root note for each phrase, and the **inner loop** picks pitches and rhythms within the phrase.


```python
@live_loop("melody")
def melody():
    use_synth("pluck")
    use_random_seed(42)                        # position A
    for phrase in range(4):
        # position B
        root = choose(["e3", "g3", "a3"])      # outer-loop choice
        for n in range(3):
            # position C
            play(choose(scale(root, "minor_pentatonic")))   # inner-loop choices
            sleep(choose([0.25, 0.5]))
```


Move `use_random_seed(42)` to each position below. **Before you run it, predict what you'll hear.** Then listen, and write one sentence on what repeats and what changes.

1. Position A (top of the `live_loop`)
2. Position B (top of the outer loop)
3. Position C (top of the inner loop)
4. No seed at all

Then try using two seeds at once. Can you make the root notes change every phrase, but the rhythm within each phrase stay the same?

### To turn in:

Once you have completed the above tutorial sections you will have a good foundation to start live coding yourself. Record a video of you live coding. It doesn't have to be fancy or long (less than 30 seconds is fine) - though a loop that plays a single note is enough. This is to confirm that you have the tool installed, understand the basic usage, can record your audio and code at the same time, and can post a video online. Post your video recording publicly, and save the link. For the lab, simply submit the link in a .txt file!

### A note on recording

Please be sure you are recording the sound *directly* from your computer, and not record the output of your laptop speakers. If you are using zoom, you will want to share computer audio. Be sure to also go to "More" > "Select sound sharing mode" > "Stereo (high-fidelity)". Be sure to mute your microphone. Follow analogous instructions for other screen recorders (e.g. quicktime). Once you have made your recording, be sure to listen to it once to make sure the audio has recorded properly and has not picked up your roommates' conversations. 

<hr>

## Lecture 1-3: Generative Processes and Random Seeds


## Lecture 4-1: TBA



