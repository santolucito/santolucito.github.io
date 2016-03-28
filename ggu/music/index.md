---
layout: default
title: Music
---

# Computer Music

## 3/29

#### Computer Music History

Some early musicians to use electronics in their performances.

<iframe width="420" height="315" src="https://www.youtube.com/embed/VXa9tXcMhXQ" frameborder="0" allowfullscreen></iframe>

David Cope was a pioneer of algorithmic composition. The program he wrote is named *Emmy*.
Compare this composition to an original Vivaldi and see if you can spot the difference.

<iframe width="420" height="315" src="https://www.youtube.com/embed/2kuY3BrmTfQ" frameborder="0" allowfullscreen></iframe>

Black Midi is a type of computer music that relies on using many notes. It can only be played by a computer.

<iframe width="420" height="315" src="https://www.youtube.com/embed/EPN4oyvWzvk" frameborder="0" allowfullscreen></iframe>

### Max Programming
#### Types

Can you spot the difference in these two patches?
Why do they behave differently?
One is using "Integers" (whole numbers) and the other is using "Floats" (decimal numbers).

![types](/ggu/music/imgs/int_vs_float.PNG)

#### Hot vs Cold

In Max, inputs can be *hot* or *cold*.
Usually, the input on the left is hot, and the others are cold.
When a hot input changes, the program will rerun the computation.
When a cold input changes, the program will *not* rerun the computation, but next time the computation does run it will use the new value.

![adding](/ggu/music/imgs/Max_Adding.gif)


Using this knowledge let's try to make a more advanced program that can make music.
We will start with the [program we build last week](/ggu/music/samples/midi_stepper.maxpat), and improve upon it.

![max2](/ggu/music/imgs/max2.PNG)



#### Homework due (4/5)

Create a program that plays pleasant music like the one we made in class (see below). Make a recording with audacity and post it to youtube. This will require that you make a youtube account.
Once you have uploaded the video, post the link on the LMS page.

![prelude](/ggu/music/imgs/prelude.PNG)

The notes we used in class for the ```coll``` object are:

```
1, 60 64 67 72 76 67 72 76;
2, 60 64 67 72 76 67 72 76;
3, 60 62 69 74 77 69 74 77;
4, 60 62 69 74 77 69 74 77;
5, 59 62 67 71 77 67 71 77;
6, 59 62 67 71 77 67 71 77;
7, 60 64 67 72 76 67 72 76;
8, 60 64 67 72 76 67 72 76;
9, 60 64 69 76 81 69 76 81;
10, 60 64 69 76 81 69 76 81;
11, 60 62 66 69 74 66 69 74;
12, 60 62 66 69 74 66 69 74;
13, 59 62 67 74 79 67 74 79;
14, 59 62 67 74 79 67 74 79;
15, 59 60 64 67 72 64 67 72;
16, 59 60 64 67 72 64 67 72;
17, 57 60 64 67 72 64 67 72;
18, 57 60 64 67 72 64 67 72;
19, 50 57 62 66 72 62 66 72;
20, 50 57 62 66 72 62 66 72;
21, 55 59 62 67 71 62 67 71;
22, 55 59 62 67 71 62 67 71;
23, 55 58 64 67 73 64 67 73;
24, 55 58 64 67 73 64 67 73;
25, 53 57 62 69 74 62 69 74;
26, 53 57 62 69 74 62 69 74;
```

## 3/22

We had an [introduction to Max](/ggu/music/intro_to_max)

## 3/15

No class today, we will make up class later in the semester.

## 3/8

We [learned how to use Audacity](ggu/music/intro_to_aud) and listened to examples of *sampling*.
