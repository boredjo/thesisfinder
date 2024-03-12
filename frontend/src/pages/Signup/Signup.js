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
    work: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleContinue = (e) => {
    e.preventDefault();

    // Validation
    const isFormValid = Object.values(formData).every((value) => value.trim() !== '');
    if (!isFormValid) {
      alert('Please fill in all fields.');
      return;
    }

    // Save form data in local storage
    localStorage.setItem('signupFormData', JSON.stringify(formData));

    // Navigate to the avatar upload page
    navigate('/signup/avatar-upload');
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
          <label>
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
          <label>
            School/Work Location:
            <input
              type="text"
              name="work"
              placeholder='School/Work Location'
              value={formData.work}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
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
              placeholder='Password'
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
