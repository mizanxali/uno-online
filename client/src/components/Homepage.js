import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
    const [roomCode, setRoomCode] = useState('')

    return (
        <div className='Homepage'>
            <h1>UNO</h1>
            <div><input type='text' placeholder='Room' onChange={(event) => setRoomCode(event.target.value)} /></div>
            <Link to={`/play?roomCode=${roomCode}`}><button>START GAME</button></Link>
        </div>
    )
}

export default Homepage
