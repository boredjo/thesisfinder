import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from '../LoginModal/LoginModal';

import './header.css';

const Header = ({ isAuthenticated, username }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  return (
    <header>
      <Link id='header-title' to="/">ThesisFinder</Link>
      <nav>
        {isAuthenticated ? (
          <>
            <p>Welcome, {username}!</p>
            <Link to="/logout">Logout</Link>
          </>
        ) : (
          <>
            <button id='login-button' onClick={handleLoginClick}>Log in</button>
            <Link id='signup-link' to="/signup">Join for free</Link>
          </>
        )}
      </nav>
      <LoginModal show={showLoginModal} handleClose={handleLoginModalClose} />
    </header>
  );
};

export default Header;
