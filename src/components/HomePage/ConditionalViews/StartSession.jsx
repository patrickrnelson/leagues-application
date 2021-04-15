import React from 'react';
import {useSelector} from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

function StartSession(props) {

  const history = useHistory();

  // Grab our conditionalData from the store
  const conditionalData = useSelector(store => store.conditional);

  return (
    <div className="container">
      <h2>Climb Session</h2>
      <h3>{props.weekCalc + 1}</h3>
      <h4>{conditionalData[0].teamName}</h4>
      <button onClick={() => history.push('/climb/session')}>Start Session</button>
      {/* Check if user is a captain and if they are display bye week button */}
      {conditionalData[0].captainId === conditionalData[0].userId && conditionalData[0].byeWeek === null && <button>Initiate Bye Week</button>}
    </div>
  );
}

export default StartSession;
