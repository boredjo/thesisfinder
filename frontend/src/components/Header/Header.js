// /frontend/src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isAuthenticated, username }) => {
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
            <Link to="/login">Log in</Link>
            {/* Add a signup link */}
            <Link to="/signup">Join for free</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
