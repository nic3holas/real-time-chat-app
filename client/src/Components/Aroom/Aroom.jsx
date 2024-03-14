import React, { useState } from "react"
import io from 'socket.io-client'
import './Aroom.css'
import Achat from "../Achat/Achat"

const asocket = io.connect("http://localhost:5000")

const Aroom = () => {
 
    const [username, setUsername] = useState("")
    const [room, setRoom] = useState("")
    const [showChat, setShowChat] = useState(false)

    const joinRoom = () => {
        if (username !== "" && room !== "") {
          asocket.emit("join_room", room)
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
      <Achat asocket={asocket} username={username} room={room}/>
      )
      }
        </div>
    )
}
export default Aroom