// /frontend/src/pages/Submit.js
// Page for submitting research ideas

import React from 'react';
import '../../styles/main.css';
import '../../styles/mainheader.css';
import './submit.css';

const Submit = () => {
  return (
    <main>
      <div className="submission-type-header">
        <img src={require('../../assets/lightbulb.png')} alt="Lightbulb Icon" />
        <p>Your Research Idea</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="submission-prompt">
          <div className="submission-option">
            <p>Title: </p>
            <input type="text" id="title" name="title" placeholder="Type your idea title here" value={formData.title} onChange={handleChange} />
          </div>
          <div className="submission-option">
            <p>Description: </p>
            <textarea id="description" name="description" placeholder="Type your idea description here" value={formData.description} onChange={handleChange}></textarea>
          </div>
          <div className="submission-option">
            <p style={{ display: 'inline-block' }}>Tags: </p>
            <select id="tags" name="tags">
              <option value="select">Tag1</option>
              <option value="public">Tag2</option>
              <option value="private">Tag3</option>
            </select>
          </div>
          <div className="submission-option">
            <p>Collaboration Preferences: <span className="collab-pref-info">(What do these mean?)</span></p>
            <div className="checkbox-list">
              <label className="checkbox-item">
                <input type="checkbox" name="feedback" id="feedback" />
                <span className="checkbox-label">Open to Feedback</span>
              </label>
              <label className="checkbox-item">
                <input type="checkbox" name="coresearcher" id="coresearcher" checked />
                <span className="checkbox-label">Co-Researcher Wanted</span>
              </label>
              <label className="checkbox-item">
                <input type="checkbox" name="contributions" id="contributions" />
                <span className="checkbox-label">Contributions Welcome</span>
              </label>
              <label className="checkbox-item">
                <input type="checkbox" name="collaboration" id="collaboration" />
                <span className="checkbox-label">Interdisciplinary Collaboration</span>
              </label>
            </div>
          </div>
          <div className="submission-option">
            <p>Attach Supporting Documents (optional): </p>
            <div className="attachment-item">
              <img className="attachment-icon" src={require('../../assets/researchdocimage.png')} alt="Document Icon" />
              <div className="attachment-info">
                <span className="attachment-name">attachment-name.pdf</span>
                <span className="attachment-size">attachment-size</span>
              </div>
              <a href="#" className="attachment-remove">Remove</a>
            </div>
          </div>
          <button className="add-attachment">Add another file</button>
          <div className="submission-option">
            <p style={{ display: 'inline-block' }}>Visibility Settings: </p>
            <select id="visibility" name="visibility" value={formData.visibility} onChange={handleChange}>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <button className="submit-idea">Submit Idea</button>
        </div>
      </div>
    </main>
  );
};

export default Submit; 