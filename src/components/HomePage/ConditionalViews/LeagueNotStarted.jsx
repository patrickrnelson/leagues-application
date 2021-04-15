import React from 'react';
import {useSelector} from 'react-redux';
import { useState } from 'react';

// this will show when your are in a league and it has not started
function LeagueNotStarted() {

  return (
    <div className="container">
      <h2>Your team is all set! </h2>
      <h3>Summer League will start on 05/01/2021</h3>
    </div>
  );
}

export default LeagueNotStarted;
