import React from "react";
import './Appointment.css';
import { NavLink } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
const Appointment = () => {
    return (
        <div>
<Navbar/>

<div className="status w3-card-4 w3-padding w3-margin">
    <p><b>Counsellor Already in session until 11.00AM. Kindly Wait.</b></p>
</div>

<div className="status-free w3-card-4 w3-padding w3-margin">
    <p><b>You can now Book an Appointment</b></p>
    <NavLink to ="/Booking" activeClassName = "active"><button>Book</button></NavLink>
</div>
        </div>
    )
}
export default Appointment;