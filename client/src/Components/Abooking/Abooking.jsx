import React from "react";
import './Abooking.css';
import Anavbar from "../Anavbar/Anavbar";
import { NavLink } from 'react-router-dom'

const Abooking = () => {
    return(
        <div>
            <Anavbar/>
            <NavLink to="/Aroom" activeClassName="active" className="link">
            <div className="bookings">
               <table>
                <tr>
                    <td>
                        <p className="student-name">Nicholas Murimi</p>
                    </td>
                    <td>
                        <span className="timestamp">12 minutes ago</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p className="desc">I have a problem with my...</p>
                    </td>
                </tr>
               </table>

            </div>
            </NavLink>
            <div className="bookings">
               <table>
                <tr>
                    <td>
                        <p className="student-name">Joseph Omari</p>
                    </td>
                    <td>
                        <span className="timestamp">5 minutes ago</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p className="desc">I need a talk with you</p>
                    </td>
                </tr>
               </table>

            </div>
        </div>
    )
}
export default Abooking;