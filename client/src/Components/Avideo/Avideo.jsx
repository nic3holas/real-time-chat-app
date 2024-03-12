import React from "react";
import { useRef, useState } from 'react';
import './Avideo.css';
//import { NavLink } from "react-router-dom";
import video_icon from './video-icon.png';
import end_call from './end-call.png';
import speaker from './enable-sound.png';
import record from './rec-sound.png';
import hand from './raise.png';
import Anavbar from "../Anavbar/Anavbar";

const Avideo = () => {
    const videoRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);

  const startCamera = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setMediaStream(stream);
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    } catch (error) {
        console.error('Error accessing camera:', error);
    }
};


  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
  };

    return(
        <div>
          <Anavbar/>
          <table>
            <tr>
              <td>
              <div className="video-container  w3-padding">
        
         <video ref={videoRef} autoPlay />
         <img src={video_icon} alt=""className="start-video" onClick={startCamera}/>
         <img src={end_call} alt="" className="end-video" onClick={stopCamera} />
         </div>
              </td>
              <td>
                <img src={hand} alt="" className="end-call" />
              </td>

              <td>
                <img src={record} alt="" />
              </td>
              <td>
                <img src={speaker} alt="" />
              </td>
            </tr>
          </table>
        </div>
    )
}

export default Avideo;