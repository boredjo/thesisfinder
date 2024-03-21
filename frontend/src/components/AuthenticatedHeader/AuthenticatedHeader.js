import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { clearAuthenticatedUser } from '../../utils/authService';

import './authenticated-header.css';
import darkModeImage from '../../assets/AuthenticatedHeader/dark-mode.png';
import notificationImage from '../../assets/AuthenticatedHeader/notification-bell.png';
import defaultAvatar from '../../assets/avatar1.png';

// New modal component for profile options
const ProfileOptionsModal = ({ closeModal, handleProfile, handleLogout }) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content profile-options-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Profile Options</h2>
          <button onClick={closeModal} className="close-button">X</button>
        </div>
        <div className="modal-body">
          <button onClick={handleProfile}>Your Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

const AuthenticatedHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [fontSize, setFontSize] = useState(1); // Initial font size
  const [avatarImage, setAvatarImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    // Function to update font size based on window width
    const updateFontSize = () => {
      // Adjust font size based on window width
      const newFontSize = window.innerWidth < 1080 ? 0.6 : 1; // Example threshold at 1080px
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

  useEffect(() => {
    // Retrieve avatar image from localStorage
    const savedAvatarImage = localStorage.getItem('avatarImage');
    if (savedAvatarImage) {
      setAvatarImage(savedAvatarImage);
    }
  }, []); // Empty dependency array ensures the effect runs only once

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle logout
  const handleLogout = () => {
    clearAuthenticatedUser();
    navigate("/");
  };

  return (
    <header style={{ fontSize: `${fontSize}em` }}> {/* Dynamically adjust font size */}
      <Link id='header-title' to="/">ThesisFinder</Link>
      <Link id='home-link' to="/home" className={location.pathname === '/home' ? 'active' : ''}>Home</Link>
      <Link id='ideas-link' to='/explore-guest-search/e' className={location.pathname.startsWith('/explore-guest-search') ? 'active' : ''}>Ideas</Link>
      <input 
        type="text" 
        placeholder="Search for research ideas, sponsorships, people, etc." 
        id="search-ideas"
      />
      
      <button id="dark-mode-button" onClick={() => {/* Handle dark mode button click */}}>
        <img src={darkModeImage} alt="Dark Mode" style={{ width: `${24 * fontSize}px`, height: `${24 * fontSize}px` }} />
      </button>
      <button id="notification-button" onClick={() => {/* Handle notification button click */}}>
        <img src={notificationImage} alt="Notifications" style={{ width: `${24 * fontSize}px`, height: `${24 * fontSize}px` }} />
      </button>
      <button id="avatar-button" onClick={openModal}>
        {avatarImage ? (
          <img src={avatarImage} alt="Avatar" style={{ width: `${24 * fontSize}px`, height: `${24 * fontSize}px` }} />
        ) : (
          <img src={defaultAvatar} alt="Avatar" style={{ width: `${40 * fontSize}px`, height: `${40 * fontSize}px` }} />
        )}
      </button>
      <button id="add-new-button" style={{ fontSize: `${fontSize}em` }}>Add New</button>
      
      {/* Render the ProfileOptionsModal if isModalOpen is true */}
      {isModalOpen && (
        <ProfileOptionsModal 
          closeModal={closeModal} 
          handleProfile={() => navigate('/account')} // Handle redirect to profile page
          handleLogout={handleLogout} // Handle logout
        />
      )}
    </header>
  );
};

export default AuthenticatedHeader;
