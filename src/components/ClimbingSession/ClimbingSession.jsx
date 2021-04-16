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
  let allWeeks = [conditionalData[0].start];
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

  /**
   * let weekOneScore = 0
   * let weekTwoScore = 0
   * if(climbDate.isAfter(allWeeks[i - 1]) && climbDate.isBefore(allWeeks[i]))
   * let weekOneScore = 0
   * Loop through allWeeks and sum total score
   * 
   * weekly scores per climber
   * use that to sum team weekly score
   * Total score per climber
   * Total score per team
   */


  console.log('totalScore', totalScore);

  console.log('all weeks at week calc', allWeeks[weekCalc]);

  // parameter is week selected or week from loop to get sum
  
  let previousWeekAverage = 0;

  const currentWeekClimberScore = (week) => {
    let weekClimbs = [];
  
    for(let climb of climbs) {
      if (moment(climb.climbDate).isBefore(allWeeks[week]) && moment(climb.climbDate).isAfter(allWeeks[week - 1])) {
        console.log('Week 1', climb.climbDate)
        if (climb.isSubmitted === true && climb.userId === user.id) {
          weekClimbs.push(climb.level);
        }
      }
    }
  
    console.log(`week ${week}`);
    console.log(`weekClimbs, ${weekClimbs}`)
    // check if week 1 or not
    // if (previousWeekScore === 0) {
    //   let handicap = Math.round(average(weekClimbs));
    // } else {
    //   let handicap = previousWeekAverage;
    // }

    let handicap = Math.round(average(weekClimbs));

    function average(array) {
      let sum = 0;
      for(let i = 0; i < array.length;i++){
          sum += array[i];
      }
      return sum / array.length;
    }

    console.log('average', Math.round(average(weekClimbs)));

    let currentWeekScore = 0

    for(let climb of weekClimbs) {
      let difference = climb - handicap;
      let score = 5 + difference;
      currentWeekScore += score;
    }

    console.log('Week score', {week}, currentWeekScore);
    return currentWeekScore;
  }

  let totalScore = 0;

  for (let i = 1; i < allWeeks.length; i++) {
    totalScore += currentWeekClimberScore(i);
  }

  console.log('totalScore', totalScore)
  // Total climber score
  // weekly climber score
  // team total score
  // team weekly total?

  // let weekTwoClimbs = [];
  // for(let climb of climbs) {
  //   if (moment(climb.climbDate).isBefore(allWeeks[1]) && moment(climb.climbDate).isAfter(allWeeks[0])) {
  //     console.log('Week 2', climb.climbDate)
  //     if (climb.isSubmitted === true && climb.userId === user.id) {
  //       weekTwoClimbs.push(climb.level);
  //     }
  //   }
  // }
  
  // console.log('weekTwoClimbs', weekTwoClimbs);

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
