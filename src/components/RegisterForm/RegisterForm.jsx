import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TextField from '@material-ui/core/TextField';

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

  const magicButton = () => {
    console.log('in magicButton');
    setName('Alvin');
    setUsername('alvin@gmail.com');
    setPhoneNumber('467-893-5933');
    setPassword('pass')
  }

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2 onClick={magicButton}>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div className="nameInput registerInputs">
        <label htmlFor="name">Name:</label>
          <TextField
            type="text"
            name="Name"
            id="name"
            placeholder="Name"
            value={name}
            minlength="2"
            inputProps={{min: 0, style: { textAlign: 'center' }}}
            style={{ backgroundColor: 'white' }}
            required
            onChange={(event) => setName(event.target.value)}
          />
      </div>
      <div className="emailInput registerInputs">
        <label htmlFor="email">Email:</label>
          <TextField
            type="email"
            name="email"
            id="email"
            minlength="3"
            maxlength="64"
            placeholder="johndoe@email.com"
            value={username}
            inputProps={{min: 0, style: { textAlign: 'center' }}}
            style={{ backgroundColor: 'white' }}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
      </div>
      <div className="phoneInput registerInputs">
        <label htmlFor="phone number">Phone Number:</label>
          <TextField
            type="tel"
            name="phone number"
            id="phone number"
            placeholder="123-456-7890"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            value={phoneNumber}
            inputProps={{min: 0, style: { textAlign: 'center' }}}
            style={{ backgroundColor: 'white' }}
            required
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
      </div>
      <div className="passwordInput registerInputs">
        <label htmlFor="password">Password:</label>
          <TextField
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            inputProps={{min: 0, style: { textAlign: 'center' }}}
            style={{ backgroundColor: 'white' }}
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
