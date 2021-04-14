import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import HamburgerNav from '../HamburgerNav/HamburgerNav'
import Header from '../Header/Header'

import JoinCreateTeam from './ConditionalViews/JoinCreateTeam';
import LeagueStatus from './ConditionalViews/LeagueStatus/LeagueStatus';
import NotPaid from './ConditionalViews/NotPaid';
import LeagueNotStarted from './ConditionalViews/LeagueNotStarted';
import ByeWeek from './ConditionalViews/ByeWeek';
import ClimbsSubmitted from './ConditionalViews/ClimbsSubmitted';
import StartSession from './ConditionalViews/StartSession';

function HomePage() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'FETCH_CONDITIONAL'
    })
  }, [dispatch])

  // Store state variables to determine conditional rendering
  const [isByeWeek, setIsByeWeek] = useState(false);
  const [climbsAreSubmitted, setClimbsAreSubmitted] = useState(false);

  const conditionalData = useSelector(store => store.conditional);

  let from = new Date(conditionalData[0].start).getTime();
  let to = new Date(conditionalData[0].end).getTime();
  let week = 604800000;
  let day = 86400000;
  let allWeeks = [];
  let current =  1;

  let weeks = (to-from)/day/7

  for (let i = 0; i < weeks; i++){
    allWeeks.push(new Date(from += week).toLocaleDateString())
  }

  console.log(JSON.stringify(allWeeks))

  let weekCalc = 0;

  for (let i = 0; i < allWeeks.length; i++) {
    if (moment().isSameOrBefore(allWeeks[i])) {
    weekCalc = i;
    break;
    }
  }

  console.log('weekCalc', weekCalc);

  const ConditionalDisplay = () => {
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
    } else if (conditionalData[0].byeWeek !== null && moment(conditionalData[0].ByeWeek).isSameOrBefore(allWeeks[weekCalc])) {
      // if they are on their bye week display ByeWeek page
      return <ByeWeek />
      // if they submitted their climbs then display ClimbsSubmitted page
    } else if (climbsAreSubmitted) {
      return <ClimbsSubmitted />;
    } else {
      // else return StartSession page  
      return <StartSession />
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
