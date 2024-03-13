const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const http = require('http');
const { Server } = require('socket.io')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", (socket)=> {
  console.log('user connected')

  socket.on("join_room", (data)=>{
    socket.join(data)
    console.log(`User with Id ${socket.id} joined room ${data}`)
  })

  //send message to connected users within the room
  socket.on("send_message",(data) =>{
    console.log(`User ${data.author} sent message ${data.message} at ${data.time}`)
    socket.to(data.room).emit("receive_message", data)
  })

  // Handle typing event
socket.on('typing', (data) => {
  console.log(`${data.username} in room ${data.room} is ${data.status}`)
  // Broadcast typing event to other users
  typing = data.status
  username = data.username
  socket.to(data.room).emit("usertyping", data);
});

// Handle stop typing event
socket.on('stop_typing', (data) => {
  // Broadcast stop typing event to other users
  console.log(data.status)
  socket.to(data.room).emit('stop_typing', data);
});

  socket.on("disconnect", ()=>{
    console.log('user diconnected')
  })
});

const PORT = process.env.PORT || 5000
server.listen(PORT,() => {
  console.log(`Server is running on http://192.168.43.213:${PORT}`)
})
