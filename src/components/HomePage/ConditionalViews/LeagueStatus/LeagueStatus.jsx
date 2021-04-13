import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import JoinLeague from './JoinLeague';
import NoLeague from './NoLeague';
import NotInLeague from './NotInLeagueUser'

function HomePage() {

  const [isCaptain, setIsCaptain] = useState(true);
  const [openLeague, setOpenLeague] = useState(false);

  const ConditionalLeagueDisplay = () => {
    if (!openLeague) {
      return <NoLeague />;
    } else if (isCaptain) {
      return <JoinLeague />;
    } else {
      return <NotInLeague />
    }
  }

  return (
    <div className="container">
      <ConditionalLeagueDisplay />
    </div>
  );
}

export default HomePage;
