import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FeaturesIdeas from '../../components/FeatureIdeas/FeatureIdeas';
import { getFeaturedIdeas, getToken } from '../../utils/api'; // Import getToken and getFeaturedIdeas functions
import '../../styles/main.css';
import '../../styles/index.css';
import './landing-page.css';

const LandingPage = ({ authToken }) => {
  const [featuredIdeas, setFeaturedIdeas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedIdeas = async () => {
      try {
        // Fetch token using the provided authToken
        // const tokenResponse = await getToken('username', 'password');
        // const token = tokenResponse.token; // Extract token from the response

        // Fetch featured ideas using the API function with the obtained token
        const response = await getFeaturedIdeas(authToken);
        setFeaturedIdeas(response.ideas || []); // Update state with fetched ideas
      } catch (error) {
        console.error('Error fetching featured ideas:', error);
      }
    };

    fetchFeaturedIdeas(); // Call the fetchFeaturedIdeas function
  }, [authToken]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const query = event.target.value;
      navigate(`/explore-guest-search/${query}`);
    }
  };

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
            />
          </div>
          <hr id='section-divider' />
          <h2>Featured Ideas</h2>
          <FeaturesIdeas ideas={featuredIdeas} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
