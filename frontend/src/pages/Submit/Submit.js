import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitIdea } from '../../utils/api'; // Import the submitIdea function
import { getAuthToken } from '../../utils/authService';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';

import '../../styles/main.css';
import '../../styles/mainheader.css';
import './submit.css';

const tagsList = [
  'Classical Mechanics',
  'Electromagnetism',
  'Quantum Mechanics',
  'Thermodynamics',
  'Statistical Mechanics',
  'Relativity',
  'Atomic Physics',
  'Molecular Physics',
  'Condensed Matter Physics',
  'High-energy Particle Physics',
  'Quantum Computing',
  'String Theory',
  'Optics',
  'Acoustics',
  'Nuclear Physics',
  'Astrophysics',
  'Gravitational Waves',
  'Plasma Physics',
  'Particle Accelerators',
  'Quantum Entanglement',
  'Quantum Field Theory',
  'Black Holes',
  'Superconductivity',
  'Fluid Dynamics',
  'Quantum Information Science',
  'Stellar Physics',
  'Neutrino Physics',
  'Magnetic Resonance Imaging (MRI)',
  'Semiconductor Physics',
  'Cosmological Models',
  'Quantum Teleportation',
  'Nuclear Fusion',
  'Quantum Hall Effect',
  'Quantum Dot',
  'Quantum Gravity',
  'Neutron Stars',
  'Quantum Cryptography',
  'Quantum Dot Solar Cells',
  'Quantum Computing Algorithms',
  'Neutrino Oscillations',
  'Dark Energy',
  'Blackbody Radiation',
  'Superstring Theory',
  'Quantum Electrodynamics (QED)',
  'Quantum Spin Hall Effect',
  'Bose-Einstein Condensate',
  'Supergravity',
  'Quantum Dot Lasers',
  'Gravitational Lensing',
  'Quantum Chromodynamics (QCD)',
  'Quantum Phase Transitions',
  'Neutrino Astronomy',
  'Quantum Magnetism',
  'Hawking Radiation',
  'Quantum Optics',
  'Neutron Diffraction',
  'Quantum Annealing',
  'Gravitational Radiation',
  'Quantum Error Correction',
  'Quantum Key Distribution',
  'Neutrino Detection',
  'Quantum Metrology',
  'Gravitational Collapse',
  'Quantum Sensing',
  'Neutron Scattering',
  'Quantum Biology',
  'Gravitational Redshift',
  'Quantum Memory',
  'Neutrino Oscillation Experiments',
  'Quantum Annealing',
  'Gravitational Wave Detection',
  'Quantum Simulation',
  'Neutron Star Merger',
  'Quantum Communication',
  'Gravitational Wave Astronomy',
  'Quantum Algorithms',
  'Neutron Star Formation',
  'Quantum Sensing Devices',
  'Gravitational Wave Interferometry',
  'Quantum Phase Transition',
  'Gravitational Wave Sources',
  'Quantum Computing Architecture',
  'Neutrino Flux',
  'Quantum Entanglement-based Communication',
  'Gravitational Wave Signals',
  'Quantum Cryptography Protocols',
  'Neutrino Detection Methods',
  'Quantum Computing Hardware',
  'Gravitational Wave Detectors',
  'Quantum Many-Body Systems',
  'Gravitational Wave Astrophysics',
  'Quantum Network',
  'Neutrino Mass Hierarchy',
  'Quantum Computing Software',
  'Gravitational Wave Data Analysis',
  'Quantum Error Correction Codes',
  'Neutrino Interactions',
  'Quantum Algorithm Development',
  'Gravitational Wave Event Localization',
];

const Submit = () => {
  const navigate = useNavigate();
  const authToken = getAuthToken();

  const [formData, setFormData] = useState({
    title: '',
    tags: [],
    description: '',
    feedback: false,
    coresearcher: false,
    contributions: false,
    collaboration: false,
    visibility: 'public',
    attachment: null, // Store attachment file object
  });

  const [loading, setLoading] = useState(false); // State variable to track loading state

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAttachmentChange = (e) => {
    // Assuming only one file is allowed to be attached
    const file = e.target.files[0];
    setFormData({
      ...formData,
      attachment: file,
    });
  };

  const handleTagSelection = (e) => {
    const selectedTags = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({
      ...formData,
      tags: selectedTags,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate mandatory fields
    if (!formData.title || !formData.description || !formData.visibility) {
      alert('Please fill in all mandatory fields.');
      return;
    }

    // Validate description word count
    const descriptionWordCount = formData.description.trim().split(/\s+/).length;
    // if (descriptionWordCount < 200 || descriptionWordCount > 300) {
      alert('Description must be between 200 and 300 words.');
    //   return;
    // }

    // Validate title and description character count
    // if (formData.title.length < 75 || formData.description.length < 75) {
      alert('Title and Description must be at least 75 characters long.');
    //   return;
    // }

    // Validate attachment format
    if (formData.attachment) {
      const allowedFormats = ['pdf', 'jpg', 'jpeg', 'png'];
      const attachmentFormat = formData.attachment.name.split('.').pop().toLowerCase();
      if (!allowedFormats.includes(attachmentFormat)) {
        alert('Supported document formats are .pdf, .jpg, .jpeg, and .png.');
        return;
      }
    }

    try {
      // Set loading state to true before making the API call
      setLoading(true);

      // Call the submitIdea API function to submit the idea data
      const response = await submitIdea(formData, authToken);

      // Extract the idea ID from the response
      const ideaId = response.id;

      // Redirect to the post page with the idea ID
      navigate(`/post-page/${ideaId}`);
    } catch (error) {
      console.error('Error submitting idea:', error);
      alert('An error occurred while submitting the idea. Please try again.');
    } finally {
      // Reset loading state to false after API call is complete
      setLoading(false);
    }
  };

  // Word count for description
  const descriptionWordCount = formData.description.trim().split(/\s+/).length;

  // Character count for title
  const titleCharacterCount = formData.title.length;

  return (
    <div className="submit-page">
      <div className="submit-container">
        <h1>Submit Research Idea</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Research Idea Title</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
            <p>Character Count: {titleCharacterCount}</p>
          </div>
          <div className="form-group">
            <label htmlFor="description">Research Idea Description (Markdown supported)</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
            <p>Word Count: {descriptionWordCount}</p>
          </div>
          <div className="form-group">
            <label htmlFor="tags">Select up to 5 Tags:</label>
            <select id="tags" name="tags" multiple size={5} onChange={handleTagSelection} required>
              {tagsList.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Collaboration Preferences:</label>
            <label>
              <input type="checkbox" name="feedback" checked={formData.feedback} onChange={handleChange} />
              Open to Feedback
            </label>
            {/* Other checkbox inputs */}
          </div>
          <div className="form-group">
            <label htmlFor="visibility">Visibility Settings:</label>
            <select id="visibility" name="visibility" value={formData.visibility} onChange={handleChange} required>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          {/* <div className="form-group">
            <label htmlFor="attachment">Attach Supporting Documents (optional):</label>
            <input type="file" id="attachment" name="attachment" onChange={handleAttachmentChange} accept=".pdf,.jpg,.jpeg,.png" />
          </div> */}
          {/* Conditional rendering of loading indicator */}
          {loading && <LoadingIndicator />}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Submit;