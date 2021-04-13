import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Header from '../Header/Header'

function CreateTeam() {
  const [teamCode, setTeamCode] = useState('')
  const dispatch = useDispatch();
  const history = useHistory();

  const joinTeam = (event) => {
    event.preventDefault();

    dispatch({
      type: 'JOIN_TEAM',
      payload: {
        teamCode: teamCode
      }
    });
    history.pushState('/team');
  }

  return (
    <>
    <div className="container">
      <Header />
    </div>
    <form onSubmit={joinTeam}>
      <h2>Join Team</h2>
      <label for="teamCodeInput">Enter Team Code from Captain</label>
      <input 
        type="text" 
        id="teamCodeInput" 
        placeholder="Team Code"
        maxlength="6"
        required
        onChange={(event) => setTeamCode(event.target.value)}/>
      <button>Join Team</button>
    </form>
    </>
  );
}

export default CreateTeam;
