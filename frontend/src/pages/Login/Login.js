import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { getToken } from '../../utils/api';
import { setAuthenticatedUser, setAuthToken } from '../../utils/authService'; // Import setAuthToken

import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: '',
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
      const response = await getToken(formData.email, formData.password);

      // Check if the response has a token
      if (response && response.token) {
        // Set the authenticated user in local storage
        setAuthenticatedUser({
          email: formData.email,
          // Add any other user-related info you may need
        });

        // Set the authentication token in local storage
        setAuthToken(response.token);

        console.log(response.token)

        // Redirect to the home page after successful login
        navigate('/');
      } else {
        setError('Invalid email or password');
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
        email: state.signupFormData.email || '',
        password: '', // Leave the password field empty for security reasons
      });
    }
  }, [location]);

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p>
        Don't have an account? <Link to="/signup">Sign up here</Link>.
      </p>
    </div>
  );
};

export default Login;
