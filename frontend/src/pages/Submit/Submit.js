import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitIdea } from '../../utils/api'; // Import the submitIdea function
import { getAuthToken } from '../../utils/authService';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import Select from 'react-select'; // Import react-select
import { tagsData } from '../../data/tagsData';

import '../../styles/main.css';
import '../../styles/mainheader.css';
import './submit.css';

const Submit = () => {
  const navigate = useNavigate();
  const authToken = getAuthToken();

  const [formData, setFormData] = useState({
    title: '',
    tags: [],
    description: '',
    feedback: false,
    coresearcher: false,
    contributions: false,
    collaboration: false,
    visibility: 'public',
    anonymous: false, // Add anonymous option
    attachment: null, // Store attachment file object
  });

  const [loading, setLoading] = useState(false); // State variable to track loading state

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleTagSelection = (selectedOptions) => {
    if (selectedOptions.length <= 5) {
      const selectedTags = selectedOptions.map(option => option.value);
      setFormData({
        ...formData,
        tags: selectedTags,
      });
    } else {
      // Display an alert or message to inform the user
      alert('You can only select up to 5 tags.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate mandatory fields
    if (!formData.title || !formData.description || !formData.visibility) {
      alert('Please fill in all mandatory fields.');
      return;
    }

    // Validate attachment format
    if (formData.attachment) {
      const allowedFormats = ['pdf', 'jpg', 'jpeg', 'png'];
      const attachmentFormat = formData.attachment.name.split('.').pop().toLowerCase();
      if (!allowedFormats.includes(attachmentFormat)) {
        alert('Supported document formats are .pdf, .jpg, .jpeg, and .png.');
        return;
      }
    }

    try {
      // Set loading state to true before making the API call
      setLoading(true);

      // Call the submitIdea API function to submit the idea data
      const response = await submitIdea(formData, authToken);

      // Extract the idea ID from the response
      const ideaId = response.id;

      // Redirect to the post page with the idea ID
      navigate(`/post-page/${ideaId}`);
    } catch (error) {
      console.error('Error submitting idea:', error);
      alert('An error occurred while submitting the idea. Please try again.');
    } finally {
      // Reset loading state to false after API call is complete
      setLoading(false);
    }
  };

  // Word count for description
  const descriptionWordCount = formData.description.trim().split(/\s+/).length;

  // Character count for title
  const titleCharacterCount = formData.title.length;

  return (
    <div className="submit-page">
      <div className="submit-container">
        <h1>Submit Research Idea</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Research Idea Title</label>
            <input type="text" id="title" name="title" value={formData.title} placeholder='75 Characters Min.' onChange={handleChange} required />
            <p>Character Count: {titleCharacterCount}</p>
          </div>
          <div className="form-group">
            <label htmlFor="description">Research Idea Description (Markdown supported)</label>
            <textarea id="description" name="description" value={formData.description} placeholder='200-300 Words' onChange={handleChange} required />
            <p>Word Count: {descriptionWordCount}</p>
          </div>
          <div className="form-group">
            <label htmlFor="tags">Select up to 5 Tags:</label>
            <Select
              id="tags"
              isMulti
              options={tagsData.map(tag => ({ value: tag, label: tag }))}
              value={formData.tags.map(tag => ({ value: tag, label: tag }))}
              onChange={handleTagSelection}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="anonymous">Anonymous
              <input type="checkbox" id="anonymous" name="anonymous" checked={formData.anonymous} onChange={handleChange} />
            </label>
          </div>
          {/* Conditional rendering of loading indicator */}
          {loading && <LoadingIndicator />}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Submit;
