---
layout: default
title: CS102
---

# CS102 - Object Oriented Programming

## 3/30

### In class
```Math.random()``` and type-casting with ```int(3.7)``` to build a card game.

```java
public class BlackJack{


  public static void main(String[] args){   
    int human_card1 = (int)(Math.random()*10)+2;
    int human_card2 = (int)(Math.random()*10)+2;
    int human_total = human_card1 + human_card2;
    System.out.println("Human player got");
    System.out.println(human_card1+" and "+human_card2);


    int computer_card1 = (int)(Math.random()*10)+2;
    int computer_card2 = (int)(Math.random()*10)+2;
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

Also, how to read input from the user
```Java
import java.util.Scanner;
public class GetInputFromUser
{
   public static void main(String args[])
   {
      String s;
      Scanner in = new Scanner(System.in);
      s = in.nextLine();
    }
}
```
### Homework
Add a loop to our version of blackjack so the user can choose to play another round based on input.

## 3/28

### In class
We introduced [recursion](/ggu/cs102/recursion).

### Homework


## 3/23

### Homework
Loops and Functions [worksheet](/ggu/cs102/loop_fun).

## 3/21

### In class
We [started with java](/ggu/cs102/starting_java).

### Homework


## 3/16

### In class
We reviewed *if statements*.

### Homework

## Week 1-2

We learned about [Discrete Math](/ggu/cs102/discrete.md).

Homework was all written assignments found on the linked page.
