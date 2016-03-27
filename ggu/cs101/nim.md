---
layout: default
title: CS101
---

#NIM

We are going to start writing our own program from scratch! We will be writing a program to play a game called Nim. 
Both players start with a pile of 13 items and must remove either 1, 2, or 3 items from the pile each turn. 
The goal is to remove the last item. Try playing with your partner before writing any code.

Let's list the major pieces of code you will need to make this game work

   ## variables
   
   You will need a variable to keep track of how many beans are left in the pile.
   You will need a variable to keep track of who's turn it is.
   Maybe have variables that keep track of the player names too!

   ## A loop
   
   Remember, computers are good at doing things lots of times. Since in this game you take turns lots of turn you will need a loop.
   
  ## Player input
   You will also need ```raw_input()``` somewhere to get the input from the user.
   
   ## if statements
   In order to switch turns use an if statement.
   If the current_turn is player1, the current_turn should become player2
   Else if the current_turn is player2, the current_turn should become player1
