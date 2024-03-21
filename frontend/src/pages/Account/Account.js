import React, { useState, useEffect } from 'react';
import '../../styles/main.css';
import '../../styles/mainheader.css';
import './account.css';

import { getUser, updateUser } from '../../utils/api'; // Import getUser and updateUser functions

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [county, setCounty] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Call the getUser function to fetch user data
        const token = localStorage.getItem('authToken');
        const response = await getUser(token);

        if (response) {
          setUserData(response);
          setLoading(false);
          // Set initial values for input fields
          setFirstName(response.first_name);
          setLastName(response.last_name);
          setUsername(response.user);
          setPassword(response.password);
          setCounty(response.country);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Function to handle opening the modal
  const handleEditProfile = () => {
    setShowModal(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to handle saving the edited profile details
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      // Call updateUser function with updated profile details
      const updatedUserData = {
        user: username,
        first_name: firstName,
        last_name: lastName,
        country: county,
        email: userData.email,
        password: password
      };
      const token = localStorage.getItem('authToken');
      await updateUser(updatedUserData, token);
      // Close the modal after saving changes
      setShowModal(false);
      // Refetch user data to update UI
      const response = await getUser(token);
      if (response) {
        setUserData(response);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div>
      {/* Put authenticatedheader.js here */}
      {/* Top part with pfp, name, and description */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        userData && ( // Conditionally render only if userData is not null
          <div className="profile-header">
            {/* src path is a placeholder, replace with actual image data */}
            <img className="profile-image" src="../assets/avatar1.png" alt="Profile image" />
            <div className="profile-info">
              <h1>{`${userData.first_name} ${userData.last_name}`}</h1>
              <p>{userData.email}</p>
              {/* Replace with actual description */}
              <p>Description Placeholder</p>
              {/* Button to open the modal */}
              <button className="edit-btn" onClick={handleEditProfile}>Edit</button>
            </div>
          </div>
        )
      )}

      {/* Toolbar */}
      <nav className="profile-nav">
        <ul>
          <li><a href="#profile" className="active">Profile</a></li>
          <li><a href="#research-papers">Research Papers</a></li>
        </ul>
      </nav>

      {/* About me div */}
      <section className="about-me">
        <h2>About Me</h2>

        <div className="input-group">
          <label htmlFor="introduction">Introduction</label>
          <textarea id="introduction" placeholder="Introduce yourself and your research"></textarea>
        </div>

        <div className="input-group">
          <label htmlFor="disciplines">Disciplines</label>
          <select id="disciplines">
            <option value="">Enter or select disciplines</option>
            {/* Options would go here */}
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="skills">Skills and expertise</label>
          <input type="text" id="skills" placeholder="Enter or select skills and expertise" />
        </div>

        <div className="input-group">
          <label htmlFor="languages">Languages</label>
          <select id="languages">
            <option value="">Enter or select languages</option>
            {/* Options would go here */}
          </select>
        </div>

        {/* Render email input only if userData is not null */}
        {userData && (
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={userData.email} readOnly />
          </div>
        )}

        <div className="actions">
          <button className="cancel-btn">Cancel</button>
          <button className="save-btn">Save</button>
        </div>
      </section>

      {/* Modal for editing profile details */}
      {showModal && (
        <div className="modal display-block">
          <section className="modal-main">
            <h2>Edit Profile Details</h2>
            <form onSubmit={handleSaveProfile}>
              <div className="input-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="input-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="input-group">
                <label htmlFor="county">County</label>
                <input type="text" id="county" value={county} onChange={(e) => setCounty(e.target.value)} />
              </div>
              <div className="actions">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" className="cancel-btn" onClick={handleCloseModal}>Cancel</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};

export default Account;
