import React, { useState, useEffect } from 'react';
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
import PostPage from './pages/PostPage/PostPage';
import Account from './pages/Account/Account';
import Submit from './pages/Submit/Submit';
import ideas from './data/ideasData.js';
import { getAuthToken } from './utils/authService';
import { Button, Flex } from 'antd';

const App = () => {
  const [authToken, setAuthToken] = useState(getAuthToken());

  useEffect(() => {
    // Function to get authToken from localStorage
    const getStoredAuthToken = () => {
      const storedToken = localStorage.getItem('authToken');
      return storedToken ? storedToken : null;
    };

    // Set initial authToken from localStorage
    setAuthToken(getStoredAuthToken());

    // Set up an interval to check for changes in localStorage
    const intervalId = setInterval(() => {
      const storedToken = getStoredAuthToken();
      console.log(storedToken)
      if (storedToken !== authToken) {
        setAuthToken(storedToken);
      }
    }, 1000); // Poll every 1 second

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleLogin = (token) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);
  };

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
  };

  return (
    <div>
      <Router>
        {authToken ? (
          <AuthenticatedHeader onLogout={handleLogout} authToken={authToken} />
        ) : (
          <Header onLogin={handleLogin} />
        )}
        <Routes>
          <Route path="/" element={<LandingPage authToken={authToken} />} />
          {/* <Route path="/login" element={<Login onLogin={handleLogin} />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/avatar-upload" element={<AvatarUpload authToken={authToken} />} />
          <Route path="/explore-guest-search/:query?" element={<ExploreGuestSearch />} />
          <Route path="/home" element={<Home />} />
          <Route path="/post-page/:id" element={<PostPage ideas={ideas} authToken={authToken} />} />
          <Route path="/account" element={<Account authToken={authToken} />} />
          <Route path="/submit" element={<Submit authToken={authToken} />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
