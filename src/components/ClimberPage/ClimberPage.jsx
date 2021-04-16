import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import Header from '../Header/Header'

function ClimberPage() {
  const history = useHistory();

  const climberTeams = useSelector(store => store.teams);
  let { id } = useParams()

  const [climber, setClimber] = useState('')

  useEffect(() => {
    findClimber();
  }, [])

  const findClimber = () => {
    for(let climbee of climberTeams) {
      if(climbee.userId == id) {
        console.log('its a match!');
        setClimber(climbee.username)
      }
    }
  }
  
  return (
    <div className="container">
      <Header />
      <h2>{climber}</h2>
      <button>{climber}'s Info</button>
      <table>
        <thead>
          <tr> Total Score </tr>
          <tr> 207 </tr>
        </thead>
        <tbody>
          <tr>
            <td> Average Score </td>
            <td> 5.3 </td>
            <td> Last Week </td>
            <td> 16 </td>
            <td> Handicap </td>
            <td> 1 </td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => history.push('/team')}>Back toTeam </button>
    </div>
  );
}

export default ClimberPage;
