import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HamburgerNav from '../HamburgerNav/HamburgerNav'
import Header from '../Header/Header'

import JoinCreateTeam from './ConditionalViews/JoinCreateTeam';
import NotPaid from './ConditionalViews/NotPaid';
import ByeWeek from './ConditionalViews/ByeWeek';
import ClimbsSubmitted from './ConditionalViews/ClimbsSubmitted';
import LeagueNotStarted from './ConditionalViews/LeagueNotStarted';
import StartSession from './ConditionalViews/StartSession';
import LeagueStatus from './ConditionalViews/LeagueStatus/LeagueStatus';

function HomePage() {

  const [userTeam, setUserTeam] = useState(true)
  const [inLeague, setInLeague] = useState(false)

  const ConditionalDisplay = () => {
    if (!userTeam) {
      return <JoinCreateTeam />;
    } else if (!inLeague) {
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
