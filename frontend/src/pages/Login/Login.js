import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { getToken } from '../../utils/api';
import { setAuthenticatedUser, setAuthToken } from '../../utils/authService'; // Import setAuthToken

import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the API to get the authentication token
      const response = await getToken(formData.username, formData.password);

      // Check if the response has a token
      if (response && response.token) {
        // Set the authenticated user in local storage
        setAuthenticatedUser({
          username: formData.username,
          // Add any other user-related info you may need
        });

        // Set the authentication token in local storage
        setAuthToken(response.token);

        // Redirect to the home page after successful login
        navigate('/');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Error during login. Please try again.');
      console.error(error);
    }
  };

  // Pre-fill login form with signup data if available
  useEffect(() => {
    const { state } = location;
    if (state && state.signupFormData) {
      setFormData({
        username: state.signupFormData.username || '',
        password: '',
      });
    }
  }, [location]);

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Username:
          <input
            type="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            oninput="this.setCustomValidity('')" title="<your text>"
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit" formNoValidate>Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p>
        Don't have an account? <Link to="/signup">Sign up here</Link>.
      </p>
    </div>
  );
};

export default Login;
