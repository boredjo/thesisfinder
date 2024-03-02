 // /frontend/src/components/Header.js

import React from 'react';
import './header.css'

const Header = () => {
  return (
    <header>
      <div classname="Brand">
        <h1>ThesisFinder</h1>
      </div>
      
      <nav>
        <a href="#">Log in</a>
        <a href="#">Join for free</a>
      </nav>
    </header>
  );
};

export default Header;
