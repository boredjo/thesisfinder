import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import './authenticated-header.css';
import darkModeImage from '../../assets/AuthenticatedHeader/dark-mode.png';
import notificationImage from '../../assets/AuthenticatedHeader/notification-bell.png'

const AuthenticatedHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [fontSize, setFontSize] = useState(1); // Initial font size

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const query = event.target.value;
      navigate(`/explore-guest-search/${query}`);
    }
  };

  useEffect(() => {
    // Function to update font size based on window width
    const updateFontSize = () => {
      // Adjust font size based on window width
      const newFontSize = window.innerWidth < 1080 ? 0.8 : 1; // Example threshold at 1080px
      setFontSize(newFontSize);
    };

    // Call the function once to set initial font size
    updateFontSize();

    // Add event listener for window resize
    window.addEventListener('resize', updateFontSize);

    // Clean up by removing event listener when component unmounts
    return () => {
      window.removeEventListener('resize', updateFontSize);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <header style={{ fontSize: `${fontSize}em` }}> {/* Dynamically adjust font size */}
      <Link id='header-title' to="/">ThesisFinder</Link>
      <Link id='home-link' to="/home" className={location.pathname === '/home' ? 'active' : ''}>Home</Link>
      <Link id='ideas-link' to='/explore-guest-search/e' className={location.pathname.startsWith('/explore-guest-search') ? 'active' : ''}>Ideas</Link>
      <input 
        type="text" 
        placeholder="Search for research ideas, sponsorships, people, etc." 
        id="search-ideas"
      ></input>
      <button id="dark-mode-button" onClick={() => {}}>
        <img src={darkModeImage} alt="Dark Mode" style={{ width: `${24 * fontSize}px`, height: `${24 * fontSize}px` }} />
      </button>
      <button id="notification-button" onClick={() => {}}>
        <img src={notificationImage} alt="Notifications" style={{ width: `${24 * fontSize}px`, height: `${24 * fontSize}px` }} />
      </button>
    </header>
  );
};

export default AuthenticatedHeader;
