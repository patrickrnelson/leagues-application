import React, { useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux';

// Material-UI imports
import TextField from '@material-ui/core/TextField';

function LoginForm() {
  const dispatch = useDispatch();

  // Redux Store
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // State Variables
  const errors = useSelector(store => store.errors);

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div className="emailInput loginInputs">
        <label htmlFor="email">Email:</label>
          <TextField
            type="text"
            name="email"
            id="email"
            minlength="3"
            maxlength="64"
            placeholder="johndoe@email.com"
            required
            value={username}
            inputProps={{min: 0, style: { textAlign: 'center' }}}
            style={{ backgroundColor: 'white' }}
            onChange={(event) => setUsername(event.target.value)}
          />
      </div>
      <div className="passwordInput loginInputs">
        <label htmlFor="password">Password:</label>
          <TextField
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            value={password}
            inputProps={{min: 0, style: { textAlign: 'center' }}}
            style={{ backgroundColor: 'white' }}
            onChange={(event) => setPassword(event.target.value)}
          />
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Log In" />
      </div>
    </form>
  );
}

export default LoginForm;
