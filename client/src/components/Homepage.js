import React from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
    return (
        <div className='Homepage'>
            <h1>UNO</h1>
            <Link to='/play'><button>START GAME</button></Link>
        </div>
    )
}

export default Homepage
