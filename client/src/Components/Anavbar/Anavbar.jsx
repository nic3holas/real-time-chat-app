// Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Anavbar.css';
import Embuni from './embuni.png'
const Anavbar = () => {
  return (
    <div className='navbar'>
    <nav>
      <div className='logo'>
        <img src={Embuni} alt="" />
        <p>Admin Dashboard</p>
      </div>
      <div class="w3-dropdown-hover dropdwn">
        <div className="menubtn">
        <button class="w3-button"><b>Menu</b></button>
        </div>
        
       <div class="w3-dropdown-content w3-bar-block w3-border">
       <NavLink className='links' to="/Admin" exact activeClassName="active"><b>Home</b></NavLink><br />
        <NavLink className='links' to="/Abooking" activeClassName="active"><b>Bookings</b></NavLink><br />
        <NavLink className='links' to="/Asession" activeClassName="active"><b>Sessions</b></NavLink><br />
       
        </div>
       </div>
      <ul className='my-links'>
        <li ><NavLink className='links' to="/Admin" exact activeClassName="active">Home</NavLink></li>
        <li ><NavLink className='links' to="/Abooking" activeClassName="active">Bookings</NavLink></li>
        <li ><NavLink className='links' to="/Asession" activeClassName="active">Sessions</NavLink></li>      
      </ul>
    </nav>
    </div>
  );
};

export default Anavbar;
