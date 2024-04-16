import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from '../LoginModal/LoginModal';
import { getAuthenticatedUser, clearAuthenticatedUser } from '../../utils/authService';

import './header.css';

const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const authenticatedUser = getAuthenticatedUser();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate()

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  // const handleLogoutClick = () => {
  //   clearAuthenticatedUser();
  //   navigate('/');
  // };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
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
      </div>
      <div className='middle-section'>
        <input
          className="main-header-search"
          type="text"
          placeholder="Search for research ideas, sponsorships, people, etc."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleSearch}
        />
      </div>
      <div className='right-section'>
        <nav>
            <button id='login-button' onClick={handleLoginClick}>Log in</button>
            <Link id='signup-link' to="/signup">Join for free</Link>
        </nav>
        <LoginModal show={showLoginModal} handleClose={handleLoginModalClose} />
      </div>
    
    </header>
  );
};

export default Header;
