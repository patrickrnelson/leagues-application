import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Header from '../Header/Header';
import './TeamPage.css';

function TeamPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const teamData = useSelector(store => store.conditional);
  const climberTeams = useSelector(store => store.teams);
  const user = useSelector(store => store.user)

  const [userTeam, setUserTeam] = useState('');
  const [showAccessCode, setShowAccessCode] = useState(false);

  const toggleAccessCode = () => {
    console.log('what is my team id', teamData[0].teamId);
    dispatch({ 
      type: 'FETCH_ACCESS_CODE', 
      payload: { 
        team: teamData[0].teamId
      } 
    })
    setShowAccessCode(!showAccessCode)
  }

  useEffect(() => {
    console.log('climberTeams', climberTeams);
    findUserTeam();
  }, [])

  const findUserTeam = () => {
    for(let climber of climberTeams) {
      if (climber.userId === user.id) {
        setUserTeam(climber.teamName)
      }
    }
  }

  return (
    <div className="teamContainer">
      <Header />
      <h2 className="teamName">{userTeam}</h2>
      <h3 className="leagueName">Summer League 2021</h3>
      <select>
        <option>Week 1</option>
        <option>Week 2</option>
        <option>Week 3</option>
      </select>
      <table className="teamTable">
        <thead>
          <tr>
            <td> Climber </td>
            <td> Total Score </td>
          </tr>
        </thead>
        <tbody>
          {climberTeams.map((climber) => {
            if(climber.teamName === userTeam) {
              return (
                <tr>
                  <td key={climber.userId} onClick={() => history.push(`/climber/${climber.userId}`)}>{climber.username}</td>
                  <td>SCORE</td>
                </tr>
              )
            }
          })}
        </tbody>
      </table>
      <div className={`modalBackground modalShowing-${showAccessCode}`}>
        <div className="modalInner">
          <div className="modalText">
            <button className="exitButton" onClick={() => toggleAccessCode()}>X</button>
            <p>This is your teams access code. You can provide the code to others for them to join your team.</p>
            <p>JENFXI</p>
          </div>
        </div>
      </div>
        <button onClick={() => toggleAccessCode()}>Team Code</button>
    </div>
  );
}

export default TeamPage;
