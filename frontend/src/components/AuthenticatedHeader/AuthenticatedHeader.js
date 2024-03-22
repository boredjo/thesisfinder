import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { clearAuthenticatedUser } from '../../utils/authService';
import darkModeImage from '../../assets/AuthenticatedHeader/dark-mode.png';
import notificationImage from '../../assets/AuthenticatedHeader/notification-bell.png';
import defaultAvatar from '../../assets/avatar1.png';

import './authenticated-header.css';

const AuthenticatedHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [avatarImage, setAvatarImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  useEffect(() => {
    const savedAvatarImage = localStorage.getItem('avatarImage');
    if (savedAvatarImage) {
      setAvatarImage(savedAvatarImage);
    }
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openSubmitModal = () => {
    setIsSubmitModalOpen(true);
  };

  const closeSubmitModal = () => {
    setIsSubmitModalOpen(false);
  };

  const handleLogout = () => {
    clearAuthenticatedUser();
    navigate("/");
  };

  const handleSubmitResearchIdea = () => {
    navigate("/submit");
  };

  return (
    <header className="main-header">
      <div className="left-section">
        <img className="thesisfinder-logo" src={require('../../assets/thesisfinderlogo.png')} alt="Thesis-Finder-Logo" />
        <button className="left-section-button" onClick={() => navigate('/')}>Home</button>
        <button className="left-section-button" onClick={() => navigate('/explore-guest-search/e')}>Ideas</button>
      </div>
      <div>
        <input className="main-header-search" type="text" placeholder="Search for research ideas, sponsorships, people, etc." />
      </div>
      <div>
        <button onClick={() => {/* Handle dark mode button click */}}>
          <img className="dark-mode-button" src={require('../../assets/darkmodeimage.png')} alt="Dark Mode" />
        </button>
        <button onClick={() => {/* Handle notification button click */}}>
          <img className="notification-button" src={require('../../assets/notificationimage.png')} alt="Notification" />
        </button>
        <button onClick={openModal}>
          {avatarImage ? (
            <img src={avatarImage} alt="User Account" />
          ) : (
            <img className="account-button" src={require('../../assets/avatar1.png')} alt="User Account" />
          )}
        </button>
        <button className="header-submit-button" onClick={openSubmitModal}>Submit</button>
      </div>
      {/* Render the ProfileOptionsModal if isModalOpen is true */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content profile-options-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Profile Options</h2>
              <button onClick={closeModal} className="close-button">X</button>
            </div>
            <div className="modal-body">
              <button onClick={() => navigate('/account')}>Your Profile</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}
      {/* Render the SubmitModal if isSubmitModalOpen is true */}
      {isSubmitModalOpen && (
        <div className="modal-overlay" onClick={closeSubmitModal}>
          <div className="modal-content submit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Submit Options</h2>
              <button onClick={closeSubmitModal} className="close-button">X</button>
            </div>
            <div className="modal-body">
              <button onClick={handleSubmitResearchIdea}>Submit Research Idea</button>
              <button onClick={() => {/* Handle "Your Research Papers" button click */}}>Your Research Papers</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default AuthenticatedHeader;
