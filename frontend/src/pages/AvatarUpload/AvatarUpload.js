// AvatarUpload.js
import React, { useState } from 'react';
import './avatar-upload.css';
import ConditionsModal from '../../components/ConditionsModal/ConditionsModal';
import ProfilePreview from '../../components/ProfilePreview/ProfilePreview';
import defaultAvatar from '../../assets/avatar1.png';

const AvatarUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // Use the selectedFile or defaultAvatar based on the condition
  const avatarImage = selectedFile ? URL.createObjectURL(selectedFile) : defaultAvatar;

  const handleWebcamCapture = async () => {
    // Implement your webcam capture logic here
    // This function will be called when the "Use a Webcam" button is clicked
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
          <button className="webcam-button" onClick={handleWebcamCapture}>
            Use a Webcam
          </button>
        </div>
        <div className='preview-container'>
          <h3>Profile Preview</h3>
          <ProfilePreview avatarImage={avatarImage} name="John Doe" location="University of XYZ" />
        </div>
      </div>
      <div className="bottom-container">
        <hr />
        <button className="conditions-button" onClick={openModal}>
          View conditions for sharing content
        </button>
      </div>
      {isModalOpen && <ConditionsModal closeModal={closeModal} />}
    </div>
  );
};

export default AvatarUpload;
