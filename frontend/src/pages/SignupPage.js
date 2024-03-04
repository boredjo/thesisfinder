// /frontend/src/pages/SignupPage.js
import React, { useState } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import '../styles/main.css';
import '../styles/index.css';
import '../styles/signuppage.css';

const SignupPage = () => {
  // State to manage input values
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Function to handle form submission
  const handleSignup = (e) => {
    e.preventDefault();

    // Basic validation (you can replace this with actual user registration)
    if (!username || !email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Perform signup logic (you can replace this with actual user registration)
    alert(`Signing up with username: ${username}, email: ${email}, and password: ${password}`);
  };

  return (
    <div className="signup-container">
      <main className="main-content">
        <section className="signup-section">
          <h1 className="signup-header">Join a Growing Community of Researchers</h1>
          <p className="signup-subheader">Collaborate with colleagues and read the latest publications in your field. Sign up now!</p>
          {/* Signup form */}
          <form onSubmit={handleSignup}>
            {/* Input fields */}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {/* Button with call to action */}
            <button type="submit">Sign Up</button>
          </form>
        </section>
      </main>

    </div>
  );
};

export default SignupPage;
