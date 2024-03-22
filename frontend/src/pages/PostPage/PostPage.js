import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/main.css';
import '../../styles/mainheader.css';
import './post-page.css';

const PostPage = ({ ideas, authToken }) => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);

  const idea = ideas.find((idea) => idea.id === parseInt(id));

  const handleClaim = () => {
    // Logic to handle claiming the idea
    // Show the modal for uploading papers
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
                {/* Conditionally render the claim and sponsor buttons */}
                {authToken && (
                  <>
                    <li><a href="#">Sponsors</a></li>
                    <li><a href="#" onClick={handleClaim}>Claim</a></li>
                  </>
                )}
              </ul>
            </nav>
            <section id="description">
              <h2>Description</h2>
              <p>{idea.description}</p>
            </section>
            <section id="attachments">
              <h2>Attachments</h2>
              <div className="attachment-item">
                <img className="attachment-icon" src={require('../../assets/researchdocimage.png')} id="Attachment Icon" alt="Attachment Icon" />
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
            {/* Action buttons */}
            <div id="action-buttons">
              {authToken && (
                <>
                  <button type="button" id="claim-button" onClick={handleClaim}>Claim</button>
                  <button type="button" id="sponsor-button">Sponsor</button>
                </>
              )}
            </div>
          </article>
          <aside>
            <div id="claimed-by">
              <h3>Claimed by:</h3>
              <ul>
                <li><img src={require('../../assets/avatar1.png')} id="Claimant Name" alt="Claimant Name" /><span>Claimant Name</span></li>
              </ul>
            </div>
          </aside>
        </div>
      </main>

      {/* Modal for uploading papers */}
      {showModal && (
        <div className="modal display-block">
          <section className="modal-main">
            <h2>Upload Paper</h2>
            <form>
              {/* Title input */}
              <div className="input-group">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" />
              </div>
              {/* Description input */}
              <div className="input-group">
                <label htmlFor="description">Description</label>
                <textarea id="description"></textarea>
              </div>
              {/* Attach supporting documents input */}
              <div className="input-group">
                <label htmlFor="documents">Attach Supporting Documents (PDF)</label>
                <input type="file" id="documents" accept=".pdf" multiple />
              </div>
              {/* Visibility settings input */}
              <div className="input-group">
                <label htmlFor="visibility">Visibility Settings</label>
                <select id="visibility">
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
              <div className="actions">
                <button type="submit" className="save-btn">Submit</button>
                <button type="button" className="cancel-btn" onClick={handleCloseModal}>Cancel</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};

export default PostPage;
