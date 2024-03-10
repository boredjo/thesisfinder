// ExploreGuestSearch.js

import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import FeaturesIdeas from '../../components/FeatureIdeas/FeatureIdeas';

import ideas from '../../data/ideasData.js';

import '../../styles/main.css';
import './explore-guest-search.css';

const ExploreGuestSearch = () => {
  const { query: initialQuery } = useParams();
  const [query, setQuery] = useState(initialQuery || '');
  const [sortBy, setSortBy] = useState('relevance'); // Default sort option

  const navigate = useNavigate();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const newQuery = event.target.value;
      setQuery(newQuery);
      navigate(`/explore-guest-search/${newQuery}`);
    }
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    // You can apply sorting logic here based on the selected value (event.target.value)
  };

  const filteredIdeas = ideas.filter((idea) =>
    idea.title.toLowerCase().includes(query.toLowerCase())
  );

  // Apply sorting logic based on the selected value in the dropdown
  // You can extend this logic for other sorting options
  if (sortBy === 'newest') {
    filteredIdeas.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortBy === 'oldest') {
    filteredIdeas.sort((a, b) => new Date(a.date) - new Date(b.date));
  } // Add more sorting options as needed

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
      <div className='filter-container'>
        <div className="result-box">
          <h2>Showing results for "{query}"</h2>
          <div className="sort-container">
            <label htmlFor="sort-dropdown">Sort By:</label>
            <select
              id="sort-dropdown"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="relevance">Relevance</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              {/* Add more sorting options as needed */}
            </select>
          </div>
        </div>
      </div>
      <FeaturesIdeas ideas={filteredIdeas} />
    </div>
  );
};

export default ExploreGuestSearch;
