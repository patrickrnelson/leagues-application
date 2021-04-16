import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../Header/Header'
import './Leaderboard.css'

function Leaderboard() {

  const leagues = useSelector(store => store.leaguesReducer);
  const leagueTeams = useSelector(store => store.leagueTeamReducer);
  const climbs = useSelector(store => store.climbs)
  const user = useSelector(store => store.user);

  const [currentWeek, setCurrentWeek] = useState('')
  const [currentLeague, setCurrentLeague] = useState('Cullen')

  // const [startDate, setStartDate] = useState('')
  // const [endDate, setEndDate] = useState('')

  useEffect(() => {
    findLeagueDates();
    findClimbDates();
    console.log('leagues', leagues);
  }, [])

  let startDate = ''
  let endDate = ''

  // define dates of the current league
  const findLeagueDates = () => {
    for(let league of leagues) {
      if(league.name === currentLeague) {
        startDate = league.start
        endDate = league.end
        // setStartDate(league.start);
        // setEndDate(league.end);
      }
    }
    console.log('start date', startDate);
    console.log('end date', endDate);
  } // end findLeagueDates
  
  
  // find the user's climb dates
  const findClimbDates = () => {
    let climbDates = [];
    for(let climb of climbs) {
      if(climb.userId === user.id && climb.isSubmitted === true){
        climbDates.push(climb.climbDate)
      }
    }       
    console.log(climbDates);

    // let weekOneClimbs = [];
    // for(let date of climbDates) {
    //   if(date <  )
    // }
  } // end findClimbDates

  const weeks = ['Week 1', 'Week 2', , 'Week 3', 'Week 4', 'Week 5', , 'Week 6', 'Week 7']

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
