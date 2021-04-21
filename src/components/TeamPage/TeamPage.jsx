import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

import Header from '../Header/Header';
import './TeamPage.css';
import {climberWeekCalc} from '../../scripts/climberWeekCalc';

const useStyles = makeStyles({
  btn: {
    width: '150px',
    height: '45px',
    fontSize: '12px',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  table: {
    maxWidth: '300px',
  },
  tableHead: {
    fontSize: '18px',
  },
  tableLink: {
    color: '#0000EE',
  },
  formControl: {
    minWidth: '120',
    paddingBottom: '20px',
  },
});

function TeamPage() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const leagues = useSelector(store => store.leaguesReducer);
  const conditionalData = useSelector(store => store.conditional);
  const climbs = useSelector(store => store.climbs)
  const climberTeams = useSelector(store => store.teams);
  const user = useSelector(store => store.user);
  const accessCode = useSelector(store => store.accessCodeReducer);
  
  const [currentLeague, setCurrentLeague] = useState('')
  const [currentLeagueId, setCurrentLeagueId] = useState(0)
  const [currentLeagueStart, setCurrentLeagueStart] = useState('')
  const [currentLeagueEnd, setCurrentLeagueEnd] = useState('')
  const [userTeam, setUserTeam] = useState('')
  const [showAccessCode, setShowAccessCode] = useState(false);

  const toggleAccessCode = () => {

    dispatch({ 
      type: 'FETCH_ACCESS_CODE', 
      payload: conditionalData[0].teamId
    })
    setShowAccessCode(!showAccessCode)
  }

  useEffect(() => {
    findUserTeam();
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

  // loop through teams to get team for current climber
  const findUserTeam = () => {
    for(let climber of climberTeams) {
      if (climber.userId === user.id) {
        setUserTeam(climber.teamName)
      }
    }
  }

  return (
    <>
    <div className="teamContainer">
      <Header />
      {conditionalData[0].teamName ?
      <>
      <h2 className="teamName">{userTeam}</h2><br/>
      <h3 className="leagueName">League: {currentLeague}</h3>

      <FormControl className={classes.formControl}>
        <NativeSelect>
          <option value="" disabled>Week</option>
          <option>Week 1</option>
          <option>Week 2</option>
          <option>Week 3</option>
        </NativeSelect>
        <FormHelperText>Week</FormHelperText>
      </FormControl>

      <TableContainer className={classes.container}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead} align="center">Climber</TableCell>
              <TableCell className={classes.tableHead} align="center">Total Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {climberTeams.map((climber) => {
            if(climber.teamName === userTeam) {
              return (
                <TableRow>
                  <TableCell className={classes.tableLink} align="center" key={climber.userId} onClick={() => history.push(`/climber/${climber.userId}`)}>{climber.username}</TableCell>
                  <TableCell align="center">{climberWeekCalc(climber.userId, currentLeagueStart, currentLeagueEnd, climbs).totalScore}</TableCell>
                </TableRow>
              )
            }
          })}
          </TableBody>
        </Table>
      </TableContainer>
      
      <div className={`modalBackground modalShowing-${showAccessCode}`}>
        <div className="modalInner">
          <div className="modalText">
            <button className="exitButton" onClick={() => toggleAccessCode()}>X</button>
            <p>This is your teams access code. You can provide the code to others for them to join your team.</p>
            <p>{accessCode}</p>
          </div>
        </div>
      </div>
      <div className="modal-button">
        <Button
          variant="outlined"
          color="secondary"
          className={classes.btn} 
          onClick={() => toggleAccessCode()}>
          Team Code
        </Button>
      </div>
      </>
      : 
      <div>
        <h3>You are not on a team.</h3> 
        <p>Join a team and check back later! </p>
      </div>
        }
    </div>
    </>
  );
}

export default TeamPage;
