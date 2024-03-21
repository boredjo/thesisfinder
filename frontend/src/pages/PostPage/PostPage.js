import React from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/main.css';
import '../../styles/mainheader.css';
import './post-page.css';

const PostPage = ({ ideas }) => {
  // Retrieve the id parameter from the URL
  const { id } = useParams();

  // Find the idea with the matching id
  const idea = ideas.find((idea) => idea.id === parseInt(id));

  return (
    <div>
      {/* Main content */}
      <main>
        <div id="tags">
          <ul>
            {/* Map through the tags and render each one */}
            {idea.tags.map((tag, index) => (
              <li key={index}><a href="#">{tag}</a></li>
            ))}
          </ul>
        </div>
        <div id="content">
          <article>
            {/* Idea title */}
            <h1>{idea.title}</h1>
            {/* Metadata */}
            <div className="metadata">
              <span className="author">Author(s): {idea.author}</span>
              <span className="date">Date Posted: {idea.date}</span>
            </div>
            <nav className="article-nav">
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
              <p>{idea.description}</p>
            </section>
            <section id="attachments">
              <h2>Attachments</h2>
              <div className="attachment-item">
                <img className="attachment-icon" src="../assets/researchdocimage.png" alt="Attachment Icon" />
                <div className="attachment-info">
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
              </ul>
            </section>
            <div id="action-buttons">
              <button type="button" id="claim-button">Claim</button>
              <button type="button" id="sponsor-button">Sponsor</button>
            </div>
          </article>
          <aside>
            <div id="claimed-by">
              <h3>Claimed by:</h3>
              <ul>
                <li><img src="../assets/avatar1.png" alt="Claimant Name" /><span>Claimant Name</span></li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default PostPage;
