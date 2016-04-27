---
layout: default
title: CS102
---

# CS102 - Object Oriented Programming



<hr>
## 4/27

### In class

[Arrays](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html) will let us do more advanced operations. We have already seen some of these concepts in fact. They are similar to strings.

![arrayimg](https://docs.oracle.com/javase/tutorial/figures/java/objects-tenElementArray.gif)

```
class ArrayDemo {
  public static void main(String[] args) {
    // declares an array of integers
    int[] myArray;

    // allocates memory for 2 integers
    myArray = new int[2];

    myArray[0] = 100;
    myArray[1] = 200;
    myArray[1] = myArray[0];

    System.out.println("Element at index 0: " + anArray[0]);
    System.out.println("Element at index 1: " + anArray[1]);
  }
}

```

 
### Midterm project - due May 7, 11:59pm

Expand upon the Blackjack game to include betting.
The player starts with $10 and the computer always has at least $10.
The player can place a bet before they play a hand.
If the game is a tie, the computer wins.
Your game should look as follows.

```
What is your name?
 [Mark]

Mark has $10
Computer has $10

How much will you bet?
 [5]

Mark got
7 and 3
Do you want another card (Y/N)
 [Y]
Mark total = 16
Do you want another card (Y/N)
 [N]
Computer player got
9 and 7
Computer Wins $10
Mark Loses $5

Mark has $5
Computer has $15

Play again?
 [Y]
How much will you bet?

```

Once you finish the basic version, add bonus features.

- The player should be able bet more after receiving the first two cards.
- Make the cards appear with proper frequency (10 is more likely than 2).
- Give the cards a suit by creating a card object.
- Make a version for two humans to play together.
- Anything else you think is cool

<hr>
## 4/25

More on the player object.

<hr>
## 4/20

Intro to objects.
Started writing the Player object.

<hr>
## 4/18

### In class

We reviewed the ceaser shift cipher homework. Well done everyone.

We also started using functions in a more useful way

### Homework

Update your blackjack program so the main method looks like this...

```java
public class Blackjack {
  public static void main(String[] args) {

    int human_total = play_human();
    int computer_total = play_computer();
    calculate_winner(human_total,computer_total);

  }
```

<hr>
## 4/13

No class, go vote.

<hr>
## 4/11

### In class
Ceasear Cipher

![ceaser](http://1.bp.blogspot.com/-1L0BHN4Qr0s/UieG2he-AOI/AAAAAAAAAGg/Hop2r1Lg0yo/s1600/caesar.png)

Quantum Crytography with Chris Klumpp
You can view the [slides](/ggu/cs102/quantum_cryptography.pdf)

### Homework
Write a java program for the ceasear cipher. Here is some code to help.

```java

public class Cipher {
  public static void main(String[] args) {

    String input = "The quick brown fox Jumped over the lazy Dog";

    System.out.println (input.charAt(2));
    System.out.println( input.length());
    System.out.println((char)97);
    System.out.println((int)'a');
    System.out.println((char)('a'+1));

  }
}

```


<hr>
## 4/07

### In class
Review of Blackjack. We will look at every single person's code and fix it.

### Homework
None.

<hr>
## 4/05

### In class

How to be successful on your own

- Make a [Github](https://github.com/) account.
- Make a [Stackoverflow](http://stackoverflow.com/) account
- Learn to read other peoples' resumes.
- Use the internet (like OCW)

What is **scope** and how is it related to functions?

### Homework
None - lucky you.

<hr>
## 3/30

### In class
```Math.random()``` and type-casting with ```int(3.7)``` to build a card game.

```java
import java.util.Scanner;
public class BlackJack{

  public static void main(String[] args){   
    //Don't change this line
    Scanner in = new Scanner(System.in);

    int human_card1 = (int)(Math.random()*11)+1;
    int human_card2 = (int)(Math.random()*11)+1;
    int human_total = human_card1 + human_card2;
    System.out.println("Human player got");
    System.out.println(human_card1+" and "+human_card2);

    System.out.println("Do you want another card (Y/N)");
    String s = in.nextLine();
    if(s.equals("Y")){
        human_total = human_total + (int)(Math.random()*11)+1;
        System.out.println("new human_total "+ human_total);

    }

    int computer_card1 = (int)(Math.random()*11)+1;
    int computer_card2 = (int)(Math.random()*11)+1;
    int computer_total = computer_card1 + computer_card2;
    System.out.println("Computer player got");
    System.out.println(computer_card1+" and "+computer_card2);

    if(human_total<=21 && computer_total<human_total){
      System.out.println("Human Wins");
    }
    else {
      System.out.println("Computer Wins");
    }

  }
}
```


### Homework
(due 4/4)
Add a loop to our version of blackjack.
The user can ask for more than one more card.
Keep asking until the user says "N".
*HINT* You might need to use a ```break;``` or a ```while()``` .
Here is an example of how the program could run.

```
Human player got
3 and 1
Do you want another card (Y/N)
>>> Y
new human_total 9
Do you want another card (Y/N)
>>> Y
new human_total 18
Do you want another card (Y/N)
>>> N
Computer player got
10 and 3
Human Wins
```

<hr>
## 3/28

### In class
We introduced [recursion](/ggu/cs102/recursion).

<hr>
## 3/23

### In class
We introduced functions in java and compared them to python functions.

### Homework
(due 3/28) Loops and Functions [worksheet](/ggu/cs102/loops_fun).

<hr>
## 3/21

### In class
We [started with drjava](/ggu/cs102/starting_java) to program on the local computer.

### Homework
Install drjava and try it out.

<hr>
## 3/16

### In class
We reviewed *if statements*.

### Homework
Java on codecademy.

<hr>
## 3/14

### In class
We started java syntax and compared it to python.

### Homework
Java on codecademy.

<hr>
## Week 1-2

We learned about [Discrete Math](/ggu/cs102/discrete.md).

Homework was all written assignments found on the linked page.
