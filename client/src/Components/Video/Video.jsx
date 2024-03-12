import React from "react";
import { useRef, useState, useEffect } from 'react';
import './Video.css';
//import { NavLink } from "react-router-dom";
import video_icon from './video-icon.png';
import end_video from './end-video.png';
import end_call from './end-call.png';
import speaker from './enable-sound.png';
import record from './rec-sound.png';
import hand from './raise.png';
import Navbar from "../Navbar/Navbar";
import io from 'socket.io-client';
const Video = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const socketRef = useRef();
  const peerRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
            setLocalStream(stream);
            //const socket = io.connect('http://localhost:5000');
            socketRef.current = socket;

            socket.emit('join room', 'video');

            socket.on('offer', handleReceiveCall);
            socket.on('answer', handleAnswer);
            socket.on('ice-candidate', handleNewICECandidate);

           /* return () => {
                socket.disconnect();
            };*/
        })
        .catch(error => {
            console.error('Error accessing media devices:', error);
        });

}, []);

const handleReceiveCall = (offer) => {
    const peerConnection = new RTCPeerConnection();
    peerRef.current = peerConnection;

    peerConnection.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
    };

    peerConnection.addStream(localStream);

    peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
        .then(() => {
            return peerConnection.createAnswer();
        })
        .then((answer) => {
            return peerConnection.setLocalDescription(answer);
        })
        .then(() => {
            const answerMessage = {
                type: 'answer',
                answer: peerConnection.localDescription,
            };
            socketRef.current.emit('answer', answerMessage);
        })
        .catch(error => {
            console.error('Error handling received call:', error);
        });
};

const handleAnswer = (answer) => {
    peerRef.current.setRemoteDescription(new RTCSessionDescription(answer.answer))
        .catch(error => {
            console.error('Error handling answer:', error);
        });
};

const handleNewICECandidate = (candidate) => {
    peerRef.current.addIceCandidate(new RTCIceCandidate(candidate))
        .catch(error => {
            console.error('Error handling ICE candidate:', error);
        });
};
  /*const startCamera = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setMediaStream(stream);
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    } catch (error) {
        console.error('Error accessing camera:', error);
    }
}


  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
  };*/


    return(
        <div>
          <Navbar/>
          <table>
            <tr>
              <td>
              <div className="video-container  w3-padding">
        
         <video ref={localStream} autoPlay />
         <video ref={remoteStream} autoPlay muted></video>
         <img src={video_icon} alt=""className="start-video" onClick={handleAnswer}/>
         <img src={end_call} alt="" className="end-video" onClick={handleReceiveCall} />
         </div>
              </td>
              <td>
                <img src={hand} alt="" className="end-call" onClick={handleNewICECandidate} />
              </td>

              <td>
                <img src={record} alt=""  />
              </td>
              <td>
                <img src={speaker} alt=""  />
              </td>
            </tr>
          </table>
        </div>
    )
}

export default Video;