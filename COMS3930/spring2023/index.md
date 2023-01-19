---
layout: default
title: COMS3930
---
 
# Creative Embedded Systems (Spring 2022)


Modules will be added as we go through the course.
You may find the [material from previous years](..) helpful as a guide.
Note that the course has been reworked from last year's iteration of the course.
As such, we will follow a different schedule, including in some cases covering different topics and assignments.

You can find the [syllabus here](./syllabus.pdf)

## parts list

- LilyGo ESP32 TTGO T-Display
- 3.7V 500mAh LiPo Battery
- WS2812 LEDs
- headers and protoboard
- Push Button Switch Momentary (https://www.aliexpress.com/item/1005002541849367.html?spm=a2g0o.9042311.0.0.6cf04c4dUD3amp)
- Analog joystick (https://www.amazon.com/gp/product/B099MNPGB1/ref=ppx_yo_dt_b_asin_title_o04_s00)
- Variable resistor


## slides

[lecture 1](https://docs.google.com/presentation/d/1E5Z55TWN8dyVO0oQpFIxsKS6UpPJ_kGK/edit?usp=sharing&ouid=117771447296538002013&rtpof=true&sd=true)

[lecture 2](https://docs.google.com/presentation/d/1gS7KOvo3zVrMT67-I0imdUQEq8WHlseg/edit?usp=sharing&ouid=117771447296538002013&rtpof=true&sd=true)

## Module 1

### [Generative Art](./mod1.md)

[ESP32 TTGO T-Display demo](https://youtu.be/adLUgmCJKnM) (I probably should re-record this one - until then, be sure to watch the whole video. there is a bit of non-linear storytelling here)

The following link shows how to build a simple API service that allows your ESP32 to react to some remote user input (e.g. a user presses a button in their browser on their phone/laptop). This will be used as an on/off switch.

[wireless api example](https://github.com/mbennett12/kinetic-sculpture-webapi)

[turn off the display](https://www.reddit.com/r/esp32/comments/movnp3/comment/hlad7wh/?utm_source=share&utm_medium=web2x&context=3)

## Module 2

Module 2 has two parts. 
In part 1, we build an interactive device and connect it with a wire to our laptop.
In part 2, we first upgrade our device to send messages wirelessly over a direct UDP connection, then we upgrade to a MQTT connection using AWS IoT Core.

### [Interactive Devices](./mod2.md)

The below links shows how to get data from the ESP32, over a wire, to your computer and visualize/sonify that data.

[Serial: Arduino->Python](https://gist.github.com/santolucito/44410ed78def1b68b9994b74227f59ee)

[WebSerial Visual](./serialVisual.html)

[WebSerial Visual (Three.js)](./serialThree.html)

[WebSerial Audio](./serialAudio.html)

The below links show how to get data from the ESP32 to your computer over wifi. These connects are not "space decoupled" in that each device needs to be aware of the others virtual location (through an IP adrress). MQTT addresses this limitation.

[ESP32 Station mode](https://gist.github.com/santolucito/4016405f54850f7a216e9e453fe81803)

[ESP32 Client mode](https://gist.github.com/santolucito/4016405f54850f7a216e9e453fe81803)


## Module 3

### [Distributed Systems](./mod3.md)



## Module 4

[Final Project](./final.md)

