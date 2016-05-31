---
layout: default
title: CS101
---

# CS101 - Intro to Programming - Python

Submit all homework before class on the LMS.

Practice problems available [here](http://codingbat.com/python). Do as many as you can!

If you want to get better at programming - [http://imgur.com/gallery/qr9gq](http://imgur.com/gallery/qr9gq)


<hr>
## 6/1

What we have covered in this class:

- Variables vs Values
- Types (Booleans, Integers, Doubles, Strings, Arrays)
- If Statements
- Loops  (transforming between ```for``` and ```while```, nested loops)
- Functions (when to use a function, return vs print, recursion)
- Input and output (on the command line)
- Arrays and Dictionaries (sorting a list, collecting/analyzing data)
- Good coding style (programming is like writing an essay)

Last things to review

- nested loops
- recursion once more

Introducing

- read a file


<hr>
## 5/25

How can we calculate the xth prime number?

It is important to be able to use functions to break complex problems into smaller parts.


#### homework

Write a function to find the x-th prime number.
You will need a helper method as well to determine if a number is prime (return a boolean).

```
def find_prime(x):
???

def is_prime(x):
???

```

<hr>
## 5/23

I'm sick :( Make up class at the end of the semester.


<hr>
## 5/18

Festival - great job on all your performances and activities.


<hr>
## 05/16

### In class

The .items() function is very helpful

```
my_dict = {'a': 1, 'g':2}
for (number, letter) in my_dict.items():
   print (number,letter)
# a 1
# b 2
```

Let's use this to break a code.

![ceaser](http://1.bp.blogspot.com/-1L0BHN4Qr0s/UieG2he-AOI/AAAAAAAAAGg/Hop2r1Lg0yo/s1600/caesar.png)

We will decode this message without the secret key.

```
Mjqqt rd sfrj nx Rfwp fsi N qnpj yjfhmnsl ajwd rzhm fy ymnx zsnajwxnyd. N fr xt mfuud yt xjj mtb lwjfy dtz mfaj itsj ymnx xjrjxyjw
```

We need to count the frequency of each letter. The most frequent letter is mapped to an 'e', the most frequent letter in the English language. Remember to use triple quotes for long strings.

```
ciphertext = """Mjqqt rd sfrj nx Rfwp fsi N qnpj yjfhmnsl ajwd rzhm fy ymnx zsnajwxnyd. N fr xt mfuud yt xjj mtb lwjfy dtz mfaj itsj ymnx xjrjxyjw"""

lettercount={}  
for letter in ciphertext:
    if letter not in lettercount:
        lettercount[letter] = 1
    else:
        lettercount[letter] += 1
for k,v in lettercount.items():
    print (k, v)
```

### Homework

Analyze the frequency of words in a Korean Buddhist text. Find a Korean text online (The Lotus Sutra is a good example), and report which words appear most frequently. What conclusion can you draw about these words. You will need to use the function split().

```
["A","string","with,"words"] == "A string with words".split()
```

Use the code above for letter counting to get started.
```

<hr>
## 05/11

You can use the try/except blocks if you like, but they are not generally necessary.

```python
def foo(lst,i):
  if (i >= len(lst)):
    return lst[(len(lst)-1)]
  return lst[i]

def foo2(lst,i):
  try:
    lst[i]
  except:
    return lst[(len(lst)-1)]
```

### Homework
Finish all of the 8 assigned codecademy lessons by Monday. You lose 20 points for each lesson that is not complete.

<hr>
## 05/09

Review selection sort.

#### Dictionaries

Like lists, but more fun! Now we can reference items by name, rather than index.
You can read an [in-depth lesson](http://learnpythonthehardway.org/book/ex39.html), but codecademy has everything you need.

### Homework

Finish codecademy lesson on dictionaries, sections 10-14.


<hr>
## 05/04

### In class

A new way to sort a list with selection sort

```
[1,2,3,4,2] -> [1,2,2,3,4]
[-5,7,0,3] -> [-5,0,3,7]

def sort_a_list(x):
  # your code
  return x
```

#### Dictionaries

Like lists, but more fun! Now we can reference items by name, rather than index.
You can read an [in-depth lesson](http://learnpythonthehardway.org/book/ex39.html), but codecademy has everything you need.

### Homework

Finish codecademy lesson on dictionaries, sections 10-14.

<hr>
## 05/02

### In class

*Errors* are important! be sure to read them!

We learned how to sort a list (Bubble sort)!
Here is a [nice video](visualgo.net/sorting)

### Homework

Finish writing the sorting algorithm.

```
[1,2,3,4,2] -> [1,2,2,3,4]
[-5,7,0,3] -> [-5,0,3,7]

def sort_a_list(x):
  for i in range (?,?):
    for j in range (?,?):
      if ( x[?] > x[?]):
        #chage the items
        ???
  return x
```

<hr>
## 04/27

### In class

More on lists.

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


### Homework

Finish codecademy lesson on lists, sections 1-9.

<hr>
## 04/25

Review the solutions for the exam.


<hr>
## 04/20

Outdoor activity practicing sorting of lists.

<hr>
## 04/18

Lists and Dictionaries

![list](/ggu/cs101/dict.png)

### Homework

Do sections 1-3 of Codecademy lesson *Python Lists and Dictionaries*

<hr>
## 04/13

No class, go vote.


<hr>
## 04/11

Midterm Exam

<hr>
## 04/07

 Midterm Exam on 4/11 - next week!

### In class

We will review functions by working on Rock, Paper, Scissors.
If you have any questions about the exam, ask them today.

Some example questions.
You might be asked what a program will print:

```python
def triple(x):
  print("Tripling", x)
  return x * 3
def subtract(y, z):
  print("Subtracting", y, z)
  return y - z

if subtract(20, triple(10)) > 0 and subtract(-25, triple(5)) > 0:
  print("Woot!")
else:
  print("Yikes!", subtract(triple(3), 0))
```

```python
(min(2, 13, 3, 7)) * max(2, -34, 4)) - abs(-3)
```

You might be asked to write a program:

- Write a program to calculate the sum of all the odd numbers less than 1000 (1 + 3 + 5 + ... + 999)
- Write a program to print the numbers 1-100 (1,2,3...100)

Or you might be asked to identify the error in bad code:

```python
  "april"+16
```

```python
word = "computer"
word[8]
```

```python
5.lower()
```

```python
(13+9)/0
```
### Homework

Review for the test - you can use the [worksheet](/ggu/cs101/worksheet).
If you don't know the answer to a question, ask the person who wrote it!

You can also redo lessons on codecademy. There are also many lessons on the internet.

<hr>
## 04/05

### In class

We will program the game *Rock, Paper, Scissors* today.
Start by filling in the basic template here - then we will add new features.

```Python
import random

#a loop
  #get the human input

  computerChoice = random.randInt(1,3)

  #if the computerChopie is 1 then 'R'
  #if the computerChopie is 2 then 'P'
  #if the computerChopie is 3 then 'S'

  #print the computer's choice

  #if(???):
  #   print ("its a tie")
  #elif (???):
  #  print ("computer wins")
  #elif (???):
  #  print ("human wins")
```

Now let's add the ability to keep score - how many games has the computer won, and how many games did the human win?
Now we will use functions to make the code look a little nicer.

### Homework
Write the RPS game code.

<hr>
## 03/30

#### In class

Finish the NIM game together - you can download the [final code](/ggu/cs101/nim.py).
Then, review what we have learned so far.

- Variables vs Values
- Booleans ```True```, ```False```, ```and```, ```or```
- Integers ```+ * / - % ** ```, ```str(3)```, ```==```, ```>```
- Strings ```""```, ```len("test")```,  ```"test".lower()```
- If Statements ```if elif else```
- Loops ```for```, ```range```, ```while```, ```break```
- Input and output - ```input()``` and ```print()```
- Functions ```def```, ```return```

#### Homework
Review/finish the functions lesson on codecademy.

<hr>
## 03/28

#### In class

We reviewed the [worksheet](/ggu/cs101/worksheet) that you made as a class.

#### Homework
(due 3/30)

1. Fix any mistakes you made from the previous homework (Practice Problem 1).
2. Start writing the code for [NIM](/ggu/cs101/nim).

<hr>
## 03/23

#### In class

We introduced functions.

#### Homework
Enjoy your weekend.

<hr>
## 3/21

#### In class

Presentations. Well done! Topics presented include variables, Booleans, Strings, ```and```, ```toAlpha```

#### Homework
(due 3/23) Practice problem 1 -
Write a "what does this program print" exercise for your classmates. Your program should use some of the ideas from the presentations today. When the program runs it should print something and your classmates will guess what it prints. The best 3 submissions will be used on the mid-term exam.

<hr>
## 03/16

#### In class

#### Homework  -
(due 3/21) Prepare a group presentation for Monday on a programming topic.
The presentation should be in Korean. Explain your topic in detail. Show how to code with your topic. Give many (5+) examples of different ways to use your topic. For example:

```
True AND False
(3>4) AND (7<9)
(x==y OR y>x) AND (len("Hello")==4)
```

<hr>
## 03/14

<hr>
## 03/09

#### Homework

Make sure you have completed the following lessons on Codecademy:
- Python Syntax
- Tip Calculator
- Strings & Console Output

<hr>
## 03/07

#### Homework

Complete [lesson 3](https://www.codecademy.com/courses/python-beginner-sRXwR/0/1?curriculum_id=4f89dab3d788890003000096) on Codecademy.

<hr>
## 03/04

#### In class

[english python](https://www.codecademy.com/learn/python) ­ Some of our work will be done on this site, in English.
[korean python](https://www.codecademy.com/en/tracks/python-ko) ­ If the English is challenging, this site has similar materials in
Korean that may be used as a supplement, but not a replacement

#### Homework
Complete lesson 1 & 2


#### Do this now
Download the [Syllabus](/ggu/CS101.pdf).

We will use [codecademy.com](https://www.codecademy.com), please create an account.
After you create an account, please take this [survey](http://goo.gl/forms/6XSFltmVtg), where you will be asked to input your username from codecademy.com.

#### Do this later

In your free time, [install python](https://www.python.org/downloads/) on your local computer.
This is not required right now, but will be needed later in the semester.
