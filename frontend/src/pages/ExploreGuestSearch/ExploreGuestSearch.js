import React from 'react';
import { useParams } from 'react-router-dom';

import FeaturesIdeas from '../../components/FeatureIdeas/FeatureIdeas';

import ideas from '../../data/ideasData.js';

import '../../styles/main.css';
import './explore-guest-search.css';

const ExploreGuestSearch = () => {
  // Access the search query from the URL params using useParams
  const { query } = useParams();

  // Assuming 'ideas' is a global variable, you can use it here
  const filteredIdeas = ideas.filter((idea) =>
    idea.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h2>Search Results for "{query}"</h2>
      <FeaturesIdeas ideas={filteredIdeas} />
    </div>
  );
};

export default ExploreGuestSearch;
