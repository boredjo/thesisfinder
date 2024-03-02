// /frontend/src/pages/HomePage.js

import React from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

const HomePage = () => {
  return (
    <div className="home-container">
      <Header />

      <main className="main-content">
        <section className="hero-section">
          <h2>Connect with researchers, democratize science.</h2>
          <p>Have a lingering question or a debate? Your curiosity is more suited for research. Need answers but lack a full-time researcher? Pose questions and incentivize with prize money.</p>
          <button>Join for free</button>
        </section>

        {/* Add more sections/components as needed */}

      </main>

      <Footer />
    </div>
  );
};

export default HomePage; 
