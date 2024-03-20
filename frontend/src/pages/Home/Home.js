// /frontend/src/pages/Home.js
// Main menu accessible to users

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../styles/main.css';
import '../../styles/mainheader.css';
import './home.css';

const Home = () => {
  const navigate = useNavigate(); // Initialize navigate hook.

  useEffect(() => {
    // Check if the user is authenticated (example: checking for a token in localStorage)
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      // If the user is not authenticated, redirect them to the login page
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      
    </div>
  );
};

export default Home; 