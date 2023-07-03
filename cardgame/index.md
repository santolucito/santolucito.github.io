# Functional Programming Card Game

This is the complete set of instructions for the functional programming card game.
If you find something that is ambiguously defined, please send me an email!
If you are interested in implementing this in Haskell let me know and we can work together!
I have a sketch of the code already.

Also, read <a href="https://www.marksantolucito.com/papers/iticse2021.pdf">a paper about this game</a> for more details.

## Stage 1 - Dealing the cards

Each player gets 8 cards, with 4 in each row, alternating between face up and face down.
The board should be arranged as follows:

<img src="/cardgame/imgs/initialCards.jpg" alt="initial cards" width="250"/>

## Stage 2 - Applying functions

Each player has 3 minutes (alternatively, max 4 functions, etc) to write down their functions they will use to rearrange the cards.
The functions maybe be constructed using the following functions.

map      | filter |
-------  | ------ |
faceUp   | isDown |
faceDown | isUp   |
flipOver | isBlack|
swap     | isRed  |

### Description of functions

All functions ONLY apply to the front row of cards. 
The exception is ```map swap``` which swap the front row and back row.

- faceUp: turn all cards face up (regardless of their previous state)
- faceDown: turn all cards face down
- flipOver: flip the cards from face up to face down or vice versa
- swap: swap the front and back rows

- isDown: returns True if the card is face down
- isUp: returns True if the card is face up
- isBlack: returns True if the card is black AND face up
- isRed: returns True if the card is red AND face up

If a card is filtered out, all cards move to the left (your 0 index of the list) to fill this hole.
For example, if ```filter isDown``` were to be applied to the first hand shown below, the result would be the next board shown.
If the player chained together another function of ```map swap```, the third board would be the result.

<img src="/cardgame/imgs/origCards.jpg" alt="original cards" width="250"/>

```filter isDown```

<img src="/cardgame/imgs/filterCards.jpg" alt="filtered cards" width="250"/>

```map swap```

<img src="/cardgame/imgs/swapCards.jpg" alt="swapped cards" width="250"/>


### Resolving the moves

Once each player has written down the set of functions they want to apply to their cards, show your code to your opponent.
Walk though the application of your functions together - make sure your oppoenent doesnt have a bug in their code!

## Stage 3 - Battle phase 

Once the cards have been rearranged according to the functions, you can move to the battle phase.

Compare the cards directly across from your card.
A high card wins by the point differential.
Two cards of the same value results in a draw.
A face down card is in "defense" mode, and automatically results in a draw.
If there is no card in the first row, the card in the back row is used in the comparison.
If there is no card in either row on a player's field, it is counted as 0, and any face up card in the opponent's field (directly across) wins by the value of that card.
Sum the total of the points in each of the 4 comparisions to determine the winner of the round.
A typical game should have 3 rounds.


