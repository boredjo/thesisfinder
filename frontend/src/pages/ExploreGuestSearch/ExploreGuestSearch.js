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
  const [currentIdeas, setCurrentIdeas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(1); // Reset to the first page when query or sorting changes
  }, [query, sortBy]);

  useEffect(() => {
    let sortedIdeas = [...ideas];

    if (sortBy === 'newest') {
      sortedIdeas.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'oldest') {
      sortedIdeas.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    setCurrentIdeas(sortedIdeas);
  }, [sortBy]);

  const filteredIdeas = currentIdeas.filter(idea =>
    idea.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const numberOfPages = Math.ceil(filteredIdeas.length / itemsPerPage);

    // Ensure that currentPage stays within valid bounds
    if (currentPage > numberOfPages) {
      setCurrentPage(numberOfPages);
    }
  }, [currentPage, filteredIdeas]);

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentIdeasToShow = filteredIdeas.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = Array.from(
    { length: Math.ceil(filteredIdeas.length / itemsPerPage) },
    (_, index) => index + 1
  );

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      const newQuery = event.target.value;
      setQuery(newQuery);
      setCurrentPage(1); // Set currentPage to 1 when navigating
      navigate(`/explore-guest-search/${newQuery}`);
    }
  };

  const handleSortChange = event => {
    setSortBy(event.target.value);
  };

  return (
    <div>
      <div className='header-info'>
        <h2>Explore Research Ideas</h2>
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
              {/* Current sorting options */}
              <option value="relevance">Relevance</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>
      <FeaturesIdeas ideas={currentIdeasToShow} />
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
