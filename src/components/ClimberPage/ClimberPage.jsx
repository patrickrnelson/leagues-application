import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';

import Header from '../Header/Header'
import {climberWeekCalc} from '../../scripts/climberWeekCalc'

function ClimberPage() {
  const history = useHistory();

  const climberTeams = useSelector(store => store.teams);
  const climbs = useSelector(store => store.climbs)
  const leagues = useSelector(store => store.leaguesReducer);
  let { id } = useParams()

  const [climber, setClimber] = useState('')
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
      }
    }
  }

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
            <td> {climberWeekCalc(Number(id), currentLeagueStart, currentLeagueEnd, climbs).totalScore} </td>
            <td> {climberWeekCalc(Number(id), currentLeagueStart, currentLeagueEnd, climbs).averageScore} </td>
            <td> {climberWeekCalc(Number(id), currentLeagueStart, currentLeagueEnd, climbs).lastWeekScore} </td>
            <td> {climberWeekCalc(Number(id), currentLeagueStart, currentLeagueEnd, climbs).handicapToDisplay} </td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => history.push('/team')}>Back toTeam </button>
    </div>
  );
}

export default ClimberPage;
