import React, { useEffect, useState, useRef } from 'react';
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

import Header from '../Header/Header';
import './TeamPage.css';
import useOnClickOutside from './use-onclick-outside';
import {climberWeekCalc} from '../../scripts/climberWeekCalc';
import boulderTwo from '../Images/boulder2.png';
import boulderThree from '../Images/boulder3.png';
import boulderFive from '../Images/boulder5.png';
import boulderSeven from '../Images/boulder7.png';
import boulderTen from '../Images/boulder10.png';

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
  const ref = useRef();

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
  
  useOnClickOutside(ref, () => setShowAccessCode(false));

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
    console.log('In Find User Team');
    for(let climber of climberTeams) {
      if (climber.userId === user.id) {
        setUserTeam(climber.teamName)
      }
    }
    dispatch({ 
      type: 'FETCH_ACCESS_CODE', 
      payload: conditionalData[0].teamId
    });
  }

  return (
    userTeam !== '' ?
      <>

      <div className="teamContainer">
        <Header />
        {conditionalData[0].teamName ?
        <>
        <h2 className="teamName">{userTeam}</h2><br/>
        <h3 className="leagueName">League: {currentLeague}</h3>

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
          <div ref={ref} className="modalInner">
            <div className="modalText">
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
            style={{ border: '2px solid' }}
            onClick={() => setShowAccessCode(true)}>
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
      <img className="team-image" src = {boulderThree} alt="boulder" height="175px"  />
      <img className="team-image-two" src = {boulderTen} alt="boulder" height="75px"  />
      </>

    : 
    <div className="loadTeamsButton">
      <Header />
      <Button 
        color='secondary' 
        variant='outlined'
        style={{ border: '2px solid' }}
        onClick={findUserTeam}>
        Go To Your Team
      </Button>
      <img className="team-image-three" src = {boulderTwo} alt="boulder" height="125px"  />
      <img className="team-image-five" src = {boulderFive} alt="boulder" height="120px"  />
      <img className="team-image" src = {boulderThree} alt="boulder" height="130px"  />
      <img className="team-image-four" src = {boulderSeven} alt="boulder" height="115px"  />
    </div>
  );
}

export default TeamPage;
