beans_in_pile = 13

turn = "player 1"

for i in range(0,100):
  taken = int(input("how many beans does "+ turn + " want to take?\n"))
  beans_in_pile = beans_in_pile - taken

  if(taken>3):
    print("you can only take max 3 beans - game over cheater")
    break

  print (str(beans_in_pile)+ " left in pile")

  if(beans_in_pile <= 0):
    print ("winner is "+turn)
    break

  if(turn == "player 1"):
    turn = "player 2"
  else :
    turn = "player 1"
