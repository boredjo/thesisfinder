import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FeaturesIdeas from '../../components/FeatureIdeas/FeatureIdeas';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator'; // Import LoadingIndicator component
import { getFeaturedIdeas } from '../../utils/api';
import { tagsData } from '../../data/tagsData';
import Select from 'react-select';
import '../../styles/main.css';
import './explore-guest-search.css';

const ExploreGuestSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('query') || '';

  const [query, setQuery] = useState(initialQuery);
  const [selectedTags, setSelectedTags] = useState([]); // State to store selected tags
  const [ideas, setIdeas] = useState([]);
  const [filteredIdeas, setFilteredIdeas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust the number of items per page
  const [loading, setLoading] = useState(true); // State to track loading state

  useEffect(() => {
    const fetchFeaturedIdeas = async () => {
      try {
        const response = await getFeaturedIdeas(); // Fetch all featured ideas
        setIdeas(response.ideas || []); // Update state with fetched ideas
      } catch (error) {
        console.error('Error fetching featured ideas:', error);
      } finally {
        setLoading(false); // Set loading state to false when request completes
      }
    };

    fetchFeaturedIdeas(); // Call the fetchFeaturedIdeas function
  }, []);

  useEffect(() => {
    // Filter ideas based on the search query and selected tags
    let filtered = ideas;
    if (query) {
      filtered = filtered.filter(idea =>
        idea.title.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (selectedTags.length > 0) {
      filtered = filtered.filter(idea =>
        selectedTags.every(tag => idea.tags.includes(tag.value))
      );
    }
    setFilteredIdeas(filtered);
    setCurrentPage(1); // Reset to first page when filtering changes
  }, [query, selectedTags, ideas]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const searchQuery = event.target.value;
      navigate(`/explore-guest-search?query=${searchQuery}`);
      setQuery(searchQuery);
    }
  };

  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions || []);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentIdeasToShow = filteredIdeas.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredIdeas.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="explore-container">
      <div className="explore-header">
        <h2>Explore Research Ideas</h2>
        <p>
          Explore a curated collection of research concepts. Access diverse ideas 
          and stay informed about the latest developments in your field.
        </p>
      </div>
      <div className='search-container'>
        <input 
          type="text" 
          placeholder="Search Ideas" 
          id="search-bar"
          onKeyPress={handleKeyPress}
          defaultValue={query}
        />
      </div>
      <div className='tag-filter'>
        <label htmlFor="tag-select">Filter by Tag: </label>
        <Select
          id="tag-select"
          isMulti
          options={tagsData.map(tag => ({ value: tag, label: tag }))}
          value={selectedTags}
          onChange={handleTagChange}
        />
      </div>
      {loading ? ( // Show LoadingIndicator while loading
        <LoadingIndicator />
      ) : (
        <>
          <hr className="section-divider" />
          <h2>Showing results for "{query}"</h2>
          <FeaturesIdeas ideas={currentIdeasToShow} />
          <div className="pagination">
            {pageNumbers.map((number) => (
              <span
                key={number}
                onClick={() => handlePageChange(number)}
                className={number === currentPage ? 'active' : ''}
              >
                {number}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ExploreGuestSearch;
