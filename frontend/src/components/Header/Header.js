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
      <h1>ThesisFinder</h1>
      <nav>
        {isAuthenticated ? (
          <>
            {/* Display username if authenticated */}
            <p>Welcome, {username}!</p>
            {/* Add a logout button or link */}
            <Link to="/logout">Logout</Link>
          </>
        ) : (
          <>
            {/* Add a login link */}
            <button onClick={handleLoginClick}>Log in</button>
            {/* Add a signup link */}
            <Link to="/signup">Join for free</Link>
          </>
        )}
      </nav>

      {/* Render the LoginModal component */}
      <LoginModal show={showLoginModal} handleClose={handleLoginModalClose} />
    </header>
  );
};

export default Header;
