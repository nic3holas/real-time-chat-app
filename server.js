const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const http = require('http');
const { Server } = require('socket.io')
const cors = require('cors')
const app = express()
const { MongoClient } = require('mongodb')

// MongoDB Connection URI
const uri = 'mongodb://localhost:27017/Messages'

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

  socket.on("disconnect", ()=>{
    console.log('user diconnected')
  })
});

const PORT = process.env.PORT || 5000
server.listen(PORT,() => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
