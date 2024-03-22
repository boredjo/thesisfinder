import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ideasData from '../../data/ideasData'; // Import the ideasData
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

  const generateUniqueId = () => {
    // Generate a unique ID
    return Math.random().toString(36).substr(2, 9);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newIdea = {
      id: generateUniqueId(), // Generate unique ID for the new idea
      title: formData.title,
      description: formData.description,
      collaboration: formData.collaboration,
      documents: formData.documents,
      visibility: formData.visibility,
      tags: [], // Add any additional fields as needed
      date: new Date().toLocaleDateString(), // Date of submission
      author: 'Anonymous', // Default author name
      authorImage: '', // Default author image
    };

    // Append the new idea to the ideasData
    ideasData.push(newIdea);

    // Store the updated ideasData to localStorage
    localStorage.setItem('ideasData', JSON.stringify(ideasData));

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
