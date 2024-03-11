import React from 'react';

import './conditions-modal.css';

import conditionsData from '../../data/conditionsData';

const ConditionsModal = ({ closeModal }) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Conditions for Sharing Content</h2>
          <button onClick={closeModal} className="close-button">X</button>
        </div>
        <div className="modal-body">
          {conditionsData.map((section, index) => (
            <div key={index} className="conditions-modal-text">
              <p>{section.title}</p>
              <ul>
                {section.conditions.map((condition, i) => (
                  <li key={i}>{condition}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConditionsModal;
