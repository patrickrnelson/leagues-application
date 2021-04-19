import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

// this will show when the user is on a team but not in a league
function JoinLeague(props) {
  const dispatch = useDispatch();
  const teamData = useSelector(store => store.teams);
  const user = useSelector(store => store.user)
  const [teamId, setTeamId] = useState('')
  
  console.log('leagueData from props', props.leagueData);
  console.log('league id', props.leagueData.id);
  console.log('team id', teamId);

  useEffect(() => {
    findTeamId();
  }, [])

  const findTeamId = () => {
    for(let team of teamData) {
      if (team.userId === user.id) {
        setTeamId(team.teamId)
      }
    }
  }

  const joinLeague = () => {
    dispatch({
      type: 'JOIN_LEAGUE',
      payload: {
        leagueId: props.leagueData.id,
        teamId: teamId
      }
    });
  }

  return (
    <div className="container">
      <h2>{props.leagueData.name} League is open</h2>
      <h3>League Dates: {moment(props.leagueData.start).format("dddd, MMMM Do YYYY")} - {moment(props.leagueData.end).format("dddd, MMMM Do YYYY")}</h3>
      <h3>Joining period ends {moment(props.leagueData.start).add(7, 'd').format("dddd, MMMM Do YYYY")}</h3>
      <button onClick={(() => joinLeague())}>Join League</button>
    </div>
  );
}

export default JoinLeague;
