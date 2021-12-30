const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

server.listen(5000, () => {
  console.log('listening on port 5000')
})