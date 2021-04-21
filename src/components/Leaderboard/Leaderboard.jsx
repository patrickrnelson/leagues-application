import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {climberWeekCalc} from '../../scripts/climberWeekCalc'
import Header from '../Header/Header'
import './Leaderboard.css'
import moment from 'moment';

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

const useStyles = makeStyles({
  table: {
    minWidth: '350x',
  },
  tableHead: {
    fontSize: '18px',
  },
  formControl: {
    minWidth: '120',
    paddingBottom: '20px',
  },
});

function Leaderboard() {
  const classes = useStyles();

  const leagues = useSelector(store => store.leaguesReducer);
  const leagueTeams = useSelector(store => store.leagueTeamReducer);
  const climbs = useSelector(store => store.climbs)
  const user = useSelector(store => store.user);
  const conditionalData = useSelector(store => store.conditional);
  const teams = useSelector(store => store.teams);

  const [currentLeague, setCurrentLeague] = useState('')
  const [currentLeagueId, setCurrentLeagueId] = useState(0)
  const [currentLeagueStart, setCurrentLeagueStart] = useState('')
  const [currentLeagueEnd, setCurrentLeagueEnd] = useState('')

  const weeks = ['Week 1', 'Week 2', , 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7']

  let teamsInLeague = [];

  useEffect(() => {
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
}

  // console.log('teamsInLeague', teamsInLeague)

  // sort teams by score
  teamsInLeague.sort((a, b) => {
    return b.teamScore - a.teamScore;
  })

  return (
    <div className="container">
      <Header />

      <h2 className="pageTitle">League Leaderboard</h2><br/>
      <h3 className="leagueName">{currentLeague}</h3>

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
    </div>
  );
}

export default Leaderboard;
