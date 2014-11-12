---
layout: default
title: Assignment 4
---

#Code Crush

Total points: 45

You may be familiar with Candy Crush or Bewjewled. The goal is to swap items on a board to create matches of three or more. When such a match is created, those items disappear and you are awarded points. In our game the only goal is to score points. We are going to be building this game ourselves!

The only file you will need to edit is Board.java located in the "freegemas" package. The following instructions will be in reference to this file. The file is mostly complete, you will just be asked to fill in some missing parts. Reading, understanding, and editing someone else's code is one of the painful and educational things you can do as a programmer. These skills will come in handy your final group project.

For this assignment we have given you a .zip file called CPSC112_Assignment4.zip which can be imported into your workspace as per the instructions in Resources/app_setup.html.

CPSC112_Assignment4.zip is a complete project that can be run as an Android, Desktop, or Web app. Likely, you will want to just use the Desktop version since it is the fastest to get working. To run the desktop version, you simply click on the freegemas-desktop package in the sidebar in eclipse and press run.

The whole project has a bit of a complicated structure - there are four different packages. The one titled "freegemas" contains the file you will be editing and is where all the logic is handled, while the other three "freegemas-_____" are for the front end and you won't need to touch.

#Part 1
5 points

Methods to edit

- fillInitialBoard

Let's start with building an initial board. To do this we will just be randomly filling the board with new Squares. We have already given you code to create a square at position [0][0] and make it fall into place. Extrapolate this to fill in the whole board. Once you have done this you can run the program and see a board full of squares! (NB: you need to double click on the menu items for them to work).

#Part 2
5 points

Methods to edit

- swap

Now we need to be able to swap two squares. To do that we write a method that two elements in an two-dimensional array. Remember that Arrays are pass-by-reference. That means we can make changes to the board's two-dimensional array "_squares" (which represents the squares currently on the board).

#Part 3
20 points

Methods to edit

- fillInitialBoard
- buildPossibleMatchHorizontal
- buildPossibleMatchHorizontal
- expandArray


There's a problem though! The initial board could have matches already in it. We will take a "brute force" approach to this problem. We just keep generating boards until we find one that doesn't have any matches in it initially. You will want to put the code you just wrote for Part 2 in a "do-while" loop. A do-while executes once, then checks the condition to see if it needs to run again. We will use something like...

do{
  generate a random board
} while(has_matches())

This means we need the method "has_matches" to work correctly, right now it always returns false. has_matches calls "find_matches", which we have written for you (don't edit it). You only need to fill out the two methods "buildPossibleMatchHorizontal" and "buildPossibleMatchHorizontal". We won't worry about T-style matches.

Notice that we don't know how long our match is going to be when we start. It could be that there is no match so we have length of just one (the original). we could also end up with a five-in-a-row match. This means we need to be able to resize our array as needed. This will be the expandArray function.


#Part 4
15 points

Methods to edit

- findSolutions

Great, now you can play the game! There is only one (major) problem left. If you run out of moves you are just stuck. In fact the initial board could even be generated in such a way that there are no solutions right from the begining. We certainly don't want that.

We will write a function that finds solutions by swapping every square in every direction and checking to see if it makes a match (this is again a "brute force" approach). Notice that we don't know how big how list of solutions is going to be when we start. That means we can reuse our expandArray function from the last part.
