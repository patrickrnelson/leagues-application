import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import {climberWeekCalc} from '../../../scripts/climberWeekCalc'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  btn: {
    width: '165px',
    height: '45px',
    fontSize: '12px',
  },
  start: {
    padding: '10px',
  },
  bye: {
    padding: '10px',
  },
});

function StartSession(props) {
  const classes = useStyles();

  const history = useHistory();

  // Grab our conditionalData from the store
  const conditionalData = useSelector(store => store.conditional);
  const user = useSelector(store => store.user)
  const climbs = useSelector(store => store.climbs)
  const leagues = useSelector(store => store.leaguesReducer);

  const [currentLeague, setCurrentLeague] = useState('')
  const [currentLeagueId, setCurrentLeagueId] = useState(0)
  const [currentLeagueStart, setCurrentLeagueStart] = useState('')
  const [currentLeagueEnd, setCurrentLeagueEnd] = useState('')

  useEffect(() => {
    getCurrentLeague();
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

  let weekCalc = 0;
  for (let i = 0; i < allWeeks.length; i++) {
    if (moment().isSameOrBefore(allWeeks[i])) {
    weekCalc = i;
    break;
    }
  }

  let currentClimbs = []
  for(let climb of climbs) {
    if (climb.userId === user.id) {
      if(moment(climb.climbDate).isBefore(allWeeks[weekCalc]) && moment(climb.climbDate).isSameOrAfter(allWeeks[weekCalc - 1])) {
        currentClimbs.push(climb)
      }
    }
  }

  // console.log('current climbs', currentClimbs);

  return (
    <div className="container">
      <h2>Climb Session</h2>
      
      <p style={{fontStyle: 'italic', color: 'green'}}>{currentClimbs.length === 0 ? '' : 'Session In Progress'}</p>
      <h4>Team: {conditionalData[0].teamName}</h4>
      <h4>Week {props.weekCalc + 1}</h4>
      
      <div className={classes.start}>
        <Button 
          variant="outlined" 
          color="secondary"
          className={classes.btn} 
          style={{ border: '2px solid' }} 
          onClick={() => history.push('/climb/session')}>{currentClimbs.length === 0 ? 'Start Session' : 'Continue Session'}
        </Button>
      </div>

      <div className={classes.bye}>
        {/* Check if user is a captain and if they are display bye week Button */}
        {conditionalData[0].captainId === conditionalData[0].userId && conditionalData[0].byeWeek === null && 
        <Button 
          variant="outlined" 
          color="secondary"
          className={classes.btn} 
          style={{ border: '2px solid' }}>
          Initiate Bye Week
        </Button>}
      </div>
    </div>
  );
}

export default StartSession;
