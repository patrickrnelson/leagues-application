import React from 'react';

// This will show when the user is a captain and they haven't submitted scores this week
function CaptainStartSession() {

  return (
    <div className="container">
      <h2>Climb Session</h2>
      <h3>Week 1</h3>
      <h4>Team Name</h4>
      <button>Start Session</button>
      <button>Initiate Bye Week</button>
    </div>
  );
}

export default CaptainStartSession;
