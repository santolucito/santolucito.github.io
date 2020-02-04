module Main where

import System.Exit
import Data.Char
import System.Random

main = do
  g <- newStdGen
  putStrLn "play a game?"
  ans <- getLine 
  if (toLower $head ans) /= 'y'
  then exitSuccess
  else return ()
  let d = drawHand g
  putStrLn $ displayHand d

--use random to get a card
drawCard :: Face -> Int -> Card
drawCard upOrDown i = Card {
    color = toEnum (i `mod` 2)
  , face = upOrDown
  , suit  = toEnum (i `mod` 4)
  , value = (i `mod` 13) + 1 }

drawHand :: StdGen -> Hand
drawHand g = let
  front = zip [Up, Down, Up, Down] 
  back = zip [Down, Up, Down, Up] 
  getRow which = map (uncurry drawCard) $ which $ take 4 (randoms g)
 in
  zip (getRow front) (getRow back)

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
      "-----\n" 

displayHand h = 
  concatMap (show. fst) h ++ "\n" ++
  concatMap (show. snd) h 

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

