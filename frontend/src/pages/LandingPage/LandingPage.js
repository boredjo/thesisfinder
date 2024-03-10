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
      history(`/explore-guest-search/${event.target.value}`)
    }
  }

  const ideas = [
    { 
      title: 'Exploring Sustainable Urban Agriculture',
      tags: [
        'Urban Agriculture', 
        'Sustainability', 
        'Food Security',
        'City Planning',
      ],
      date: 'Jan 2024',
      author: 'Emma Thompson',
      authorImage: require('../../assets/avatar1.png'),
    },
    { 
      title: 'Unlocking the Secrets of Dark Matter',
      tags: [
        'Astrophysics', 
        'Dark Matter', 
        'Cosmology', 
        'Particle Physics'
      ],
      date: 'Jan 2024',
      author: 'Adrian Martinez',
      authorImage: require('../../assets/avatar1.png'),
    },
    { 
      title: 'Revolutionizing Renewable Energy Storage',
      tags: [
        'Renewable Energy', 
        'Energy Storage',
        'Sustainability',
      ],
      date: 'Jan 2024',
      author: 'Olivia Johnson',
      authorImage: require('../../assets/avatar1.png'),
    },
    { 
      title: 'Cognitive Enhancements through Neurofeedback',
      tags: [
        'Neurofeedback', 
        'Brain Health',
        'Psychology',
      ],
      date: 'Jan 2024',
      author: 'Ethan Davis',
      authorImage: require('../../assets/avatar1.png'),
    },
    { 
      title: 'Biodiversity Conversation in Urban Environments',
      tags: [
        'Biodiversity', 
        'Conversation',
        'Urban Ecology',
        'Environmental Science',
      ],
      date: 'Jan 2024',
      author: 'Isabella Rodriguez',
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
