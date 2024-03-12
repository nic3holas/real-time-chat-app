import React, { useState } from "react";
import './Signin.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Import jwtDecode from jwt-decode

const Signin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const[incorrectPassword, setIncorrectPassword] = useState('')
    const handleLogin = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:3004/login', { username, password });
            const token = response.data.token;
            const decodedToken = jwtDecode(token);
            const usernameFromToken = decodedToken.username;
            
            // Store the username in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data.message : error.message);
            setIncorrectPassword('Incorrect password!')
        }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(username, password);
    };

    return (
        <div className='loginsignin'>
        <h3 className="signedout">You're signed out.</h3>
            <div className="loginsignin-container w3-card-4">
                <h2>Login</h2>
                <form onSubmit={handleSubmit} className="loginsignin-fields">
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /><br/>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <span className="warning">{incorrectPassword}</span>
                    <button type="submit">Login</button>
                </form>
                <p className="loginsignin-login">Don't have an account? <span><NavLink to="/Login" activeClassName="active">Signup</NavLink></span></p>
            </div>
        </div>
    );
};

export default Signin;
