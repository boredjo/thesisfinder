// /frontend/src/pages/PostPage.js
// Shows the contents of an individual post

import React from 'react';
import '../../styles/main.css';
import '../../styles/mainheader.css';
import './post-page.css';

const PostPage = () => {
  return (
    <div>
      <header className="main-header">
        <div className="left-section">
          <img className="thesisfinder-logo" src={require('../../assets/thesisfinderlogo.png')} alt="Thesis-Finder-Logo" />
          <button className="left-section-button">Home</button>
          <div className="button-selector"></div>
          <button className="left-section-button">Ideas</button>
        </div>
        <div className="middle-section">
          <input className="main-header-search" type="text" placeholder="Search for research ideas, sponsorships, people, etc." />
        </div>
        <div className="right-section">
          <img className="dark-mode-button" src={require('../../assets/darkmodeimage.png')} alt="Dark Mode" />
          <img className="notification-button" src={require('../../assets/notificationimage.png')} alt="Notification" />
          <img className="account-button" src={require('../../assets/avatar1.png')} alt="User Account" />
          <button className="header-submit-button">Submit</button>
        </div>
      </header>
      <main>
        <div id="tags">
          <ul>
            <li><a href="#">Placeholder Tag 1</a></li>
            <li><a href="#">Placeholder Tag 2</a></li>
            {/* Add framework for actual tags and replace href links */}
          </ul>
        </div>
        <div id="content">
          <article>
            <h1>Title</h1>
            <div className="metadata">
              {/* Add framework to replace with actual author and date */}
              <span className="author">Author(s): placeholder</span>
              <span className="date">Date Posted: </span>
            </div>
            <nav className="article-nav">
              {/* Toolbar for switching between statuses of our project */}
              <ul>
                <li><a href="#">Overview</a></li>
                <li><a href="#">Stats</a></li>
                <li><a href="#">Comments</a></li>
                <li><a href="#">More Info</a></li>
                <li><a href="#">Suggested Ideas</a></li>
                <li><a href="#">Research Papers</a></li>
                <li><a href="#">Sponsors</a></li>
              </ul>
            </nav>
            <section id="description">
              <h2>Description</h2>
              {/* This copypasta is just a placeholder to show that the description expands to show the whole <p> element. Feel free to delete it lol. */}
              <p>
                The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues.
                The 20 meter pacer test will begin in 30 seconds. Line up at the start.
                The running speed starts slowly but gets faster each minute after you hear this signal bodeboop.
                A single lap should be completed every time you hear this sound.
                Remember to run in a straight line and run as long as possible.
                The second time you fail to complete a lap before the sound, your test is over.
                The test will begin on the word start. On your mark, get ready… start!
              </p>
            </section>
            <section id="attachments">
              <h2>Attachments</h2>
              <div className="attachment-item">
                <img className="attachment-icon" src="../assets/researchdocimage.png" alt="Attachment Icon" />
                <div className="attachment-info">
                  {/* Add framework to replace this with actual doc name and size */}
                  <span className="attachment-name">attachment-name.pdf</span>
                  <span className="attachment-size">attachment-size</span>
                </div>
                <a href="#" className="attachment-download">Download</a>
              </div>
            </section>
            <section id="collaboration">
              <h2>Collaboration Preferences</h2>
              <ul className="collaboration-list">
                <li>Placeholder Collaborations</li>
                {/* Add collaborations checked out when submitting paper */}
              </ul>
            </section>
            <div id="action-buttons">
              {/* Add links to respective buttons */}
              <button type="button" id="claim-button">Claim</button>
              <button type="button" id="sponsor-button">Sponsor</button>
            </div>
          </article>
          <aside>
            <div id="claimed-by">
              <h3>Claimed by:</h3>
              <ul>
                <li><img src="../assets/avatar1.png" alt="Claimant Name" /><span>Claimant Name</span></li>
                {/* Additional claimants if any */}
                {/* Replace avatar1.png with actual user pfp */}
              </ul>
            </div>
            {/* If this page needs any extra sidebar content, this is where it goes. */}
          </aside>
        </div>
      </main>
    </div>
  );
};

export default PostPage; 