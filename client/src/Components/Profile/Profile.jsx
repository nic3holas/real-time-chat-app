import React, {useState,useEffect} from "react";
import './Profile.css';
import Navbar from "../Navbar/Navbar";
import LogoutButton from "../Logout/Logout";
import { getUsername } from './authUtils'; 
const Profile = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Retrieve the username from localStorage
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername);
    }, []); // Run once when component mounts
  

    return (
        <div>
            <Navbar/>
            <div className="profile w3-card-4 w3-padding">
                <LogoutButton/>
                <p><b>NAME: </b>{username}</p>
                <p><b>REG NO: </b>B135/22462/2021</p>
                <p><b>COURSE: </b>Bsc Computer Science</p>
                <p><b>SCHOOL: </b>Pure and Applied Sciences</p>
                <p><b>YEAR: </b>3</p>
            </div>
        </div>
    )
}
export default Profile;