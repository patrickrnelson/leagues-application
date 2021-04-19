import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {climberWeekCalc} from '../../scripts/climberWeekCalc'
import Header from '../Header/Header'
import './Leaderboard.css'
import moment from 'moment';

function Leaderboard() {

  const leagues = useSelector(store => store.leaguesReducer);
  const leagueTeams = useSelector(store => store.leagueTeamReducer);
  const climbs = useSelector(store => store.climbs)
  const user = useSelector(store => store.user);
  const conditionalData = useSelector(store => store.conditional);
  const teams = useSelector(store => store.teams);

  const [currentWeek, setCurrentWeek] = useState('')
  const [currentLeague, setCurrentLeague] = useState('')
  const [currentLeagueId, setCurrentLeagueId] = useState(0)
  const [currentLeagueStart, setCurrentLeagueStart] = useState('')
  const [currentLeagueEnd, setCurrentLeagueEnd] = useState('')


  const weeks = ['Week 1', 'Week 2', , 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7']

  let teamsInLeague = [];

  useEffect(() => {
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

  for(let team of leagueTeams) {
    if(team.leagueId === currentLeagueId) {
    let teamScore = 0
    for(let climber of teams) {
      if (team.teamId === climber.teamId) {
        teamScore += climberWeekCalc(climber.userId, currentLeagueStart, currentLeagueEnd, climbs).totalScore
      }
    }
    teamsInLeague.push({teamName: team.teamName, teamId: team.teamId, teamScore: teamScore})
  }
}

  console.log('teamsInLeague', teamsInLeague)

  teamsInLeague.sort((a, b) => {
    return b.teamScore - a.teamScore;
  })

  console.log('teamsInLeague', teamsInLeague)


  return (
    <div className="container">
      <Header />
      <h2 className="pageTitle">League Leaderboard</h2>
      <h3 className="leagueName">{currentLeague}</h3>
      {/* <h4>{currentWeek == '--Total--' ? '' : currentWeek}</h4> */}
      <select onChange={(event) => setCurrentWeek(event.target.value)}> 
        <option>--Total--</option>
        {weeks.map((week) => { return (
          <option>{week}</option>
        )})}
      </select>
      <table className="leagueTable">
        <thead>
          <tr> 
            <td></td> 
            <td>Team</td>
            <td>Score</td>
          </tr>
        </thead>
        <tbody>
          {teamsInLeague.map((team, index) => {
            // if(team.leagueName === currentLeague) {
            return (
              <tr>
                <td> {index + 1} </td>
                <td> {team.teamName} </td>
                <td> {team.teamScore} </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
