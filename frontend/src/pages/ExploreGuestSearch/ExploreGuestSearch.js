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
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Ideas"
          value={query}
          onKeyPress={handleKeyPress}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Link to={`/explore-guest-search/${query}`}>
          <button>Search</button>
        </Link>
      </div>
      <h2>Search Results for "{query}"</h2>
      <FeaturesIdeas ideas={filteredIdeas} />
    </div>
  );
};

export default ExploreGuestSearch;
