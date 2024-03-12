// /frontend/src/pages/Home.js
// Main menu accessible to users

import React from 'react';
import '../../styles/main.css';
import '../../styles/mainheader.css';
import './home.css';

const Home = () => {
  return (
    <div>
      <header className="main-header">
        <div className="left-section">
          <img className="thesisfinder-logo" src={require('../../assets/thesisfinderlogo.png')} alt="Thesis-Finder-Logo" />
          <button className="left-section-button">Home</button>
          <div className="button-selector"></div>
          <button className="left-section-button">Ideas</button>
        </div>
        <div className="middle-section">
          <input className="main-header-search" type="text" placeholder="Search for research ideas, sponsorships, people, etc." />
        </div>
        <div className="right-section">
          <img className="dark-mode-button" src={require('../../assets/darkmodeimage.png')} alt="Dark Mode" />
          <img className="notification-button" src={require('../../assets/notificationimage.png')} alt="Notification" />
          <img className="account-button" src={require('../../assets/avatar1.png')} alt="User Account" />
          <button className="header-submit-button">Submit</button>
        </div>
      </header>
    </div>
  );
};

export default Home; 