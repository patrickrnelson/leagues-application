import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Header from '../Header/Header'
import './ClimbingSession.css'

function ClimbingSession() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(store => store.user)
  const climbs = useSelector(store => store.climbs)
  const conditionalData = useSelector(store => store.conditional);

  // grab our start date and end date
  let from = new Date(conditionalData[0].start).getTime();
  let to = new Date(conditionalData[0].end).getTime();
  let week = 604800000;
  let day = 86400000;
  let allWeeks = [];
  let current =  1;
  // determine the number of weeks in the league
  let weeks = (to-from)/day/7

  // loop over weeks array to add each end of  week date to allWeeks array
  for (let i = 0; i < weeks; i++){
    allWeeks.push(new Date(from += week).toLocaleDateString())
  }

  // Loop to determine the index of the week so we can check if today is before the end of that week
  let weekCalc = 0;
  for (let i = 0; i < allWeeks.length; i++) {
    if (moment().isSameOrBefore(allWeeks[i])) {
    weekCalc = i;
    break;
    }
  }

  console.log('all weeks at week calc', allWeeks[weekCalc]);

  // check if week 1 - if it is week 1 check if before week end date and after start date of league
  // else check if before end of week and after end of previous week
  let weekOneClimbs = [];
  for(let climb of climbs) {
    if (moment(climb.climbDate).isBefore(allWeeks[weekCalc]) && moment(climb.climbDate).isAfter(conditionalData[0].start)) {
      console.log('current week', climb.climbDate)
      if (climb.isSubmitted === true) {
        weekOneClimbs.push(climb.level);
      }
    }
  }
  
  console.log('weekOneClimbs', weekOneClimbs);


  // week 1 check if after start date
  // every other week check if after end of previous week

  // handicap = average difficulty of submitted climbs
  // TBD for week 1?

  /**
   * 
   * Figure out if the climb is in week 1
    if(date is between 4/12 and 4/18) {
      if(climb is submitted) {
        handicap = AVG(climb 1, climb 2, climb 3)
      }
    }
    climbDifference = climb 1 - handicap
    if(climbDifference = 0) {
      climbOneScore = 5
    }
   * 
   *  */ 



  return (
    <div className="container">
      <Header />
      <h2>Week 1 Climbing Session</h2>
      <h4>Handicap: Determined by this weeks submission</h4>
      <button onClick={() => history.push('/climb/add')}>Add a Climb</button>
      <h4>My Climbs</h4>
      <div className="climbsContainer">
        <table className="climbsTable">
          <thead>
            <tr> 
              <td>Color</td> 
              <td>Location</td>
              <td>Attempts</td> 
              <td>Level</td> 
              <td>Score</td>  
            </tr>
          </thead>
          <tbody>
            {climbs.map((climb) => climb.userId === user.id ? 
              <tr key={climb.climbId}>  
              <td> {climb.color} </td>
              <td> {climb.locationName} </td>
              <td> {climb.attempts} </td>
              <td> {climb.level} </td>
              <td> 1 </td>
            </tr>
            :
            <div></div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClimbingSession;
