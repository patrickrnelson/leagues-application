import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';

import Header from '../Header/Header';
import {climberWeekCalc} from '../../scripts/climberWeekCalc';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  btn: {
    width: '125px',
    height: '30px',
    fontSize: '12px',
  },
  climber: {
    padding: '15px',
    paddingBottom: '25px',
  },
  back: {
    padding: '25px',
  }
});

function ClimberPage() {
  const classes = useStyles();
  const history = useHistory();

  const climberTeams = useSelector(store => store.teams);
  const climbs = useSelector(store => store.climbs)
  const leagues = useSelector(store => store.leaguesReducer);
  let { id } = useParams()

  const [climber, setClimber] = useState('')
  const [currentLeague, setCurrentLeague] = useState('')
  const [currentLeagueId, setCurrentLeagueId] = useState(0)
  const [currentLeagueStart, setCurrentLeagueStart] = useState('')
  const [currentLeagueEnd, setCurrentLeagueEnd] = useState('')

  useEffect(() => {
    findClimber();
    getCurrentLeague();
  }, [])

  const findClimber = () => {
    for(let climber of climberTeams) {
      if(climber.userId == id) {
        setClimber(climber.username)
      }
    }
  }

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
    <div className="container">
      <Header />
      <h2>{climber}</h2>
      <div className={classes.climber}>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.btn}>
          {climber}'s Info
        </Button>
      </div>
      <table>
        <thead>
          <tr> 
            <td>Total Score </td>
            <td> Average Score </td>
            <td> Last Week </td>
            <td> Handicap </td>
          </tr>
          
        </thead>
        <tbody>
          <tr>
            <td> {climberWeekCalc(Number(id), currentLeagueStart, currentLeagueEnd, climbs).totalScore} </td>
            <td> {(climberWeekCalc(Number(id), currentLeagueStart, currentLeagueEnd, climbs).averageScore).toFixed(2)} </td>
            <td> {climberWeekCalc(Number(id), currentLeagueStart, currentLeagueEnd, climbs).lastWeekScore} </td>
            <td> {climberWeekCalc(Number(id), currentLeagueStart, currentLeagueEnd, climbs).handicap ? climberWeekCalc(Number(id), currentLeagueStart, currentLeagueEnd, climbs).handicap : 'Not Set'}   </td>
          </tr>
        </tbody>
      </table>
      <div className={classes.back}>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.btn}
          onClick={() => history.push('/team')}>
          Back to Team 
        </Button>
      </div>
    </div>
  );
}

export default ClimberPage;
