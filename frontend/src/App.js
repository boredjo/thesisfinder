import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import AuthenticatedHeader from './components/AuthenticatedHeader/AuthenticatedHeader';
import Footer from './components/Footer/Footer';

import LandingPage from './pages/LandingPage/LandingPage';
import ExploreGuestSearch from './pages/ExploreGuestSearch/ExploreGuestSearch';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import AvatarUpload from './pages/AvatarUpload/AvatarUpload';
import Home from './pages/Home/Home';

import { getAuthToken } from './utils/authService';

// import LoginModal from "react-login-modal-sm";

const App = () => {
  const authToken = getAuthToken();

  return (
    <div>
      <Router>
        {authToken ? <AuthenticatedHeader /> : <Header /> } 
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="signup/avatar-upload" element={<AvatarUpload />} />
          <Route path="/explore-guest-search/:query" element={<ExploreGuestSearch />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        <Footer />
      </Router> 
    </div>
  );
};

export default App;
