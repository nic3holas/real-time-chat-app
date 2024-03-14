// Navbar.js
import React, {useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import Embuni from './embuni.png'
const Navbar = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
      // Retrieve the username from localStorage
      const storedUsername = localStorage.getItem('username');
      setUsername(storedUsername);
  }, []); // Run once when component mounts

  return (
    <div className='navbar'>
    <nav>
      <div className='logo'>
        <img src={Embuni} alt="" />
        <p>Student Counselling</p>
        <span className='welcome'>Welcome!</span>
      </div>
      <div class="w3-dropdown-hover dropdwn">
        <div className="menubtn">
        <button class="w3-button"><b>Menu</b></button>
        </div>
        
       <div class="w3-dropdown-content w3-bar-block w3-border">
       <NavLink className='links' to="/" exact activeClassName="active"><b>Home</b></NavLink><br />
        <NavLink className='links' to="/Room" activeClassName="active"><b>Chat</b></NavLink><br />
        <NavLink className='links' to="/Appointment" activeClassName="active"><b>Appointment</b></NavLink><br />
        <NavLink className='links' to="/Notification" activeClassName="active"><b>Notification</b></NavLink><br />
        <NavLink className='links' to="/Admin" activeClassName="active"><b>Admin</b></NavLink>
        </div>
       </div>
      <ul className='my-links'>
        <li ><NavLink className='links' to="/" exact activeClassName="active">Home</NavLink></li>
        <li ><NavLink className='links' to="/Room" activeClassName="active">Chat</NavLink></li>
        <li ><NavLink className='links' to="/Appointment" activeClassName="active">Appointment</NavLink></li>
        <li ><NavLink className='links' to="/Notification" activeClassName="active">Notification</NavLink></li>
        <li ><NavLink className='links' to="/Admin" activeClassName="active">Admin</NavLink></li>
      
      </ul>
    </nav>
    </div>
  );
};

export default Navbar;
