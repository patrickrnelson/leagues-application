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

  const [isOnTeam, setIsOnTeam] = useState(false)
  const [inLeague, setInLeague] = useState(false)
  const [isPaid, setIsPaid] = useState(false)
  const [isLeagueStarted, setIsLeagueStarted] = useState(false)
  const [isByeWeek, setIsByeWeek] = useState(false);
  const [climbsAreSubmitted, setClimbsAreSubmitted] = useState(false);

  const ConditionalDisplay = () => {
    if (!isOnTeam) {
      return <JoinCreateTeam />;
    } else if (!inLeague) {
      return <LeagueStatus />;
    } else if (!isPaid) {
      return <NotPaid />;
    } else if (!isLeagueStarted) {
      return <LeagueNotStarted />;
    } else if (!isByeWeek) {
      return <ByeWeek />
    } else if (climbsAreSubmitted) {
      return <ClimbsSubmitted />;
    } else {
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
