import React, { useState, useEffect } from 'react';
import {  useSelector } from 'react-redux';
import moment from 'moment';


export function climberWeekCalc(climberId, currentLeagueStart, currentLeagueEnd, climbs) {

  // grab our start date and end date
  let from = new Date(currentLeagueStart).getTime();
  let to = new Date(currentLeagueEnd).getTime();
  let week = 604800000;
  let day = 86400000;
  let allWeeks = [currentLeagueStart];
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
  

  const currentWeekClimberScore = (week) => {

    let weekClimbs = [];
    let previousWeekClimbs = []
  
    for(let climb of climbs) {
      if (moment(climb.climbDate).isBefore(allWeeks[week]) && moment(climb.climbDate).isAfter(allWeeks[week - 1])) {
        if (climb.isSubmitted === true && climb.userId === climberId) {
          weekClimbs.push(climb.level);
        }
      }
    }

    for(let climb of climbs) {
      if (moment(climb.climbDate).isBefore(allWeeks[week - 1]) && moment(climb.climbDate).isAfter(allWeeks[week - 2])) {
        if (climb.isSubmitted === true && climb.userId === climberId) {
          previousWeekClimbs.push(climb.level);
        }
      }
    }

    console.log('previousWeeksClimbs', previousWeekClimbs);


    // if we figure out which week the climbers are in, we can stop the handicap calculation when it gets to that week
    // and send the handicap number to the DOM?
    let handicap = 0
    if (week === 1) {
      handicap = Math.round(average(weekClimbs));
    } else {
      handicap = Math.round(average(previousWeekClimbs));
    }

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

  return(
    totalScore
  ) 
}

