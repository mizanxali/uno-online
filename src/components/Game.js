import React from 'react'
import { connect } from 'react-redux'
import { CARD_DRAWN, CARD_PLAYED } from '../store/actions'

import './Game.css'

const Game = (props) => {
    const player1active = props.turn === 'Player 1'
    return (
        props.gameOver ? <div><h1>GAME FORFEITED</h1>{props.winner !== '' && <><h1>GAME OVER</h1><h2>{props.winner} wins!</h2></>}<a href='/'>Home</a></div> :
        <div className='Game'>
            <h1>Turn: {props.turn}</h1>
            <div className='player1Deck' style={player1active ? null : {pointerEvents: 'none'}}>
                {props.player1Deck.map((item) => (
                    <span
                    onClick={() => props.onCardPlayed(item)}
                    className='card'>
                        {item}
                    </span>
                ))}
            </div>
            <hr />
            <div>
                <h1>Current Card: {props.playedCardsPile[props.playedCardsPile.length-1]}</h1>
                <button onClick={props.onCardDrawn}>DRAW CARD</button>
            </div>
            <hr />
            <div className='player2Deck' style={player1active ? {pointerEvents: 'none'} : null}>
                {props.player2Deck.map((item) => (
                    <span
                    onClick={() => props.onCardPlayed(item)}
                    className='card'>
                        {item}
                    </span>
                ))}
            </div>
            <a href='/'>Home</a>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        gameOver: state.gameOver,
        winner: state.winner,
        turn: state.turn,
        player1Deck: state.player1Deck,
        player2Deck: state.player2Deck,
        currentColor: state.currentColor,
        currentNumber: state.currentNumber,
        playedCardsPile: state.playedCardsPile,
        drawCardPile: state.drawCardPile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCardPlayed: (card) => dispatch({type: CARD_PLAYED, payload: {cardPlayed: card}}),
        onCardDrawn: () => dispatch({type: CARD_DRAWN})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
