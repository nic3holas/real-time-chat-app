import React, { useState } from 'react';
import './Login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const[signupError, setsignupError] = useState('')
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          await axios.post('http://localhost:3004/register', { username, password });
          navigate('/Signin'); // Redirect to login page after successful signup
      } catch (error) {
          if (error.response && error.response.data) {
              console.error('Signup failed:', error.response.data.message);
              setsignupError('There was an error. Please try again')
          } else {
              console.error('Signup failed:', error.message);
          }
      }
  };
  
    return (
        <div className='loginsignup'>
            <div className="loginsignup-container w3-card-4">
                <span>Create new account here</span>
                <h1>Sign Up</h1>
                <form className="loginsignup-fields" onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <span className='signup-error'>{signupError}</span>
                <button type="submit">Signup</button>
                
                </form>
                <p className="loginsignup-login">Already have an account? <span><NavLink to="/Signin" activeClassName="active">Signin</NavLink></span></p>
            </div>
        </div>
    )
}

export default Login;
