import React, {  useState } from 'react';
import {  useSelector } from 'react-redux';

import JoinLeague from './JoinLeague';
import NoLeague from './NoLeague';
import NotInLeague from './NotInLeagueUser'

function LeagueStatus() {

  // Still need to setup router to get League info so we can see if there is an open league
  const [openLeague, setOpenLeague] = useState(true);

  const conditionalData = useSelector(store => store.conditional);

  const ConditionalLeagueDisplay = () => {
    // if there isn't an open league display NoLeague page
    if (!openLeague) {
      return <NoLeague />;
      // if they are the captain display JoinLeague page
    } else if (conditionalData[0].captainId === conditionalData[0].userId) {
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
