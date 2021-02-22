const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(cors())

io.on('connection', socket => {
    console.log('connection made')

    socket.on('initGameState', gameState => {
        io.emit('initGameState', gameState)
    })

    socket.on('updateGameState', gameState => {
        io.emit('updateGameState', gameState)
    })

    socket.on('disconnect', () => {
        console.log('connection lost')
    })
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})