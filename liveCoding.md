---
layout: default
title: Exploring Human-in-the-loop Program Synthesis with Live Coding
---

# Exploring Human-in-the-loop Program Synthesis with Live Coding

*Live Coding is a budding performative practice whereby artists write code that generates media (audio, visuals, etc.) live on stage.
In live coding, the process of writing code is itself the final product, rather than a fixed implementation of a tool, as typically seen in software development.
We propose that this unique performance style, with a heavy emphasis on the evolution of code, is an ideal space to explore program synthesis.
In this paper, we present a synthesis-aided live coding interface for drum sequencer patterns.
Our live coding environment allows performers to live coding in Javascript, uses a programming-by-example model for synthesis.
The synthesis toolchain uses SyGuS and a set of templates specific to live coding music.
We describe the tool and its implementation, and highlight key areas of future exploration.*

<hr>

## What is live coding?

Live Coding is a performative practice of coding still in its nascent stages of definition.
Live coding, by its nature, is an evolving practice that eludes a formal definition.
Generally, a live coding performance consists of code that continually generates some media (often audio).
The performer changes the code throughout the performance, thereby shaping the media that is being produced.
A key component to live coding allowing viewers to watch the evolution of the code itself.

During the evolution of code throughout a live coding performance, there is no single correct state of the code that the performer must achieve.
The process of a writing code for a live coding performance is exploratory.
As a result the implicit specification of the indetended code is constantly shifting.
This constantly changing specification make live coding an ideal testbed for program synthesis.

Live coding is closely related in many ways to Live Programming.
In both cases, there is a focus on live re-evaluation of code.
Live programming is largely framed as an style of IDE and a software development environment, whereas live coding specifically focuses on the performative practice of the evolution of code.
One possible interpretation of these two terms is that live coding is a performance practice that takes place inside a live programming environment.

## Live Coding + Synthesis

To explore the intersection of live coding and program synthesis, we built a live coding environment, called the "Shiny Happy WebAudio MIDI-fied Live Coding Drum Machine", or the SHWAMLCDM for short.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/k5I2fkEr_qE?controls=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>