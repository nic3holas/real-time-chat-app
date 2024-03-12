import React, { useState, useEffect,useRef } from "react"
import "./Chat.css"
import io from 'socket.io-client'
import sender from "./sender.png"
import send from "./send.png"
import video from "./video.png"
import { NavLink } from "react-router-dom"
import ScrollToBottom from "react-scroll-to-bottom"
import back from './back.png'

//const socket = io.connect("http://localhost:3001")
const Chat = () => {
 
  
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
            
              <div
                key={index}
                className="message"
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
                onChange={(event) => setCurrentMessage(event.target.value)}
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
