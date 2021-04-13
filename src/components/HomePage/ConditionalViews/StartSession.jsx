import React from 'react';
import {useSelector} from 'react-redux';
import { useState } from 'react';

function StartSession() {

  const [isCaptain, setIsCaptain] = useState(false);

  return (
    <div className="container">
      <h2>Climb Session</h2>
      <h3>Week 1</h3>
      <h4>Team Name</h4>
      <button>Start Session</button>
      {isCaptain && <button>Initiate Bye Week</button>}
    </div>
  );
}

export default StartSession;
