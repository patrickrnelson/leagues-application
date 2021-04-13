import React from 'react';

import HamburgerNav from '../HamburgerNav/HamburgerNav'
import Header from '../Header/Header'

import JoinLeague from './JoinLeague';
import NoLeague from './NoLeague';
import NotInLeague from './NotInLeagueUser'

function HomePage() {

  const [isCaptain, setIsCaptain] = useState(false);
  const [openLeague, setOpenLeague] = useState(false);

  let ConditionalLeagueDisplay = <NoLeague />

  if (!openLeague) {
    return;
  } else if (isCaptain) {
    ConditionalLeagueDisplay = <JoinLeague />
    return;
  } else {
    ConditionalLeagueDisplay = <NotInLeague />
  }

  return (
    <div className="container">
      <Header />
      <ConditionalLeagueDisplay />
    </div>
  );
}

export default HomePage;
