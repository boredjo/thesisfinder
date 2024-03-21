// /frontend/src/pages/Account.js
// Account options page
// Accessible from home page

import React from 'react';
import '../../styles/main.css';
import '../../styles/mainheader.css';
import './account.css';

const Account = () => {
  return (
    <div>
      {/* Put authenticatedheader.js here */}
      {/* Top part with pfp, name, and description */}
      <div className="profile-header">
        {/* src path is a placeholder, replace with actual image data */}
        <img className="profile-image" src="../assets/avatar1.png" alt="Profile image" />
        <div className="profile-info">
          <h1>Name of Account</h1>
          <p>Description Placeholder</p>
          <button className="edit-btn">Edit</button>
        </div>
      </div>

      {/* Toolbar */}
      <nav className="profile-nav">
        <ul>
          <li><a href="#profile" className="active">Profile</a></li>
          <li><a href="#research-papers">Research Papers</a></li>
        </ul>
      </nav>

      {/* About me div */}
      <section className="about-me">
        <h2>About Me</h2>

        <div className="input-group">
          <label htmlFor="introduction">Introduction</label>
          <textarea id="introduction" placeholder="Introduce yourself and your research"></textarea>
        </div>

        <div className="input-group">
          <label htmlFor="disciplines">Disciplines</label>
          <select id="disciplines">
            <option value="">Enter or select disciplines</option>
            {/* Options would go here */}
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="skills">Skills and expertise</label>
          <input type="text" id="skills" placeholder="Enter or select skills and expertise" />
        </div>

        <div className="input-group">
          <label htmlFor="languages">Languages</label>
          <select id="languages">
            <option value="">Enter or select languages</option>
            {/* Options would go here */}
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email address" />
        </div>

        <div className="actions">
          <button className="cancel-btn">Cancel</button>
          <button className="save-btn">Save</button>
        </div>
      </section>
    </div>
  );
};

export default Account; 