---
layout: default
title: CS102
---

# CS102 - Object Oriented Programming

<hr>
## 6/8

A special lecture from Rahul Dhodapkar.


## Final Project - due 6/20 @ 11:59 pm

To submit this project, create a github repository and properly upload your files.

Your job to is to create a text-based adventure game.
Your game will be the journey of a company man's transformation to a Buddhist Monk.
The player starts with a certain amount of money, and must earn 100 Zen points by doing good deeds.
The goal is to become a master monk before you run out of money.

To see how the game should work, download [this file](/ggu/cs102/Game.jar).
Open a powershell window from the folder containing that file, and run the file with ```java -jar Game.jar```.

The commands are ordered by difficulty.
"Meditate" is easiest, while "Purchase Temple" is the most difficult.
If you do try to buy temples, start with only "Small Temple" then add "Big Temples".
Notice that all temples have names, but the Big Temple and Small Temple each do something different (hint: use extends here).

Your grade is broken down as follows:

- 5% - Proper use of Github
- 15% - Coding style (good variable names, indentation, use of functions for organization)
- 25% - Use of basic objects
- 10% - Meditate
- 10% - Help Someone
- 10% - Work at Company
- 10% - Purchase Temple
- 10% - Use of advanced topics in objects (extends, super, \@Overrides)
- 5% - Do something extra

Since this is a large project, you may want to download a more advanced editor. One option is [Netbeans](http://www.oracle.com/technetwork/java/javase/downloads/index.html).

<hr>
## 6/1

#### Introducing Inheritance

See the [official description](https://docs.oracle.com/javase/tutorial/java/IandI/subclasses.html) from Java on inheritance.
This will allow use to use the ```extends``` keyword.

<hr>
## 5/25

call-by-value vs call-by-reference

#### homework

Discover on your own if java call-by-value vs call-by-reference?
No need to turn this in on LMS. Just bring your discovery to class.


<hr>
## 5/23

I'm sick :( Make up class at the end of the semester.


<hr>
## 5/18

Festival - great job on all your performances and activities.

<hr>
## 5/16

### In class

Review of midterm

[See the grades](/ggu/cs102/midterm_results)

### Homework

Make a zoo program

The user can add animals to the zoo by providing a name and sound.
The new animals will be added to an array of animals in the zoo.
You will need to write a function that will print the sound of all the animals.

Upload your code to Github, and submit a link on the lms. The link should look as follows: github.com/username/repository_name

To use github, follow this video.

<iframe width="420" height="315" src="https://www.youtube.com/embed/bcFIhtRPWH4" frameborder="0" allowfullscreen></iframe>

You can use this code as a template.


```
//In Main.java
public static void main(String[] args){
  //make animals and add them to an array
  all_sounds(my_zoo);
}

public static void all_sounds(Animal[] zoo){
  // output...
  // The lion goes roar
  // The cat goes meow

}
'''

'''
//In Animal.java

public Animal(String name, String sound)

```

<hr>
## 5/11

### In class

Investor and stock program. ```static``` vs ```non-static``` functions.

what is the difference between the two ```buy``` functions below.

```java
//in Investor.java
Stock apple = new Stock("APPL",127.98);
double p1 = apple.buy(5);
double p2 = Stock.buy(apple,5);
```
```java
//in Stock.java
public double buy(int n){...}
public static double buy(Stock s, int n){...}
```

### Homework

Read the 'static 변수' and 'static method' sections. You do not need to read about the singleton pattern. [https://wikidocs.net/228](https://wikidocs.net/228)

If you do not understand the above reading, also read this [http://rockdrumy.tistory.com/214](http://rockdrumy.tistory.com/214) for more examples.

<hr>
## 5/09

### In class

Investor and stock program. Multiple instances of an object.

<hr>
## 5/04

### In class

More on objects

<hr>
## 5/02

### In class

Make a program to grade a class. We will need two files...

- [Student.java](/ggu/cs102/Student.java) - the student object should have two fields, a name and list of grades.
- [Classroom.java](/ggu/cs102/Classroom.java) - the main method will create a list of students and assign grades to each student. Then compute the final grades for each student.

The student object has a list of grades, but we need be careful how we edit them.
For this, we introduce the ```private``` keyword and object functions.


We learned a few vocabulary words for functions:

- method header
- parameters
- return type


### Homework

Work on the [Midterm](/ggu/cs102/midterm) - due May 8, 11:59pm


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

- Write a function that selects the largest element from any list.

```
[1,2,3,4,2] -> 4
[-5,7,0,3] -> 7
```

- Write a function to add all the elements of a list.

```
[1,2,3,4,2] -> 12
[-5,7,0,3] -> 5
```

### [Midterm Project](/ggu/cs102/midterm) - due May 8, 11:59pm


<hr>
## 4/25

Use the Player field ```name``` in the new methods we have.

<hr>
## 4/20

Review of the refactoring homework. How do we use methods for organization?

- ```human_play```
- ```computer_play```
- ```calculate_win```

Intro to objects.
Started writing the Player object.

How to use a *constructor method*.

```java
//In Main.java
Player p1 = new Player("Mark");

//In Player.java
String name;

public Player(name){
 this.name = name;
}
```

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
