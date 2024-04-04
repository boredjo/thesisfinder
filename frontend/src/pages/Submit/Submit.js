import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitIdea } from '../../utils/api'; // Import the submitIdea function
import { getAuthToken } from '../../utils/authService';

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
    attachment: null, // Store attachment file object
  });

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

  const handleAttachmentChange = (e) => {
    // Assuming only one file is allowed to be attached
    const file = e.target.files[0];
    setFormData({
      ...formData,
      attachment: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate mandatory fields
    if (!formData.title || !formData.description || !formData.visibility) {
      alert('Please fill in all mandatory fields.');
      return;
    }

    // Validate description word count
    const descriptionWordCount = formData.description.trim().split(/\s+/).length;
    if (descriptionWordCount < 200 || descriptionWordCount > 300) {
      alert('Description must be between 200 and 300 words.');
      return;
    }

    // Validate title and description character count
    if (formData.title.length < 75 || formData.description.length < 75) {
      alert('Title and Description must be at least 75 characters long.');
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
      // Call the submitIdea API function to submit the idea data
      await submitIdea(formData, authToken);

      // Redirect to the home page after successful submission
      navigate('/');
    } catch (error) {
      console.error('Error submitting idea:', error);
      alert('An error occurred while submitting the idea. Please try again.');
    }
  };

  return (
    <div className="submit-page">
      <div className="submit-container">
        <h1>Submit Research Idea</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Research Idea Title</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Research Idea Description (Markdown supported)</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Collaboration Preferences:</label>
            <label>
              <input type="checkbox" name="feedback" checked={formData.feedback} onChange={handleChange} />
              Open to Feedback
            </label>
            <label>
              <input type="checkbox" name="coresearcher" checked={formData.coresearcher} onChange={handleChange} />
              Co-Researcher Wanted
            </label>
            <label>
              <input type="checkbox" name="contributions" checked={formData.contributions} onChange={handleChange} />
              Contributions Welcome
            </label>
            <label>
              <input type="checkbox" name="collaboration" checked={formData.collaboration} onChange={handleChange} />
              Interdisciplinary Collaboration
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="visibility">Visibility Settings:</label>
            <select id="visibility" name="visibility" value={formData.visibility} onChange={handleChange} required>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="attachment">Attach Supporting Documents (optional):</label>
            <input type="file" id="attachment" name="attachment" onChange={handleAttachmentChange} accept=".pdf,.jpg,.jpeg,.png" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Submit;
