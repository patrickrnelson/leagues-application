import React from 'react';
import {useSelector} from 'react-redux';
import { useState } from 'react';

// this will show when a user is on a team and there isn't a league
function NoLeague() {

  return (
    <div className="container">
      <h2>Welcome!</h2>
      <p>No open leagues</p>
      <p>Check back later or contact Nature of the North for additional info</p>

    </div>
  );
}

// this allows us to use <App /> in index.js
export default NoLeague;
