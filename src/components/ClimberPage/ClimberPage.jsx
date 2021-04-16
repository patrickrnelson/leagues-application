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
    for(let climber of climberTeams) {
      if(climber.userId == id) {
        console.log('its a match!');
        setClimber(climber.username)
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
          <tr> 
            <td>Total Score </td>
            <td> Average Score </td>
            <td> Last Week </td>
            <td> Handicap </td>
          </tr>
          
        </thead>
        <tbody>
          <tr>
            <td> 207 </td>
            <td> 5.3 </td>
            <td> 16 </td>
            <td> 1 </td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => history.push('/team')}>Back toTeam </button>
    </div>
  );
}

export default ClimberPage;
