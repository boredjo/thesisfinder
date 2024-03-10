import React from 'react';
import { Link, useNavigate } from 'react-router-dom'

import FeaturesIdeas from '../../components/FeatureIdeas/FeatureIdeas';

import '../../styles/main.css';
import '../../styles/index.css';
import './landing-page.css';

const LandingPage = (props) => {
  const history = useNavigate();
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      history.push('/exploresearch')
    }
  }

  const ideas = [
    { 
      title: 'Idea 1',
      tags: ['tag1', 'tag2'],
      date: 'Jan 2024',
      author: 'Author 1',
      authorImage: require('../../assets/avatar1.png'),
    },
    { 
      title: 'Idea 2',
      tags: ['tag3', 'tag4'],
      date: 'Feb 2024',
      author: 'Author 2',
      authorImage: require('../../assets/avatar1.png'),
    },
    { 
      title: 'Idea 3',
      tags: ['tag5', 'tag6'],
      date: 'Mar 2024',
      author: 'Author 3',
      authorImage: require('../../assets/avatar1.png'),
    },
  ];

  return (
    <div className="content-container">
      <img src={require('../../assets/image1.jpg')} id="image-1" alt="Image 1" />
      <div>
        <div className="header-section">
          <h2>
            Connect with researchers, democratize science. Have a 
            lingering question or a debate? Your curiosity is more suited 
            for research. Need answers but lack a full-time researcher? 
            Pose questions and incentivize with prize money!
          </h2>
          <Link to="/signup">
            <button>Join for free</button>
            </Link>
        </div>
        <div className="main-section">
          <img src={require('../../assets/image2.png')} id="image-2" alt="Image 2" />
          <div className="explore-header">
            <h2>Explore Research Ideas</h2>
            <p>
              Discover a curated collection of research concepts. Access 
              diverse ideas and stay informed about the latest developments 
              in your field.
            </p>
            <input 
              type="text" 
              placeholder="Search Ideas" 
              id="search-ideas"
              onKeyPress={handleKeyPress}
            ></input>
          </div>
          <hr id='section-divider'></hr>
          <h2>Featured Ideas</h2>
          <FeaturesIdeas ideas={ideas} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
