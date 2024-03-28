import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../utils/api';
import { getToken } from '../../utils/api';
import { setAuthenticatedUser, setAuthToken } from '../../utils/authService';

import './signup.css';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user: '',
    first_name: '',
    last_name: '',
    country: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Additional validation for the 'country' field
    if (name === 'country' && value.length > 2) {
      // If the input length exceeds 2 characters, truncate it to the first 2 characters
      setFormData((prevData) => ({ ...prevData, [name]: value.substring(0, 2) }));
    } else {
      // Otherwise, update the form data as usual
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleContinue = async (e) => {
    e.preventDefault();

    // Validation
    const isFormValid = Object.values(formData).every((value) => value.trim() !== '');
    if (!isFormValid) {
      alert('Please fill in all fields.');
      return;
    }

    // Email format validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Password security requirements
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      alert('Password must be at least 8 characters long and contain at least one letter, one number, and one special character.');
      return;
    }

    try {
      // Register the user using the formData
      await registerUser(formData);

      // Log the user in after successful registration
      const response = await getToken(formData.user, formData.password); // Use username instead of email

      // Check if the response has a token
      if (response && response.token) {
        // Set the authenticated user
        setAuthenticatedUser({
          username: formData.user,
          // Add any other user-related info you may need
        });

        // Set the authentication token
        setAuthToken(response.token);

        // Redirect to the home page after successful login
        navigate('/signup/avatar-upload');
      } else {
        // Handle error if token is not received
        console.error('Error: Token not received after registration.');
      }
    } catch (error) {
      // Handle registration error
      console.error('Error registering user:', error);

      // Check if the error message indicates that the username or email is already taken
      if (error.message.includes('Username or Email is already taken')) {
        alert('Username or Email is already taken. Please choose a different one.');
      } else {
        // Display a generic error message for other types of errors
        alert('An error occurred while registering. Please try again.');
      }
    }
  };

  return (
    <div className="main-container">
      <div className='header-container'>
        <h2>Join a Growing Community of Researchers</h2>
        <p>
          Collaborate with colleagues and read the latest publications 
          in your field. Sign up now!
        </p>
        <hr />
      </div>
      <div className='signup-container'>
        <form>
          <label>
            Username:
            <input
              type="text"
              name="user"
              placeholder='Username'
              value={formData.user}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            First Name:
            <input
              type="text"
              name="first_name"
              placeholder='First Name'
              value={formData.first_name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              type="text"
              name="last_name"
              placeholder='Last Name'
              value={formData.last_name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Country:
            <input
              type="text"
              name="country"
              placeholder='Country'
              value={formData.country}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              placeholder='Email'
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
              placeholder='Password (at least 8 characters long, one letter, number, and special character)'
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <br />
          <div className='continue-container'>
            <button onClick={handleContinue}>Continue</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
