import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './authenticated-header.css';

const AuthenticatedHeader = () => {
  const navigate = useNavigate();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const query = event.target.value;
      navigate(`/explore-guest-search/${query}`);
    }
  };

  return (
    <header>
      <div className='main-container'>
        <Link id='header-title' to="/">ThesisFinder</Link>
      </div>
      <div className='link-container'>
        <Link id='home-link' to="/home">Home</Link>
        <Link id='ideas-link' to='/explore-guest-search/e'>Ideas</Link>
      </div>
      <div className='search-bar-container'>
        <input 
          type="text" 
          placeholder="Search Ideas" 
          id="search-ideas"
          onKeyPress={handleKeyPress}
        ></input>
      </div>
      
    </header>
  );
};

export default AuthenticatedHeader;
