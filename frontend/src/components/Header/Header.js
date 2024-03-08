// /frontend/src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from '../LoginModal/LoginModal'; // Import the LoginModal component
import './header.css'; // Import the styles for the header

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
            <button onClick={handleLoginClick}>Log in</button>
            <Link to="/signup">Join for free</Link>
          </>
        )}
      </nav>
      <LoginModal show={showLoginModal} handleClose={handleLoginModalClose} />
    </header>
  );
};

export default Header;
