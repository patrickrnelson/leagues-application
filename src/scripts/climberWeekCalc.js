import React, { useState, useEffect } from 'react';
import {  useSelector } from 'react-redux';
import moment from 'moment';

function ClimberWeekCalc(props) {

const conditionalData = useSelector(store => store.conditional);
const climbs = useSelector(store => store.climbs)

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
  
  let previousWeekAverage = 0;

  const currentWeekClimberScore = (week) => {
    let weekClimbs = [];
  
    for(let climb of climbs) {
      if (moment(climb.climbDate).isBefore(allWeeks[week]) && moment(climb.climbDate).isAfter(allWeeks[week - 1])) {
        console.log('Week 1', climb.climbDate)
        if (climb.isSubmitted === true && climb.userId === props.climberId) {
          weekClimbs.push(climb.level);
        }
      }
    }

    let handicap = Math.round(average(weekClimbs));

    function average(array) {
      let sum = 0;
      for(let i = 0; i < array.length;i++){
          sum += array[i];
      }
      return sum / array.length;
    }

    // console.log('average', Math.round(average(weekClimbs)));

    let currentWeekScore = 0

    for(let climb of weekClimbs) {
      let difference = climb - handicap;
      let score = 5 + difference;
      currentWeekScore += score;
    }

    // console.log('Week score', {week}, currentWeekScore);
    return currentWeekScore;
  }

  let totalScore = 0;

  for (let i = 1; i < allWeeks.length; i++) {
    totalScore += currentWeekClimberScore(i);
  }

  console.log('totalScore', totalScore)
  return(
    <td>{totalScore}</td>
  ) 
}

export default ClimberWeekCalc;