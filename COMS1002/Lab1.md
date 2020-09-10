---
layout: default
title: Lab1
---
 
# Lab 1

## coding poetry and poeticizing code

In this lab, we will get a bit of practice running python code. We won’t be doing any computation here - we will just explore the python environment and get a feel for how python programs might look.

To this end, we will be coding poetry and poeticizing code. That is, we will use code to write poetry, and we will make our code poetic. This will be a lab-by-example. I will give a demonstration of the process, and you follow your own creative inspirations in reproducing this process.

To start, let’s pick a poem. I will go with “Lyric 12” from Primus St. John (this featured in the Poetry in Motion series from MTA). Here is the poem:

> I believe in myself slowly.

> It takes all of the doubt I’ve got. 

> It takes my wonder.

Let’s code this up in python now. To start, we will try copy and pasting the text into a string.

    print("I believe in myself slowly.
    It takes all of the doubt I’ve got. 
    It takes my wonder.
    ")

If you run this you get an error. What went wrong? Well, python doesn't allow us to enter multiple lines of text like this. Instead

    print("I believe in myself slowly."
    print("It takes all of the doubt I’ve got.")
    print("It takes my wonder.")

Now we haven't covered much python yet, but let's make some simple use of varibales. Since we are just printing three lines, we don't *need* to do this. The program output will remain the same. But if we look at the code *itself* as a creative object, what layers can we add to this poem?

    doubt = "I believe in myself slowly."
    belief = "It takes all of the doubt I’ve got."
    wonder = "It takes my wonder."
    print(doubt)
    print(belief)
    print(wonder)

Here I overlaying my reading of the poem into the code. Let's see another version of this

   i_give = "It takes"
   print("I believe in myself slowly.")
   print(i_give + " all of the doubt I’ve got.")
   print(i_give + " my wonder.")

Now I am concatanating variables together with strings - fancy stuff! Notice how I created that variable ```i_give```? Even though English sentances start with capital letters, in python we tend reserve capital letters for special variables. (you can read more about python code style here: https://www.python.org/dev/peps/pep-0008/ - code style is a completly different aesthetic space than the poetics we are looking at here, but also very important!).

Now that you have seen an example, choose your own poem and try this process out yourself. This will help you get more familiar with the syntax of python and build confidence when writing code. Don't be afraid of error messages - they are the soul of the language and will be your best friend in the learning process! (more on that later in the semester).