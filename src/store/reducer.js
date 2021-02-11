import { CARD_PLAYED, START_GAME } from "./actions";

//pack of 108 cards
const CARDS = [
    '0R', '1R', '1R', '2R', '2R', '3R', '3R', '4R', '4R', '5R', '5R', '6R', '6R', '7R', '7R', '8R', '8R', '9R', '9R', 'skipR', 'skipR', '#R', '#R', 'D2R', 'D2R',
    '0G', '1G', '1G', '2G', '2G', '3G', '3G', '4G', '4G', '5G', '5G', '6G', '6G', '7G', '7G', '8G', '8G', '9G', '9G', 'skipG', 'skipG', '#G', '#G', 'D2G', 'D2G',
    '0B', '1B', '1B', '2B', '2B', '3B', '3B', '4B', '4B', '5B', '5B', '6B', '6B', '7B', '7B', '8B', '8B', '9B', '9B', 'skipB', 'skipB', '#B', '#B', 'D2B', 'D2B',
    '0Y', '1Y', '1Y', '2Y', '2Y', '3Y', '3Y', '4Y', '4Y', '5Y', '5Y', '6Y', '6Y', '7Y', '7Y', '8Y', '8Y', '9Y', '9Y', 'skipY', 'skipY', '#Y', '#Y', 'D2Y', 'D2Y',
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
                if(shuffledCards[startingCardIndex]==='skipR' || shuffledCards[startingCardIndex]==='#R' || shuffledCards[startingCardIndex]==='D2R' ||
                shuffledCards[startingCardIndex]==='skipG' || shuffledCards[startingCardIndex]==='#G' || shuffledCards[startingCardIndex]==='D2G' ||
                shuffledCards[startingCardIndex]==='skipB' || shuffledCards[startingCardIndex]==='#B' || shuffledCards[startingCardIndex]==='D2B' ||
                shuffledCards[startingCardIndex]==='skipY' || shuffledCards[startingCardIndex]==='#Y' || shuffledCards[startingCardIndex]==='D2Y' ||
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

        case CARD_PLAYED: {
            const cardPlayedBy = state.turn
            switch(action.payload.cardPlayed) {
                case '0R': case '1R': case '2R': case '3R': case '4R': case '5R': case '6R': case '7R': case '8R': case '9R': case '#R': case '0G': case '1G': case '2G': case '3G': case '4G': case '5G': case '6G': case '7G': case '8G': case '9G': case '#G': case '0B': case '1B': case '2B': case '3B': case '4B': case '5B': case '6B': case '7B': case '8B': case '9B': case '#B': case '0Y': case '1Y': case '2Y': case '3Y': case '4Y': case '5Y': case '6Y': case '7Y': case '8Y': case '9Y': case '#Y': {
                    const numberOfPlayedCard = action.payload.cardPlayed.charAt(0)
                    const colorOfPlayedCard = action.payload.cardPlayed.charAt(1)

                    if(state.currentColor === colorOfPlayedCard) {
                        console.log('colors matched!');
                        if(cardPlayedBy === 'Player 1') {
                            const removeIndex = state.player1Deck.indexOf(action.payload.cardPlayed)
                            return {
                                ...state,
                                turn: 'Player 2',
                                playedCardsPile: [...state.playedCardsPile.slice(0, state.playedCardsPile.length), action.payload.cardPlayed, ...state.playedCardsPile.slice(state.playedCardsPile.length)],
                                player1Deck: [...state.player1Deck.slice(0, removeIndex), ...state.player1Deck.slice(removeIndex + 1)],
                                currentColor: colorOfPlayedCard,
                                currentNumber: numberOfPlayedCard
                            }
                        }
                        else {
                            const removeIndex = state.player2Deck.indexOf(action.payload.cardPlayed)
                            return {
                                ...state,
                                turn: 'Player 1',
                                playedCardsPile: [...state.playedCardsPile.slice(0, state.playedCardsPile.length), action.payload.cardPlayed, ...state.playedCardsPile.slice(state.playedCardsPile.length)],
                                player2Deck: [...state.player2Deck.slice(0, removeIndex), ...state.player2Deck.slice(removeIndex + 1)],
                                currentColor: colorOfPlayedCard,
                                currentNumber: numberOfPlayedCard
                            }
                        }
                    }
                    else if(state.currentNumber === numberOfPlayedCard) {
                        console.log('numbers matched!');
                        if(cardPlayedBy === 'Player 1') {
                            const removeIndex = state.player1Deck.indexOf(action.payload.cardPlayed)
                            return {
                                ...state,
                                turn: 'Player 2',
                                playedCardsPile: [...state.playedCardsPile.slice(0, state.playedCardsPile.length), action.payload.cardPlayed, ...state.playedCardsPile.slice(state.playedCardsPile.length)],
                                player1Deck: [...state.player1Deck.slice(0, removeIndex), ...state.player1Deck.slice(removeIndex + 1)],
                                currentColor: colorOfPlayedCard,
                                currentNumber: numberOfPlayedCard
                            }
                        }
                        else {
                            const removeIndex = state.player2Deck.indexOf(action.payload.cardPlayed)
                            return {
                                ...state,
                                turn: 'Player 1',
                                playedCardsPile: [...state.playedCardsPile.slice(0, state.playedCardsPile.length), action.payload.cardPlayed, ...state.playedCardsPile.slice(state.playedCardsPile.length)],
                                player2Deck: [...state.player2Deck.slice(0, removeIndex), ...state.player2Deck.slice(removeIndex + 1)],
                                currentColor: colorOfPlayedCard,
                                currentNumber: numberOfPlayedCard
                            }
                        }
                    }
                    else {
                        alert('Invalid Move!')
                    }
                    break;
                }

                case 'skipR': case 'skipG': case 'skipB': case 'skipY': {
                    const colorOfPlayedCard = action.payload.cardPlayed.charAt(4)

                    if(state.currentColor === colorOfPlayedCard) {
                        console.log('colors matched!');
                        if(cardPlayedBy === 'Player 1') {
                            const removeIndex = state.player1Deck.indexOf(action.payload.cardPlayed)
                            return {
                                ...state,
                                playedCardsPile: [...state.playedCardsPile.slice(0, state.playedCardsPile.length), action.payload.cardPlayed, ...state.playedCardsPile.slice(state.playedCardsPile.length)],
                                player1Deck: [...state.player1Deck.slice(0, removeIndex), ...state.player1Deck.slice(removeIndex + 1)],
                                currentColor: colorOfPlayedCard,
                                currentNumber: 404
                            }
                        }
                        else {
                            const removeIndex = state.player2Deck.indexOf(action.payload.cardPlayed)
                            return {
                                ...state,
                                playedCardsPile: [...state.playedCardsPile.slice(0, state.playedCardsPile.length), action.payload.cardPlayed, ...state.playedCardsPile.slice(state.playedCardsPile.length)],
                                player2Deck: [...state.player2Deck.slice(0, removeIndex), ...state.player2Deck.slice(removeIndex + 1)],
                                currentColor: colorOfPlayedCard,
                                currentNumber: 404
                            }
                        }
                    }
                    else {
                        alert('Invalid Move!')
                    }
                    break;
                }

                
            }
        }
        
        default:
            return state
    }
}

export default reducer