import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitIdea } from '../../utils/api'; // Import the submitIdea function
import { getAuthToken } from '../../utils/authService';

import '../../styles/main.css';
import '../../styles/mainheader.css';
import './submit.css';


const Submit = ({ }) => {
  const navigate = useNavigate();
  const authToken = getAuthToken();

  const [formData, setFormData] = useState({
    title: '',
    tags: [],
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'tags') {
      // Split the input value by commas to get individual tags
      const tagsArray = value.split(',').map(tag => tag.trim());
      setFormData({
        ...formData,
        [name]: tagsArray,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the submitIdea API function to submit the idea data
      await submitIdea(formData, authToken); // Replace 'tokentokentoken' with the actual token

      // Redirect to the home page after successful submission
      navigate('/');
    } catch (error) {
      console.error('Error submitting idea:', error);
      alert('An error occurred while submitting the idea. Please try again.');
    }
  };

  return (
    <div className="submit-container">
      <h1>Submit Research Idea</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Research Idea Title</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Research Idea Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
// =======
//     <main>
//       <div className="submission-type-header">
//         <img src={require('../../assets/lightbulb.png')} alt="Lightbulb Icon" />
//         <p>Your Research Idea</p>
//       </div>
//       <div style={{ display: 'flex', justifyContent: 'center' }}>
//         <div className="submission-prompt">
//           <div className="submission-option">
//             <p>Title: </p>
//             <input type="text" id="title" name="title" placeholder="Type your idea title here" value={formData.title} onChange={handleChange} />
//           </div>
//           <div className="submission-option">
//             <p>Description: </p>
//             <textarea id="description" name="description" placeholder="Type your idea description here" value={formData.description} onChange={handleChange}></textarea>
//           </div>
//           <div className="submission-option">
//             <p style={{ display: 'inline-block' }}>Tags: </p>
//             <select id="tags" name="tags">
//               <option value="select">Tag1</option>
//               <option value="public">Tag2</option>
//               <option value="private">Tag3</option>
//             </select>
//           </div>
//           <div className="submission-option">
//             <p>Collaboration Preferences: <span className="collab-pref-info">(What do these mean?)</span></p>
//             <div className="checkbox-list">
//               <label className="checkbox-item">
//                 <input type="checkbox" name="feedback" id="feedback" />
//                 <span className="checkbox-label">Open to Feedback</span>
//               </label>
//               <label className="checkbox-item">
//                 <input type="checkbox" name="coresearcher" id="coresearcher" checked />
//                 <span className="checkbox-label">Co-Researcher Wanted</span>
//               </label>
//               <label className="checkbox-item">
//                 <input type="checkbox" name="contributions" id="contributions" />
//                 <span className="checkbox-label">Contributions Welcome</span>
//               </label>
//               <label className="checkbox-item">
//                 <input type="checkbox" name="collaboration" id="collaboration" />
//                 <span className="checkbox-label">Interdisciplinary Collaboration</span>
//               </label>
//             </div>
//           </div>
//           <div className="submission-option">
//             <p>Attach Supporting Documents (optional): </p>
//             <div className="attachment-item">
//               <img className="attachment-icon" src={require('../../assets/researchdocimage.png')} alt="Document Icon" />
//               <div className="attachment-info">
//                 <span className="attachment-name">attachment-name.pdf</span>
//                 <span className="attachment-size">attachment-size</span>
//               </div>
//               <a href="#" className="attachment-remove">Remove</a>
//             </div>
//           </div>
//           <button className="add-attachment">Add another file</button>
//           <div className="submission-option">
//             <p style={{ display: 'inline-block' }}>Visibility Settings: </p>
//             <select id="visibility" name="visibility" value={formData.visibility} onChange={handleChange}>
//               <option value="public">Public</option>
//               <option value="private">Private</option>
//             </select>
//           </div>
//           <button className="submit-idea">Submit Idea</button>
//         </div>
//       </div>
//     </main>
// >>>>>>> 45a1f7b0132c9aa336223f27e5d3993cc901936b
  );
};

export default Submit;
