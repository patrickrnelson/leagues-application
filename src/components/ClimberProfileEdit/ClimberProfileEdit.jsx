import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../Header/Header'

function ClimberProfileEdit() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(store => store.user)

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.username)
  const [phone, setPhone] = useState(user.phone)

  const handleProfileEdit = () => {
    if(name !== '' && email !== '' && phone !== '') {
      dispatch({
        type: 'EDIT_USER_PROFILE',
        payload: {
          name: name,
          username: email,
          phone: phone
        }
      })
      history.push('/climber/profile')
    }
    else {
      alert('No Blank Inputs, Please!')
    }
    
  } // end handleProfileEdit


  return (
    <div className="container">
      <Header />

    <h2>Edit My Profile</h2>

      {/* Name Input */}
      <label for="nameEditInput">Name:</label>
      <input 
        type="text" 
        id="nameEditInput"
        minLength="2"
        required 
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      {/* Email Input */}
      <label for="emailEditInput">Email:</label>
      <input 
        type="text" 
        id="emailEditInput" 
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      {/* Phone Input */}
      <label for="phoneEditInput">Phone:</label>
      <input 
        type="tel" 
        id="phoneEditInput" 
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        required
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
      />

      <button onClick={handleProfileEdit}>Save</button>
      <button onClick={() => history.push('/climber/profile')}>Cancel</button>
    </div>
  );
}

export default ClimberProfileEdit;
