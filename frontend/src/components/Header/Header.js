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
      <h1 id='header-title'>ThesisFinder</h1>
      <nav>
        {isAuthenticated ? (
          <>
            <p>Welcome, {username}!</p>
            <Link to="/logout">Logout</Link>
          </>
        ) : (
          <>
            <button id='login-button' onClick={handleLoginClick}>Log in</button>
            
            <Link to="/signup">
            <button id='signup-button'>Join for free</button>
            </Link>
          </>
        )}
      </nav>
      <LoginModal show={showLoginModal} handleClose={handleLoginModalClose} />
    </header>
  );
};

export default Header;
