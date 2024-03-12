// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Chat from './Components/Chat/Chat';
import Login from './Components/Login/Login';
import Appointment from './Components/Appointment/Appointment';
import Notification from './Components/Notification/Notification';
import Feedback from './Components/Feedback/Feedback';
import Profile from './Components/Profile/Profile';
import Footer from './Components/Footer/Footer';
import Signin from './Components/Signin/Signin';
import Booking from './Components/Booking/Booking';
import Video from './Components/Video/Video';
import Camera from './Components/Camera';
import Admin from './Components/Administrator/Admin';
import Abooking from './Components/Abooking/Abooking';
import Asession from './Components/Asession/Asession';
import Achat from './Components/Achat/Achat';
import Aroom from './Components/Aroom/Aroom';
import Room from './Components/Room/Room';
import Avideo from './Components/Avideo/Avideo';
import LogoutButton from './Components/Logout/Logout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/Appointment" element={<Appointment />} />
        <Route path="/Notification" element={<Notification />} />
        <Route path="/Feedback" element={<Feedback />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Booking" element={<Booking />} />
        <Route path="/Video" element={<Video />} />
        <Route path="/Camera" element={<Camera />} />
        <Route path='/Admin' element={<Admin />} />
        <Route path='/Abooking' element={<Abooking/>} />
        <Route path='/Asession' element={<Asession/>} />
        <Route path='/Achat' element={<Achat/>} />
        <Route path='/Aroom' element={<Aroom/>} />
        <Route path='/Room' element={<Room/>} />
        <Route path='/Avideo' element={<Avideo/>} />
        <Route path='/Logout' element={<LogoutButton/>} />
      </Routes>

     
    </Router>
  );
};

export default App;
