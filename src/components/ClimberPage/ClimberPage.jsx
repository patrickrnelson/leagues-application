import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
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

import {climberWeekCalc} from '../../scripts/climberWeekCalc';


const useStyles = makeStyles({
  btn: {
    height: '30px',
    fontSize: '12px',
  },
  btnCancel: {
    fontSize: '12px',
    color: '#ff1744',
  },
  climber: {
    padding: '15px',
    paddingBottom: '25px',
  },
  back: {
    padding: '40px',
  },
  table: {
    maxWidth: '400x',
  },
  tableHead: {
    fontSize: '14px',
  },
});

function ClimberPage() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const climberTeams = useSelector((store) => store.teams);
  const conditionalData = useSelector((store) => store.conditional);
  const user = useSelector((store) => store.user);
  const climbs = useSelector((store) => store.climbs);
  const leagues = useSelector((store) => store.leaguesReducer);
  let { id } = useParams();

  const [climber, setClimber] = useState('');
  const [climberId, setClimberId] = useState('');
  const [climberPhone, setClimberPhone] = useState('');
  const [climberEmail, setClimberEmail] = useState('');
  const [currentLeague, setCurrentLeague] = useState('');
  const [currentLeagueId, setCurrentLeagueId] = useState(0);
  const [currentLeagueStart, setCurrentLeagueStart] = useState('');
  const [currentLeagueEnd, setCurrentLeagueEnd] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    findClimber();
    getCurrentLeague();
  }, []);

  // grab the climber username and id
  const findClimber = () => {
    for (let climber of climberTeams) {
      if (climber.userId == id) {
        setClimber(climber.username);
        setClimberId(climber.userId);
        // setClimberPhone(climber.phone);
        // setClimberEmail(climber.Email);
      }
    }
  };

  // sets the correct information for a league that is currently in place
  const getCurrentLeague = () => {
    for (let league of leagues) {
      if (moment().isBetween(league.start, league.end)) {
        setCurrentLeague(league.name);
        setCurrentLeagueId(league.id);
        setCurrentLeagueStart(league.start);
        setCurrentLeagueEnd(league.end);
        return;
      }
    }
  }
  
  // captain view only
  // used to remove a team mate from the team
  const removeTeamMember = (climberId) => {
    console.log('removing Team Member', climberId);
    dispatch({
      type: 'REMOVE_TEAM_MEMBER',
      payload: {
        climberId: climberId,
        captainId: conditionalData[0].captainId
      }
    })
    history.push('/team')
  }

  return (
    <div className="container-climber-profile">
      <Header />
      <h2>{climber}</h2>
      {/* Button does not currently work to get team members profile pages */}
      {/* <div className={classes.climber}>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.btn}>
          {climber}'s Info
        </Button>
      </div> */}
      {/* <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        key={user.id}
      >
        <p>Name: {climber}</p>
        <p>Phone: {climber.phone}</p>
        <p>Email: {climber.username}</p> 
        <button onClick={() => setModalIsOpen(false)}>X</button>
      </ReactModal> */}
      {/* <button onClick={() => setModalIsOpen(true)}>{climber}'s Info</button> */}

      {/* check if user is a captain */}
      {user.id === conditionalData[0].captainId && climber !== user.name ?
        <button
          variant="outlined"
          color="secondary"
          className={classes.btnCancel}
          style={{ border: '2px solid' }}
          onClick={() => removeTeamMember(climberId)}>
          Remove Climber from team
        </button> 
      : <> </> 
      }
      <TableContainer>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead} align="center">Total Score</TableCell>
              <TableCell className={classes.tableHead} align="center">Average Score</TableCell>
              <TableCell className={classes.tableHead} align="center">Last Week</TableCell>
              <TableCell className={classes.tableHead} align="center">Handicap</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">{climberWeekCalc(Number(id), currentLeagueStart, currentLeagueEnd, climbs).totalScore}</TableCell>
              <TableCell align="center">{(climberWeekCalc(Number(id), currentLeagueStart, currentLeagueEnd, climbs).averageScore).toFixed(2)}</TableCell>
              <TableCell align="center">{climberWeekCalc(Number(id), currentLeagueStart, currentLeagueEnd, climbs).lastWeekScore}</TableCell>
              <TableCell align="center">{climberWeekCalc(Number(id), currentLeagueStart, currentLeagueEnd, climbs, conditionalData[0].byeWeek).handicap ? climberWeekCalc(Number(id), currentLeagueStart, currentLeagueEnd, climbs, conditionalData[0].byeWeek).handicap : 'Not Set'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <div className={classes.back}>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.btn}
          style={{ border: '2px solid' }}
          onClick={() => history.push('/team')}>
          Back to Team 
        </Button>
      </div>
    </div>
  );
}

export default ClimberPage;
