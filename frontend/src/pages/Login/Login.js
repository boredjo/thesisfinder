// Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  
  // In Signup.js after localStorage.setItem('signupFormData', JSON.stringify(formData));
  const users = JSON.parse(localStorage.getItem('users')) || [];
  // console.log('Users in Local Storage:', users);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Read existing users data from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Find the user with the provided email
    const user = existingUsers.find((u) => u.email === formData.email);

    // Check if the user exists and the password is correct
    if (user && user.password === formData.password) {
      // Redirect to the home page after successful login
      navigate('/');
    } else {
      setError('Invalid email or password');
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

  React.useEffect(() => {
    const { state } = location;
    if (state && state.signupFormData) {
      setFormData({
        email: state.signupFormData.email,
        password: '', // Leave the password field empty for security reasons
      });
  
      // Log for debugging
      // console.log('Signup Form Data (Login):', state.signupFormData);
      // console.log('Avatar Image:', state.avatarImage);
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
