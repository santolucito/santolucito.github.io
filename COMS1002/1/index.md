# Module 1: Visuals

Processing is an easy to use programming framework for creating visual arts.
We will use Processing in Python mode to create our own visual art with code.
During the creation process, some of the key questions we ask are:

- How do we document our work to fully communicate our artistic intentions?
- What does it mean to be an artist vs a programmer?


<a name="project1"></a>

## Project 1: Processing

- Due Nov 9

Your goal is to create a new work of art with Processing in Python mode.
This is an open-ended assignment - which may be an uncomfortable space for you if this is new to you.
The guiding principle should be to create something that you are proud to call your own creation.

As a more concrete guide, here are some guideposts you should hit:

- set the size of your canvas
- set default colors for fill and stroke - or turn off fill and stroke
- have code that draws at least 10 distinct shapes
- some, or all, of the parameters of your shapes should depend on program variables rather than being hard coded
- a level of randomness using the ```random()``` function, or something similar (e.g. ```Basics > Math > Noise 2```)
- have some level of user interaction (through the mouse or keyboard)

You do not need to have every single point here, but you should have most. If you omit anything above, be sure that there is a strong artistic motivation for not including it.

### What to hand in?

- Your program code in a .zip folder. Be sure to include any .png images (or similar) in your submission or we will not be able to run your code. 
- Leave a comment on your courseworks submission with a link to the public posted video recording of your processing sketch. The description field of the video should contain a short (at least 2 paragraphs, more if you like) write-up of the process you took in your work. You can think of this as an artist's statement. If your artistic endeavor goes beyond the sketch itself (e.g. making a stencil template for street art, credit to @Davy), be sure to document (in the video, or in the video description) the full life-cycle of your artistic product (e.g. the stencil in action).

### How am I graded?

Rubric

- 50 points - Technical Sophistication. Does your project utilize your programming skills in an effective way? Have you gone significantly beyond any example code you have used? Is this "your" work?
- 30 points - Documentation. Have you captured your work in a digestible way? Does the documentation highlight both the artistic aspect of your work, as well as the technical sophistication? Your work should be equally well appreciated by both a technical and non-technical audience. Note that capturing the technical side is often the more difficult.
- 20 points - Creativity. This is a subjective measure. You need to get comfortable with your work being judged in a subjective manner when working in Computing in Arts. To score full points here, submit a work that you are proud to call your own. Pursue something that is artistically motivating you, and communicate that through your documentation.


An example of an A+ project is here [https://www.youtube.com/watch?v=OCe36rvdrFI](https://www.youtube.com/watch?v=OCe36rvdrFI)

<hr>

## Lecture 1: 

Oct 29

[Download slides for Lecture 1](../slides/lect1.pdf)

In this lecture we get into the technical aspects of generative visuals.
We will cover the graphics system used by processing and explore the ways in which we communicate visual instructions to a computer.
We will tackle the generation of both static images and animations.
One key point is to ensure that we understand performance bottlenecks and other basic issues in graphics systems, and how our code can impact the quality of our renderings.

<a name="lab1"></a>

## Lab 1: Processing

Oct 30

Installing [Processing](https://processing.org/download/). Once you have installed Processing, proceed to install Python mode. To do this, click the top right button that says Java, and then click "Add Mode".

In this lab we have two goals: 1) getting our hands dirty with Processing, and 2) establishing the foundations for documenting work.
For the first part of this lab our goal is to  start with the "Yellowtail" example and modify it to additionally display text of your choice.
The text size should take up the full display window, and the text should "bounce" up and down on the screen.
You will want to "remix" code from ```Demos > Graphics > Yellowtail``` and ```Basics > Typography > FiveWaysOfWritingText```.

Once you have the code working, next we will document our work.
Documenting your work is one of the most important, and most neglected, aspects of computational art.
This is a different type of documentation than commenting your code.
We will create a video recording of that processing script being run - our goal is to document the artistic artifact.
This style of documentation is complementary to technical documentation (e.g. commenting your code).
There is a built-in tool to record images frame-by-frame in Processing, but it might be easier to just record a screencast using your favorite tool.
Try to screencast just the display window, rather than your whole screen.

### To turn in:

Post your video recording publicly, and save the link. Add that link as a comment in your code. To submit this lab, submit a .zip of your code.

<hr>

### Lecture 2:

Nov 5

[Download slides for Lecture 2](../slides/lect2.pdf)

Creativity and Code. Context in digital art. 
How can code itself be a visual artistic object? Can we treat code as literature?
What are the core techniques used in generation of visuals.
How do we define the difference between data visualization and computational art?

How do we tackle issues of artistic ownership of art generated by an algorithm?
This is especially relevant in the machine learning setting, where training data was used in conjunction with code to generate new art.

In automating art, how far is too far?
What is the value is automation?

In class reading: [https://hai.stanford.edu/blog/humans-loop-design-interactive-ai-systems](https://hai.stanford.edu/blog/humans-loop-design-interactive-ai-systems)

### Lab 2: Project 1 help

Nov 6

Help with the project.
