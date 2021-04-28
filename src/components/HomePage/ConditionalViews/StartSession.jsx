import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

// Material-UI imports
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// Custom Components
import {climberWeekCalc} from '../../../scripts/climberWeekCalc';
import boulderFive from '../../Images/boulder5.png';
import boulderEight from '../../Images/boulder8.png';

const useStyles = makeStyles({
  btn: {
    fontSize: '12px',
  },
  startBtn: {
    width: '220px',
    height: '45px',
    fontSize: '16px',
  },
  start: {
    paddingTop: '10px',
  },
  bye: {
    paddingTop: '100px',
  },
});

function StartSession() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  // Redux Store
  const conditionalData = useSelector(store => store.conditional);
  const user = useSelector(store => store.user)
  const climbs = useSelector(store => store.climbs)
  const leagues = useSelector(store => store.leaguesReducer);

  // State Variables
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
  }; // end getCurrentLeague

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

  // grab climbs for this week
  let currentClimbs = []
  for(let climb of climbs) {
    if (climb.userId === user.id) {
      if(moment(climb.climbDate).isBefore(allWeeks[weekCalc]) && moment(climb.climbDate).isSameOrAfter(allWeeks[weekCalc - 1])) {
        currentClimbs.push(climb)
      }
    }
  }

  // captain only
  // let captain start a bye week
  const initiateByeWeek = () => {
    let teamId = conditionalData[0].teamId;
    let leagueId = currentLeagueId;
    let byeWeek = weekCalc;

    dispatch({
      type: 'UPDATE_BYE_WEEK',
      payload: {
        teamId: teamId,
        leagueId: leagueId,
        byeWeek: byeWeek,
        captainId: conditionalData[0].captainId
      }
    })
    window.location.reload()
  }; // end initiateByeWeek

  return (
    <div className="container-start">
      <h2>Climb Session</h2>
      
      <p style={{fontStyle: 'italic', color: 'green'}}>{currentClimbs.length === 0 ? '' : 'Session In Progress'}</p>
      <h4>Team: {conditionalData[0].teamName}</h4>

      <h4>Week {weekCalc}</h4>

      <div className={classes.start}>
        <Button
          variant="outlined" 
          color="secondary"
          className={classes.startBtn} 
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
          onClick={initiateByeWeek}
          style={{ border: '2px solid' }}>
          Initiate Bye Week
        </Button>}
      </div>
      <img className="session-image-two" src = {boulderFive} alt="boulder" height="150px"  />
      <img className="session-image" src = {boulderEight} alt="boulder" height="150px"  />
    </div>
  );
}

export default StartSession;
