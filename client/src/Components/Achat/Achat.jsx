import React, { useState, useEffect } from "react"
import "./Achat.css"
import io from 'socket.io-client'
import sender from "./sender.png"
import send from "./send.png"
import video from "./video.png"
import { NavLink } from "react-router-dom"
import ScrollToBottom from "react-scroll-to-bottom"

const Achat = ({socket}) => {
  //const socket = io.connect("http://localhost:5000")
  const [currentMessage, setCurrentMessage] = useState("")
  const [messageList, setMessageList] = useState([])
  const [username, setUsername] = useState('')

  useEffect(() => {
      // Retrieve the username from localStorage
      const storedUsername = localStorage.getItem('username')
      setUsername(storedUsername)
  }, []) // Run once when component mounts

  const sendMessage = async () => {
    const room = 123
    if (currentMessage !== "") {
      const messageData = {
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");

      socket.emit("join_room", room)
    }
  };

  useEffect(() => {
    // Fetch messages when component mounts
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:3004/messages"); // Change URL to your backend endpoint
        if (response.ok) {
          const data = await response.json();
          setMessageList(data);
        } else {
          throw new Error("Failed to fetch messages");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    // Listen for new messages from socket
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <>
        <div className="head">
          <table>
            <tr>
              <td className="sender-icon">
                <img src={sender} alt="sender icon" />
              </td>
              <td className="sender">
                <p className="sender-name">Student</p>
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
          <ScrollToBottom className="message-container">
            {messageList.map((messageContent, index) => (
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

export default Achat;
