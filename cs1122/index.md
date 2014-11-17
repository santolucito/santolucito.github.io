---
title: Assignment 4
---


Code Crush
=============

This is intended as an instruction module to teach intro students about
loops, arrays, objects, and the like.
This is based off David Saltares's [code](https://github.com/siondream/freegemas-gdx),
which is based off José Tomás Tocino García's [code](http://code.google.com/p/freegemas/),
which is based off the classic game of Bejeweled.

###Setup/Installation###

follow the instructions on how to [set up](https://developer.android.com/sdk/index.html?hl=i)
the development environment. Then download the github project as a zip file and import in Eclipse.


###Assignments###

Just delete sections of the code and ask students to fill in the blanks.
Most likely, you will be interested in asking students to rewrite part of
Board.java or possibly other files in the cpsc112 folder (the logic)


#Example Assignment

Total points: 20

You may be familiar with Candy Crush or Bewjewled. The goal is to swap items on a board to create matches of three or more. When such a match is created, those items disappear and you are awarded points. In our game the only goal is to score points. We are going to be building this game ourselves!

For this assignment we have given you a .zip file called Assignment4.zip which can be imported into your workspace. File -> Import then import "General -> Existing Projects into Workspace."

CPSC112_Assignment4.zip is a complete project that can be run as an Android or Desktop app. To run the desktop version, you open the frontend-desktop folder in the sidebar (package explorer) in eclipse then click on src and press run. Likewise with Android. Feel free to test your code using either method.

The whole project has a bit of a complicated structure - there are three different folders. The one titled "cs112game" contains the file you will be editing and is where all the logic is handled, while the other two "frontend-_____" are for the front end and you won't need to touch. Specifically, you need to only need to edit cpsc112/src/cpsc112.game/BoardHelper.java

To be clear, the only file you will need to edit is BoardHelper.java located in the "cs112game" folder (cpsc112/src/cpsc112.game/BoardHelper.java). The following instructions will be in reference to this file. The file has a collection of method headers that you will need to complete. These methods will be called by the rest of the project, in ways you don't need to worry about, to make the game fully functional.

#Part 1
13 points

Methods to edit

- find_matches
- buildPossibleMatchRow
- buildPossibleMatchColumn
- expandArray

Before you get started coding, let's take a look at the program as it is right now. In eclipse, select the frontend-desktop folder, then click the run button in eclipse. Up comes an initial board, but there are two problems.

The first problem is that we haven't definined what it means to be a valid match. This means 1) initial board could have matches already in it, and 2) we don't know when we are allowed to swap two items (since we can only swap when it creates a valid match). Your job is then to write the methods "find_matches", and its two required methods, "buildPossibleMatchHorizontal" and "buildPossibleMatchVertical". The rest of the files in the project will use these methods to correct the aformentioned problems.

We will start by writing buildPossibleMatchRow/Column first then, work on find_matches.

###How to write buildPossibleMatchRow/Column
buildPossibleMatchRow/Column is going to take in an 'x' and a 'y' that specify a position on the board, and return an array of Points, which indicate the location of matches including that square. For example, if we had the following board, calling buildPossibleMatchColumn(0,0) should return an array [(0,0),(0,1)] and calling buildPossibleMatchRow(0,0) should return an array [(0,0)]. To save a new point into an array use "possibleMatch[0] = new Point(x,y);"

![Alt Board](/Board1.png)

We have provided you with a call to the method helper.getColumnBools() and helper.getRowBools(). These return an array of booleans that represent which items in that row match a given square. For example calling helper.getRowBools(0,0) on the above board will return [True,False,False,True,True]. Similarly, calling helper.getColumnBools(0,0) on the above board will return [True,True,False,True].

You need to use this Boolean[] to figure out the length of your Point[] when it is initialized. Then fill in the Point[] with the appropriate points. You can test this method by useing the provided "tester" method which will be called everytime you generate a new board (you can use the "reset" button in game for this).

###How to write find_matches

Once you have buildPossibleMatchRow/Column written, you can get started on  find\_matches. find\_matches will return a two dimensional "jagged" array of all the matches on a board. For example, if we had following board, calling find\_matches() should return [[(0,0),(1,0),(2,0)],[(0,1),(1,1),(2,1),(3,1)]]. The order doesn't matter.

![Alt Board](/Board3.jpg)

The "find\_matches" method is called from "has\_matches". When you are ready to get started on this method, enable the has\_matches method by removing 'return false' and uncommenting the return line.

	 public Boolean has_matches(){
	    return b.find_matches().size()!=0;
	 }

Here is the basic algorithm:

1. loop through every square
2. buildPossibleMatchRow on that square
3. If the built match is of length more than three add it to foundMatches\*
4. continue looking for matches at the end of the match you just found
5. do the same thing for buildPossibleMatchColumns

\*When we try to add a match to foundMatches, we will need make sure it is the corrrect length. In order to do this we will write a method called expandArray. You will need to fill in the 'expandArray' method that takes an old\_array and return a new\_array such that "new\_array.length==old\_array.length\*2" and all the elements are copied over from the old\_array. You could just create the array to be big enough to hold all the possible matches (or just a huge number like 9999), but that could lead to poor preformance, it bad coding style, and doesn't make for a good homework assignment (so don't do it).

If this method is working correctly, the initial board will have no matches, and you should be able to play the game!





#Part 2
7 points

Methods to edit
- findSolutions

Great, now you can play the game! There is only one (major) problem left. If you run out of moves you are just stuck. We should be able to generate a new board in the middle of the game if you run out of possible swaps. Also, have you noticed that "Hint" button in the game? It would be nice if that actually worked too.

When we click the hint button, all the squares that can be swapped to create a match should be highlighted. We have taken care of the highlighting, you just need to implement the "findSolutions" method so that it returns a list of all the squares that could be swapped. So calling findSolutions() with the following board should return [(0,0),(0,1),(1,0),(1,1), etc.]. The order doesn't matter, and there can be duplicates.

![Alt Board](/Board2.png)

###How to write findSolutions
You should swap every square in every direction and checking to see if it makes a match using the has_matches() method. If there are matches, add the square's location (new Point(x,y)) to the squaresThatCanBeSwapped[], then swap it back to its original position.

Notice that we don't know how big how list of solutions is going to be when we start. You will to write another expandArray function. This time it will be operating on Point[] instead of Point[][]. The actual code will look **very** similar to the previous expandArray function you wrote.



#Cool lessons

Here are some fun extra things for you to think about. They aren't needed to complete the assignment though.

###Dynamic Arrays/Lists
By writing the expandArray function, you have just invented a version of  dynamic arrays, or lists. These are special arrays that you can use without worrying about making the array the right size. In java one implementation of this is called ArrayLists. We won't go into depth now, but feel free to investigate on your own (chapter 7.5 in the textbook)!

###Method Overloading
Did you notice that we wrote two method with the same name (expandArray) but different parameter types? This is called method overloading. As long as the parameter types or number of parameters is different, Java is smart enough to figure out which one to use on its own. you have already seen this with System.out.println which can print out a String or an int for you (or many other things).
