import { START_GAME } from "./actions";

//pack of 108 cards
const CARDS = [
    '0R', '1R', '1R', '2R', '2R', '3R', '3R', '4R', '4R', '5R', '5R', '6R', '6R', '7R', '7R', '8R', '8R', '9R', '9R', 'skipR', 'skipR', 'revR', 'revR', 'D2R', 'D2R',
    '0G', '1G', '1G', '2G', '2G', '3G', '3G', '4G', '4G', '5G', '5G', '6G', '6G', '7G', '7G', '8G', '8G', '9G', '9G', 'skipG', 'skipG', 'revG', 'revG', 'D2G', 'D2G',
    '0B', '1B', '1B', '2B', '2B', '3B', '3B', '4B', '4B', '5B', '5B', '6B', '6B', '7B', '7B', '8B', '8B', '9B', '9B', 'skipB', 'skipB', 'revB', 'revB', 'D2B', 'D2B',
    '0Y', '1Y', '1Y', '2Y', '2Y', '3Y', '3Y', '4Y', '4Y', '5Y', '5Y', '6Y', '6Y', '7Y', '7Y', '8Y', '8Y', '9Y', '9Y', 'skipY', 'skipY', 'revY', 'revY', 'D2Y', 'D2Y',
    'W', 'W', 'W', 'W', 'D4W', 'D4W', 'D4W', 'D4W'
]

const initialState = {
    gameOver: true,
    turn: '',
    player1Deck: [],
    player2Deck: [],
    currentColor: '',
    currentNumber: '',
    playedCardsPile: [],
    drawCardPile: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case START_GAME: {
            //shuffle array function
            function shuffleArray(array) { 
                for (var i = array.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1))
                    var temp = array[i]
                    array[i] = array[j]
                    array[j] = temp;
                }   
                return array
            }

            //shuffle CARDS array
            const shuffledCards = shuffleArray(CARDS)

            //extract first 7 elements to player1Deck
            const player1Deck = shuffledCards.splice(0, 7)

            //extract first 7 elements to player2Deck
            const player2Deck = shuffledCards.splice(0, 7)

            //extract random card from shuffledCards and check if its not an action card
            let startingCardIndex = Math.floor(Math.random() * 94)
            while(true) {
                startingCardIndex = Math.floor(Math.random() * 94)
                if(shuffledCards[startingCardIndex]==='skipR' || shuffledCards[startingCardIndex]==='revR' || shuffledCards[startingCardIndex]==='D2R' ||
                shuffledCards[startingCardIndex]==='skipG' || shuffledCards[startingCardIndex]==='revG' || shuffledCards[startingCardIndex]==='D2G' ||
                shuffledCards[startingCardIndex]==='skipB' || shuffledCards[startingCardIndex]==='revB' || shuffledCards[startingCardIndex]==='D2B' ||
                shuffledCards[startingCardIndex]==='skipY' || shuffledCards[startingCardIndex]==='revY' || shuffledCards[startingCardIndex]==='D2Y' ||
                shuffledCards[startingCardIndex]==='W' || shuffledCards[startingCardIndex]==='D4W') {
                    continue;
                }
                else
                    break;
            }

            //extract the card from that startingCardIndex into the playedCardsPile
            const playedCardsPile = shuffledCards.splice(startingCardIndex, 1)

            //store all remaining cards into drawCardPile
            const drawCardPile = shuffledCards

            return {
                gameOver: false,
                turn: 'Player 1',
                player1Deck: [...player1Deck],
                player2Deck: [...player2Deck],
                currentColor: playedCardsPile[0].charAt(1),
                currentNumber: playedCardsPile[0].charAt(0),
                playedCardsPile: [...playedCardsPile],
                drawCardPile: [...drawCardPile],
            }
        }
    }
    return state
}

export default reducer