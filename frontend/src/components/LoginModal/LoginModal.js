// /frontend/src/components/LoginModal.js
import React from 'react';
import './loginmodal.css'; // Import the styles for the login modal

const LoginModal = ({ show, handleClose }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {/* Content for the login modal */}
        <h2>Login</h2>
        {/* Add your login form here */}
        <form>
          {/* Input fields for username and password */}
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          {/* Login button */}
          <button type="submit">Log in</button>
        </form>

        {/* Close button for the modal */}
        <button onClick={handleClose}>Close</button>
      </section>
    </div>
  );
};

export default LoginModal;
