# Add your Python code here. E.g.
from microbit import *

while True:
    t = accelerometer.current_gesture()
    a = button_a.is_pressed()
    b = button_b.is_pressed()
    jsonObj = {"accel": t, "button_a": a, "button_b": b}
    print(jsonObj)
    display.show(Image.YES)
    sleep(10)
    display.show(Image.NO)
    sleep(10)