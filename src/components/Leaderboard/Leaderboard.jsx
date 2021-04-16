import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../Header/Header'
import './Leaderboard.css'

function Leaderboard() {

  const leagues = useSelector(store => store.leaguesReducer);
  const leagueTeams = useSelector(store => store.leagueTeamReducer);
  const user = useSelector(store => store.user);

  const [currentWeek, setCurrentWeek] = useState('')
  const [currentLeague, setCurrentLeague] = useState('Cullen')

  const weeks = ['Week 1', 'Week 2', , 'Week 3', 'Week 4', 'Week 5', , 'Week 6', 'Week 7']

  useEffect(() => {
    // whatLeague();
    console.log('leagues', leagues);
  }, [])

  // This can define the current league eventually
  // const whatLeague = () => {
  //   if()
  // }

  return (
    <div className="container">
      <Header />
      <h2>Leaderboard</h2>
      <h3>{currentLeague}</h3>
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
          {leagueTeams.map((team, index) => {
            // if(team.leagueName === currentLeague) {
            return (
              <tr>
                <td> {index + 1} </td>
                <td> {team.teamName} </td>
                <td> score </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
