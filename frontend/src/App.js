import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import LandingPage from './pages/LandingPage/LandingPage';
import ExploreSearch from './pages/ExploreSearch/ExploreSearch';
import ExploreGuestSearch from './pages/ExploreGuestSearch/ExploreGuestSearch';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import AvatarUpload from './pages/AvatarUpload/AvatarUpload';

// import LoginModal from "react-login-modal-sm";

const App = () => {
  return (
    <div>
      <Router>
        <Header isAuthenticated={false} /> 
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="signup/avatar-upload" element={<AvatarUpload />} />
          <Route path="/explore-guest-search/:query" element={<ExploreGuestSearch />} />
        </Routes>
        <Footer />
      </Router> 
    </div>
  );
};

export default App;
