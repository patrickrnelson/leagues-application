import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../Header/Header'

function ClimberProfile() {
  const history = useHistory();

  const user = useSelector(store => store.user)

  return (
    <div className="container">
      <Header />
      <h2>{user.name}</h2>
      <h4>Handicap: 5</h4>
      <h4>{user.username}</h4>
      <h4>{user.phone}</h4>
      <button onClick={() => history.push('/climber/profile/edit')}>Edit My Information</button>
    </div>
  );
}

export default ClimberProfile;
