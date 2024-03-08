import React from 'react';

import './loginmodal.css';

const LoginModal = ({ show, handleClose }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <h2>Login</h2>
        <form>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button type="submit">Log in</button>
        </form>
        <button onClick={handleClose}>Close</button>
      </section>
    </div>
  );
};

export default LoginModal;
