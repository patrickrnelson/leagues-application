import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Header from '../Header/Header'
import './ClimbingSession.css'
import {climberWeekCalc} from '../../scripts/climberWeekCalc'
import Checkbox from '@material-ui/core/Checkbox';

function ClimbingSession() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(store => store.user)
  const climbs = useSelector(store => store.climbs)
  const leagues = useSelector(store => store.leaguesReducer);
  const teams = useSelector(store => store.teams);
  const conditionalData = useSelector(store => store.conditional);

  const [currentLeague, setCurrentLeague] = useState('')
  const [currentLeagueId, setCurrentLeagueId] = useState(0)
  const [currentLeagueStart, setCurrentLeagueStart] = useState('')
  const [currentLeagueEnd, setCurrentLeagueEnd] = useState('')

  const [climberOneCount, setClimberOneCount] = useState(0);
  const [climberTwoCount, setClimberTwoCount] = useState(0);
  const [climberThreeCount, setClimberThreeCount] = useState(0);

  const climbLimit = 4;

  useEffect(() => {
    getCurrentLeague();
    getCheckedClimbs();
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

  let currentClimbs = []
  for(let climb of climbs) {
    if(moment(climb.climbDate).isBefore(allWeeks[weekCalc]) && moment(climb.climbDate).isSameOrAfter(allWeeks[weekCalc - 1])) {
      currentClimbs.push(climb)
    }
  }

  const handleCheckBoxChange = (climbId, isSubmitted, climberId, event) => {
    if (isSubmitted) {
      dispatch({
        type: 'UNSUBMIT_CLIMB',
        payload: {climbId: climbId}
      })
      if(climberId === teammates[0].userId) {
        setClimberOneCount(climberOneCount - 1);
      } else if (climberId === teammates[1].userId) {
        setClimberTwoCount(climberTwoCount - 1);
      } else if (climberId === teammates[2].userId) {
        setClimberThreeCount(climberThreeCount - 1);
      }
    } else {
      if (climberId === teammates[0].userId) {
        if (climberOneCount < climbLimit){
          if (climberOneCount === (climbLimit - 1) && (climberTwoCount === climbLimit || climberThreeCount === climbLimit)) {
            event.preventDefault();
          } else {
            dispatch({
              type: 'SUBMIT_CLIMB',
              payload: {climbId: climbId}
            })
            setClimberOneCount(climberOneCount + 1);
          }
        } else {
          event.preventDefault();
        }
      } else if (climberId === teammates[1].userId) {
        if (climberTwoCount < climbLimit){
          if (climberTwoCount === (climbLimit - 1) && (climberOneCount === climbLimit || climberThreeCount === climbLimit)) {
            event.preventDefault();
          } else {
            dispatch({
              type: 'SUBMIT_CLIMB',
              payload: {climbId: climbId}
            })
            setClimberTwoCount(climberTwoCount + 1);
          }
        } else {
          event.preventDefault();
        }
      } else if (climberId === teammates[2].userId) {
        if (climberThreeCount < climbLimit){
          if (climberThreeCount === (climbLimit -  1) && (climberOneCount === climbLimit || climberTwoCount === climbLimit)) {
            event.preventDefault();
          } else {
            dispatch({
              type: 'SUBMIT_CLIMB',
              payload: {climbId: climbId}
            })
            setClimberThreeCount(climberThreeCount + 1);
          }
        } else {
          event.preventDefault();
        }
      }
      
    }    
  }
  

  let teammates = [];

  for(let climber of teams) {
    if(climber.captainId === user.id) {
      teammates.push(climber);
    }
  }

  const getCheckedClimbs = () => {
    let climberOne = 0;
    let climberTwo = 0;
    let climberThree = 0;
    for(let climb of currentClimbs) {
      console.log('genereal if statement', climb.userId === teammates[0].userId && climb.isSubmitted)
      if(climb.userId === teammates[0].userId && climb.isSubmitted) {
        climberOne += 1
        console.log('climberOneCount if statement', climb.userId, teammates[0].userId, climb.isSubmitted)
      } else if(climb.userId === teammates[1].userId && climb.isSubmitted) {
        climberTwo += 1
        console.log('climberTwoCount if statement', climb.userId, teammates[1].userId, climb.isSubmitted)
      } else if (climb.userId === teammates[2].userId && climb.isSubmitted) {
        climberThree += 1
        console.log('climberThreeCount if statement', climb.userId, teammates[2].userId, climb.isSubmitted)
      }
    }
    setClimberOneCount(climberOne);
    setClimberTwoCount(climberTwo);
    setClimberThreeCount(climberThree);
  }

  

  return (
    <div className="container">
      <Header />
      <h2>Week {weekCalc} Climbing Session</h2>
      <p>climberOneCounts{climberOneCount}</p>
      <p>climberTwoCounts{climberTwoCount}</p>
      {/* IF it's the first week (weekCalc = 0) display 'Determined by this week's submissions
          ELSE Display the handicap from our big function */}
      <h4>{weekCalc === 0 ? 'Handicap: Determined by this weeks submission' : `Handicap: ${climberWeekCalc(user.id, currentLeagueStart, currentLeagueEnd, climbs).handicap}`}</h4>
      <button onClick={() => history.push('/climb/add')}>Add a Climb</button>
      <p>Please select 3 climbs for 2 climbers and 4 climbs for the remaining climber</p>
      {user.id === conditionalData[0].captainId ? 
      teammates.map((mate) => (
        <>
        <h4>{mate.username}</h4>
        <h4>{weekCalc === 0 ? 'Handicap: Determined by this weeks submission' : `Handicap: ${climberWeekCalc(mate.userId, currentLeagueStart, currentLeagueEnd, climbs).handicap}`}</h4>
        <div className="climbsContainer">
          {/* Start Table For Climber Captain */}
          <table className="climbsTable">
            <thead>
              <tr> 
                <td>Color</td> 
                <td>Location</td>
                <td>Attempts</td> 
                <td>Level</td> 
                <td>Submit</td>
              </tr>
            </thead>
            <tbody>
              {currentClimbs.map((climb) => climb.userId === mate.userId ? 
                <tr key={climb.climbId}>  
                <td> {climb.color} </td>
                <td> {climb.locationName} </td>
                <td> {climb.attempts} </td>
                <td> {climb.level} </td>
                <td>
                  <Checkbox
                  key={climb.climbId}
                  checked={climb.isSubmitted}
                  onChange={(event) => handleCheckBoxChange(climb.climbId, climb.isSubmitted, climb.userId, event)}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </td>
              </tr>
              :
              <tr></tr>
              )}
            </tbody>
          </table> 
          </div>
          </>
      ))
      :
      <>
      <h4>My Climbs</h4>
      <div className="climbsContainer">
        <table className="climbsTable">
          <thead>
            <tr> 
              <td>Color</td> 
              <td>Location</td>
              <td>Attempts</td> 
              <td>Level</td> 
            </tr>
          </thead>
          <tbody>
            {currentClimbs.map((climb) => climb.userId === user.id ? 
              <tr key={climb.climbId}>  
              <td> {climb.color} </td>
              <td> {climb.locationName} </td>
              <td> {climb.attempts} </td>
              <td> {climb.level} </td>
            </tr>
            :
            <tr></tr>
            )}
          </tbody>
        </table>
      </div>
      </>     
      }
    </div>
  );
}

export default ClimbingSession;
