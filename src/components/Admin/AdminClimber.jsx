import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TableContainer } from '@material-ui/core';
import { Grid, makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import moment from 'moment';

import { climberWeekCalc } from '../../scripts/climberWeekCalc';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  table: {
    minWidth: 650,
  },
}));

function AdminClimber() {
  const userClimbs = useSelector((store) => store.climbs);

  const climberInfo = useSelector((store) => store.teams);

  const adminClimbs = useSelector((store) => store.adminClimbsReducer)

  const [climberName, setClimberName] = useState('');

  const [climberStats, setClimberStats] = useState('');

  const [selectedClimber, setSelectedClimber] = useState('');

  useEffect(() => {
    findClimber();
    testMap();
  }, []);

  const findClimber = () => {
    for (let climber of climberInfo) {
      if (climber.userId == id) {
        console.log('got a climber');
        setClimberName(climber.username);
      }
    }
  };
const testMap = () => {
  {userClimbs.map((climb) => {
    console.log('userIDDD', climb.userId)
    return (
      <h1>{climb.userId}</h1>
    )
  })}
}

  console.log('user', userClimbs);
  let { id } = useParams();
  console.log('getting', id);
  const classes = useStyles();
  return (
    <>
      <h1>Climber Profile</h1>
      <br></br>
      <h2>Team Cullen</h2>
      <h3>{climberName}</h3>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Week</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <br></br>
      <p>Week 2</p>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell></TableCell> */}
              <TableCell align="right">Climber</TableCell>
              <TableCell align="right">Color</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Difficulty</TableCell>
              <TableCell align="right">Score</TableCell>
              <TableCell align="right">Attempts</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminClimbs.map((climb) => {
              console.log(climb.userId)
              console.log(id)
              return (
                <TableRow key={climb.climbId}>
                  {/* <TableCell></TableCell> */}
                  <TableCell align="right">{climb.name}</TableCell>
                  <TableCell align="right">{climb.color}</TableCell>
                  <TableCell align="right">{climb.locationName}</TableCell>
                  <TableCell align="right">V{climb.level}</TableCell>
                  <TableCell align="right">
                    {/* {
                    climberWeekCalc(
                      climb.userId,
                      selectedLeagueStart,
                      selectedLeagueEnd,
                      userClimbs
                    ).totalScore
                  } */}
                  </TableCell>
                  <TableCell align="right">{climb.attempts}</TableCell>
                  <TableCell align="right">
                    {moment(climb.climbDate).format('MM-DD-YYYY')}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default AdminClimber;
