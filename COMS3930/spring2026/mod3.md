# Assignment

## Interactive Devices (20 pts)

In this lab you will use your:

- ESP32 TTGO T-display
- Make a touch sensative interface

The goal is to create an interactive device with the provided hardware. 
The devices will run off wired power and send data back to your laptop for visualization, sonfication, or whatever media generation process you prefer.

From a hardware perspective, you will need to connect the specified components to the ESP32 and create an enclosure for the device.
Your device has two functions 1) it houses the ESP32 (so we dont see the raw PCB) 2) it gives a physical substrate for your touch interface. 
Note that you may choose to build these seperartyl - eg a small box for the esp32, and a piece of acrylic with coppoer tape for the touch interface.
Some questions to consider for your touch interface:
- does interacting with it, does it sit on a table or is it handheld?
- if the esp23 is not attached directly to the interface how do the cable get from the esp32 to the iterface - how do they stay orgainzed?
- what are concerns about stability? Is this a fragile instrucment to be played carefully or is meant to be played "in motion"

From a software perspective, you will write an ESP32 program that collects sensor data and sends it over either a serial or wifi connection to a laptop.
You will also write a media (audio, visual, etc) generation program on your laptop to handle this data and create something interesting with it.
Some specific requirements:
- You must have at least 2 modes of operation, and switching between modes of operation must be controller by the touch interface itself. e.g. you could reservere on touch interface "button" for mode switching, or you could use a special "double touch" of two "buttons" at the same time/in a special pattern to switch modes.
- 

We will use a breadboard to connect all these components. The breadboard should also be part of the enclosure.

Deadline listed on courseworks

Submit a link to your blog post on the course blog. That post should contain:

### Project Specific Deliverables:

(8 pts total - see below for breakdown) 

A link to your git repository with a program that runs on the ESP32 TTGO T-Display, as well as the medi generation program (in a language of your choosing). The system must meet the following criteria:

(5 pts) Be interactive as described above.
(2 pts) Utilize at least 5 touch sensors.
(1 pts) Is in the spirit of the class as broadly interpreted by the instructors. Art is subjective, we want you to get comfortable with this ethos.

### Standard Documentation Deliverables:

(10 pts total - see below for breakdown)

In addition to the project specific deliverables lists above, you must also meet the following “standard documentation deliverables”. Throughout this course, we will ask you to document your work in order to slowly build a portfolio of your projects. Going forward, these types of standard documentation deliverables can be assumed to be required for all assignments unless specified otherwise.

(5 pts) A blog post

Using a blog site of your choice (github pages, hackaday, medium, notion, etc) make a blog post describing your art. The post should give an overview of your artistic vision. In particular for this assignment, you should address how you have specialized your generative art to the space. What creative decisions did you work lead you to, and which decisions did you take? How were your decisions motivated by your larger creative vision for this project. In the same vein, also address any technical issues you encountered in your work. Particularly focus on issues that other artists may encounter when developing with your hardware setup.

(3 pts) A README

On your github repo add a readme that contains a short description and key information on reproducibility/installation/usage. This key information should be sufficient for a knowledge third party, outside the class, to replicate your design. This readme can be a subset of the material used in your blog post.

(2 pts) Visual documentation of your art 

Both your blog post and the README should have some amount of visual documentation.
Typically the blog post will have a video. 
The README can have some lighter weight visuals (e.g. a still image).
The video can be a simple video shot on your phone - assuming you use basic best practices as discussed in class. You can host the video wherever you like as long as the hosting platform supports in-browser playback (e.g. YouTube, Vimeo). You may also choose to embed a gif in your README in place of a video link.

