import React, { useRef, useState } from 'react';

const Camera = () => {
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

  return (
    <div>
    <div className="video-container w3-card-4">
      <video ref={videoRef} autoPlay />
    </div>
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={stopCamera}>Stop Camera</button>
      
    </div>
  );
};

export default Camera;
