// /frontend/src/pages/Login.js
/* 
  Login page
  This was formerly HomePage but I changed the name because the 
  home page fits better with the main menu users have access to
*/

import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import 'styles/main.css';
import 'styles/index.css';

const Login = () => {
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

export default Login; 
