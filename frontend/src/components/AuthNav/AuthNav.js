// /frontend/src/components/AuthNav.js
import React from 'react';
import { Link } from 'react-router-dom';

const AuthNav = ({ isAuthenticated, username }) => {
  return (
    <nav>
      {isAuthenticated ? (
        <>
          {/* Display username if authenticated */}
          <p>Welcome, {username}!</p>
          {/* Add a logout link */}
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
  );
};

export default AuthNav;
