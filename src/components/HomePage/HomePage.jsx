import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Header from '../Header/Header'

import JoinCreateTeam from './ConditionalViews/JoinCreateTeam';
import LeagueStatus from './ConditionalViews/LeagueStatus/LeagueStatus';
import NoLeague from './ConditionalViews/LeagueStatus/NoLeague';
import NotPaid from './ConditionalViews/NotPaid';
import LeagueNotStarted from './ConditionalViews/LeagueNotStarted';
import ByeWeek from './ConditionalViews/ByeWeek';
import StartSession from './ConditionalViews/StartSession';

function HomePage() {

  const dispatch = useDispatch();

  // Grab our conditionalData from the store
  const conditionalData = useSelector(store => store.conditional);
  const leagues = useSelector(store => store.leaguesReducer);
  const leaguesTeams = useSelector(store => store.leagueTeamReducer)

  const [climber, setClimber] = useState('')
  const [currentLeague, setCurrentLeague] = useState('')
  const [currentLeagueId, setCurrentLeagueId] = useState(0)
  const [currentLeagueStart, setCurrentLeagueStart] = useState('')
  const [currentLeagueEnd, setCurrentLeagueEnd] = useState('')
  const [inNextLeague, setInNextLeague] = useState(false)
  const [nextLeague, setNextLeague] = useState('')


  useEffect(() => {
    getCurrentLeague();
    getNextLeague();
  }, [])

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
  
  for(let league of leaguesTeams) {
    if (league.teamId === conditionalData[0].teamId && league.id === nextLeague.id && !inNextLeague) {
      setInNextLeague(true);
    }
  }

  console.log('nextLeague', nextLeague)
  console.log('currentLeagueId', currentLeagueId)


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


  // grab our start date and end date
  let from = new Date(conditionalData[0].start).getTime();
  let start = new Date(currentLeagueStart).getTime();
  let to = new Date(conditionalData[0].end).getTime();
  let week = 604800000;
  let day = 86400000;
  let allWeeks = [currentLeagueStart];
  let current =  1;
  let today = moment();
  // determine the number of weeks in the league
  let weeks = (to-from)/day/7

  // loop over weeks array to add each end of  week date to allWeeks array
  for (let i = 0; i < weeks; i++){
    allWeeks.push(new Date(from += week).toLocaleDateString())
  }

  // Loop to determine the index of the week so we can check if today is before the end of that week
  // this is so we can render the bye week page
  let weekCalc = 0;
  for (let i = 0; i < allWeeks.length; i++) {
    if (moment().isSameOrBefore(allWeeks[i])) {
    weekCalc = i;
    break;
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

  console.log('byeWeekNumber', byeWeekNumber)
  console.log('weekCalc', weekCalc)

  const ConditionalDisplay = () => {
    // If user is not on a team display the JoinCreateTeam page
    if (conditionalData[0].teamId === null) {
      return <JoinCreateTeam />;
      // if user's team is not in a league display LeagueStatus page
    } else if (!inNextLeague) {
      return <LeagueStatus />;
      // if they are in a league but have not paid display NotPaid page
    } else if (isPaid === false) {
      return <NotPaid />;
      // If the league has not started display LeagueNotStarted Page
    } else if (currentLeague === '' && moment().isBefore(nextLeague.start)) {
      return <LeagueNotStarted nextLeague={nextLeague} />;
      // if they are on their bye week display ByeWeek page
    } else if (byeWeekNumber === weekCalc + 1) {
      return <ByeWeek />
    } else {
      // else return StartSession page  
      return <StartSession/>
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
