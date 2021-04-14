import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import JoinLeague from './JoinLeague';
import NoLeague from './NoLeague';
import NotInLeague from './NotInLeagueUser'

function LeagueStatus() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'FETCH_CONDITIONAL'
    })
  }, [dispatch])
  
  const [isCaptain, setIsCaptain] = useState(false);
  const [openLeague, setOpenLeague] = useState(false);

  const conditionalData = useSelector(store => store.conditional);

  const ConditionalLeagueDisplay = () => {
    // if there isn't an open league display NoLeague page
    if (!openLeague) {
      return <NoLeague />;
      // if they are the captain display JoinLeague page
    } else if (isCaptain) {
      return <JoinLeague />;
      // else display NotInLeague page
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

export default LeagueStatus;
