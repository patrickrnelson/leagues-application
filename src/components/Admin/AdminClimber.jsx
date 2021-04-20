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

  const climberInfo = useSelector ((store) => store.teams)

  const [climberName, setClimberName] = useState('');

  useEffect(() => {
    findClimber();
  }, [])

  const findClimber = () => {
    for(let climber of climberInfo) {
      if(climber.userId == id) {
        console.log('got a climber');
        setClimberName(climber.username)
      }
    }
  }


  let { id } = useParams()
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
            <TableRow>
              <TableCell align="right">Patrick</TableCell>
              <TableCell align="right">Red</TableCell>
              <TableCell align="right">Slab</TableCell>
              <TableCell align="right">V8</TableCell>
              <TableCell align="right">9</TableCell>
              <TableCell align="right">4</TableCell>
              <TableCell align="right">04-15-2021</TableCell>
              
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      </>
  );
}

export default AdminClimber;
