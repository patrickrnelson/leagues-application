import React from 'react';
import { useHistory } from 'react-router-dom';

import HamburgerNav from '../HamburgerNav/HamburgerNav'
import Header from '../Header/Header'

import ByeWeek from './ConditionalViews/ByeWeek';
import CaptainStartSession from './ConditionalViews/CaptainStartSession';
import ClimbsSubmitted from './ConditionalViews/ClimbsSubmitted';
import JoinCreateTeam from './ConditionalViews/JoinCreateTeam';
import JoinLeague from './ConditionalViews/JoinLeague';
import LeagueNotStarted from './ConditionalViews/LeagueNotStarted';
import NoLeague from './ConditionalViews/NoLeague';
import NotInLeague from './ConditionalViews/NotInLeagueUser';
import NotPaid from './ConditionalViews/NotPaid';
import UserStartSession from './ConditionalViews/UserStartSession';


function HomePage() {
  const history = useHistory();
  return (
    <div>inhome</div>
  );
}

export default HomePage;
