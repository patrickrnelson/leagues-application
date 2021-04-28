import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Header from '../Header/Header'

import JoinCreateTeam from './ConditionalViews/JoinCreateTeam';
import LeagueStatus from './ConditionalViews/LeagueStatus/LeagueStatus';
import NotPaid from './ConditionalViews/NotPaid';
import LeagueNotStarted from './ConditionalViews/LeagueNotStarted';
import ByeWeek from './ConditionalViews/ByeWeek';
import StartSession from './ConditionalViews/StartSession';

function HomePage() {

  // Grab our conditionalData from the store
  const conditionalData = useSelector(store => store.conditional);
  const leagues = useSelector(store => store.leaguesReducer);
  const leaguesTeams = useSelector(store => store.leagueTeamReducer)

  const [currentLeague, setCurrentLeague] = useState('')
  const [currentLeagueId, setCurrentLeagueId] = useState(0)
  const [currentLeagueStart, setCurrentLeagueStart] = useState('')
  const [currentLeagueEnd, setCurrentLeagueEnd] = useState('')
  const [nextLeague, setNextLeague] = useState('')

  useEffect(() => {
    getCurrentLeague();
    getNextLeague();
  })

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

  // get the next league
  const getNextLeague = () => { 
    for (let league of leagues) {
      if (moment().isBefore(league.start)) {
        setNextLeague(league);
        if(nextLeague !== '') {
          break;
        };
      }
    }
  } 

  let from = new Date(currentLeagueStart).getTime();
  let to = new Date(currentLeagueEnd).getTime();
  let week = 604800000;
  let day = 86400000;
  let allWeeks = [currentLeagueStart];
  let current =  1;
  // determine the number of weeks in the league
  let weeks = (to-from)/day/7

  // loop over weeks array to add each end of  week date to allWeeks array
  for (let i = 0; i < weeks; i++){
    allWeeks.push(new Date(from += week).toLocaleDateString())
  }

  let weekCalc = 0;
  for (let i = 0; i < allWeeks.length; i++) {
    if (moment().isSameOrBefore(allWeeks[i])) {
    weekCalc = i;
    break;
    }
  }

  // check if team has paid for this league
  let isPaid = false;
    for(let paidTeam of leaguesTeams) {
      if(paidTeam.leagueId == nextLeague.id || currentLeagueId) {
        if(paidTeam.teamId == conditionalData[0].teamId && paidTeam.isPaid == true) {
          isPaid = true;
          break;
        }
      }
    }

  let inNextLeague = false;  
  for(let league of leaguesTeams) {
    if (league.teamId === conditionalData[0].teamId && league.leagueId === nextLeague.id && !inNextLeague) {
      inNextLeague = true;
      }
    }
  
  let inCurrentLeague = false;  
  for(let league of leaguesTeams) {
    if (league.teamId === conditionalData[0].teamId && league.leagueId === currentLeagueId && !inCurrentLeague) {
      inCurrentLeague = true;
    }
  }
    
  let byeWeekNumber = null;

  for (let team of leaguesTeams) {
    if(conditionalData[0].teamId === team.teamId) {
      if(team.leagueId === currentLeagueId) {
        if(team.byeWeek !== null) {
          byeWeekNumber = team.byeWeek;
        }
      }
    }
  }

  const ConditionalDisplay = () => {
    // If user is not on a team display the JoinCreateTeam page
    if (conditionalData[0].teamId === null) {
      return <JoinCreateTeam />;
      // if user's team is not in a league display LeagueStatus page
    } 
    if (!isPaid && (inCurrentLeague || inNextLeague)) {
      return <NotPaid />;
    } 
    if (inCurrentLeague) {
      if (byeWeekNumber === weekCalc) {
        return <ByeWeek />
      } else {
        return <StartSession/>
      }
    } 
    if (inNextLeague) {
      return <LeagueNotStarted nextLeague={nextLeague} />;   
    } 
    if (!inCurrentLeague && !inNextLeague) {
      return <LeagueStatus />;
    }
  }

  return (
    <div className="container">
      <Header />
      <ConditionalDisplay />
    </div>
  );
}

export default HomePage;
