import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  btn: {
    fontSize: '12px',
  },
});

// This will show when the captain started the teams bye week and they are in that week
function ByeWeek() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const conditionalData = useSelector(store => store.conditional);
  const leagues = useSelector(store => store.leaguesReducer);
  const user = useSelector(store => store.user)

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

  const cancelByeWeek = () => {
    let teamId = conditionalData[0].teamId;
    let leagueId = currentLeagueId;
    console.log('teamId', teamId);
    console.log('leagueId', leagueId);
    dispatch({
      type: 'UPDATE_BYE_WEEK',
      payload: {
        teamId: teamId,
        leagueId: leagueId,
        byeWeek: null,
        captainId: conditionalData[0].captainId
      }
    })
  }

  return (
    <div className="container">
      <h2>Your team is on a bye this week. See ya next week!</h2>
      {
        conditionalData[0].captainId === user.id  
          ?  <Button
              variant='outlined'
              color='secondary'
              className={classes.btn}
              style={{ border: '2px solid' }}
              onClick={cancelByeWeek}>
                Cancel Bye Week
              </Button>
          : null
      }
    </div>
  );
}

export default ByeWeek;
