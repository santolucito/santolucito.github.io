---
layout: default
title: CS102
---



#### Room Key
You want to break into your friend's dorm room, but you don't know the keypad number.
The key is 4 numbers long, of number between 0-9, and it takes you 5 seconds to enter a 4 digit key.
How many hours do you need to break into your friend's room?

10^4 * 5 / 60 / 60 = 13.88

#### Evens
Prove or disprove : the sum of two even numbers is even.

Let a and b be even integers. By definition of even we have that a = 2n and b = 2m.
Consider the sum a + b = 2n + 2m = 2(n + m) = 2k where k = n + m is an integer.
Therefore by definition of even we have shown that my hypothesis is true.

Prove or disprove : the product of two odd numbers is odd.

Let n and m be two odd integers. By definition of odd we have that n = 2a + 1
and m = 2b + 1. Consider the product nm = (2a + 1)(2b +1) = 4ab + 2a + 2b +1=
2( 2ab + a + b) + 1 = 2k + 1, where k = (2ab +a +b ) is an integer. Therefore by
definition of odd we have shown that the product of two odd integers is also odd.

#### 뚜끼
뚜끼 is a make-your-own ddeokbokki restaurant. You can choose from 4 sauces, 5 kinds of duk, and 6 vegetables.

If you can pick exactly one sauce, one duk, and one vegetable, how many different kinds of ddeokbokki can you have make?

4 * 5 * 6 = 120

If you can pick exactly one sauce, pick 3 duk, and as many vegetables as you want, how many different kinds of ddeokbokki can you have make?

4 * (5 choose 3) * 2^6 = 2560

5 choose 3 = 5! / (3!) ((5-3)!)

(Learn more about choose)[https://en.wikipedia.org/wiki/Combination]
