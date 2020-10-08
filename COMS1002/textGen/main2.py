import random

text1 = "An old silent pond A frog jumps into the pond splash Silence again"
text2 = "Autumn moonlight a worm digs silently into the chestnut"

text1long = text1 + text1
text2long = text2 + text2

text3 = ""
for i in range(len(text1)):
    if random.random() < 0.5:
        text3 += text1[i]
    else:
        text3 += text2long[i]

print(text3)