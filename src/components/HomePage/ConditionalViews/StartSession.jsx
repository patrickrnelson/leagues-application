import React from 'react';
import {useSelector} from 'react-redux';
import { useState } from 'react';

function StartSession() {

  const [isCaptain, setIsCaptain] = useState(true);
  const [byeWeekAvailable, setByeWeekAvailable] = useState(true);

  return (
    <div className="container">
      <h2>Climb Session</h2>
      <h3>Week 1</h3>
      <h4>Team Name</h4>
      <button>Start Session</button>
      {/* Check if user is a captain and if they are display bye week button */}
      {isCaptain && byeWeekAvailable && <button>Initiate Bye Week</button>}
    </div>
  );
}

export default StartSession;
