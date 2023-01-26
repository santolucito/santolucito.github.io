# Program Synthesis seminar

## Spring 2023

Prof. Mark Santolucito

You can find the [syllabus here](./syllabus.pdf)

# Summary

This course will give an introduction to program synthesis, the process of writing programs that write programs. Program synthesis is an area of study at the intersection of programming languages, formal methods and AI. In this course we will focus on the programming languages and formal methods aspects of program synthesis. We will cover three types of program synthesis: 1) inductive synthesis (programming-by-example) 2) functional synthesis (synthesis from first order logic formulas) 3) reactive synthesis (synthesis from temporal logic formulas). For each unit we will ask three key questions: 1) What is the language interface used to specify the desired behavior of a program 2) How do we construct/find a program that both meets the specified behavior and is the program the user expected 3) How do we assist the user in writing a specification for synthesis This course will involve reading and discussing academic papers, using state-of-the-art program synthesis tools, and writing basic program synthesizers. These topics will require advanced logical reasoning/mathematics, as well as a solid understanding of programming language foundations. The course will feel something like a cross between discrete math and PLT.

For the first half of the course, we will largely follow : https://people.csail.mit.edu/asolar/SynthesisCourse/index.htm

## Module 1 - Inductive Synthesis (Programming by example)

Week 1 (Jan 19)Class introduction + The problem of Program Synthesis

Week 2 (Jan 26) Inductive Synthesis + Bottom up search

Week 3 (Feb 2) Top down/type directed search (Homework 1 due) 
http://www.cs.yale.edu/homes/piskac/papers/2015ReinkingPiskacWinston.pdf

Week 4 (Feb 9) Sketch
https://people.csail.mit.edu/asolar/papers/Solar-Lezama09.pdf

Week 5 (Feb 16) Deductive synthesis and EGGs (Homework 2 due)
https://www.cs.cornell.edu/~avh/diospyros-asplos-2021-preprint.pdf

## Module 2 - Functional Synthesis (First order logic)

Week 6 (Feb 23) Intro to SAT/SMT solvers - Online class
https://www.cs.yale.edu/homes/piskac/papers/2010KuncakETALCompleteFunctionalSynthesis.pdf

Week 7 (March 2) SyGuS

Week 8 (March 9) Rosette and Synquid (Homework 3 due)
https://homes.cs.washington.edu/~emina/doc/rosette.onward13.pdf

Week X (March 16) no class, spring break

Week 9 (March 23) SemGuS (Homework 4 due)
https://arxiv.org/abs/2008.09836

## Module 3 - Reactive Synthesis (Temporal logic)

Week 10 (March 30) Intro to Reactive Systems and Temporal Logics - Online class

Week 11 (April 6) LTL Synthesis Procedures

Week 12 (April 13) Beyond Booleans in Temporal Logic (Homework 5 due)

Week 13 (April 20) Program synthesis + Machine learning (everything we haven’t covered)

Week 14 (April 27) Final project in-progress presentations

