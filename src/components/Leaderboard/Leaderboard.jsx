import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../Header/Header'

function Leaderboard() {

  const leagues = useSelector(store => store.leaguesReducer);
  const leagueTeams = useSelector(store => store.leagueTeamReducer);
  const user = useSelector(store => store.user);

  const [currentLeague, setCurrentLeague] = useState('Spring League 2021')

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
      <h2>{currentLeague}</h2>
      <h3>Leaderboard</h3>
      <select> 
        <option>--Select League--</option>
        {leagues.map((league) => { return (
          <option>{league.name}</option>
        )})}
      </select>
      <table>
        <thead>
          <tr> 
            <td></td> 
            <td>Team</td>
            <td>Score</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> 1 </td>
            <td> Team 2 </td>
            <td> 53 </td>
          </tr>
          <tr>
            <td> 2 </td>
            <td> Team 3 </td>
            <td> 48 </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
