import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Header from '../Header/Header'

function CreateTeam() {
  const [teamCode, setTeamCode] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'CLEAR_JOIN_ERROR' });
  },[dispatch]);

  const joinTeam = (event) => {
    event.preventDefault();
    
    if (teamCode) {
      dispatch({ 
        type: 'JOIN_TEAM', 
        payload: teamCode.toUpperCase()
      });
      history.push('/team');
    } else {
      dispatch({ type: 'ACCESS_CODE_INPUT_ERROR' })
    }
  } 

  return (
    <>
    <div className="container">
      <Header />
    </div>
    <form onSubmit={joinTeam}>
      <h2>Join Team</h2>
      {errors.joinTeamMessage && (
        <h3 className="alert" role="alert">
          {errors.joinTeamMessage}
        </h3>
      )}
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
