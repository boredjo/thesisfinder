// ExploreGuestSearch.js

import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import FeaturesIdeas from '../../components/FeatureIdeas/FeatureIdeas';

import ideas from '../../data/ideasData.js';

import '../../styles/main.css';
import './explore-guest-search.css';

const ExploreGuestSearch = () => {
  const { query: initialQuery } = useParams();
  const [query, setQuery] = useState(initialQuery || '');
  const [sortBy, setSortBy] = useState('relevance'); // Default sort option
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    // Reset to the first page when query or sorting changes
    setCurrentPage(1);
  }, [query, sortBy]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const newQuery = event.target.value;
      setQuery(newQuery);
      navigate(`/explore-guest-search/${newQuery}`);
    }
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const filteredIdeas = ideas.filter((idea) =>
    idea.title.toLowerCase().includes(query.toLowerCase())
  );

  const itemsPerPage = 5;
  const numberOfPages = Math.ceil(filteredIdeas.length / itemsPerPage);

  // Ensure that currentPage stays within valid bounds
  useEffect(() => {
    if (currentPage > numberOfPages) {
      setCurrentPage(numberOfPages);
    }
  }, [currentPage, numberOfPages]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentIdeas = filteredIdeas.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = Array.from({ length: numberOfPages }, (_, index) => index + 1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

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
      <FeaturesIdeas ideas={currentIdeas} />
      <div className="pagination">
        <span onClick={handlePreviousPage}>&lt;</span>
        {pageNumbers.map((number) => (
          <span
            key={number}
            onClick={() => handlePageChange(number)}
            className={number === currentPage ? 'active' : ''}
          >
            {number}
          </span>
        ))}
        <span onClick={handleNextPage}>&gt;</span>
      </div>
    </div>
  );
};

export default ExploreGuestSearch;
