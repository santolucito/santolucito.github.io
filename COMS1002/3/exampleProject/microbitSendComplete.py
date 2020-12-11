# Add your Python code here. E.g.
from microbit import *

while True:
    t = accelerometer.current_gesture()
    if button_a.is_pressed():
        a = "pressed"
    else:
        a = "not pressed"
    if button_b.is_pressed():
        b = "pressed"
    else:
        b = "not pressed"
    
    print(t + "," + a + "," + b)
    display.show(Image.YES)
    sleep(10)
    display.show(Image.NO)
    sleep(10)