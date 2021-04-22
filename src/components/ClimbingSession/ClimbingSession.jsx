import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import Header from '../Header/Header';
import './ClimbingSession.css';
import {climberWeekCalc} from '../../scripts/climberWeekCalc';

const useStyles = makeStyles({
  btn: {
    height: '45px',
    fontSize: '12px',
  },
  table: {
    minWidth: '250px',
  },
  tableHead: {
    fontSize: '14px',
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

  const [currentLeague, setCurrentLeague] = useState('')
  const [currentLeagueId, setCurrentLeagueId] = useState(0)
  const [currentLeagueStart, setCurrentLeagueStart] = useState('')
  const [currentLeagueEnd, setCurrentLeagueEnd] = useState('')

  // initial climber submitted count
  let climberOneCount = 0;
  let climberTwoCount = 0;
  let climberThreeCount = 0;

  // maximum number of submissions for a climber
  const climbLimit = 4;

  useEffect(() => {
    getCurrentLeague();
  }, [])

  // grab current league info
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

  // grab all climbs for the current week
  let currentClimbs = []
  for(let climb of climbs) {
    if(moment(climb.climbDate).isBefore(allWeeks[weekCalc]) && moment(climb.climbDate).isSameOrAfter(allWeeks[weekCalc - 1])) {
      currentClimbs.push(climb)
    }
  }

  // keep track of submitted climbs
  // also updates database when a climb is submitted or unsubmitted
  const handleCheckBoxChange = (climbId, isSubmitted, climberId, event) => {
    // if the climb is already submitted then unsubmit the climb
    if (isSubmitted) {
      dispatch({
        type: 'UNSUBMIT_CLIMB',
        payload: {climbId: climbId}
      })
      // update the count for the first climber in the teammates array
      if(climberId === teammates[0].userId) {
        climberOneCount -= 1;
      // update the count for the second climber in the teammates array
    } else if (climberId === teammates[1].userId) {
        climberTwoCount -= 1;
      // update the count for the third climber in the teammates array
      } else if (climberId === teammates[2].userId) {
        climberThreeCount -= 1;
      }
      // if climb is not submitted
    } else {
      // check if the climber is the first team mate in the teammates array
      if (climberId === teammates[0].userId) {
        // check if this team mate is below the maximum limit of climbs
        if (climberOneCount < climbLimit){
          // check if they are below the maximum and if climber two or three is at the maximum
          if (climberOneCount === (climbLimit - 1) && (climberTwoCount === climbLimit || climberThreeCount === climbLimit)) {
            // stop the user from submitting a climb if the above is true
            event.preventDefault();
          // otherwise let the climber submit the climb
          } else {
            dispatch({
              type: 'SUBMIT_CLIMB',
              payload: {climbId: climbId}
            })
            // update the count for this climber
            climberOneCount += 1;
          }
        // if they are not less then the limit prevent them from submitting the climb
        } else {
          event.preventDefault();
        }
      // check if the climber is the second team mate in the teammates array
      } else if (climberId === teammates[1].userId) {
        // check if this team mate is below the maximum limit of climbs
        if (climberTwoCount < climbLimit){
          // check if they are below the maximum and if climber one or three is at the maximum
          if (climberTwoCount === (climbLimit - 1) && (climberOneCount === climbLimit || climberThreeCount === climbLimit)) {
            // stop the user from submitting a climb if the above is true
            event.preventDefault();
          // otherwise let the climber submit the climb
          } else {
            dispatch({
              type: 'SUBMIT_CLIMB',
              payload: {climbId: climbId}
            })
            // update the count for this climber
            climberTwoCount += 1;
          }
        // if they are not less then the limit prevent them from submitting the climb
        } else {
          event.preventDefault();
        }
      // check if the climber is the third team mate in the teammates array
      } else if (climberId === teammates[2].userId) {
        // check if this team mate is below the maximum limit of climbs
        if (climberThreeCount < climbLimit){
          // check if they are below the maximum and if climber one or two is at the maximum
          if (climberThreeCount === (climbLimit -  1) && (climberOneCount === climbLimit || climberTwoCount === climbLimit)) {
            // stop the user from submitting a climb if the above is true
            event.preventDefault();
          // otherwise let the climber submit the climb
          } else {
            dispatch({
              type: 'SUBMIT_CLIMB',
              payload: {climbId: climbId}
            })
            // update the count for this climber
            climberThreeCount += 1;
          }
        // if they are not less then the limit prevent them from submitting the climb
        } else {
          event.preventDefault();
        }
      }
      
    }    
  }
  
  // grab teammates and put into an array
  let teammates = [];
  for(let climber of teams) {
    if(climber.captainId === user.id) {
      teammates.push(climber);
    }
  }

    // loop through the climbs and update the climber count for climbs that have been submitted
    if (user.id === conditionalData[0].captainId) {
    for(let climb of currentClimbs) {
      if(climb.userId === teammates[0].userId && climb.isSubmitted) {
        climberOneCount += 1
      } 
      if (teammates.length > 1) {
        if(climb.userId === teammates[1].userId && climb.isSubmitted) {
          climberTwoCount += 1;
        } 
      } 
      if (teammates.length>2) {
        if (climb.userId === teammates[2].userId && climb.isSubmitted) {
          climberThreeCount += 1;
        }
      }
    }
  }

    // keep track of total amount of submitted climbs
    let amountOfClimbs = climberOneCount + climberTwoCount + climberThreeCount;

  console.log('climberOneCount', climberOneCount)
  console.log('climberTwoCount', climberTwoCount)
  console.log('climberThreeCount', climberThreeCount  )

  return (
    <div className="climbsContainer">
      <Header />
      <h2>Week {weekCalc} Climbing Session</h2>
      
      {/* IF it's the first week (weekCalc = 0) display 'Determined by this week's submissions
          ELSE Display the handicap from our big function */}
      {user.id !== conditionalData[0].captainId ?
      <p>{weekCalc === 1 ? 'Handicap: Determined by this weeks submission' : `Handicap: ${climberWeekCalc(user.id, currentLeagueStart, currentLeagueEnd, climbs, conditionalData[0].byeWeek).handicap}`}</p>
        : null}
      <Button
        variant="outlined"
        color="secondary"
        className={classes.btn}
        style={{ border: '2px solid' }}
        onClick={() => history.push('/climb/add')}>
        Add a Climb
      </Button>

      {user.id === conditionalData[0].captainId ?
      <p>Please select 3 climbs for 2 climbers and 4 climbs for the remaining climber</p>
      : null}
      
      {user.id === conditionalData[0].captainId ? 

      
      teammates.map((mate) => (
        <>
        <h4>{mate.username}</h4>
        <h4>{weekCalc === 1 ? 'Handicap: Determined by this weeks submission' : `Handicap: ${climberWeekCalc(mate.userId, currentLeagueStart, currentLeagueEnd, climbs, conditionalData[0].byeWeek).handicap}`}</h4>

        <TableContainer>
          <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead} align="center">Submit</TableCell>
              <TableCell className={classes.tableHead} align="center">Color</TableCell>
              <TableCell className={classes.tableHead} align="center">Location</TableCell>
              <TableCell className={classes.tableHead} align="center">Level</TableCell>
              <TableCell className={classes.tableHead} align="center">Attempts</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {currentClimbs.map((climb) => climb.userId === mate.userId ? 
                <TableRow key={climb.climbId}>
                <TableCell align="center">
                  <Checkbox
                  key={climb.climbId}
                  checked={climb.isSubmitted}
                  onChange={(event) => handleCheckBoxChange(climb.climbId, climb.isSubmitted, climb.userId, event)}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </TableCell>
                <TableCell align="center"> {climb.color} </TableCell>
                <TableCell align="center"> {climb.locationName} </TableCell>
                <TableCell align="center"> {climb.level} </TableCell>
                <TableCell align="center"> {climb.attempts} </TableCell>
              </TableRow>
              :
              <TableRow></TableRow>
              )}
          </TableBody>
          </Table>
        </TableContainer>
        </>
      ))
      :
      <>
      <h4>My Climbs</h4>
      <div className="climbsContainer">
        <TableContainer>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHead} align="center">Color</TableCell>
                <TableCell className={classes.tableHead} align="center">Location</TableCell>
                <TableCell className={classes.tableHead} align="center">Attempts</TableCell>
                <TableCell className={classes.tableHead} align="center">Level</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {currentClimbs.map((climb) => climb.userId === user.id ? 
              <TableRow key={climb.climbId}>  
              <TableCell align="center"> {climb.color} </TableCell>
              <TableCell align="center"> {climb.locationName} </TableCell>
              <TableCell align="center"> {climb.attempts} </TableCell>
              <TableCell align="center"> {climb.level} </TableCell>
            </TableRow>
            :
            <TableRow></TableRow>
            )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      </>     
      }
    </div>
    
  );
}

export default ClimbingSession;
