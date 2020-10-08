---
layout: default
title: Lab5
---
 
# Lab 5

## Computationally Collaborative Creativity

In this lab, we are getting more practice with string manipulations. To this end, we will revisit the topic of poetry. Here, we will be writing poems collaboratively with the code.

Our goal will be to combine to poems into one, creating a new work of art. Let's start with some source material. We will choose two different haikus from Matsuo Basho (1644-1694).

    text1 = "An old silent pond A frog jumps into the pond splash Silence again"
    text2 = "Autumn moonlight a worm digs silently into the chestnut"

I've removed the punctuation to make our coding task a bit simpler.

To combine these poems, we will loop through the text, and randomly choose letters from each poem for the new poem. We start with a blank ```text3``` variable which will store our new haiku. We then  loop through the first text randomly replace letters in ```text1``` with letters from ```text2```.

    text3 = ""
    for i in range(len(text1)):
        if random.random() < 0.5:
            text3 += text1[i]
        else:
            text3 += text2[i]
    print(text3)

Note that we are using ```random.random()``` to generate random numbers between 0 and 1. To use this function, don't forget to import the random library by putting the line of code ```import random``` at the top of your code.

This looks pretty good, but when we run this code we get an error! You should see something similar to below.

    Traceback (most recent call last):
    File "main2.py", line 14, in <module>
    text3 += text2[i]
    IndexError: string index out of range

Fret not, and remember, error messages are your friends! Because we loop through ```text1``` which has length of 64 (we can check with ```len(text1)```) and ```text2``` only has length of 56, the code might try to access something like ```text2[60]```, which does not exist.

To fix this, let's just use a long version of ```text2```. 

    text2long = text2 + text2

Now in the loop, replace ```text2``` with ```text2long``` and we are all set.

When you run the code, you will get something as below:

    Antomd molent pona worr d js pslently ie ponh sclash Stlenumn moin

The code has done it's part, now it is your turn. Use this as a starting point to create your own haiku. As an example, I first break the text above into three lines.

    Antomd molent pona worr 
    d js pslently ie ponh sclash 
    Stlenumn moin

Then I creatively "spell check"

    Anton lent worry
    d js plenty ie tones clash
    St. Lenin mourn

Then one more pass to turn it into a haiku about social unrest and communism.

    Anton lent worry
    The tones of plenty do clash
    St. Lenin will mourn

Now try the process yourself and reflect. Was your code a creative actor in this piece? Can you as the author claim credit alone? What role has Matsuo Basho played in this haiku? What role have the developers of Python played in this haiku? If our code was a bit smarter, would your answer change? Where do we draw the line of authorship? 