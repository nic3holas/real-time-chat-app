import React, { useState, useEffect,useRef } from "react"
import "./Chat.css"
import io from 'socket.io-client'
import sender from "./sender.png"
import send from "./send.png"
import video from "./video.png"
import { NavLink } from "react-router-dom"
import ScrollToBottom from "react-scroll-to-bottom"
import back from './back.png'

const Chat = ({socket,room,username}) => {
  const[currentMessage, setCurrentMessage] = useState("")
 const[messageList, setMessageList] = useState([])
 const[typing, setTyping]= useState("")

 // In your React component
const handleTyping = (event) => {
  if (event.target.value !== '') {
    let status = "is typing..."
    socket.emit('typing', { room, username, status });
  } else {
    let status = ""
    socket.emit('stop_typing', { room, username, status });
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
      await socket.emit("send_message", messageData)
      setMessageList((list)=>[...list, messageData])
      setCurrentMessage("")
    }
  }

  useEffect(()=>{
    socket.on("receive_message", (data)=>{
      setMessageList((list)=>[...list, data])
    })

   
  },[socket])
useEffect(()=>{
  let typingTimeout;

  socket.on('usertyping', (data) => {
   
    setTyping(data);

    // Clear typing status after 3 seconds (adjust as needed)
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      setTyping("");
    }, 300);
},[socket])})
 /* Listen for typing events
useEffect(() => {
  let typingTimeout;

  socket.on('usertyping', (data) => {
   
    setTyping(data.status);

    // Clear typing status after 3 seconds (adjust as needed)
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      setTyping("");
    }, 2000);
  });

  return () => {
    socket.off('typing');
    clearTimeout(typingTimeout);
  };
}, [socket]);*/

  return (
    <div className="chat-window">
      <>
        <div className="head">
          <table>
            <tr>
              <td className="sender-icon">
              <NavLink to='/' activeClassName="active"> 
              <img src={back} className="back-icon" alt="back" />
              </NavLink>
                <img src={sender} alt="sender icon" />
              </td>
              <td className="sender">
                <p className="sender-name">Admin</p>
                <p className="sender-state">Online</p>
                <span>{typing.username} {typing.status}</span>
                
              </td>
              <td>
                <NavLink to="/Video" activeClassName="active">
                  <img className="video-icon" src={video} alt="video icon" />
                </NavLink>
              </td>
            </tr>
          </table>
        </div>

        
        <div className="body">
       
          <ScrollToBottom className="message-scroll">
        {messageList.map((messageContent, index) => (
              <div
                key={index}
                className="message-container"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p className="author">{messageContent.author}</p>
                    <p className="message-content">{messageContent.message}</p>
                    <p className="time-sent">{messageContent.time}</p>
                  </div>
                </div>
              </div>
               ))}
               </ScrollToBottom>
        </div>
        
      </>

      <div className="footer">
        <table>
          <tr>
            <td className="input-message">
           
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
            <td className="send-button">
              <img src={send} alt="send message" onClick={sendMessage} />
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Chat;
