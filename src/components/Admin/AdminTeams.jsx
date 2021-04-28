import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Material-UI imports
import { Grid, makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
import Checkbox from '@material-ui/core/Checkbox';

// Custom Components
import Nav from '../Nav/Nav'
import './Admin.css'
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

function AdminTeams() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  // retrieves current date
  const dateStuff = () => {
    let from = new Date(selectedLeagueStart).getTime();
    let to = new Date(selectedLeagueEnd).getTime();
    let week = 604800000;
    let day = 86400000;
    let current = 1;
    // setAllWeeks( allWeeks => [...allWeeks, selectedLeagueStart]);
    // determine the number of weeks in the league
    let weeks = (to - from) / day / 7;

    // loop over weeks array to add each end of  week date to allWeeks array
    for (let i = 0; i < weeks; i++) {
      setAllWeeks( allWeeks => [...allWeeks, (new Date((from += week)).toLocaleDateString())]);
    }

    // Loop to determine the index of the week so we can check if today is before the end of that week
    let weekCalc = 0;
    for (let i = 0; i < allWeeks.length; i++) {
      if (moment().isSameOrBefore(allWeeks[i])) {
        weekCalc = i;
        break;
      }
    }
  }; // end dateStuff
  

  useEffect(() => {
    dispatch({ type: 'FETCH_LEAGUES' });
    getCurrentLeagueId();
  }, [dispatch]);

  // Redux Store
  const conditionalData = useSelector(store => store.conditional);
  const leagues = useSelector((store) => store.leaguesReducer);
  const leagueTeams = useSelector((store) => store.leagueTeamReducer);
  const climbers = useSelector((store) => store.teams);
  const userClimbs = useSelector((store) => store.climbs);
  const adminTeams = useSelector((store) => store.adminTeamsReducer);
  const user = useSelector((store) => store.user);

  // State Variables
  const [allWeeks, setAllWeeks] = useState([])
  const [selectedLeague, setSelectedLeague] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState(0);
  const [selectedClimber, setSelectedClimber] = useState();
  const [selectedLeagueStart, setSelectedLeagueStart] = useState('');
  const [selectedLeagueEnd, setSelectedLeagueEnd] = useState('');
  const [teamScore, setTeamScore] = useState(0);
  const [teamPaidStatus, setTeamPaidStatus] = useState(false);
  const [value, setValue] = useState('');

  const getCurrentLeagueId = () => {
    for(let league of leagues) {
      if(moment().isBetween(league.start, league.end)) {
        setSelectedLeague(league.id);
        setSelectedLeagueStart(league.start);
        setSelectedLeagueEnd(league.end)
        console.log('league Id', league.id);
      } 
    }
  }; // end getCurrentLeagueId

  const handleChange = (event) => {
    setValue(event.target.value);
  }; // end handleChange

  const handleLeagueSelected = (id, start, end) => {
    setSelectedTeam(0)
    setSelectedLeague(id);
    setSelectedLeagueStart(start);
    setSelectedLeagueEnd(end);
  }; // end handleLeagueSelected

  const handleTeamSelected = (id, paidStatus) => {
    setAllWeeks([selectedLeagueStart])
    setSelectedTeam(id);
    setTeamPaidStatus(paidStatus);
    findTeamScore(id);
    dispatch({ type: 'FETCH_ADMIN_TEAMS', payload: id})
    dateStuff();
  }; // end handleTeamSelected

  const handleClimberSelected = (id) => {
    setSelectedClimber(id);
    dispatch({ type: 'FETCH_ADMIN_CLIMBS', payload: id});
    history.push(`/admin/climbers/${id}`)
  }; // end handleClimberSelected

  const handlePaidChange = () => {
    setTeamPaidStatus(!teamPaidStatus)
    dispatch({
      type: 'UPDATE_PAID_STATUS',
      payload: {
        paidStatus: !teamPaidStatus,
        teamId: selectedTeam,
        leagueId: selectedLeague
      }
    })
  } // end handlePaidChange

  const findTeamScore = (teamId) => {
    let teamScore = 0;
    console.log('selectedLeagueStart', selectedLeagueStart);
    for (let team of leagueTeams) {
      if (team.teamId === teamId) {
        for (let climber of climbers) {
          if (team.teamId === climber.teamId) {
            teamScore += Number(climberWeekCalc(
              climber.userId,
              selectedLeagueStart,
              selectedLeagueEnd,
              userClimbs,
              team.byeWeek
            ).totalScore);
          }
        }
      }
    }
    setTeamScore(teamScore);
    console.log('Team Score', teamScore);
  }; // end findTeamScore

  return (

    user.authLevel === 'ADMIN' ?

    <>
    <Nav />
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

      {/* League Dropdown */}
      <Grid>
        <FormControl className={classes.formControl}>
          <InputLabel>Select a League</InputLabel>
          <Select
            labelId="teams"
            id="teamList"
            value={selectedLeague}
            
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

      {/* Show the Teams in the selected League */}
        <div className="teamNameContainer">
        {leagueTeams.map((team) => 
          team.leagueId === selectedLeague ? 
          <>
            <div className='teamDiv'>
              <h3
                key={team.teamId}
                value={team.teamId} 
                onClick={() => handleTeamSelected(team.teamId, team.isPaid)}
                className={team.teamId === selectedTeam ? 'clickedTeam teamNameSelector' : 'teamNameSelector'}
              >
                {team.teamName}
              </h3>
              {team.isPaid ? null :
                <p className="paidStatus">Has Not Paid</p>
              }
            </div>
          
          </>
          : null
        )}
        </div>

      {/* Show the climbers in the selected team */}
      {selectedTeam !== 0 && selectedLeague !== 0 ? 
        <>
      <div className="climbersContainer">
        <p>Climbers:</p>
        {climbers.map((climber) => {
          return climber.teamId === selectedTeam ? (
            <p
              key={climber.id}
              value={climber.id}
              onClick={() => handleClimberSelected(climber.userId)}
              className="climberNameLink"
            >
              {climber.username}
            </p>
          ) : null
          
        })}
        {selectedTeam !== 0 ?
        <>
        <Checkbox
          checked={teamPaidStatus}
          onChange={handlePaidChange}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        <p>Paid?</p>
        </>
          : null
        }
      </div>

      
      <h3>Team Score: {teamScore}</h3>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Climber</TableCell>
              <TableCell align="right">Color</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="center">Difficulty</TableCell>
              <TableCell align="center">Attempts</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="center">Submitted</TableCell>
            </TableRow>
          </TableHead>
        
          <TableBody>
            
            {adminTeams.map((climb) => (
              <TableRow key={climb.climbId}>
                <TableCell align="right">{climb.name}</TableCell>
                <TableCell align="right">{climb.color}</TableCell>
                <TableCell align="right">{climb.locationName}</TableCell>
                <TableCell align="center">V{climb.level}</TableCell>
                <TableCell align="center">{climb.attempts}</TableCell>
                <TableCell align="right">
                  {moment(climb.climbDate).format('MM-DD-YYYY')}
                </TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={climb.isSubmitted}
                    disabled
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </TableCell>
              </TableRow>
            ))  }
            </TableBody>
          </Table>
        </TableContainer>
        </>
      : null
      }
    </Grid>
    </>
    : <h2>404  Page Not Found</h2>
  )      
}

export default AdminTeams;