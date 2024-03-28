import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { clearAuthenticatedUser } from '../../utils/authService';
import { getProfilePictureByUsername, getUser } from '../../utils/api'; // Import the API functions to fetch profile picture and user data

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
  const [searchQuery, setSearchQuery] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Make an API call to get the user data
        const userData = await getUser();
        const fetchedUsername = userData.username;

        // Set the fetched username in state
        setUsername(fetchedUsername);

        // Fetch profile picture when the username is available
        fetchProfilePicture(fetchedUsername);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        // Handle error
      }
    };

    fetchUserData();
  }, []);

  const fetchProfilePicture = async (username) => {
    try {
      // Make an API call to fetch the profile picture URL using the username
      const profilePictureUrl = await getProfilePictureByUsername(username);

      // Update the avatar image state with the profile picture URL
      setAvatarImage(profilePictureUrl);
    } catch (error) {
      console.error('Error fetching profile picture:', error.message);
      // Handle error
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
    closeModal(); // Close modal when logging out
  };

  const handleSubmitResearchIdea = () => {
    navigate("/submit");
    closeModal(); // Close modal when submitting research idea
  };

  const handleYourResearchPapers = () => {
    // Handle navigation to "Your Research Papers" page
    closeModal(); // Close modal when accessing your research papers
  };

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      navigate(`/explore-guest-search/${searchQuery}`);
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
            <img src={avatarImage} alt="User Account" />
          ) : (
            <img className="account-button" src={defaultAvatar} alt="User Account" />
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
              <button onClick={() => { navigate('/account'); closeModal(); }}>Your Profile</button>
              <button onClick={() => { handleLogout(); }}>Logout</button>
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
              <button onClick={() => {handleSubmitResearchIdea(); closeSubmitModal(); }}>Submit Research Idea</button>
              <button onClick={() => { handleYourResearchPapers(); closeSubmitModal(); }}>Your Research Papers</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default AuthenticatedHeader;
