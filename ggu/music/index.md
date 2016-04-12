---
layout: default
title: Music
---

# Computer Music

#### Join the [soundcloud group](https://soundcloud.com/groups/ggu-computer-music)!

All recordings you make should be added to the group.

<hr>
## 4/12

### Max programming

*NB* - when you turn on audio, every open window will start playing sound!
Make sure you close windows you no longer need open.

Today we will build a sample player. You can download the [final version](/ggu/samples/samplePlayer.maxpat).

The new objects we will use today are listed here.

- ```play~```
- ```umenu```
- ```prepend```
- ```preset```
- ```pitchshift~```

#### First

A bit more on the ```buffer~``` object. We need to understand RAM vs disk.  Disk, or the hardrive, is large and slow. RAM is small, easily accessible, and fast. You can think of disk as a library and RAM as books on your desk.

![ram](/ggu/music/imgs/RAM.png)

the ```play~``` object will allow us to play sound in a buffer.
Using the ```umenu``` and ```prepend``` we can quickly load different files to the buffer.

![buffer](/ggu/music/imgs/buffer.PNG)

### Homework

#### Part 1  - Due 11:59pm Monday 4/18

Create 10 short samples from music you like. Use those 10 samples in the [sample player program](/ggu/samples/samplePlayer.maxpat) we build today. Add ```pitchshift~``` to all of the ```play~``` objects for each sample. Make at least 10 presets using ```preset``` and cycle through them (using ```metro``` and ```counter```) to create a new piece of music.

Make a recording with audacity of at least 30 seconds. Post it to [soundcloud group](https://soundcloud.com/groups/ggu-computer-music) with the title **Recording #3**

Here is an example of you should make.

<audio controls>
  <source src="/ggu/music/samples/sample_isthatyou.wav" type="audio/wav">
Your browser does not support the audio element.
</audio>

#### Part 2  - Due 9:00am Tuesday 4/19

Comment on at least 3 songs from other students in the soundcloud group.

<hr>
## 4/05


### Computer Music History

We are learning about wave forms today.
This is the most basic unit of sound.
The sine wave is the most famous.

![sine](/ggu/music/sine-plot.gif)

A record player uses waves to mimic this natural sound.
![record](/ggu/music/recordPlayer.gif)

![mic](https://j.gifs.com/pYL4O2.gif)

The Theremin plays sounds that are close to sine waves.
Here is a video, and an [online demo](http://www.google.com/doodles/clara-rockmores-105th-birthday) of how it works.

<iframe width="420" height="315" src="https://www.youtube.com/embed/pSzTPGlNa5U" frameborder="0" allowfullscreen></iframe>


### Max programming

We can create these waves in Max, and listen to them.
[This patch](/ggu/music/samples/waveDemo.maxpat) plays a triangle wave, a sawtooth wave, and a sine wave.

There are two kinds of cords in Max, green for signals (repeated numbers) and grey for discrete data (single numbers).

When using signals, we will need some new objects. Look at the help files for the following

- cycle~
- *~
- +~
- buffer~
- groove~

Also try looking at the first MSP tutorial on *Recording and Playback*

### Homework

Make a recording of a wave form you like and post it to soundcloud.

<hr>
## 3/29

We listened to some historical computer music and learned about the theory behind Max.
See a record of this class [here](/ggu/music/3_29).

<hr>
## 3/22

We had an [introduction to Max](/ggu/music/intro_to_max)

<hr>
## 3/15

No class today, we will make up class later in the semester.

<hr>
## 3/8

We [learned how to use Audacity](ggu/music/intro_to_aud) and listened to examples of *sampling*.
