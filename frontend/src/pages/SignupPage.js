// /frontend/src/pages/SignupPage.js
import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import '../styles/main.css';
import '../styles/index.css';

const SignupPage = () => {
  return (
    <div className="signup-container">
      <main className="main-content">
        <section className="signup-section">
          <h2>Join ThesisFinder for Free</h2>
          {/* Add your signup form here */}
          <form>
            {/* Input fields for username, email, password, etc. */}
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            {/* Signup button */}
            <button type="submit">Sign up</button>
          </form>
        </section>

        {/* Add more sections/components as needed */}

      </main>

    </div>
  );
};

export default SignupPage;
