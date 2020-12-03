add_library('serial')

myPort = ""
offset = 0


def setup():
    size(1240, 660, P3D)
    connectMicrobit()
    
def connectMicrobit():
    global myPort
    print Serial.list()
    portIndex = 1
    LF = 10
    print " Connecting to ", Serial.list()[portIndex]
    myPort = Serial(this, Serial.list()[portIndex], 115200)
    myPort.bufferUntil(LF)
    
    
def draw():
    global offset
    background(0)
    microbitInput = ""
    if (myPort.available() > 0):
        microbitInput = myPort.readString().strip()
        print(microbitInput)
        
    if(microbitInput == "left"):
        offset += 1
    elif(microbitInput == "right"):
        offset -= 1
        
    translate(offset, 200, 0)
    sphere(100)
