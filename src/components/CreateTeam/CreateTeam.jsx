import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Header from '../Header/Header'

function CreateTeam() {

  const [teamName, setTeamName] = useState('')
  const dispatch = useDispatch();
  const history = useHistory();

  const registerTeam = (event) => {
    event.preventDefault();

    dispatch({
      type: 'CREATE_TEAM',
      payload: {
        teamName,
      },
    });
    
  }

  return (
    <>
      <div className="container">
        <Header />
      </div>
      <form onSubmit={registerTeam}>
        <h2>Create Team</h2>
        <input 
          type="text" 
          placeholder="Team Name"
          value={teamName}
          required
          onChange={(event) => setTeamName(event.target.value)}/>
        <button>Create Team</button>
      </form>
    </>
  );
}

export default CreateTeam;
