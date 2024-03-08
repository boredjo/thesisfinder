// /frontend/src/pages/Login.js
import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import '../styles/main.css';
import '../styles/index.css';
import '../styles/login.css'; // Import the new CSS file

const Login = () => {
  return (
    <div className="content-container">
      <img src={require('../assets/login1.jpg')} id="image-1" alt="Login Page Image" />
      <div>
        <h2>Connect with researchers, democratize science.</h2>
        <p>
          Connect with researchers, democratize science. Have a 
          lingering question or a debate? Your curiosity is more suited 
          for research. Need answers but lack a full-time researcher? 
          Pose questions and incentivize with prize money.
        </p>
        <button>Join for free</button>
        <h2>Explore Research Ideas</h2>
        <p>
          Discover a curated collection of research concepts. Access 
          diverse ideas and stay informed about the latest developments 
          in your field.
        </p>
        <input type="text" placeholder="Search Ideas"></input>
        <h2>Features Ideas</h2>
      </div>
    </div>
  );
};

export default Login;
