import React from 'react';
import {useSelector} from 'react-redux';
import { useState } from 'react';

// this will show when the user is not a captain and their scores haven't been submitted yet
function UserStartSession() {

  return (
    <div className="container">
      <h2>Climb Session</h2>
      <h3>Week 1</h3>
      <h4>Team Name</h4>
      <button>Start Session</button>
    </div>
  );
}

export default UserStartSession;
