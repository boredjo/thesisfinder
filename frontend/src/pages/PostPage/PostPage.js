// Import React and other necessary libraries
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUser, getIdeaDetails, getClaimFromQuestion } from '../../utils/api';
import { getSponsorshipsForIdeas } from '../../utils/api';
import { claimIdea } from '../../utils/api';
import { sponsorIdea } from '../../utils/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import '../../styles/main.css';
import '../../styles/mainheader.css';
import './post-page.css';

// Define the PostPage component
const PostPage = ({ authToken }) => {
  // Retrieve the idea ID from the URL params
  const { id } = useParams();
  
  // Define state variables
  const [idea, setIdea] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSponsorModal, setShowSponsorModal] = useState(false);
  const [claimedBy, setClaimedBy] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    documents: [],
    visibility: 'public',
  });
  const [sponsorFormData, setSponsorFormData] = useState({
    amount: '',
    purpose: '',
    duration: '',
  });  
  const [selectedTab, setSelectedTab] = useState('overview');
  const [researchPapers, setResearchPapers] = useState([]);
  const [sponsors, setSponsors] = useState([]);

  // Fetch idea details from the API when component mounts or ID changes
  useEffect(() => {
    const fetchIdeaDetails = async () => {
      try {
        const response = await getIdeaDetails(id, authToken);
        setIdea(response);
      } catch (error) {
        console.error('Error fetching idea details:', error);
      }
    };

    fetchIdeaDetails();
  }, [id, authToken]);

  // Fetch claims related to the question when component mounts or ID changes
  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await getClaimFromQuestion(id);
        setClaimedBy(response);
      } catch (error) {
        console.error('Error fetching claims:', error);
      }
    };

    fetchClaims();
  }, [id]);

  // Fetch research papers when the "Research Papers" tab is selected
  useEffect(() => {
    const fetchResearchPapers = async () => {
      try {
        const response = await getClaimFromQuestion(id);
        setResearchPapers(response.claims);
      } catch (error) {
        console.error('Error fetching research papers:', error);
      }
    };

    if (selectedTab === 'research-papers') {
      fetchResearchPapers();
    }
  }, [id, selectedTab]);

  // Fetch sponsors when the "Sponsors" tab is selected
  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await getSponsorshipsForIdeas(id);
        setSponsors(response);
      } catch (error) {
        console.error('Error fetching sponsors:', error);
      }
    };

    if (selectedTab === 'sponsors') {
      fetchSponsors();
    }
  }, [id, selectedTab]);

  // Function to handle claiming the idea
  const handleClaim = async () => {
    if (!showModal) {
      setShowModal(true);
      try {
        const userData = await getUser(authToken);
        setClaimedBy(userData.username);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  // Function to format date as "Month Day, Year" (e.g., "January 1, 2024")
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to handle opening the sponsor modal
  const handleSponsorModalOpen = () => {
    setShowSponsorModal(true);
  };

  // Function to handle closing the sponsor modal
  const handleSponsorModalClose = () => {
    setShowSponsorModal(false);
  };

  // Function to handle closing the claim modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle document uploads
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

  // Function to handle claim submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await claimIdea(id, authToken);

      if (response.success) {
        const userData = await getUser(authToken);
        setClaimedBy(userData.username);

        setFormData({
          title: '',
          description: '',
          documents: [],
          visibility: 'public',
        });
      } else {
        console.error('Failed to claim idea:', response.error);
      }
    } catch (error) {
      console.error('Error claiming idea:', error);
    } finally {
      setShowModal(false);
    }
  };

  // Function to handle sponsor submission
  const handleSponsorSubmit = async (e) => {
    e.preventDefault();

    // Validate sponsor form data
    if (validateSponsorFormData()) {
      try {
        // Construct the sponsor data object in the required format
        const sponsorData = {
          idea: id, // Assuming id is the idea ID
          amount: sponsorFormData.amount,
          description: sponsorFormData.purpose, // Assuming 'purpose' is the description
          deadline: sponsorFormData.duration, // Assuming 'duration' is the deadline
        };

        // Make the sponsor idea request
        const response = await sponsorIdea(sponsorData, authToken);

        if (response.success) {
          console.log('Sponsorship successful:', response.message);
        } else {
          console.error('Failed to sponsor idea:', response.error);
        }
      } catch (error) {
        console.error('Error sponsoring idea:', error);
      } finally {
        setShowSponsorModal(false);
      }
    }
  };

  // Function to validate sponsor form data
  const validateSponsorFormData = () => {
    // Validate amount
    if (!(/^\d+(\.\d{1,2})?$/.test(sponsorFormData.amount) && parseFloat(sponsorFormData.amount) >= 100 && parseFloat(sponsorFormData.amount) <= 5000)) {
      alert('Invalid amount. Amount must be between $100.00 and $5000.00');
      return false;
    }

    // Validate deadline format
    if (!(/^\d{4}-\d{2}-\d{2}$/.test(sponsorFormData.duration))) {
      alert('Invalid deadline format. Please use the format YYYY-MM-DD');
      return false;
    }

    return true;
  };

 // Function to handle sponsor form input changes
  const handleSponsorFormChange = (e) => {
    const { name, value } = e.target;

    // Check if the input is for the duration field
    if (name === "duration") {
      // Parse the input value into a date object
      const date = new Date(value);

      // Increment the date by 1 day
      date.setDate(date.getDate() - 1);

      // Format the date into yyyy-mm-dd format
      const formattedDate = date.toISOString().split('T')[0];

      console.log(formattedDate)

      // Update the state with the adjusted date
      setSponsorFormData({
        ...sponsorFormData,
        [name]: formattedDate,
      });
    } else {
      // For other inputs, update the state directly
      setSponsorFormData({
        ...sponsorFormData,
        [name]: value,
      });
    }
  };

  // Function to handle sponsor document uploads
  const handleSponsorDocumentChange = (e) => {
    const files = Array.from(e.target.files);
    const fileData = files.map((file) => ({
      name: file.name,
      type: file.type,
      data: URL.createObjectURL(file),
    }));
    setSponsorFormData({
      ...sponsorFormData,
      documents: fileData,
    });
  };

// <<<<<<< HEAD
  return (
    <div>
      <main>
        <div id="tags">
          {idea && idea.tags && (
            <div>
              {idea.tags.map((tag, index) => (
                <div key={index}>
                  <a href="#" className="tag">{tag}</a>
                </div>
              ))}
            </div>
          )}
        </div>
        <div id="content">
          <article>
            {idea && (
              <>
                <h1>{idea.title}</h1>
                <div className="metadata">
                  <span className="author">Author(s): {idea.author}</span>
                  <span className="date">Date Posted: {idea.date}</span>
                </div>
                <nav className="article-nav">
                  <ul>
                    <li><a href="#" onClick={() => setSelectedTab('overview')}>Overview</a></li>
                    {/* <li><a href="#" onClick={() => setSelectedTab('comments')}>Comments</a></li> */}
                    <li><a href="#" onClick={() => setSelectedTab('research-papers')}>Research Papers</a></li>
                    {/* {authToken && (
                      <> */}
                        <li><a href="#" onClick={() => setSelectedTab('sponsors')}>Sponsors</a></li>
                      {/* </>
                    )} */}
                  </ul>
                </nav>
                {selectedTab === 'overview' && (
                  <>
                    <section id="description">
                      <h2>Description</h2>
                      <p>{idea.description}</p>
                    </section>
                    {/* <section id="attachments">
                      <h2>Attachments</h2>
                      <div className="attachment-item">
                        <img className="attachment-icon" src={require('../../assets/researchdocimage.png')} id="Attachment Icon" alt="Attachment Icon" />
                        <div className="attachment-info">
                          <span className="attachment-name">attachment-name.pdf</span>
                          <span className="attachment-size">attachment-size</span>
                        </div>
                        <a href="#" className="attachment-download">Download</a>
                      </div>
                    </section> */}
                    {/* <section id="collaboration">
                      <h2>Collaboration Preferences</h2>
                      <ul className="collaboration-list">
                        <li>Placeholder Collaborations</li>
                      </ul>
                    </section> */}
                    <div id="action-buttons">
                      {authToken && (
                        <>
                          <button type="button" id="claim-button" onClick={handleClaim}>I Am Researching This</button>
                          <button type="button" id="sponsor-button" onClick={handleSponsorModalOpen}>Sponsor</button>
                        </>
                      )}
                    </div>
                  </>
                )}
                {/* {selectedTab === 'comments' && (
                  <section id="comments">
                    <h2>Comments</h2>
                  </section>
                )} */}
                {selectedTab === 'research-papers' && (
                  <section id="research-papers">
                    <h2>Research Papers</h2>
                    {researchPapers.length > 0 ? (
                      <div className="research-papers-container">
                        {researchPapers.map((paper, index) => (
                          <div key={index} className="research-paper-box">
                            <h3>Author: {paper.author}</h3>
                            <p>Date Posted: {paper.date_posted}</p>
                            {paper.attachments.length > 0 && (
                              <div className="attachment-item">
                                <img
                                  className="attachment-icon"
                                  src={require('../../assets/researchdocimage.png')}
                                  id="Attachment Icon"
                                  alt="Attachment Icon"
                                />
                                <div className="attachment-info">
                                  <span className="attachment-name">{paper.attachments[0].name}</span>
                                  <span className="attachment-size">{paper.attachments[0].size}</span>
                                </div>
                                <a href="#" className="attachment-download">
                                  Download
                                </a>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No research papers available</p>
                    )}
                  </section>
                )}
                {selectedTab === 'sponsors' && (
                  <section id="sponsors">
                    <h2>Sponsors</h2>
                    {sponsors && sponsors.sponsors && sponsors.sponsors.length > 0 ? (
                      <div className="sponsors-container">
                        {sponsors.sponsors.map((sponsor, index) => (
                          <div key={index} className="sponsor-box">
                            <h3>Author: {sponsor.author}</h3>
                            <p>Date Posted: {formatDate(sponsor.date_posted)}</p>
                            <p>Amount: {sponsor.amount}</p>
                            <p>Deadline: {formatDate(sponsor.deadline)}</p>
                            {/* Add more sponsor details here */}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No sponsors available</p>
                    )}
                  </section>
                )}
              </>
            )}
          </article>
        </div>
      </main>

      {/* Modal for uploading papers */}
      {showModal && (
        <div className="modal display-block">
          <section className="modal-main">
            <h2>Claim</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
              </div>
              {/* <div className="input-group">
                <label htmlFor="documents">Attach Supporting Documents (PDF)</label>
                <input type="file" id="documents" name="documents" accept=".pdf" multiple onChange={handleDocumentChange} />
              </div> */}
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

      {/* Modal for sponsoring */}
      {showSponsorModal && (
        <div className="modal display-block">
          <section className="modal-main">
            <h2>Sponsor</h2>
            <form onSubmit={handleSponsorSubmit}>
              <div className="input-group">
                <label htmlFor="amount">Amount ($100.00 - $5000.00)</label>
                <input type="text" id="amount" name="amount" placeholder='Example: 100.00' value={sponsorFormData.amount} onChange={handleSponsorFormChange} />
              </div>
              <div className="input-group">
                <label htmlFor="purpose">Purpose</label>
                <textarea id="purpose" name="purpose" value={sponsorFormData.purpose} onChange={handleSponsorFormChange}></textarea>
              </div>
              <div className="input-group">
                <label htmlFor="duration">Deadline:</label>
                <DatePicker
                  selected={new Date(new Date(sponsorFormData.duration).getTime() + (24 * 60 * 60 * 1000))} // Subtract 1 day
                  onChange={(date) => handleSponsorFormChange({ target: { name: "duration", value: date } })}
                  dateFormat="yyyy-MM-dd"
                  id="duration"
                  name="duration"
                  placeholderText="Select deadline"
                  className="date-picker"
                />
              </div>
              <div className="actions">
                <button type="submit" className="save-btn">Submit</button>
                <button type="button" className="cancel-btn" onClick={handleSponsorModalClose}>Cancel</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};

export default PostPage;
