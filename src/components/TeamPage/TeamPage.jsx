import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';

import Header from '../Header/Header'
import './TeamPage.css'
import {climberWeekCalc} from '../../scripts/climberWeekCalc'

function TeamPage() {
  // const dispatch = useDispatch();
  const history = useHistory();
  const leagues = useSelector(store => store.leaguesReducer);
  const conditionalData = useSelector(store => store.conditional);
  const climbs = useSelector(store => store.climbs)
  const climberTeams = useSelector(store => store.teams);
  const user = useSelector(store => store.user)
  
  const [currentLeague, setCurrentLeague] = useState('')
  const [currentLeagueId, setCurrentLeagueId] = useState(0)
  const [currentLeagueStart, setCurrentLeagueStart] = useState('')
  const [currentLeagueEnd, setCurrentLeagueEnd] = useState('')
  const [userTeam, setUserTeam] = useState('')

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
      <h3 className="leagueName">{currentLeague}</h3>
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
                  <td>{climberWeekCalc(climber.userId, currentLeagueStart, currentLeagueEnd, climbs).totalScore}</td>
                </tr>
              )
            }
          })}
        </tbody>
      </table>
      <button>Team Code</button>
    </div>
  );
}

export default TeamPage;
