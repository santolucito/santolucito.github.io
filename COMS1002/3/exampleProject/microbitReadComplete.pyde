add_library('serial')
import json

myPort = ""
offset = 0
vel = 0
dropPositions = [0,0,0,0,0,0]
dropSpacing = 250
score = 0
flapsOpen = False
microbitInput = {"accel": "", "button_a": False, "button_b": False}

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
    background(0)
    updateCollector()
    moveDrops()
    renderDrops()
    updateScore()
    
    textSize(40)
    fill(100,255,255)
    text("Push A to open flaps to collects drops. Push B to close flaps. \n Tilt to move. Only move with flaps closed",50,50)
          
def updateCollector():
    global offset, vel, flapsOpen, microbitInput
    if (myPort.available() > 0):
        rawMicrobitInput = myPort.readString().strip()
        microbitInput = parseInput(rawMicrobitInput)
        print(microbitInput)
    
    pushMatrix()
    if not flapsOpen:
        moveCollector(microbitInput)
    
    drawBox()
    
    if(microbitInput["button_a"] == "pressed"):
        flapsOpen = True
        vel = 0
    elif(microbitInput["button_b"] == "pressed"):
        flapsOpen = False
    if flapsOpen:
        drawFlaps()    
    popMatrix()    
    
def moveCollector(microbitInput):
    global vel, offset
    if(microbitInput["accel"] == "left"):
        vel += 1
    elif(microbitInput["accel"] == "right"):
        vel -= 1
    elif(vel < 0):
        vel += 0.3
    elif(vel > 0 ):
        vel -= 0.3
        
    vel = min(10, vel)
    vel = max(-10, vel)

    offset += vel
    
def drawBox():
    global offset, score
    #draw box itself
    translate((offset+300) % width, height - 100, 0)
    fill(255,255,255)
    stroke(150)
    box(50)
    #draw score overlay on box
    textSize(40)
    fill(0)
    text(str(score),-10,20,26)

def moveDrops():
    global drops
    for idx, d in enumerate(dropPositions):
        #drop faster as score increases
        dropPositions[idx] = (dropPositions[idx] + 1+score)
        # when the drop goes below the screen, restart at the top 
        if (dropPositions[idx] > 0):
            dropPositions[idx] = dropPositions[idx] % (height)
       
def renderDrops():
    global drops
    for idx, d in enumerate(dropPositions):
        pushMatrix()
        translate(idx*dropSpacing, d, 0)
        fill(90,200,230)
        noStroke()
        sphere(20)   
        popMatrix()

def updateScore():
    global score
    for idx, d in enumerate(dropPositions):
        # if the collector collides with a drop, update score and move drop above screen to delay for a bit
        if(checkCollision(idx, d)) and flapsOpen:
            score += 1
            dropPositions[idx] =  -500 - random(200)

def drawFlaps():
    pushMatrix()
    translate(40,-40,0)
    rotate(PI/4)
    box(5,50,50)
    
    popMatrix()
    translate(-40,-40,0)
    rotate(-PI/4)
    box(5,50,50)    
    
# Because serial communication is not reliable
# we try our best to parse the input
# and retutn empty json if not
def parseInput(rawMicrobitInput):
    global microbitInput
    inputArray = rawMicrobitInput.split(",")
    if len(inputArray) >= 3:
        inputDict = {"accel": inputArray[0], "button_a": inputArray[1], "button_b":inputArray[2]}
        return inputDict
    else:
        return {"accel": microbitInput["accel"], "button_a": False, "button_b": False}
    
       
def checkCollision(idx, d):
    dropXPosition = idx*dropSpacing
    boxXPosition = (offset+300) % width

    dropYPosition = d
    boxYPosition = (height - 100)
    
    isXPositionOverlapping = abs(dropXPosition - boxXPosition) < 50
    isYPositionOverlapping = abs(dropYPosition - boxYPosition) < 50
    
    isOverlapping = isXPositionOverlapping and isYPositionOverlapping
    
    return isOverlapping  
    
