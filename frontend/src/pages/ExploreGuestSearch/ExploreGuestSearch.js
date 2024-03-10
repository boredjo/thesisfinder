import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import FeaturesIdeas from '../../components/FeatureIdeas/FeatureIdeas';

import ideas from '../../data/ideasData.js';

import '../../styles/main.css';
import './explore-guest-search.css';

const ExploreGuestSearch = () => {
  const { query: initialQuery } = useParams();
  const [query, setQuery] = useState(initialQuery || '');

  const navigate = useNavigate();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const newQuery = event.target.value;
      setQuery(newQuery);
      navigate(`/explore-guest-search/${newQuery}`);
    }
  };

  const filteredIdeas = ideas.filter((idea) =>
    idea.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className='header-info'>
        <h2>Explore Research Ideas</h2>
        <p>
          Explore Research Ideas With a repository boasting a multitude of 
          scientific insights, our platform is your gateway to a plethora 
          of research ideas. Uncover a diverse collection of topics, 
          connecting you with a thriving community of researchers. Utilize 
          advanced search functionalities employing AND, OR, NOT, "" and 
          () to tailor your exploration. Join us in accessing the world of 
          science and fostering collaboration.
        </p>
      </div>
      <div className="search-container">
        <input
          id="search-bar"
          type="text"
          placeholder="Search Ideas"
          value={query}
          onKeyPress={handleKeyPress}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <h2>Search Results for "{query}"</h2>
      <FeaturesIdeas ideas={filteredIdeas} />
    </div>
  );
};

export default ExploreGuestSearch;
