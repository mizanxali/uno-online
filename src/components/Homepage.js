import React from 'react'
import { Link } from 'react-router-dom'
import { START_GAME } from '../store/actions'
import { connect } from 'react-redux'

const Homepage = (props) => {
    return (
        <div className='Homepage'>
            <h1>UNO</h1>
            <Link to='/play'><button onClick={props.onStartGame}>START GAME</button></Link>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onStartGame: () => dispatch({type: START_GAME})
    }
}

export default connect(null, mapDispatchToProps)(Homepage)
