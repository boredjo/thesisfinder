import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitIdea } from '../../utils/api'; // Import the submitIdea function
import { getAuthToken } from '../../utils/authService';

import '../../styles/main.css';
import '../../styles/mainheader.css';
import './submit.css';


const Submit = ({ }) => {
  const navigate = useNavigate();
  const authToken = getAuthToken();

  const [formData, setFormData] = useState({
    title: '',
    tags: [],
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'tags') {
      // Split the input value by commas to get individual tags
      const tagsArray = value.split(',').map(tag => tag.trim());
      setFormData({
        ...formData,
        [name]: tagsArray,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the submitIdea API function to submit the idea data
      await submitIdea(formData, authToken); // Replace 'tokentokentoken' with the actual token

      // Redirect to the home page after successful submission
      navigate('/');
    } catch (error) {
      console.error('Error submitting idea:', error);
      alert('An error occurred while submitting the idea. Please try again.');
    }
  };

  return (
    <div className="submit-container">
      <h1>Submit Research Idea</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Research Idea Title</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Research Idea Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Submit;
