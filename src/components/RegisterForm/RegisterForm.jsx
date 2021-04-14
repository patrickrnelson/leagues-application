import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        name: name,
        username: username,
        phoneNumber: phoneNumber,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div className="nameInput registerInputs">
        <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="Name"
            id="name"
            value={name}
            minlength="2"
            required
            onChange={(event) => setName(event.target.value)}
          />
      </div>
      <div className="emailInput registerInputs">
        <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            id="email"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
      </div>
      <div className="phoneInput registerInputs">
        <label htmlFor="phone number">Phone Number:</label>
          <input
            type="tel"
            name="phone number"
            id="phone number"
            placeholder="000-000-0000"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            value={phoneNumber}
            required
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
      </div>
      <div className="passwordInput registerInputs">
        <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
