import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user authentication token from local storage
        localStorage.removeItem('token');
        // Redirect to login page
        navigate('/Signin');
    };

    return (
        <div>
            <button onClick={handleLogout}>Sign out</button>
        </div>
        
    );
};

export default LogoutButton;
