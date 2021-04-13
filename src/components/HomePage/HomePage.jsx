import React from 'react';

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

  const [userTeam, setUserTeam] = useState('')

  let ConditionalDisplay = <JoinCreateTeam />

  if (userTeam !== '') {
    ConditionalDisplay = 
  }

  return (
    <div className="container">
      <Header />
      <ConditionalDisplay />
    </div>
  );
}

export default HomePage;
