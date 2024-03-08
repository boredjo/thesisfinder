// /frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import ExploreSearch from './pages/ExploreSearch/ExploreSearch';

import LoginModal from "react-login-modal-sm";

const App = () => {
  return (
    <div>
      <Router>
        <Header isAuthenticated={false} /> 
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/explore-search" element={<ExploreSearch />} />
        </Routes>
        {/* <Footer /> */}
      </Router> 
    </div>
  );
};

export default App;
