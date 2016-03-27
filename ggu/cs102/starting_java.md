---
layout: default
title: CS102
---

## 3/21

Download [DrJava](http://www.drjava.org/) and start the program.
To run a program with DrJava, first click "Compile", then click "Run".
To make sure DrJava was installed correctly, copy and paste the following program.
When you save the program the name must match the first line.
So save this program as **CoinFlip.java**.

```java
public class CoinFlip {

  public static void main(String[] args) {
    // Math.random() returns a value between 0.0 and 1.0
    // so it is heads or tails 50% of the time
    if (Math.random() < 0.5) {
      System.out.println("Heads");
    }
    else {
      System.out.println("Tails");          
    }
  }
}
```
### Loops

Next we will try out a *while loop*.

```java
public class CountdownWhile {

  public static void main(String[] args) {
    int i = 10
    while (i >= 0) {
        System.out.println(i);
        i = i-1;
    }
  }
}
```

Practice it yourself
- Edit the program above (CountdownWhile) so that it counts up from 7 to 99.
- Write a while loop that will print the numbers 2,4,8,16,32,.. until you reach 100000

There are other ways to write a loop in java too!
This does the same as CountdownWhile, but look different.

```java
public class CountdownFor {

  public static void main(String[] args) {
    for (int i=0;i >= 0;i=i-1) {
        System.out.println(i);
    }
  }
}
```

Practice it yourself
- Write a for loop that counts up from 7 to 99
- Write a for loop that will print the numbers 2,4,8,16,32,.. until you reach 100000
