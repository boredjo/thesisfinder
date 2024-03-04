// /frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './pages/Login';
import LoginPage from './pages/LoginPage'; // Import your login page component
import SignupPage from './pages/SignupPage'; // Import your signup page component

import LoginModal from "react-login-modal-sm";

const App = () => {
  return (
    <div>
      <Router>
        <Header isAuthenticated={false} /> {/* Pass the authentication status as a prop */}
        <Routes>
          <Route path="/" element={<Login />} /> {/* Default homepage route */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
