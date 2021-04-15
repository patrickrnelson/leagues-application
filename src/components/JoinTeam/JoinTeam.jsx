import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Header from '../Header/Header'

function CreateTeam() {
  const teamAccess = useSelector(store => store.teamAccess)
  const [teamCode, setTeamCode] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  // useEffect to get all team id's and access codes
  useEffect(() => {
    dispatch({ type: 'FETCH_TEAM_ACCESS' });
  }, [dispatch]);


  const joinTeam = (event) => {
    event.preventDefault();
    for (let code of teamAccess) {
      if (teamCode.toUpperCase() === code.accessCode) {
        dispatch({ 
          type: 'JOIN_TEAM', 
          payload: code.ID
        });
        console.log('what is the code', code);
      history.push('/team');
      }
    }
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
      <button type="submit">Join Team</button>
    </form>
    </>
  );
}

export default CreateTeam;
