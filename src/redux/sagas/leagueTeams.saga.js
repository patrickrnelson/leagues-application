import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchLeagueTeams() {
  try {
    const leagueTeams = yield axios.get('/api/league/teams');
    console.log('getting the league teams', leagueTeams.data);
    yield put({type: 'SET_LEAGUE_TEAMS', payload: leagueTeams.data});
  } catch (err) {
    console.log('error in league Teams', err);
  }
}

function* joinLeague(action) {
  console.log('join league action', action.payload);
  try {
    yield axios.post(`/api/league/join`, action.payload);
    yield put({ type: 'FETCH_LEAGUE_TEAMS'})
  } catch (err) {
    console.log('Error in joining teams saga', err);
  }
}

function* leagueTeamsSaga() {
  yield takeLatest('FETCH_LEAGUE_TEAMS', fetchLeagueTeams);
  yield takeLatest('JOIN_LEAGUE', joinLeague);
}

export default leagueTeamsSaga;