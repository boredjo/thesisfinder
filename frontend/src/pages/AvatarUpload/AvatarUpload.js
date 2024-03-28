import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, updateProfilePicture } from '../../utils/api'; // Import the registerUser and updateProfilePicture API functions
import { getToken } from '../../utils/api';
import { useEffect } from 'react';
import { getUser } from '../../utils/api';

import ConditionsModal from '../../components/ConditionsModal/ConditionsModal';
import ProfilePreview from '../../components/ProfilePreview/ProfilePreview';
import defaultAvatar from '../../assets/avatar1.png';

import './avatar-upload.css';


const AvatarUpload = ({ authToken }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(null); // State to store user data
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const avatarImage = selectedFile ? URL.createObjectURL(selectedFile) : defaultAvatar;

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUser(authToken);
        setUserData(user);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        // Handle error
      }
    };

    fetchUserData();
  }, [authToken]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSkipStep = async () => {
    const avatarImage = defaultAvatar; // Use default avatar image for skipping step
  
    try {
      // Navigate to the home page with default avatar
      navigate('/', { state: { avatarImage } });
    } catch (error) {
      console.error('Error registering user:', error.message);
      // Handle error
    }
  };  

  const handleCompleteSignUp = async () => {
    try {
      // Upload the selected picture with the updateProfilePicture API
      const imageType = 'image/png'; // Specify the image type
      const formData = new FormData();
      formData.append('image', selectedFile, `image.${imageType.split('/')[1]}`);
      
      console.log(formData)

      console.log(authToken)

      await updateProfilePicture(formData, authToken);

      // Proceed with completing sign up
      handleSkipStep();
    } catch (error) {
      console.error('Error completing sign up:', error.message);
      // Handle error
    }
  };

  // Get user's name and country from signupFormData
  const signupFormData = JSON.parse(localStorage.getItem('signupFormData')) || {};
  const { firstName, lastName, region } = signupFormData;
  const userName = `${firstName} ${lastName}`;
  const userCountry = region; // Assuming region corresponds to country

  return (
    <div className="main-container">
      <div className="header-container">
        <h3>
          Boost your visibility with a Profile Picture. <br />
          Get three times more exposure on ThesisFinder
        </h3>
      </div>
      <div className="upload-container">
        <div className="avatar-preview">
          <img src={avatarImage} alt="Avatar" />
        </div>
        <div className="button-container">
          <label htmlFor="file-input" className="upload-button">
            Upload a photo
          </label>
          <input id="file-input" type="file" accept="image/png" onChange={handleFileChange} />
        </div>
        <div className='preview-container'>
          {userData && <ProfilePreview avatarImage={avatarImage} name={`${userData.first_name} ${userData.last_name}`} location={userData.country} />}
        </div>
      </div>
      <div className="bottom-container">
        <hr />
        <button className="conditions-button" onClick={openModal}>
          View conditions for sharing content
        </button>
        <button className="skip-button" onClick={handleSkipStep}>
          Skip this step
        </button>
        <button className="complete-signup-button" onClick={handleCompleteSignUp}>
          Complete Sign Up
        </button>
      </div>
      {isModalOpen && <ConditionsModal closeModal={closeModal} />}
    </div>
  );
};

export default AvatarUpload;
