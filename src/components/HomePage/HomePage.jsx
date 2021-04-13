import React from 'react';

import HamburgerNav from '../HamburgerNav/HamburgerNav'
import Header from '../Header/Header'

import JoinCreateTeam from './ConditionalViews/JoinCreateTeam';
import NotPaid from './ConditionalViews/NotPaid';
import ByeWeek from './ConditionalViews/ByeWeek';
import ClimbsSubmitted from './ConditionalViews/ClimbsSubmitted';
import JoinLeague from './ConditionalViews/JoinLeague';
import LeagueNotStarted from './ConditionalViews/LeagueNotStarted';
import NoLeague from './ConditionalViews/NoLeague';
import NotInLeague from './ConditionalViews/NotInLeagueUser';
import StartSession from './ConditionalViews/StartSession';

function HomePage() {

  const [userTeam, setUserTeam] = useState('')

  let ConditionalDisplay;

  if (userTeam === '') {
    ConditionalDisplay = <JoinCreateTeam />
  }

  return (
    <div className="container">
      <Header />
      <Display />
    </div>
  );
}

export default HomePage;
