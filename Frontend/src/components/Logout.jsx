import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear the authentication token and any other stored user data
        localStorage.removeItem('token');
        localStorage.clear();

        // Optionally, show a message that the user has logged out
        alert('You have been logged out successfully!');

        // Redirect to login page
        navigate('/login'); // Replace '/login' with your actual login route if different
    }, [navigate]);

    return (
        <div className="flex justify-center items-center h-screen">
            <h1 className="text-2xl">Logging out...</h1>
        </div>
    );
}

export default Logout;
