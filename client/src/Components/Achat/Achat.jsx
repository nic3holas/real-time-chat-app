import React, { useState, useEffect,useRef } from "react"
import "./Achat.css"
import io from 'socket.io-client'
import sender from "./sender.png"
import send from "./send.png"
import video from "./video.png"
import { NavLink } from "react-router-dom"
import ScrollToBottom from "react-scroll-to-bottom"
import back from './back.png'

const Achat = ({asocket,room,username}) => {
 const[currentMessage, setCurrentMessage] = useState("")
 const[messageList, setMessageList] = useState([])
 const[typing, setTyping]= useState("")

 // In your React component
const handleTyping = (event) => {
  if (event.target.value !== '') {
    let status = "is typing..."
    asocket.emit('typing', { room, username, status });
  } else {
    let status = ""
    asocket.emit('stop_typing', { room, username, status });
  }
};

  const sendMessage = async () =>{
    if(currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() +":"+ new Date(Date.now()).getMinutes()
      }
      await asocket.emit("send_message", messageData)
      setMessageList((list)=>[...list, messageData])
      setCurrentMessage("")
     
    }
  }

  useEffect(()=>{
    asocket.on("receive_message", (data)=>{
      setMessageList((list)=>[...list, data])
    console.log(data)
    })

  },[asocket])

  useEffect(()=>{
    let typingTimeout;
    asocket.on('usertyping', (data) => {
      setTyping(data);
      // Clear typing status after 3 seconds (adjust as needed)
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        setTyping("");
      }, 300);
  },[asocket])})
 
  return (
    <div className="achat-window">
      <>
        <div className="ahead">
          <table>
            <tr>
              <td className="asender-icon">
              <NavLink to='/Abooking' activeClassName="active"> 
              <img src={back} className="aback-icon" alt="back" />
              </NavLink>
                <img src={sender} alt="asender icon" />
              </td>
              <td className="asender">
                <p className="asender-name">Student</p>
                <p className="asender-state">Online</p>
                <span className="asender-typing">{typing.username} {typing.status}</span>
                
              </td>
              <td>
                <NavLink to="/Video" activeClassName="active">
                  <img className="avideo-icon" src={video} alt="video icon" />
                </NavLink>
              </td>
            </tr>
          </table>
        </div>

        <div className="abody">
        
          <ScrollToBottom className="amessage-scroll">
        {messageList.map((messageContent, index) => (
              <div
                key={index}
                className="amessage-container"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="amessage-content">
                    <p className="aauthor">{messageContent.author}</p>
                    <p className="amessage">{messageContent.message}</p>
                    <p className="atime-sent">{messageContent.time}</p>
                  </div>
                </div>
              </div>
               ))}
               </ScrollToBottom>
        </div>
        
      </>

      <div className="afooter">
        <table>
          <tr>
            <td className="ainput-message">
              <input
                type="text"
                value={currentMessage}
                placeholder="Type message..."
                onChange={(event) =>{
                  setCurrentMessage(event.target.value)
                  handleTyping(event)
                }}
                onKeyDown={(event) => {
                  event.key === "Enter" && sendMessage();
                }}
              />
             
            </td>
            <td className="asend-button">
              <img src={send} alt="send message" onClick={sendMessage} />
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Achat;
