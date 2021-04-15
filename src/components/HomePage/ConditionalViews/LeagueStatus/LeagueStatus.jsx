import React, {  useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import moment from 'moment';

import JoinLeague from './JoinLeague';
import NoLeague from './NoLeague';
import NotInLeague from './NotInLeagueUser'

function LeagueStatus() {

  // Still need to setup router to get League info so we can see if there is an open league
  const [isOpenLeague, setIsOpenLeague] = useState(true);

  const conditionalData = useSelector(store => store.conditional);
  const leagueData = useSelector(store => store.leaguesReducer);

  useEffect(() => {
    console.log('leagueData', leagueData)
    checkIfLeagueIsOpen();
  }, [])


  let openLeague = '';

  let checkIfLeagueIsOpen = () => {
    for (let i = 0; i < leagueData.length; i++) {
      if (moment().isSameOrBefore(leagueData[i].start)) {
        console.log('leagueData[i]', leagueData[i])        
        // openLeague = leagueData[i];
        // console.log('openLeague', openLeague)
        break;
      }
    }
  }


  const ConditionalLeagueDisplay = () => {
    // if there isn't an open league display NoLeague page
    if (!isOpenLeague) {
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
