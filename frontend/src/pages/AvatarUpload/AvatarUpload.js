import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfilePicture } from '../../utils/api';
import { getUser } from '../../utils/api';
import ConditionsModal from '../../components/ConditionsModal/ConditionsModal';
import ProfilePreview from '../../components/ProfilePreview/ProfilePreview';
import defaultAvatar from '../../assets/avatar1.png';
import './avatar-upload.css';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';

const AvatarUpload = ({ authToken }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    } else {
      console.error('Selected file is not a valid image.');
    }
  };

  const avatarImage = selectedFile ? URL.createObjectURL(selectedFile) : defaultAvatar;

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true); // Set loading to true when fetching user data
      try {
        const user = await getUser(authToken);
        setUserData(user);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      } finally {
        setIsLoading(false); // Set loading to false when fetch operation is complete
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
    const avatarImage = defaultAvatar;
    try {
      setIsLoading(true); // Set loading to true when performing async operation
      navigate('/', { state: { avatarImage } });
    } catch (error) {
      console.error('Error registering user:', error.message);
    } finally {
      setIsLoading(false); // Set loading to false when operation is complete
    }
  };  

  const handleCompleteSignUp = async () => {
    try {
      if (!selectedFile) {
        throw new Error('No file selected for upload.');
      }
      setIsLoading(true); // Set loading to true when performing async operation
      const formData = new FormData();
      formData.append('image', selectedFile, selectedFile.name);
      await updateProfilePicture(formData, authToken);
      handleSkipStep();
    } catch (error) {
      console.error('Error completing sign up:', error.message);
    } finally {
      setIsLoading(false); // Set loading to false when operation is complete
    }
  };
  
  const signupFormData = JSON.parse(localStorage.getItem('signupFormData')) || {};
  const { firstName, lastName, region } = signupFormData;
  const userName = `${firstName} ${lastName}`;
  const userCountry = region;

  return (
    <div className="main-container">
      {isLoading && <LoadingIndicator />} {/* Render loading indicator if isLoading is true */}
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
          <input id="file-input" type="file" accept="image/png" onChange={handleFileChange} style={{ display: 'none' }} />
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
        <div className="action-buttons">
          <button className="skip-button" onClick={handleSkipStep}>
            Skip this step
          </button>
          <button className="complete-signup-button" onClick={handleCompleteSignUp}>
            Complete Sign Up
          </button>
        </div>
      </div>
      {isModalOpen && <ConditionsModal closeModal={closeModal} />}
    </div>
  );
};

export default AvatarUpload;
