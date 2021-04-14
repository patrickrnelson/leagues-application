import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Header from '../Header/Header'

function CreateTeam() {
  const selectedTeam = useSelector((state) => state?.selectedTeam);
  const [teamCode, setTeamCode] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  // useEffect to get all team id's and access codes
  useEffect(() => {
    dispatch({ type: 'FETCH_TEAM_ACCESS' });
  }, [dispatch]);

  const joinTeam = (event) => {
    event.preventDefault();
    if (teamCode.toUpperCase() === selectedTeam.accessCode) {

      dispatch({type: 'JOIN_TEAM', payload: selectedTeam.id });
    history.pushState('/team');
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
      <button>Join Team</button>
    </form>
    </>
  );
}

export default CreateTeam;
