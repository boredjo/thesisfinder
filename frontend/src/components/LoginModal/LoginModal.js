import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { setAuthenticatedUser, setAuthToken } from '../../utils/authService';
import { getToken } from '../../utils/api';

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
      const response = await getToken(formData.email, formData.password);

      if (response && response.token) {
        setAuthenticatedUser({
          email: formData.email,
        });

        setAuthToken(response.token);

        navigate('/');
        handleClose(); // Close the modal after successful login
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Error during login. Please try again.');
      console.error(error);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose(); // Close the modal if clicking outside the modal content
    }
  };

  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName} onClick={handleOverlayClick}>
      <section className="modal-main">
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Email:
              <input
                type="email"
                name="email"
                placeholder="Email"
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
                placeholder="Password"
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
      </section>
    </div>
  );
};

export default LoginModal;
