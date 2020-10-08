
import random
import string

alphabet = list(string.ascii_lowercase)

def gen(x):
    text = ""
    for i in range(x):
        if random.random() < 0.8:
            text += random.choice(alphabet)
        else:
            text += " "
    return text

haiku = gen(20)+"\n"
haiku += gen(30)+"\n"
haiku += gen(20)

print(haiku)