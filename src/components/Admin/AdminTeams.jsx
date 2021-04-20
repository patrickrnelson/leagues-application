import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

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

// function adminTotal(week, score) {
//   return { week, score };
// }

// const weeks = [adminTotal(1, 2, 3, 4, 5, 6, 7)];

// function createData(
//   climber,
//   color,
//   location,
//   difficulty,
//   score,
//   attempts,
//   date
// ) {
//   return { climber, color, location, difficulty, score, attempts, date };
// }

// const rows = [
//   createData('Alvin', 'Red', 'Slab', 4, 3, 5, 4),
//   createData('John', 'Green', 'Overhang', 5, 6, 7, 4),
//   createData('Patrick', 'Blue', 'Left Barrel', 6, 7, 8, 4),
//   createData('Zack', 'Yellow', 'Slab', 7, 8, 9, 4),
//   createData('Johnny', 'Orange', 'Overhang', 3, 4, 1, 4),
// ];

function AdminTeams() {

  const history = useHistory();

  let from = new Date(selectedLeagueStart).getTime();
  let to = new Date(selectedLeagueEnd).getTime();
  let week = 604800000;
  let day = 86400000;
  let allWeeks = [selectedLeagueStart];
  let current = 1;
  // determine the number of weeks in the league
  let weeks = (to - from) / day / 7;

  // loop over weeks array to add each end of  week date to allWeeks array
  for (let i = 0; i < weeks; i++) {
    allWeeks.push(new Date((from += week)).toLocaleDateString());
  }

  // Loop to determine the index of the week so we can check if today is before the end of that week
  let weekCalc = 0;
  for (let i = 0; i < allWeeks.length; i++) {
    if (moment().isSameOrBefore(allWeeks[i])) {
      weekCalc = i;
      break;
    }
  }

  for(let week of allWeeks) {
    
  }

  useEffect(() => {
    dispatch({ type: 'FETCH_LEAGUES' });
  }, []);

  const [selectedLeague, setSelectedLeague] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState();
  const [selectedClimber, setSelectedClimber] = useState();
  const [selectedLeagueStart, setSelectedLeagueStart] = useState('');
  const [selectedLeagueEnd, setSelectedLeagueEnd] = useState('');
  const [teamScore, setTeamScore] = useState(0);

  const dispatch = useDispatch();

  const leagues = useSelector((store) => store.leaguesReducer);
  const leagueTeams = useSelector((store) => store.leagueTeamReducer);
  const climbers = useSelector((store) => store.teams);
  const userClimbs = useSelector((store) => store.climbs);

  const classes = useStyles();

  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleLeagueSelected = (id, start, end) => {
    console.log('leagueTeams', id);
    setSelectedLeague(id);
    setSelectedLeagueStart(start);
    setSelectedLeagueEnd(end);
  };

  const handleTeamSelected = (id) => {
    console.log('what is my selected team?', selectedTeam);
    setSelectedTeam(id);
    findTeamScore(id);
  };

  const handleClimberSelected = (id) => {
    console.log('climb stats', id);
    setSelectedClimber(id);
    history.push('/admin/climbers')
  };
  console.log('who are the climbers', userClimbs);

  console.log('Selected League', selectedLeague);
  console.log('Selected Team', selectedTeam);

  const findTeamScore = (teamId) => {
    let teamScore = 0;
    for (let team of leagueTeams) {
      if (team.teamId === teamId) {
        for (let climber of climbers) {
          if (team.teamId === climber.teamId) {
            teamScore += climberWeekCalc(
              climber.userId,
              selectedLeagueStart,
              selectedLeagueEnd,
              userClimbs
            ).totalScore;
          }
        }
      }
    }
    setTeamScore(teamScore);
    console.log('Team Score', teamScore);
  };

  return (
    <Grid
      container
      item
      xs={12}
      direction="column"
      justify="space-around"
      alignItems="center"
    >
      <Grid item xs={6}>
        <h1>Teams</h1>
      </Grid>
      <Grid>
        <FormControl className={classes.formControl}>
          <InputLabel>League List</InputLabel>
          <Select
            labelId="teams"
            id="teamList"
            value={value}
            onChange={handleChange}
          >
            {leagues.map((league) => {
              return (
                <MenuItem
                  onClick={() =>
                    handleLeagueSelected(league.id, league.start, league.end)
                  }
                  value={league.id}
                >
                  {league.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        {leagueTeams.map((team) => {
          return team.leagueId === selectedLeague ? (
            <h1
              key={team.teamId}
              value={team.teamId}
              onClick={() => handleTeamSelected(team.teamId)}
            >
              {team.teamName}
            </h1>
          ) : (
            <div></div>
          );
        })}
      </Grid>
      <div>
        {climbers.map((climber) => {
          return climber.teamId === selectedTeam ? (
            <h3
              key={climber.id}
              value={climber.id}
              onClick={() => handleClimberSelected(climber.userId)}
            >
              {climber.username}
            </h3>
          ) : (
            <div></div>
          );
        })}
      </div>
      <div></div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Week</TableCell>
              <TableCell>1</TableCell>
              <TableCell>2</TableCell>
              <TableCell>3</TableCell>
              <TableCell>4</TableCell>
              <TableCell>5</TableCell>
              <TableCell>6</TableCell>
              <TableCell>7</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* 
              Loop through the teams reducer
              IF team.id === selectedTeamId
              IF climber.id === climbs.userId
              Then use that climber ID in the scores function and add up all of the scores 
            */}
            <TableRow>
              <TableCell>Score</TableCell>
              {allWeeks.map((week) => (
                <TableCell>{week}</TableCell>
              ))}
              <TableCell>{teamScore}</TableCell>
              {/*          
                    ) : (
                      <TableCell></TableCell>
                    )
                  ) : (
                    <TableCell></TableCell>
                  )
                )
               )} */}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <br></br>

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
            {/* {userClimbs.map((climb) => {
          return climb.userId === selectedClimber ? (
            <h3 key={climb.id} value={climb.id}>
                {climb.color} {climb.locationName} {climb.level} {climb.score} {climb.attempts} {moment(climb.climbDate).format('MM-DD-YYYY')}  
            </h3>
          ) : (
            <div></div>
          );
        })} */}
            {/* {climbers.map((team) => {
          return (
            <TableCell key={team.teamId}>{team.username}</TableCell>
          )
        })} */}

            {userClimbs.map((climb) => (
              <TableRow key={climb.climbId}>
                {/* <TableCell></TableCell> */}
                <TableCell align="right">{climb.userName}</TableCell>
                <TableCell align="right">{climb.color}</TableCell>
                <TableCell align="right">{climb.locationName}</TableCell>
                <TableCell align="right">V{climb.level}</TableCell>
                <TableCell align="right">
                  {
                    climberWeekCalc(
                      climb.userId,
                      selectedLeagueStart,
                      selectedLeagueEnd,
                      userClimbs
                    ).totalScore
                  }
                </TableCell>
                <TableCell align="right">{climb.attempts}</TableCell>
                <TableCell align="right">
                  {moment(climb.climbDate).format('MM-DD-YYYY')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default AdminTeams;
