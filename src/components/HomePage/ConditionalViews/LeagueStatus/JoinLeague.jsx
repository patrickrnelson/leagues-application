import React from 'react';
import moment from 'moment';

// this will show when the user is on a team but not in a league
function JoinLeague(props) {

  console.log('leagueData from props', props.leagueData);

  return (
    <div className="container">
      <h2>{props.leagueData.name} League is open</h2>
      <h3>League Dates: {moment(props.leagueData.start).format("dddd, MMMM Do YYYY")} - {moment(props.leagueData.end).format("dddd, MMMM Do YYYY")}</h3>
      <h3>Joining period ends 05/08/2021</h3>
      <button>Join League</button>
    </div>
  );
}

export default JoinLeague;
