import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { setAuthenticatedUser, setAuthToken } from '../../utils/authService'; // Import setAuthToken
import { getToken } from '../../utils/api'; // Import getToken function

import './loginmodal.css';

const LoginModal = ({ show, handleClose }) => {
  const navigate = useNavigate();

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

        // Redirect to the home page after successful login
        navigate('/');

        // Close the modal
        handleClose();
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Error during login. Please try again.');
      console.error(error);
    }
  };

  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Username"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">Log in</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <button onClick={handleClose}>Close</button>
        <p>
          Don't have an account? <Link to="/signup" onClick={handleClose}>Sign up here</Link>.
        </p>
      </section>
    </div>
  );
};

export default LoginModal;
