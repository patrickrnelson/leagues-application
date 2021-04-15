import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Nature of The North');
  const history = useHistory();
  const [formChange, setFormChange] = useState(true);

  const onRegister = (event) => {
    setFormChange(!formChange);
  };

  return (
    <div className="container">
      <h2>{heading}</h2>
      <p>Climbing League</p>

      <div className="grid">
        <div className="grid-col grid-col_10">
          {formChange ? (
          <>
            <LoginForm />
            <center >
              <h4 className ="form-change">Not a Member?</h4>
              <button className="btn btn_sizeSm" onClick={onRegister}>
                Register
              </button>
            </center>
          </>
          ) : (
          <>
            <RegisterForm />
            <center >
              <h4 className ="form-change">Already a Member?</h4>
              <button className="btn btn_sizeSm" onClick={onRegister}>
                Login
              </button>
            </center>
          </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
