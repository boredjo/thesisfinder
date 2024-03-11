import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './signup.css';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    region: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields (add more validation as needed)

    // Read existing users data from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Add the new user to the existing users array
    const newUserData = {
      id: existingUsers.length + 1, // Assign a unique ID (you can use a library like uuid)
      ...formData,
    };

    existingUsers.push(newUserData);

    // Save the updated users array back to localStorage
    localStorage.setItem('users', JSON.stringify(existingUsers));

    // Redirect to the login page after successful registration
    navigate('/login');
  };

  return (
    <div className="main-container">
      <div className='header-container'>
        <h2>Join a Growing Community of Researchers</h2>
        <p>
          Collaborate with colleagues and read the latest publications 
          in your field. Sign up now!
        </p>
        <hr></hr>
      </div>
      <div className='signup-container'>
        <form onSubmit={handleSubmit}>
          <label id='first-name'>
            First Name:
            <input
              type="text"
              name="firstName"
              placeholder='First Name'
              value={formData.firstName}
              onChange={handleChange}
            />
          </label>
          <br />
          <label id='last-name'>
            Last Name:
            <input
              type="text"
              name="lastName"
              placeholder='Last Name'
              value={formData.lastName}
              onChange={handleChange}
            />
          </label>
          <br />
          <label id='county-region'>
            County/Region:
            <input
              type="text"
              name="region"
              placeholder='County/Region'
              value={formData.region}
              onChange={handleChange}
            />
          </label>
          <br />
          <label id='email'>
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
          <label id='password'>
            Password:
            <input
              type="password"
              name="password"
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
