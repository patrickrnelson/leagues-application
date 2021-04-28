import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Custom Components
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import './LandingPage.css';
import logo from '../Images/notn.png';
import Background from '../Images/bouldering.png';


function LandingPage() {
  const history = useHistory();

  // State Variables
  const [heading, setHeading] = useState('Nature of The North');
  const [formChange, setFormChange] = useState(true);

  const onRegister = () => {
    setFormChange(!formChange);
  }; // end onRegister

  return (
    <div className="landing">
      {/* <h2 className="heading">{heading}</h2> */}
      <div className="landing-header">
        <img src = {logo} alt="Logo" width='115px' height='115px' onClick={() => history.push('/home')} />
        <h2 className="heading-climb">Climbing League</h2>
      </div>
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
