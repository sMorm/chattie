// Node Modules
import express from 'express'
import cors from 'cors'
import SocketIO from 'socket.io'
import http from 'http'

/**
 * Wrap express with HTTP, then wrap the HTTP server with socket.io
 * So when declaring what port to listen to, use the most parent,
 * which in this case it's @io
 */
const app = express()
const server = http.Server(app)
const io = new SocketIO(server)
const PORT = process.env.PORT || 5000

// Fun CORS stuff :)
app.use(cors())

app.get('/', (req, res) => res.send('Chattie API Online 👻'))

let messages = []
let users = []
let clients = []

io.on('connection', socket => {
  clients.push(socket)
  console.log(`${clients.length} user(s) connected`)
  
  socket.on('new-user', user => {
    socket.username = user;
    users.push(socket.username);
    io.emit('get-users', users)
    io.emit('new-message', {msg: 'has joined the chat!', user: socket.username})
  })

  socket.on('send-message', msg => {
    io.emit('new-message', { msg, user: socket.username })
  })

  socket.on('disconnect', data => {
    clients.splice(clients.indexOf(socket), 1)
    users.splice(clients.indexOf(socket.username), 1)
    console.log(`disconnected, ${clients.length} sockets still connected`)
  })
})

// server wraps express, so listen with http server
io.listen(PORT, () => console.log(`Started Listening @ ${PORT}`))

