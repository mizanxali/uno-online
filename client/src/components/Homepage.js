import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import randomCodeGenerator from '../utils/randomCodeGenerator'

const Homepage = () => {
    const [roomCode, setRoomCode] = useState('')

    return (
        <div className='Homepage'>
            <h1>UNO</h1>
            <div><input type='text' placeholder='Game Code' onChange={(event) => setRoomCode(event.target.value)} /></div>
            <Link to={`/play?roomCode=${roomCode}`}><button>JOIN GAME</button></Link>
            <h1>OR</h1>
            <Link to={`/play?roomCode=${randomCodeGenerator(5)}`}><button>CREATE GAME</button></Link>
        </div>
    )
}

export default Homepage
