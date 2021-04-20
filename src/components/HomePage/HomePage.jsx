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

  const [climber, setClimber] = useState('')
  const [currentLeague, setCurrentLeague] = useState('')
  const [currentLeagueId, setCurrentLeagueId] = useState(0)
  const [currentLeagueStart, setCurrentLeagueStart] = useState('')
  const [currentLeagueEnd, setCurrentLeagueEnd] = useState('')

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

  // grab our start date and end date
  let from = new Date(conditionalData[0].start).getTime();
  let start = new Date(currentLeagueStart).getTime();
  let to = new Date(conditionalData[0].end).getTime();
  let week = 604800000;
  let day = 86400000;
  let allWeeks = [];
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

  

  const ConditionalDisplay = () => {
    // If user is not on a team or is on a team that is not in the current league
    // and today's date is more than a week after the league start, then they can't join the league. 
    if (conditionalData[0].leagueName !== currentLeague && today.isAfter(start + week)) {
      // console.log('No League');
      return <NoLeague />;
    }
    // If user is not on a team display the JoinCreateTeam page
    if (conditionalData[0].teamId === null) {
      return <JoinCreateTeam />;
      // if user's team is not in a league display LeagueStatus page - also check if current date is after league end date
    } else if (conditionalData[0].leagueName === null) {
      return <LeagueStatus />;
      // if they are in a league but have not paid display NotPaid page
    } else if (conditionalData[0].isPaid === false) {
      return <NotPaid />;
      // If the league has not started display LeagueNotStarted Page
    } else if (!moment(conditionalData[0].start).isSameOrBefore()) {
      return <LeagueNotStarted />;
      // if they are on their bye week display ByeWeek page
    } else if (conditionalData[0].byeWeek !== null && moment(conditionalData[0].ByeWeek).isSameOrBefore(allWeeks[weekCalc])) {
      return <ByeWeek />
    } else {
      // else return StartSession page  
      return <StartSession weekCalc={weekCalc} />
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
