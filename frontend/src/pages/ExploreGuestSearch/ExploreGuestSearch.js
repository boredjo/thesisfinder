import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import FeaturesIdeas from '../../components/FeatureIdeas/FeatureIdeas';
import ideasData from '../../data/ideasData.js';
import '../../styles/main.css';
import './explore-guest-search.css';

const ExploreGuestSearch = () => {
  const { query: initialQuery } = useParams();
  const [query, setQuery] = useState(initialQuery || '');
  const [sortBy, setSortBy] = useState('relevance'); // Default sort option
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredIdeas, setFilteredIdeas] = useState(ideasData); // Updated state

  useEffect(() => {
    setCurrentPage(1); // Reset to the first page when query or sorting changes
  }, [query, sortBy]);

  useEffect(() => {
    let sortedIdeas = [...filteredIdeas]; // Use the filteredIdeas instead of ideasData

    if (sortBy === 'newest') {
      sortedIdeas.sort((a, b) => new Date(b.date_posted) - new Date(a.date_posted));
    } else if (sortBy === 'oldest') {
      sortedIdeas.sort((a, b) => new Date(a.date_posted) - new Date(b.date_posted));
    }

    setFilteredIdeas(sortedIdeas); // Update filteredIdeas state
  }, [sortBy]);

  useEffect(() => {
    const filteredResults = ideasData.filter(idea =>
      idea.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredIdeas(filteredResults);
    setCurrentPage(1); // Reset to the first page when query changes
  }, [query]);  

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

  const handleSortChange = event => {
    setSortBy(event.target.value);
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
