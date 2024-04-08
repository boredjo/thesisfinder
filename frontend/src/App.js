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
import PostPage from './pages/PostPage/PostPage'; // Import PostPage component
import Account from './pages/Account/Account.js';

import ideas from './data/ideasData.js'

import { getAuthToken } from './utils/authService';

const App = () => {
  const authToken = getAuthToken();
  console.log(authToken)

  return (
    <div>
      <Router>
        {authToken ? <AuthenticatedHeader /> : <Header />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/avatar-upload" element={<AvatarUpload />} />
          <Route path="/explore-guest-search/:query" element={<ExploreGuestSearch />} />
          <Route path="/home" element={<Home />} />
          {/* Route for individual post pages */}
          <Route path="/post-page/:id" element={<PostPage ideas={ideas} authToken={authToken} />} />
          <Route path="/account" element={<Account />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;