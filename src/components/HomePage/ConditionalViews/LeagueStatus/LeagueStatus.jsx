import React, {  useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import moment from 'moment';

import JoinLeague from './JoinLeague';
import NoLeague from './NoLeague';
import NotInLeague from './NotInLeagueUser'

function LeagueStatus() {

  const conditionalData = useSelector(store => store.conditional);
  const leagueData = useSelector(store => store.leaguesReducer);

  let openLeague = '';

  for (let i = 0; i < leagueData.length; i++) {
    if (moment().isSameOrBefore(moment(leagueData[i].start).add(7, 'd'))) {
      openLeague = leagueData[i];
    }
  }

  const ConditionalLeagueDisplay = () => {
    // if there isn't an open league display NoLeague page
    if (openLeague === '') {
      return <NoLeague />;
      // if they are the captain display JoinLeague page
    } else if (conditionalData[0].captainId === conditionalData[0].userId) {
      return <JoinLeague leagueData={openLeague} />;
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
