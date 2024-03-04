// /frontend/src/pages/LoginPage.js
import React, { useState } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';


const LoginPage = () => {
  // State to manage input values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleLogin = (e) => {
    e.preventDefault();

    // Basic validation (you can add more)
    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }

    // Perform login logic (you can replace this with actual authentication)
    alert(`Logging in with username: ${username} and password: ${password}`);
  };

  return (
    <div className="login-container">
      <main className="main-content">
        <section className="login-section">
          <h2>Login to ThesisFinder</h2>
          {/* Login form */}
          <form onSubmit={handleLogin}>
            {/* Input fields for username and password */}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Login button */}
            <button type="submit">Log in</button>
          </form>
        </section>

        {/* Add more sections/components as needed */}

      </main>
    </div>
  );
};

export default LoginPage;
