---
layout: default
title: CS102
---

# Recursion

Loops and functions can act the same way!

## 1

```java
public class LoopsAndFun2{


  public static void main(String[] args){   
    loop();
    recur(10);
  }

  public static void loop(){   
    for (int i =0;i<10;i = i+1){
      System.out.println(i);
  }

  public static void recur(Int x){
    if(x==0){ return; }   
    System.out.println(x);
    recur(x-1);
  }

}
```
