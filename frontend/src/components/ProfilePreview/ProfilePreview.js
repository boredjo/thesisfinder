import React from 'react';
import './profile-preview.css';  // You can create this CSS file for styling

const ProfilePreview = ({ avatarImage, name, location }) => {
  return (
    <div className="profile-preview-container">
      <div className="avatar-container">
        <img src={avatarImage} alt="Avatar" />
      </div>
      <div className="info-container">
        <h4>{name}</h4>
        <p>{location}</p>
      </div>
    </div>
  );
};

export default ProfilePreview;
