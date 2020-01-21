

--given a card datatype
data Card = Card { color :: (Red | Black)
                 , face :: (Up | Down) 
                 , suit :: ...
                 , value :: (... | 9 | 10 | Jack | ...)}

--turns a card face down
faceUp card = card { face = Up } 

--turns a card face down
faceUp card = card { face = Down } 

--flips a card from face up to down or vice versa
flipOver card = 
  if (face card == Down)
  then card { face = Up }
  else card { face = Down }

