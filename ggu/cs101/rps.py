import random

for i in range(0,99):
  humanChoice = input("What do you chose? (R,P,S)")

  computerChoice = random.randint(1,3)

  if(computerChoice==1):
    computerChoice = 'R'
  elif(computerChoice==2):
    computerChoice = 'P'
  elif(computerChoice==3):
    computerChoice = 'S'

  print ("computer choses "+computerChoice)

  if (computerChoice == humanChoice):
    print ("its a tie")
  elif ((computerChoice == 'R' and humanChoice == 'S') or
      (computerChoice == 'P' and humanChoice == 'R') or
      (computerChoice == 'S' and humanChoice == 'P')):
    print ("computer wins")
  else:
    print ("human wins")
