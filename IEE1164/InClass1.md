---
layout: default
title: Lab1
---

# Lab 

## coding poetry and poeticizing code

In this lab, we will get a bit of practice running python code. We won’t be doing any computation here - we will just explore the python environment and get a feel for how python programs might look.

To this end, we will be coding poetry and poeticizing code. That is, we will use code to write poetry, and we will make our code poetic. This will be a lab-by-example. I will give a demonstration of the process, and you will then follow your own creative inspirations in reproducing this process.

To start, let’s pick a poem. I will go with “Lyric 12” from Primus St. John (this poem featured in the Poetry in Motion series on the MTA in 2019). Here is the poem:

> I believe in myself slowly.

> It takes all of the doubt I’ve got. 

> It takes my wonder.

Let’s code this up in python now. To start, we will try copy and pasting the text into a string.

    print("I believe in myself slowly.
    It takes all of the doubt I’ve got. 
    It takes my wonder.
    ")

If you run this you get an error. What went wrong? Well, python doesn't allow us to enter multiple lines of text like this. Instead, let's do it like this:

    print("I believe in myself slowly.")
    print("It takes all of the doubt I’ve got.")
    print("It takes my wonder.")

Note that you can also use triple quotes to get a multiline string in python.

    print("""I believe in myself slowly.
    It takes all of the doubt I’ve got. 
    It takes my wonder.
    """)

Now we haven't covered much python yet, but let's make some simple use of variables. Since we are just printing three lines, we don't *need* to do this. The program output will remain the same. But if we look at the code *itself* as a creative object, what layers can we add to this poem?

    doubt = "I believe in myself slowly."
    belief = "It takes all of the doubt I’ve got."
    wonder = "It takes my wonder."
    print(doubt)
    print(belief)
    print(wonder)

Here I am overlaying my reading of the poem into the code. The poem remains unchanged, but the underlying representation has changed, adding a new layer complexity to the original text. Is this still the same poem? Is this the same artistic object? Can we consider code as part of the creative artifact? Let's see another version of this

    i_give = "It takes"
    print("I believe in myself slowly.")
    print(i_give + " all of the doubt I’ve got.")
    print(i_give + " my wonder.")

Now I am concatenating variables together with strings (using the ```+``` operator) - fancy stuff! Notice how I created that variable ```i_give```? Even though English sentences start with capital letters, in python we tend reserve capital letters for special variables. You can read more about python code style here: [https://www.python.org/dev/peps/pep-0008/](https://www.python.org/dev/peps/pep-0008/) - code style is a completely different aesthetic space than the poetics we are looking at here, but also very important!

Now that you have seen an example, choose your own poem and try this process out yourself. How far can you push this? This process will help you get more familiar with the syntax of python and build confidence when writing code. Don't be afraid of error messages - they are the soul of the language and will be your best friend in the learning process! (more on that later in the semester). If you enjoy this, there is a bunch of work exploring code itself as an artistic object, outside of (or mostly outside of) its functional character. You can start by looking at [https://whitney.org/exhibitions/codedoc](https://whitney.org/exhibitions/codedoc).

To wrap this all up, open a new file and write an English description of your poetry. Save this file as README.txt. The README file in computer science is an art all of its own. For now, we are just getting practice writing what are called "plaintext" files - files with just plain old text (as opposed to program code).

Now with your two files (the python code and the README), you will zip these files and submit. If you are unfamiliar with the concept of a .zip, as your TAs for help.
