import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../utils/api';
import { getToken } from '../../utils/api';
import { setAuthenticatedUser, setAuthToken } from '../../utils/authService';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator'; // Import LoadingIndicator component
import Select from 'react-select'; // Import react-select
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

  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleChange = (name, value) => {
    // Update the form data with the selected value
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleContinue = async (e) => {
    e.preventDefault();

    // Set loading to true to show loading indicator
    setLoading(true);

    // Validation
    const isFormValid = Object.values(formData).every((value) => value.trim() !== '');
    if (!isFormValid) {
      alert('Please fill in all fields.');
      setLoading(false); // Reset loading state
      return;
    }

    // Email format validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      setLoading(false); // Reset loading state
      return;
    }

    // Password security requirements
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      alert('Password must be at least 8 characters long and contain at least one letter, one number, and one special character.');
      setLoading(false); // Reset loading state
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
    } finally {
      // Reset loading state after registration attempt is finished
      setLoading(false);
    }
  };

  // Options for the country dropdown
  const countryOptions = [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    // Add more country options as needed
  ];

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
              onChange={(e) => handleChange('user', e.target.value)}
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
              onChange={(e) => handleChange('first_name', e.target.value)}
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
              onChange={(e) => handleChange('last_name', e.target.value)}
            />
          </label>
          <br />
          <label>
            Country:
            <Select
              options={countryOptions}
              value={countryOptions.find((option) => option.value === formData.country)}
              onChange={(selectedOption) => handleChange('country', selectedOption.value)}
              placeholder="Select Country"
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
              onChange={(e) => handleChange('email', e.target.value)}
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
              onChange={(e) => handleChange('password', e.target.value)}
            />
          </label>
          <br />
          <div className='continue-container'>
            {loading ? (
              <LoadingIndicator /> // Render loading indicator if loading is true
            ) : (
              <button onClick={handleContinue}>Continue</button> // Otherwise, render the button
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
