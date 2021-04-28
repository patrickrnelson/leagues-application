import React from 'react';

// this will show when a user is on a team and there isn't a league
function NoLeague() {

  return (
    <div className="container-conditionals">
      <h3>Welcome!</h3>
      <p>No open leagues</p>
      <p>Check back later or contact Nature of the North for additional info</p>

    </div>
  );
}

// this allows us to use <App /> in index.js
export default NoLeague;
