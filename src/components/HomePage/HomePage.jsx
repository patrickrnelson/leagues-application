import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

  // Store state variables to determine conditional rendering
  const [isOnTeam, setIsOnTeam] = useState(false);
  const [inLeague, setInLeague] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isLeagueStarted, setIsLeagueStarted] = useState(false);
  const [isByeWeek, setIsByeWeek] = useState(false);
  const [climbsAreSubmitted, setClimbsAreSubmitted] = useState(false);

  const ConditionalDisplay = () => {
    // If user is not on a team display the JoinCreateTeam page
    if (!isOnTeam) {
      return <JoinCreateTeam />;
      // if user's team is not in a league display LeagueStatus page
    } else if (!inLeague) {
      return <LeagueStatus />;
      // if they are in a league but have not paid display NotPaid page
    } else if (!isPaid) {
      return <NotPaid />;
      // If the league has not started display LeagueNotStarted Page
    } else if (!isLeagueStarted) {
      return <LeagueNotStarted />;
    } else if (isByeWeek) {
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
