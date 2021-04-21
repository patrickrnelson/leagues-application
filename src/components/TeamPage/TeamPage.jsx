import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import Header from '../Header/Header';
import './TeamPage.css';
import {climberWeekCalc} from '../../scripts/climberWeekCalc'

function TeamPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const leagues = useSelector(store => store.leaguesReducer);
  const conditionalData = useSelector(store => store.conditional);
  const climbs = useSelector(store => store.climbs)
  const climberTeams = useSelector(store => store.teams);
  const user = useSelector(store => store.user);
  const accessCode = useSelector(store => store.accessCodeReducer);
  
  const [currentLeague, setCurrentLeague] = useState('')
  const [currentLeagueId, setCurrentLeagueId] = useState(0)
  const [currentLeagueStart, setCurrentLeagueStart] = useState('')
  const [currentLeagueEnd, setCurrentLeagueEnd] = useState('')
  const [userTeam, setUserTeam] = useState('')
  const [showAccessCode, setShowAccessCode] = useState(false);

  const toggleAccessCode = () => {

    dispatch({ 
      type: 'FETCH_ACCESS_CODE', 
      payload: conditionalData[0].teamId
    })
    setShowAccessCode(!showAccessCode)
  }

  useEffect(() => {
    findUserTeam();
    getCurrentLeague();
  }, [])

  const getCurrentLeague = () => {
    for(let league of leagues) {
      if(moment().isBetween(league.start, league.end)) {
        setCurrentLeague(league.name);
        setCurrentLeagueId(league.id);
        setCurrentLeagueStart(league.start);
        setCurrentLeagueEnd(league.end);
        return;
      } 
    }
  }

  // loop through teams to get team for current climber
  const findUserTeam = () => {
    for(let climber of climberTeams) {
      if (climber.userId === user.id) {
        setUserTeam(climber.teamName)
      }
    }
  }

  return (
    <>
    <div className="teamContainer">
      <Header />
      {conditionalData[0].teamName ?
      <>
      <h2 className="teamName">{userTeam}</h2>
      <h3 className="leagueName">{currentLeague}</h3>
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
                  <td>{climberWeekCalc(climber.userId, currentLeagueStart, currentLeagueEnd, climbs, conditionalData[0].byeWeek).totalScore}</td>
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
            <p>{accessCode}</p>
          </div>
        </div>
      </div>
        <button onClick={() => toggleAccessCode()}>Team Code</button>
      </>
      : 
      <div>
        <h3>You are not on a team.</h3> 
        <p>Join a team and check back later! </p>
      </div>
        }
    </div>
    </>
  );
}

export default TeamPage;
