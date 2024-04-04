import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { clearAuthenticatedUser } from '../../utils/authService';
import { getProfilePictureByUsername, getUser } from '../../utils/api';

import darkModeImage from '../../assets/AuthenticatedHeader/dark-mode.png';
import notificationImage from '../../assets/AuthenticatedHeader/notification-bell.png';
import defaultAvatar from '../../assets/avatar1.png';

import './authenticated-header.css';

const AuthenticatedHeader = ({ authToken }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [avatarImage, setAvatarImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser(authToken);
        const fetchedUsername = userData.username;

        setUsername(fetchedUsername);

        fetchProfilePicture(fetchedUsername);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);

  const fetchProfilePicture = async (username) => {
    try {
      const profilePictureUrl = await getProfilePictureByUsername(username);
      setAvatarImage(profilePictureUrl);
    } catch (error) {
      console.error('Error fetching profile picture:', error.message);
    }
  };

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
    closeModal();
  };

  const handleSubmitResearchIdea = () => {
    navigate("/submit");
    closeModal();
  };

  const handleYourResearchPapers = () => {
    closeModal();
  };

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      navigate(`/explore-guest-search?query=${searchQuery}`);
    }
  };

  return (
    <header className="main-header">
      <div className="left-section">
        <Link id='header-title' to="/">ThesisFinder</Link>
        <button className="left-section-button" onClick={() => navigate('/home')}>Home</button>
        <button className="left-section-button" onClick={() => navigate('/explore-guest-search')}>Ideas</button>
      </div>
      <div>
        <input
          className="main-header-search"
          type="text"
          placeholder="Search for research ideas, sponsorships, people, etc."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleSearch}
        />
      </div>
      <div>
        <button onClick={() => {/* Handle dark mode button click */}}>
          <img className="dark-mode-button" src={darkModeImage} alt="Dark Mode" />
        </button>
        <button onClick={() => {/* Handle notification button click */}}>
          <img className="notification-button" src={notificationImage} alt="Notification" />
        </button>
        <button onClick={openModal}>
          {avatarImage ? (
            <img src={"https://data.thesisfinder.com/profilepicture/" + username} alt="User Account" />
          ) : (
            <img className="account-button" src={"https://data.thesisfinder.com/profilepicture/" + username} alt="User Account" />
          )}
        </button>
        <button className="header-submit-button" onClick={openSubmitModal}>Submit</button>
      </div>
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content profile-options-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Profile Options</h2>
            </div>
            <div className="modal-body">
              <button onClick={() => { navigate('/account'); closeModal(); }} className="profile-option-button">Your Profile</button>
              <button onClick={() => { handleLogout(); }} className="profile-option-button">Logout</button>
            </div>
          </div>
        </div>
      )}
      {isSubmitModalOpen && (
        <div className="modal-overlay" onClick={closeSubmitModal}>
          <div className="modal-content submit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Submit Options</h2>
            </div>
            <div className="modal-body">
              <button onClick={() => {handleSubmitResearchIdea(); closeSubmitModal(); }} className="submit-option-button">Submit Research Idea</button>
              <button onClick={() => { handleYourResearchPapers(); closeSubmitModal(); }} className="submit-option-button">Your Research Papers</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default AuthenticatedHeader;
