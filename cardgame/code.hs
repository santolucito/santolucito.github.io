module Main where

import System.Exit
import Data.Char

main = do
  putStrLn "play a game?"
  ans <- getLine 
  if (toLower $head ans) /= 'y'
  then exitSuccess
  else return ()
  putStrLn "ok, pick a number"
  i <- readLn
  let d = drawHand i
  print d

--use random to get a card
drawCard :: Int -> Card
drawCard i = Card {
    color = toEnum (i `mod` 2)
  , face = toEnum (i `mod` 2)
  , suit  = toEnum (i `mod` 4)
  , value = toEnum (i `mod` 13) }

drawHand :: Int -> Hand
drawHand i = let
  frontRow = map drawCard [i,i*2,i*3,i*4]
  j = i*7+4
  backRow = map drawCard [j,j*2,j*3,j*4]
 in
  zip frontRow backRow

type Hand = [(Card, Card)]
data Color = Red | Black 
              deriving (Eq, Enum, Show)
data Face = Up | Down
              deriving (Eq, Enum, Show)
data Suit = Spades | Diamonds | Hearts | Clubs
              deriving (Eq, Enum, Show)

--given a card datatype
data Card = Card { color :: Color
                 , face :: Face
                 , suit :: Suit
                 , value :: Int }
              deriving (Eq)

instance Show Card where
  show c = let 
     v = if isFaceDown c then "?" else show $ value c
    in
      "-----\n" ++
      "| "++v++" |\n" ++
      "-----" 

instance Ord Card where
  compare c1 c2 = compare (value c1) (value c2)

isFaceDown :: Card -> Bool
isFaceDown = (==) Down . face
isFaceUp :: Card -> Bool
isFaceUp = not. isFaceDown 

isRed :: Card -> Bool
isRed = (==) Red . color
isBlack :: Card -> Bool
isBlack = not. isRed

faceUp card = card { face = Up } 
faceDown card = card { face = Down } 
flipOver card = 
  if (face card == Down)
  then card { face = Up }
  else card { face = Down }

swap :: (Card,Card)
swap (x,y) = (y,x) --TODO probably this exists
