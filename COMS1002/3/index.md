# Module 3: Professional Animation and Machine Learning

<a name="project3"></a>

## Project 3: Blender Animation

Your goal is to create a new animation with Blender.
Your animation should be short - roughly 2-10 seconds.
This is an open-ended assignment - which may be an uncomfortable space for you if this is new to you.
The guiding principle should be to create something that you are proud to call your own creation.

As a more concrete guide, here are some guideposts you should hit:

- include code that deletes all objects and materials at the start of your script as discussed in class
- set the bpy.context.scene.frame_end to a value greater than 250 (its default value)
- use keyframe_insert to create an animation
- use a for loop to create multiple copies of an object, such as multiple meshs, materials, lights, etc
- add a bpy.ops.object.constraint_add(type='TRACK_TO') to the camera
- create a material and add it to a mesh

### What to hand in?

- Your python script that starts with import bpy
- Leave a comment in your code with a link to the publicly posted video recording of your Blender animation. The description field of the video should contain a short (at least 2 paragraphs, more if you like) write-up of the process you took in your work. You can think of this as an artist's statement. 

# Lec 1

Intro to Blender

https://docs.google.com/presentation/d/14hPU3g4M32dgNvU3DAo2xITeI-Ase5S8eJMT4Lde07s/edit?usp=sharing

# Lec 2

More Blender + ML

https://docs.google.com/presentation/d/1D12nbs6eqWsFCv3oh_AunOPuVmqSKAB7GJegeRkW0kw/edit?usp=sharing

<a name="lab3"></a>

## Module 3 Lab: Exporting a video

For lab 3, you will need to boot up Blender, create a script (using the code linked below as a starting point), export a video, and upload a link to that video.

To create a video from Blender, follow the instructions in this video: https://www.youtube.com/watch?v=0h-TfXdzbcE&list=PLVUpXDC9TyrXtzJ9y9JMw9x7oARmzsJSK&index=4

Note: if you are seeing a low-quality video, you might need to change the output quality. Within the output tab (where you changed the folder to output to, go to Output > Encoding > Video > Output Quality) and choose Lossless or Perceptually Lossless for higher quality video output.

Use this script to create a simple animation.

https://gist.github.com/santolucito/2007891422e15f45c712416b344b9f0d

With the script I have given you, you should get a video that looks like this: https://youtu.be/9nT23gPfEb8

But before you make this video, make one simple change to the code. For example, you could change the color of the material, or the way the donut rotates, or change the donut into a cube, or make 100 donuts that flip instead of just one (just know that the more objects you have, the slower Blender will render the animation).

## What to submit

For this lab, submit your code, which includes a link to the video you uploaded

# Lec 3

https://docs.google.com/presentation/d/11IqlVDZolvnCOSR5h9tk2bq0TQdrZZag89sRc2IPBqM/edit?usp=sharing

# Lec 4

Exam
