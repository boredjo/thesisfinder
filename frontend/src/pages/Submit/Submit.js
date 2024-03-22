import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/main.css';
import '../../styles/mainheader.css';
import './submit.css';

const Submit = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    collaboration: {
      feedback: false,
      coResearcher: false,
      contributions: false,
      interdisciplinary: false,
    },
    documents: [],
    visibility: 'public',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData({
        ...formData,
        collaboration: {
          ...formData.collaboration,
          [name]: checked,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleDocumentChange = (e) => {
    const files = Array.from(e.target.files);
    const fileData = files.map((file) => ({
      name: file.name,
      type: file.type,
      data: URL.createObjectURL(file),
    }));
    setFormData({
      ...formData,
      documents: [...formData.documents, ...fileData], // Append new documents to the existing list
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Serialize formData to exclude non-serializable data
    const serializableFormData = {
      title: formData.title,
      description: formData.description,
      collaboration: formData.collaboration,
      documents: formData.documents,
      visibility: formData.visibility,
    };
  
    // Retrieve existing data from localStorage or initialize as empty array if it doesn't exist
    const existingDataJSON = localStorage.getItem('submitFormData');
    let existingData = [];
  
    if (existingDataJSON) {
      try {
        existingData = JSON.parse(existingDataJSON);
        if (!Array.isArray(existingData)) {
          // If existingData is not an array, initialize as an empty array
          existingData = [];
        }
      } catch (error) {
        console.error('Error parsing existingData from localStorage:', error);
        existingData = [];
      }
    }
  
    // Append the new submission to the existing data
    const newData = [...existingData, serializableFormData];
  
    // Store the updated data back to localStorage
    localStorage.setItem('submitFormData', JSON.stringify(newData));
  
    // Navigate back to "/home"
    navigate('/');
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
          <label htmlFor="description">Research Idea Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Collaboration Preferences</label>
          <div>
            <input type="checkbox" id="feedback" name="feedback" checked={formData.collaboration.feedback} onChange={handleChange} />
            <label htmlFor="feedback">Open to Feedback</label>
          </div>
          <div>
            <input type="checkbox" id="coResearcher" name="coResearcher" checked={formData.collaboration.coResearcher} onChange={handleChange} />
            <label htmlFor="coResearcher">Co-Researcher Wanted</label>
          </div>
          <div>
            <input type="checkbox" id="contributions" name="contributions" checked={formData.collaboration.contributions} onChange={handleChange} />
            <label htmlFor="contributions">Contributions Welcome</label>
          </div>
          <div>
            <input type="checkbox" id="interdisciplinary" name="interdisciplinary" checked={formData.collaboration.interdisciplinary} onChange={handleChange} />
            <label htmlFor="interdisciplinary">Interdisciplinary Collaboration</label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="documents">Attach Supporting Documents (PDF)</label>
          <input type="file" id="documents" name="documents" accept=".pdf" multiple onChange={handleDocumentChange} />
        </div>
        <div className="form-group">
          <label htmlFor="visibility">Visibility Settings</label>
          <select id="visibility" name="visibility" value={formData.visibility} onChange={handleChange}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Submit;
