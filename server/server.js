// Node Modules
import express from 'express'
import cors from 'cors'
import SocketIO from 'socket.io'
import http from 'http'

/**
 * Wrap express with HTTP, then wrap the HTTP server with socket.io
 */
const app = express()
const server = http.Server(app)
const socket = new SocketIO(server)
const PORT = process.env.PORT || 5000

app.use(cors())

app.get('/', (req, res) => {
  res.send('Chattie API Online')
})

let messages = []
let users = []
let clients = {}
socket.on('connection', socket => {
  console.log(socket.id)
  console.log('User Connected$')

  socket.emit('new-user', users)
  
  socket.on('new-user', user => {
    users.push(user)
    socket.emit('new-user', users)
    socket.broadcast.emit('new-user', users)
  })

  socket.on('message', msg => {
    socket.emit('message', msg)
    socket.broadcast.emit('message', msg);
  })

  socket.on('disconnect', user => {
    console.log(user + "left")
    console.log('One Socket disconnected 🙀')
  })
})

// server wraps express, so listen with http server
server.listen(PORT, () => console.log(`Started Listening @ ${PORT}`))

