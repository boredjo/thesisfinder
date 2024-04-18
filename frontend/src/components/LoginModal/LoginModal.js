import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { setAuthenticatedUser, setAuthToken } from '../../utils/authService';
import { getToken } from '../../utils/api';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

import './loginmodal.css';

const LoginModal = ({ show, handleClose }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '', // Changed from email to username
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await getToken(formData.username, formData.password); // Changed email to username

      if (response && response.token) {
        setAuthenticatedUser({
          username: formData.username, // Changed email to username
        });

        setAuthToken(response.token);

        navigate('/');
        handleClose();
      } else {
        setError('Invalid username and/or password'); // Changed email to username
      }
    } catch (error) {
      setError('Wrong Username/Password.'); // Changed email to username
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
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
              Username: {/* Changed from Email to Username */}
              <input
                type="text" // Changed from email to text
                name="username" // Changed from email to username
                placeholder="Username" // Changed from Email to Username
                value={formData.username}
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
            <button type="submit" disabled={loading}>Login</button>
          </form>
          {loading && <LoadingIndicator />}
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
