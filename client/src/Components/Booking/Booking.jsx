import React from "react";
import './Booking.css';
import { NavLink } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
const Booking = () => {
    return (
        <>
        <Navbar/>
        <div className="book w3-card-4 ">
            <h4><b>Book Appointment</b></h4>
            <div className="inputfields">
                <input type="text"  name="name" id="name" placeholder="Enter name"/><br /><br />
                <input type="text" name="phone" id="phone" placeholder="Phone number" /><br /><br />
                <input type="text" name="school" id="school" placeholder="School (eg SPAS,Law,Nursing)" /><br /><br />
                <textarea name="" id="" cols="30" rows="5">Description</textarea><br />
            </div>

            <NavLink to = "/Appointment" activeClassName="active"><button>Continue</button></NavLink>

        </div>
        </>
    )
}

export default Booking;