import React from 'react';
import { Link } from 'react-router-dom'

import '../../styles/main.css';
import '../../styles/index.css';
import './landing-page.css';

const LandingPage = () => {
  return (
    <div className="content-container">
      <img src={require('../../assets/image1.jpg')} id="image-1" alt="Image 1" />
      <div>
        <div className="header-section">
          <h2>
            Connect with researchers, democratize science. Have a 
            lingering question or a debate? Your curiosity is more suited 
            for research. Need answers but lack a full-time researcher? 
            Pose questions and incentivize with prize money
          </h2>
          <Link to="/signup">
            <button>Join for free</button>
            </Link>
        </div>
        <div className="main-section">
          <img src={require('../../assets/image2.png')} id="image-2" alt="Image 2" />
          <h2>Explore Research Ideas</h2>
          <p>
            Discover a curated collection of research concepts. Access 
            diverse ideas and stay informed about the latest developments 
            in your field.
          </p>
          <input type="text" placeholder="Search Ideas" id="search-ideas"></input>
          <h2>Features Ideas</h2>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
