add_library('serial')
import json

myPort = ""
offset = 0
vel = 0
dropPositions = [0,0,0,0,0,0]
dropSpacing = 250
score = 0
flapsOpen = False

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
        
def updateScore():
    global score
    for idx, d in enumerate(dropPositions):
        # if the collector collides with a drop, update score and move drop above screen to delay for a bit
        if(abs(idx*dropSpacing - (offset+300) % width) < 50 and abs(d - (height - 100)) < 50) and flapsOpen:
            score += 1
            dropPositions[idx] =  -500 - random(200)
       
def moveDrops():
    global drops
    for idx, d in enumerate(dropPositions):
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

          
def updateCollector():
    global offset, vel, flapsOpen
    microbitInput = {"accel": "", "button_a" : "", "button_b" : ""}
    if (myPort.available() > 0):
        rawMicrobitInput = myPort.readString().strip()
        microbitInput = parseInput(rawMicrobitInput, microbitInput)
    
    pushMatrix()
    if not flapsOpen:
        moveCollector(microbitInput)
    
    translate((offset+300) % width, height - 100, 0)
    fill(255,255,255)
    stroke(150)
    box(50)
    textSize(40)
    fill(0)
    text(str(score),-10,20,26)
    
    if(microbitInput["button_a"]):
        flapsOpen = True
        vel = 0
    elif(microbitInput["button_b"]):
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
def parseInput(rawMicrobitInput, defaultMicrobitInput):
    try:
        # just one line on input at a time
        rawMicrobitInput = rawMicrobitInput.splitlines()[0]
        # make everything lowercase so false/true can be parsed (to avoid this, always pass strings in json)
        rawMicrobitInput = rawMicrobitInput.lower()
        #json expects double quotes
        rawMicrobitInput = rawMicrobitInput.replace("'","\"")
        microIn = json.loads(rawMicrobitInput)
    except:
        microIn = defaultMicrobitInput
    return microIn
    
