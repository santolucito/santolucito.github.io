# Module 3: Physical Computing

Using the [micro:bit from BBC](https://microbit.org/), we will explore the basics of bringing computation to the physical world.
The micro:bit can be programmed with Python. 
We give an overview of the basic components of the micro:bit, and how to control them with code.
You will create a digital artifact that interfaces with the physical world.
Here we pay particular attention to the importance of documentation.

[Reference material for the microbit](https://microbit-micropython.readthedocs.io/en/v1.0.1/microbit_micropython_api.html)

[Online editor for microbit](https://python.microbit.org/v/2)

<a name="project3"></a>

## Project 3: Physical+Digital Art

- Due Dec 15

Your goal is to create an interactive visualization that users can interact with using the microbit as a controller.
You will be interfacing your microbit with Processing in Python mode.
Use serial communication to send information from the microbit to the Processing running on your laptop.
This is again an open-ended assignment.

You should utilize at least two different sensors on the micro:bit (e.g. accelerometer and buttons) to send serial information.
Your Processing sketch should make use of these sensor values in a way that is central to the piece you are creating.

You may reuse your code from Project 1 as a starting point.
You may even use a peer's code (with their permission) as a starting point.
**However**, note that you will only be graded on the delta between the starting point and the new submission.
That is, the bar for overall quality is significantly higher if you are reusing code.
If you are reusing code, you must **clearly** indicate as such in **both** the code itself (as a comment) and your artist's statement on the video you post.
Mention in that comment explicitly what improvements have been made since the prior submission.
Failure to do so will be considered academic dishonesty.

### What to hand in?

- Your program code for BOTH the micro:bit and processing in a .zip folder.
- Leave a comment on your courseworks submission with a link to the public posted video recording of you (or someone else) interacting with your processing sketch through the microbit. The video should capture both the visualization and the physical manipulation of the microbit.  The description field of the video should contain a short (at least 2 paragraphs, more if you like) write-up of the process you took in your work. You can think of this as an artist's statement. 

### How am I graded?

Rubric

- 50 points - Technical Sophistication. Does your project utilize your programming skills in an effective way? Have you gone significantly beyond any example code you have used? Is this "your" work?
- 30 points - Documentation. Have you captured your work in a digestible way? Does the documentation highlight both the artistic aspect of your work, as well as the technical sophistication? Your work should be equally well appreciated by both a technical and non-technical audience. Note that capturing the technical side is often the more difficult.
You will score full points by overlaying a screen capture of your processing sketch with a video of the microbit manipulation. If you take a video with your phone of your computer screen and the microbit manipulation you can score at most 28 points on this section.
- 20 points - Creativity. This is a subjective measure. You need to get comfortable with your work being judged in a subjective manner when working in Computing in Arts. To score full points here, submit a work that you are proud to call your own. Pursue something that is artistically motivating you, and communicate that through your documentation.

**NOTE** Because this is the last assignment of the semester, NO late submissions will be accepted (we need to get grades in very shortly after the assignment deadline). Failure to turn this assignment in on time will result in a zero grade.

An example of an A+ project is here: [microbit code](exampleProject/microbitSendComplete.py), [Processing code](exampleProject/microbitReadComplete.pyde). The video for this project is below:

<iframe width="560" height="315" src="https://www.youtube.com/embed/U6Bjup3E8cU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<hr>

### Lecture 5: 
Dec 4

[Download slides for Lecture 5](../slides/lect5.pdf)

We give a basic overview of IoT, physical computing, the maker movement, etc.
How much background do you really need to build your own hardware device?
What are the various ways you can approach this?
What is the motivation for embedded systems, when should we just use a mobile phone?
How do we connect devices together?


<a name="lab3"></a>

### Lab 6: MicroBit setup

Dec 5

The goal of this lab is to setup our microbit and ensure all the hardware is functioning properly.

Download the code for the [microbit here](template/microbitSend.py).
Load this code in the online microbit editor.

Download the code for [Processing here](template/microbitRead.pyde).
Load this code into Processing.
If you cannot open the file directly, open the file in a text editor and copy and paste the contents into a new processing sketch.

First, flash the code to the microbit.
The microbit code will be sending serial messages to you computer.
If you do not first flash the microbit, the processing code will not have any messages to read.
You will know the code has flashed correctly when you see a flashing ```X``` on the microbit LED board.

With the micro:bit plugged in and running, run the Processing script.
You may need to experiment with the portIndex to find the right value.
On Windows computer, the correct portIndex will correspond to something like ```COM6```.
On a Mac it will correspond to something like ```/dev/cu.usbmodem14402```.
The number of ports available will depend on your particular devices and the USB and bluetooth devices you have connected to.

When you have selected the correct port, the processing terminal window will display the message ```face up``` over and over (or ```face down``` depending on the orientation of your microbit).
Tilt your microbit to the side to generate the ```left``` message and watch the sphere in processing move.

Be careful - not all microusb cables can carry data - some are only power.
If your computer does not recognize a device plugged in, you may need a different microusb cable.

Note: you need a USB port to connect the USB cable. If you have a Mac with only USB C ports, you will need an adapter or a different cable.

Once you have everything working from the example code. You need to add two new features. First, add the ability for the sphere to move up and down when the messages ```up``` and ```down``` are recieved. Second, we brush up our processing skills - make the sphere change colors over times (as a reminder, you will want to use ```millis()``` and you might want to also use ```sin()```).

Once you have added the two new features, make a short video that includes both the visualization and your physical manipuation of the microbit. Add a link to the video to the top of your processing code as a comment, and submit a zip file of your processing code and the microbit code for the lab submission.


<hr>


### Lecture 6: 

Dec 11

[Download slides for Lecture 6](../slides/lect6.pdf)

What is Digital Art in Place, and Place in Digital Art?
We explore issues of presentation of digital artifacts and how this can interface with strangers.
We ask: Where will this be displayed? What is the context in which it appears? What type of viewers consume this?

### Lab 7: Project 3 Help

Dec 11
