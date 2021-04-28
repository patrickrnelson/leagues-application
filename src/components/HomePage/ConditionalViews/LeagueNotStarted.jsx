import React from 'react';
import moment from 'moment';

// this will show when your are in a league and it has not started
function LeagueNotStarted(props) {

  return (
    <div className="container">
      <h2>Your team is all set! </h2>
      <h3>{props.nextLeague.name} will start on {moment(props.nextLeague.start).format('MMMM Do YYYY')}</h3>
    </div>
  );
}

export default LeagueNotStarted;
