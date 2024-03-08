// /frontend/src/pages/LoginPage.js
import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }

    alert(`Logging in with username: ${username} and password: ${password}`);
  };

  return (
    <div className="login-container">
      <main className="main-content">
        <section className="login-section">
          <h2>Login to ThesisFinder</h2>
          <form onSubmit={handleLogin}>
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
            <button type="submit">Log in</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default LoginPage;
