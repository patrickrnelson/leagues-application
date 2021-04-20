import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Header from '../Header/Header'
import './ClimbingSession.css'
import {climberWeekCalc} from '../../scripts/climberWeekCalc'
import Checkbox from '@material-ui/core/Checkbox';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  btn: {
    width: '165px',
    height: '45px',
    fontSize: '12px',
  },
});

function ClimbingSession() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(store => store.user)
  const climbs = useSelector(store => store.climbs)
  const leagues = useSelector(store => store.leaguesReducer);
  const teams = useSelector(store => store.teams);
  const conditionalData = useSelector(store => store.conditional);
  const climbsSubmittedReducer = useSelector(store => store.climbsSubmittedReducer)

  const [currentLeague, setCurrentLeague] = useState('')
  const [currentLeagueId, setCurrentLeagueId] = useState(0)
  const [currentLeagueStart, setCurrentLeagueStart] = useState('')
  const [currentLeagueEnd, setCurrentLeagueEnd] = useState('')

  useEffect(() => {
    getCurrentLeague();
    // defineTeammateIds();
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
        dispatch({
          type: 'DECREASE_CLIMBER_ONE_COUNT'
        })
      } else if (climberId === teammates[1].userId) {
        dispatch({
          type: 'DECREASE_CLIMBER_TWO__COUNT'
        })
      } else if (climberId === teammates[2].userId) {
        dispatch({
          type: 'DECREASE_CLIMBER_THREE_COUNT'
        })
      }
    } else {
      if (climberId === teammates[0].userId) {
        if (climbsSubmittedReducer.climberOneClimbCount < climbsSubmittedReducer.limit){
          if (climbsSubmittedReducer.climberOneClimbCount === (climbsSubmittedReducer.limit - 1) && (climbsSubmittedReducer.climberTwoClimbCount === climbsSubmittedReducer.limit || climbsSubmittedReducer.climberThreeClimbCount === climbsSubmittedReducer.limit)) {
            event.preventDefault();
          } else {
            dispatch({
              type: 'SUBMIT_CLIMB',
              payload: {climbId: climbId}
            })
            dispatch({
              type: 'INCREASE_CLIMBER_ONE_COUNT'
            })
          }
        } else {
          event.preventDefault();
        }
      } else if (climberId === teammates[1].userId) {
        if (climbsSubmittedReducer.climberTwoClimbCount < climbsSubmittedReducer.limit){
          if (climbsSubmittedReducer.climberTwoClimbCount === (climbsSubmittedReducer.limit - 1) && (climbsSubmittedReducer.climberOneClimbCount === climbsSubmittedReducer.limit || climbsSubmittedReducer.climberThreeClimbCount === climbsSubmittedReducer.limit)) {
            event.preventDefault();
          } else {
            dispatch({
              type: 'SUBMIT_CLIMB',
              payload: {climbId: climbId}
            })
            dispatch({
              type: 'INCREASE_CLIMBER_TWO_COUNT'
            })
          }
        } else {
          event.preventDefault();
        }
      } else if (climberId === teammates[2].userId) {
        if (climbsSubmittedReducer.climberThreeClimbCount < climbsSubmittedReducer.limit){
          if (climbsSubmittedReducer.climberThreeClimbCount === (climbsSubmittedReducer.limit -  1) && (climbsSubmittedReducer.climberOneClimbCount === climbsSubmittedReducer.limit || climbsSubmittedReducer.climberTwoClimbCount === climbsSubmittedReducer.limit)) {
            event.preventDefault();
          } else {
            dispatch({
              type: 'SUBMIT_CLIMB',
              payload: {climbId: climbId}
            })
            dispatch({
              type: 'INCREASE_CLIMBER_THREE_COUNT'
            })
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

  return (
    <div className="container">
      <Header />
      <h2>Week {weekCalc} Climbing Session</h2>
      {/* IF it's the first week (weekCalc = 0) display 'Determined by this week's submissions
          ELSE Display the handicap from our big function */}
      <h4>{weekCalc === 0 ? 'Handicap: Determined by this weeks submission' : `Handicap: ${climberWeekCalc(user.id, currentLeagueStart, currentLeagueEnd, climbs).handicap}`}</h4>
      <Button
        variant="outlined"
        color="secondary"
        className={classes.btn}
        onClick={() => history.push('/climb/add')}>
        Add a Climb
      </Button>
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
