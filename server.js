const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const users = {}

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

io.on('connection', (socket) => {
  console.log('connected', socket.id)

  socket.on('user-connected', (user) => {
    users[socket.id] = { ...user, id: socket.id }
    console.log('user-connected', users[socket.id])
  })
})

server.listen(5000, () => {
  console.log('listening on port 5000')
})