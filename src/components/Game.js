import React from 'react'
import { connect } from 'react-redux'

const Game = (props) => {
    return (
        <div>
            <h1>Game</h1>
            <div className='player1Deck'>
                {props.player1Deck.map((item) => {
                    return <h6>{item}</h6>
                })}
            </div>
            <hr />
            <div>
                <h1>Current Card: {props.playedCardsPile[0]}</h1>
            </div>
            <hr />
            <div className='player2Deck'>
                {props.player2Deck.map((item) => {
                    return <h6>{item}</h6>
                })}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        gameOver: state.gameOver,
        turn: state.turn,
        player1Deck: state.player1Deck,
        player2Deck: state.player2Deck,
        currentColor: state.currentColor,
        currentNumber: state.currentNumber,
        playedCardsPile: state.playedCardsPile,
        drawCardPile: state.drawCardPile
    }
}

export default connect(mapStateToProps)(Game)
