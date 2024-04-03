// App.js
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

const App = () => {
  const [authToken, setAuthToken] = useState(getAuthToken());

  // Listen for changes in local storage
  useEffect(() => {
    const handleStorageChange = () => {
      setAuthToken(getAuthToken());
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
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
          <AuthenticatedHeader onLogout={handleLogout} />
        ) : (
          <Header onLogin={handleLogin} />
        )}
        <Routes>
          <Route path="/" element={<LandingPage authToken={authToken} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/avatar-upload" element={<AvatarUpload authToken={authToken} />} />
          <Route path="/explore-guest-search/:query?" element={<ExploreGuestSearch />} />
          <Route path="/home" element={<Home />} />
          <Route path="/post-page/:id" element={<PostPage ideas={ideas} authToken={authToken} />} />
          <Route path="/account" element={<Account />} />
          <Route path="/submit" element={<Submit authToken={authToken} />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
