import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from '../LoginModal/LoginModal';
import { getAuthenticatedUser, clearAuthenticatedUser } from '../../utils/authService';

import './header.css';

const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const authenticatedUser = getAuthenticatedUser();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleLogoutClick = () => {
    clearAuthenticatedUser();
    navigate('/');
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  return (
    <header>
      <Link id='header-title' to="/">ThesisFinder</Link>
      <nav>
          <button id='login-button' onClick={handleLoginClick}>Log in</button>
          <Link id='signup-link' to="/signup">Join for free</Link>
      </nav>
      <LoginModal show={showLoginModal} handleClose={handleLoginModalClose} />
    </header>
  );
};

export default Header;
