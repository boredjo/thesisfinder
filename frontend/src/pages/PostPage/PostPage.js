import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../../utils/api';
import '../../styles/main.css';
import '../../styles/mainheader.css';
import './post-page.css';

const PostPage = ({ ideas, authToken }) => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [claimedBy, setClaimedBy] = useState(null); // State to store the user who claimed the idea
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    documents: [],
    visibility: 'public',
  });

  const idea = ideas.find((idea) => idea.id === parseInt(id));

  useEffect(() => {
    // Load claimed by information from localStorage when component mounts
    const claimedByData = localStorage.getItem(`claimedBy_${id}`);
    if (claimedByData) {
      setClaimedBy(JSON.parse(claimedByData));
    }
  }, [id]);

  const handleClaim = async () => {
    setShowModal(true);
    // Fetch user information from the API using the authToken
    try {
      const userData = await getUser(authToken);
      setClaimedBy(userData.username); // Update claimedBy state with the username
      localStorage.setItem(`claimedBy_${id}`, JSON.stringify({ username: userData.username })); // Store claimed by information in localStorage
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDocumentChange = (e) => {
    const files = Array.from(e.target.files);
    const fileData = files.map((file) => ({
      name: file.name,
      type: file.type,
      data: URL.createObjectURL(file),
    }));
    setFormData({
      ...formData,
      documents: fileData,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Save form data to localStorage
    localStorage.setItem('claimFormData', JSON.stringify(formData));
    
    // Fetch user information from the API using the authToken
    try {
      const userData = await getUser(authToken);
      setClaimedBy(userData.username); // Update claimedBy state with the username
      localStorage.setItem(`claimedBy_${id}`, JSON.stringify({ username: userData.user })); // Store claimed by information in localStorage
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  
    // Clear form fields
    setFormData({
      title: '',
      description: '',
      documents: [],
      visibility: 'public',
    });
    
    // Close modal
    setShowModal(false);
  };
  

  return (
    <div>
      {/* Main content */}
      <main>
        <div id="tags">
          <ul>
            {idea.tags.map((tag, index) => (
              <li key={index}><a href="#">{tag}</a></li>
            ))}
          </ul>
        </div>
        <div id="content">
          <article>
            <h1>{idea.title}</h1>
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
              {/* Display the claimed by information */}
              {claimedBy ? (
                <li>
                  <img src={require('../../assets/avatar1.png')} id="Claimant Name" alt="Claimant Name" />
                  <span>{claimedBy.username}</span>
                </li>
              ) : (
                <li>Not claimed</li>
              )}
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
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
              </div>
              <div className="input-group">
                <label htmlFor="documents">Attach Supporting Documents (PDF)</label>
                <input type="file" id="documents" name="documents" accept=".pdf" multiple onChange={handleDocumentChange} />
              </div>
              <div className="input-group">
                <label htmlFor="visibility">Visibility Settings</label>
                <select id="visibility" name="visibility" value={formData.visibility} onChange={handleChange}>
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
