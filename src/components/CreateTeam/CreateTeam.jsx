import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import Header from '../Header/Header'

function CreateTeam() {

  const [teamInfo, setTeamInfo] = useState('');

  useEffect(() => {
    
  })

  return (
    <div className="container">
      <Header />
      <h2>Create Team</h2>
      <input type="text" placeholder="Team Name"></input>
      <button>Create Team</button>
    </div>
  );
}

export default CreateTeam;
