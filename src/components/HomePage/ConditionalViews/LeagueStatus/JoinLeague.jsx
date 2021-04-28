import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  btn: {
    fontSize: '12px',
  },
});

// this will show when the user is on a team but not in a league
function JoinLeague(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const teamData = useSelector(store => store.teams);
  const user = useSelector(store => store.user);
  const [teamId, setTeamId] = useState('');
  
  // console.log('leagueData from props', props.leagueData);
  // console.log('league id', props.leagueData.id);
  // console.log('team id', teamId);

  useEffect(() => {
    findTeamId();
  }, [dispatch])

  const findTeamId = () => {
    for(let team of teamData) {
      if (team.userId === user.id) {
        setTeamId(team.teamId)
      }
    }
  }

  const joinLeague = () => {
    dispatch({
      type: 'JOIN_LEAGUE',
      payload: {
        leagueId: props.leagueData.id,
        teamId: teamId
      }
    });
    window.location.reload()
  }

  return (
    <div className="container-conditionals">
      <h3>{props.leagueData.name} is open!</h3>
      <h4>League Dates: {moment(props.leagueData.start).format("dddd, MMMM Do YYYY")} - {moment(props.leagueData.end).format("dddd, MMMM Do YYYY")}</h4>
      <h4>Joining period ends {moment(props.leagueData.start).add(7, 'd').format("dddd, MMMM Do YYYY")}</h4><br/>
      <Button 
        variant="outlined"
        color="secondary"
        className={classes.btn}
        style={{ border: '2px solid' }}
        onClick={(() => joinLeague())}>
        Join League!
      </Button>
    </div>
  );
}

export default JoinLeague;
