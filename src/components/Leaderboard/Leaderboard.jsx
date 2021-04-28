import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

// Material-UI imports
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

// Custom Components
import Header from '../Header/Header';
import './Leaderboard.css';
import {climberWeekCalc} from '../../scripts/climberWeekCalc';
import boulderNine from '../Images/boulder9.png';

const useStyles = makeStyles({
  table: {
    minWidth: '350x',
  },
  tableHead: {
    fontSize: '18px',
    backgroundColor: '#78AF61',
  },
  formControl: {
    minWidth: '120',
    paddingBottom: '20px',
  },
  myTeam: {
    fontWeight: 'bolder',
    color: 'black ',
    backgroundColor: '#ad0c0ca1'
  }
});

function Leaderboard() {
  const classes = useStyles();

  // Redux Store
  const leagues = useSelector(store => store.leaguesReducer);
  const leagueTeams = useSelector(store => store.leagueTeamReducer);
  const climbs = useSelector(store => store.climbs)
  const user = useSelector(store => store.user);
  const conditionalData = useSelector(store => store.conditional);
  const teams = useSelector(store => store.teams);

  // State Variables
  const [currentLeague, setCurrentLeague] = useState('')
  const [currentLeagueId, setCurrentLeagueId] = useState(0)
  const [currentLeagueStart, setCurrentLeagueStart] = useState('')
  const [currentLeagueEnd, setCurrentLeagueEnd] = useState('')
  const [userTeam, setUserTeam] = useState('')

  const weeks = ['Week 1', 'Week 2', , 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7']

  let teamsInLeague = [];

  useEffect(() => {
    findUserTeam();
    getCurrentLeague();
  }, []);

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
  }; // end getCurrentLeague


  // loop through teams to get team for current climber
  const findUserTeam = () => {
    console.log('In Find User Team');
    for(let climber of teams) {
      if (climber.userId === user.id) {
        setUserTeam(climber.teamName)
      }
    }
  }; // end findUserTeam

  // loop through teams in league and get their total scores
  for(let team of leagueTeams) {
    if(team.leagueId === currentLeagueId) {
    let teamScore = 0
    for(let climber of teams) {
      if (team.teamId === climber.teamId) {
        teamScore += climberWeekCalc(climber.userId, currentLeagueStart, currentLeagueEnd, climbs).totalScore
      }
    }
    teamsInLeague.push({teamName: team.teamName, teamId: team.teamId, teamScore: teamScore})
  }
};

  // console.log('teamsInLeague', teamsInLeague)

  // sort teams by score
  teamsInLeague.sort((a, b) => {
    return b.teamScore - a.teamScore;
  });

  return (
    <div className="container-leaderboard">
      <Header />
      <h2 className="leagueName">{currentLeague}</h2>
      <h3 className="pageTitle">League Leaderboard</h3>
      

      {/* <h4>{currentWeek == '--Total--' ? '' : currentWeek}</h4>
      <FormControl className={classes.formControl}>
        <NativeSelect onChange={(event) => setCurrentWeek(event.target.value)}> 
          <option>Total</option>
          {weeks.map((week) => { return (
            <option>{week}</option>
          )})}
        </NativeSelect>
        <FormHelperText>Week</FormHelperText>
      </FormControl> */}

      <TableContainer>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
            <TableCell className={classes.tableHead} align="center">#</TableCell>
              <TableCell className={classes.tableHead} align="center">Team</TableCell>
              <TableCell className={classes.tableHead} align="center">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {teamsInLeague.map((team, index) => {
            // if(team.leagueName === currentLeague) {
              
            return (
              team.teamName === userTeam ?
              <TableRow>
                <TableCell className={classes.myTeam} align="center"> {index + 1} </TableCell>
                  <TableCell className={classes.myTeam} align="center"> {team.teamName} </TableCell>
                <TableCell className={classes.myTeam} align="center"> {team.teamScore} </TableCell>
              </TableRow>
              : 

              <TableRow>
                <TableCell align="center"> {index + 1} </TableCell>
                  <TableCell align="center"> {team.teamName} </TableCell>
                <TableCell align="center"> {team.teamScore} </TableCell>
              </TableRow>
            )
          })}
          </TableBody>
        </Table>
      </TableContainer>
      <img className="leader-image" src = {boulderNine} alt="boulder" height="150px"  />
    </div>
  );
}

export default Leaderboard;
