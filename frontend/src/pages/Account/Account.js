import React, { useState, useEffect } from 'react';
import '../../styles/main.css';
import '../../styles/mainheader.css';
import './account.css';
import { getUser, updateUser, getProfilePictureByUsername, getIdeaDetails, getClaimFromQuestion, getSponsorshipsFromUser } from '../../utils/api'; 
import { getClaimFromUser } from '../../utils/api';
import ReactTimeAgo from 'react-time-ago';

const Account = ({ authToken }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [county, setCounty] = useState('');
  const [avatarImage, setAvatarImage] = useState(null);
  const [researchPapers, setResearchPapers] = useState([]);
  const [sponsorships, setSponsorships] = useState([]); // Initialize sponsorships state as an empty array
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUser(authToken); 
        if (response) {
          setUserData(response);
          setLoading(false);
          setFirstName(response.first_name);
          setLastName(response.last_name);
          setUsername(response.user);
          setPassword(response.password);
          setCounty(response.country);
          fetchProfilePicture(response.user);
        }
      } catch (error) {
        // console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [authToken]); 

  const fetchProfilePicture = async (username) => {
    try {
      const profilePictureUrl = await getProfilePictureByUsername(username);
      setAvatarImage("https://data.thesisfinder.com/profilepicture/" + username);
    } catch (error) {
      // console.error('Error fetching profile picture:', error);
    }
  };

  useEffect(() => {
    const fetchResearchPapers = async () => {
      try {
        const response = await getClaimFromUser(username); // Fetch research papers by username
        const papers = await Promise.all(response.claims.map(async (paper) => {
          const ideaDetails = await getIdeaDetails(paper.idea, authToken);
          return {
            ...paper,
            title: ideaDetails.title
          };
        }));
        setResearchPapers(papers);
      } catch (error) {
        // console.error('Error fetching research papers:', error);
      }
    };
  
    fetchResearchPapers();
  }, [username, authToken]);   
  
  useEffect(() => {
    const fetchSponsorships = async () => {
      try {
        const response = await getSponsorshipsFromUser(authToken); // Fetch sponsorships by user token
        const sponsorshipsWithTitles = await Promise.all(response.sponsors.map(async (sponsorship) => {
          const ideaDetails = await getIdeaDetails(sponsorship.idea, authToken);
          return {
            ...sponsorship,
            title: ideaDetails.title
          };
        }));
        setSponsorships(sponsorshipsWithTitles);
      } catch (error) {
        // console.error('Error fetching sponsorships:', error);
      }
    };
  
    fetchSponsorships();
  }, [authToken]);  

  const handleEditProfile = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const updatedUserData = {
        user: username,
        first_name: firstName,
        last_name: lastName,
        country: county,
        email: userData.email,
        password: password
      };
      await updateUser(updatedUserData, authToken); 
      setShowModal(false);
      const response = await getUser(authToken); 
      if (response) {
        setUserData(response);
        fetchProfilePicture(response.user);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      {/* Put authenticatedheader.js here */}
      {/* Top part with pfp, name, and description */}
      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : (
        userData && (
          <div className="profile-header">
            <img className="profile-image" src={avatarImage} alt="Profile image" />
            <div className="profile-info">
              <h1>{`${userData.first_name} ${userData.last_name}`}</h1>
              <p>{userData.email}</p>
              <button className="edit-btn" onClick={handleEditProfile}>Edit</button>
            </div>
          </div>
        )
      )}
  
      {/* Toolbar */}
      <nav className="profile-nav">
        <ul>
          <li><a href="#profile" className={activeTab === 'profile' ? 'active' : ''} onClick={() => handleTabChange('profile')}>Currently Researching</a></li>
          <li><a href="#research-papers" className={activeTab === 'research-papers' ? 'active' : ''} onClick={() => handleTabChange('research-papers')}>Sponsorships</a></li>
        </ul>
      </nav>
  
      {/* Research Papers section */}
      <section className="research-papers-section" style={{ display: activeTab === 'profile' ? 'block' : 'none' }}>
        <h2>Currently Researching</h2>
        {researchPapers.length > 0 ? (
          <div className="research-papers-container">
            {researchPapers.map((paper, index) => {
              // Convert API date to local time zone
              const apiDate = new Date(paper.date_posted);
              const userLocalDateTimeString = apiDate.toLocaleString(undefined, {
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                timeZoneName: 'short'
              });
              
              return (
                <div key={index} className="research-paper-box">
                  {paper.title && (
                    <p><a href={`/post-page/${paper.idea}`}>{paper.title}</a></p>
                  )}
                  {/* Use ReactTimeAgo for displaying date posted */}
                  <p>Posted <ReactTimeAgo date={userLocalDateTimeString} locale="en-US" /></p>
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
              );
            })}
          </div>
        ) : (
          <p>Not actively researching</p>
        )}
      </section>

      {/* Sponsorships section */}
      <section className="sponsorships-section" style={{ display: activeTab === 'research-papers' ? 'block' : 'none' }}>
        <h2>Sponsorships</h2>
        {sponsorships.length > 0 ? (
          <div className="sponsorships-container">
            {sponsorships.map((sponsorship, index) => (
              <div key={index} className="sponsorship-box">
                {sponsorship.title && (
                  <p><a href={`/post-page/${sponsorship.idea}`}>{sponsorship.title}</a></p>
                )}
                <p>Sponsored {sponsorship.date_posted}</p>
                <p>Amount: {sponsorship.amount}</p>
                <p>Deadline: {sponsorship.deadline}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No sponsorships available</p>
        )}
      </section>

  
      {/* Modal for editing profile details */}
      {showModal && (
        <div className="modal display-block">
          <section className="modal-main">
            <h2>Edit Profile Details</h2>
            <form onSubmit={handleSaveProfile}>
              {/* Your existing code for the modal form */}
            </form>
          </section>
        </div>
      )}
    </div>
  );  
};

export default Account;
