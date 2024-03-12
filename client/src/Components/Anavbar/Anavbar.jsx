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
