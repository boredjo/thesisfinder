import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './avatar-upload.css';
import ConditionsModal from '../../components/ConditionsModal/ConditionsModal';
import ProfilePreview from '../../components/ProfilePreview/ProfilePreview';
import defaultAvatar from '../../assets/avatar1.png';
import { registerUser } from '../../utils/api'; // Import the registerUser API function

const AvatarUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const avatarImage = selectedFile ? URL.createObjectURL(selectedFile) : defaultAvatar;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSkipStep = async () => {
    const signupFormData = JSON.parse(localStorage.getItem('signupFormData')) || {};
    const avatarImage = defaultAvatar; // Use default avatar image for skipping step

    try {
      // Call the registerUser API with the signup form data
      console.log(signupFormData.username)

      await registerUser({
        user: signupFormData.email,
        first_name: signupFormData.firstName,
        last_name: signupFormData.lastName,
        country: signupFormData.region, // Assuming region corresponds to country
        email: signupFormData.email,
        password: signupFormData.password,
      });

      // Navigate to the login page with signup data and default avatar
      navigate('/login', { state: { signupFormData, avatarImage } });
    } catch (error) {
      console.error('Error registering user:', error.message);
      // Handle error
    }
  };  

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
          <input id="file-input" type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <div className='preview-container'>
          <ProfilePreview avatarImage={avatarImage} name="John Doe" location="University of XYZ" />
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
      </div>
      {isModalOpen && <ConditionsModal closeModal={closeModal} />}
    </div>
  );
};

export default AvatarUpload;
