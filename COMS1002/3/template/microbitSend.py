# Add your Python code here. E.g.
from microbit import *

while True:
    t = accelerometer.current_gesture()
    print(t)
    display.show(Image.YES)
    sleep(5)
    display.show(Image.NO)
    sleep(5)