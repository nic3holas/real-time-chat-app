import React, { useState } from "react"
import io from 'socket.io-client'
import './Room.css'
import Chat from "../Chat/Chat"

const socket = io.connect("http://localhost:5000")

const Room = () => {
 
    const [username, setUsername] = useState("")
    const [room, setRoom] = useState("")
    const [showChat, setShowChat] = useState(false)

    const joinRoom = () => {
        if (username !== "" && room !== "") {
          socket.emit("join_room", room)
          socket.emit("last_seen", {username,room})
          setShowChat(true)
        }
      }
    return(
        <div className="room">
            {! showChat ? (
      <div className='joinChat'>
      <h3>Join a chat</h3>
      <input type='text' placeholder='Username...' onChange={(event) => {setUsername(event.target.value)}}/> <br/><br/>
      <input type='text' placeholder='Room id...' onChange={(event) => {setRoom(event.target.value)}} onKeyDown={(event) => {
                  event.key === "Enter" && joinRoom();
                }}/><br/><br/>
      <button onClick={joinRoom}>Join a room</button>
      </div> )
      
      : (
      <Chat socket={socket} username={username} room={room}/>
      )
      }
        </div>
    )
}
export default Room