import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Header from '../Header/Header';
import boulder from '../Images/boulder1.png';
import boulderTwo from '../Images/boulder2.png';
import {climberWeekCalc} from '../../scripts/climberWeekCalc';

const useStyles = makeStyles({
  btn: {
    fontSize: '12px',
  },
});

function ClimberProfile() {
  const classes = useStyles();
  const history = useHistory();

  const user = useSelector(store => store.user)
  const climberTeams = useSelector(store => store.teams);
  const climbs = useSelector(store => store.climbs);
  const conditionalData = useSelector(store => store.conditional);
  const leagues = useSelector(store => store.leaguesReducer);

  const [climber, setClimber] = useState('')
  const [currentLeague, setCurrentLeague] = useState('')
  const [currentLeagueId, setCurrentLeagueId] = useState(0)
  const [currentLeagueStart, setCurrentLeagueStart] = useState('')
  const [currentLeagueEnd, setCurrentLeagueEnd] = useState('')

  useEffect(() => {
    getCurrentLeague();
  }, [])

  // sets the correct information for a league that is currently in place
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

  return (
    <div className="container-profile">
      <Header />
      <h2>{user.name}</h2>
      <h4>Handicap: {climberWeekCalc(user.id, currentLeagueStart, currentLeagueEnd, climbs, conditionalData[0].byeWeek).handicap ? climberWeekCalc(user.id, currentLeagueStart, currentLeagueEnd, climbs, conditionalData[0].byeWeek).handicap : 'Not Set'}</h4>
      <h4>{user.username}</h4>
      <h4>{user.phone}</h4>
      <Button
        variant="outlined"
        color="secondary"
        className={classes.btn}
        style={{ border: '2px solid' }}
        onClick={() => history.push('/climber/profile/edit')}>
        Edit My Information
      </Button>
      <img className="profile-image-two" src = {boulderTwo} alt="boulder" height="150px"  />
      <img className="profile-image" src = {boulder} alt="boulder" height="150px"  />
    </div>
  );
}

export default ClimberProfile;
