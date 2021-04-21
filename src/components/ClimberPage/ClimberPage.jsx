import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';

import Header from '../Header/Header'
import {climberWeekCalc} from '../../scripts/climberWeekCalc'

function ClimberPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const climberTeams = useSelector(store => store.teams);
  const conditionalData = useSelector(store => store.conditional);
  const user = useSelector(store => store.user)
  const climbs = useSelector(store => store.climbs)
  const leagues = useSelector(store => store.leaguesReducer);
  let { id } = useParams()

  const [climber, setClimber] = useState('')
  const [climberId, setClimberId] = useState('')
  const [currentLeague, setCurrentLeague] = useState('')
  const [currentLeagueId, setCurrentLeagueId] = useState(0)
  const [currentLeagueStart, setCurrentLeagueStart] = useState('')
  const [currentLeagueEnd, setCurrentLeagueEnd] = useState('')

  useEffect(() => {
    findClimber();
    getCurrentLeague();
  }, [])

  const findClimber = () => {
    for(let climber of climberTeams) {
      if(climber.userId == id) {
        setClimber(climber.username)
        setClimberId(climber.userId)
      }
    }
  }

  // sets the correct information for a league that is currently in place
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
  
  const removeTeamMember = (climberId) => {
    console.log('removing Team Member', climberId)
    dispatch({
      type: 'REMOVE_TEAM_MEMBER',
      payload: {climberId: climberId}
    })
    history.push('/team')
  }

  return (
    <div className="container">
      <Header />
      <h2>{climber}</h2>
      <button>{climber}'s Info</button>
      {user.id === conditionalData[0].captainId && climber !== user.name ?
        <button onClick={() => removeTeamMember(climberId)}>Remove Climber from team</button> 
      : <> </> 
      }
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
            <td> {climberWeekCalc(Number(id), currentLeagueStart, currentLeagueEnd, climbs).totalScore} </td>
            <td> {(climberWeekCalc(Number(id), currentLeagueStart, currentLeagueEnd, climbs).averageScore).toFixed(2)} </td>
            <td> {climberWeekCalc(Number(id), currentLeagueStart, currentLeagueEnd, climbs).lastWeekScore} </td>
            <td> {climberWeekCalc(Number(id), currentLeagueStart, currentLeagueEnd, climbs).handicap ? climberWeekCalc(Number(id), currentLeagueStart, currentLeagueEnd, climbs).handicap : 'Not Set'}   </td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => history.push('/team')}>Back toTeam </button>
        
    </div>
  );
}

export default ClimberPage;
