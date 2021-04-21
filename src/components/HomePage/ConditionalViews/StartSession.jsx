import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

function StartSession(props) {
  const dispatch = useDispatch();
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

  const initiateByeWeek = () => {
    let teamId = conditionalData[0].teamId;
    let leagueId = currentLeagueId;
    let byeWeek = weekCalc;
    console.log('teamId', teamId);
    console.log('leagueId', leagueId);
    console.log('byeWeek', byeWeek);
    dispatch({
      type: 'UPDATE_BYE_WEEK',
      payload: {
        teamId: teamId,
        leagueId: leagueId,
        byeWeek: byeWeek
      }
    })
  }

  // console.log('current climbs', currentClimbs);

  return (
    <div className="container">
      <h2>Climb Session</h2>
      
      <p style={{fontStyle: 'italic', color: 'green'}}>{currentClimbs.length === 0 ? '' : 'Session In Progress'}</p>
      <h4>Team: {conditionalData[0].teamName}</h4>
      {/* weekCalc is an index. weekCalc + 1 represents the correct week number */}
      <h4>Week {weekCalc}</h4>
      
      <button onClick={() => history.push('/climb/session')}>{currentClimbs.length === 0 ? 'Start Session' : 'Continue Session'}</button>
      {/* Check if user is a captain and if they are display bye week button */}
      {conditionalData[0].captainId === conditionalData[0].userId && conditionalData[0].byeWeek === null ? <button onClick={initiateByeWeek}>Initiate Bye Week</button> : null}
    </div>
  );
}

export default StartSession;
