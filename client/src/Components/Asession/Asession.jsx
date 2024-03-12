import React from "react";
import './Asession.css';
import Anavbar from "../Anavbar/Anavbar";


const Asession = () => {
    return(
        <div>
          <Anavbar/>  
          <div className="sessions">
            <table>
                <tr>
                    <td className="student">
                        <p >Nicholas Murimi</p>
                    </td>
                    <td className="time">
                        <span >12 days ago</span>
                    </td>
                </tr>
                <tr>
                    <td  className="description">
                        <p>
                            Completed session
                        </p>
                    </td>
                </tr>
            </table>
          </div>
        </div>
    )
}
export default Asession