# Madlibs
Python can be used for a variety of different tasks. In this project, we'll use Python to write a Mad Libs story! Mad Libs are stories with blank spaces that a reader can fill in with their own words. The result is usually a funny (or strange) story.

Mad Libs require:
- Words from the reader (for the blank spaces)
- A story to plug the words into

For this project, we'll provide you with the story (feel free to modify it), but it will be up to you to build a program that does the following:

- Prompt the user for input
- Print the entire Mad Libs story with the user's input in the right places
Let's begin!

# Step 1
 Begin by including a multi-line comment that starts on line 1 that describes what your program does. You can use the instructions above to help you.

#### Hint
```python
"""
This program does
the following...

Author: your-name
"""
```
# Step 2
Let's first inform the user that the program is running. Print a message to let the user know that Mab Libs has started.
#### Hint
```python
print "Mad Libs is starting!"
```

# Step 3
The story that we have provided you with is going to need a main character.

Ask the user to input a name, then store the user's input in a variable.


#### Hint
```python
name = raw_input("Enter a name: ")
```

# Step 4
For our story, you will need to ask the user for three adjectives.

Similar to Step 3, ask the user for input three separate times. Store each adjective that the user inputs into descriptive variables.

#### Hint
```python
first_adj = raw_input("Enter an adjective: ")
second_adj = raw_input("Enter a second adjective: ")
third_adj = raw_input("Enter one more adjective: ")
```

# Step 5
You'll also need to ask the user for three verbs.

Just like in Step 4, ask the user for input three separate times. Store each verb in descriptive variables.

#### Hint
```python
first_verb = raw_input("Enter a verb: ")
#Prompt for the second verb here
#And the third verb here
```

# Step 6
We're also going to need some nouns in our story.

This time, ask the user to input four nouns. Store each noun into its own descriptive variable.

#### Hint
```python
first_noun = raw_input("Enter a noun: ")
#Don't forget the other three nouns
```

# Step 7
This is where the story can get really fun (and weird)! Ask the user to input one of each of the following:

- An animal
- A food
- A fruit
- A number
- A superhero name
- A country
- A dessert
- A year

Make sure to save the input into variables.

#### Hint
```python
animal = raw_input("Enter an animal: ")
#Don't forget to prompt for the rest of the items!
```

# Step 8
At this point, we have all the words needed for the Mad Libs story. The next step is to insert all of the user's inputs into the blank spaces of the story. Take a look at the variable named STORY. It is set equal to a string that contains our story template.

# Step 9
Paste this template story at the end of your code

```python
#The template for the story
STORY = "This morning I woke up and felt %s because %s was going to finally %s over the big %s %s. On the other side of the %s were many %ss protesting to keep %s in stores. The crowd began to %s to the rhythm of the %s, which made all of the %ss very %s. %s tried to %s into the sewers and found %s rats. Needing help, %s quickly called %s. %s appeared and saved %s by flying to %s and dropping %s into a puddle of %s. %s then fell asleep and woke up in the year %s, in a world where %ss ruled the world."
```

# Step 10
Now it's time to tell your tale! The final line of code should print the story and insert the inputs into the right blanks. The user's inputs should be inserted in the following order (get ready!):

- First adjective
- Name
- First verb
- Second adjective
- First noun
- Second noun
- Animal
- Food
- Second verb
- Third noun
- Fruit
- Third adjective
- Name
- Third verb
- Number
- Name
- Superhero name
- Superhero name
- Name
- Country
- Name
- Dessert
- Name
- Year
- Fourth noun

#### Hint
Using the variable names from the hints in Steps 4, 5, 6:
```python
print STORY % (first_adj, name, first_verb, ..., fourth_noun)
```

Your variable names might be different! Yes, this will be a long line of code that will likely wrap onto the next couple of lines (that's okay).

# Step 11
Let's read our Mad Libs story!

First, click Save. Then, in the terminal, type the following command and press "Enter" on your keyboard:

python Madlibs.py
Feel free to add to the story or modify it in anyway you want. Have fun!
