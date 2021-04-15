import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchTeams() {
  try {

    // gets the characteristics from the DB
    let climberTeams = yield axios.get(`/api/team/all`);
    console.log('GET climber teams', climberTeams.data);

    // SET the characteristics in the reducer
    yield put({ type: 'SET_TEAMS', payload: climberTeams.data });

  } catch (error) {
    console.log('Error getting teams', error);
  }
}

function* fetchTeamAccessCodes() {
  try {
    let teamAccess = yield axios.get(`/api/team/access`);
    console.log('get teams access codes', teamAccess.data);
    yield put({ type: 'SET_ACCESS_CODES', payload: teamAccess.data });
  }
  catch (error) {
    console.log('Error getting access codes', error);
  }
}

function* createTeam(action) {
  console.log('postNewTeam', action.payload);
  try {
    yield axios.post('/api/team', action.payload);

    yield put({ type: 'FETCH_TEAMS'})
  }
  catch (error) {
    console.log('Error posting new team', error)
  }
}

function* joinTeam(action) {
  console.log('join team', action.payload);
  try{
    yield axios.post(`/api/team/join/${action.payload}`);
  }
  catch (error) {
    console.log('Error joining team', error)
  }
}

// function* fetchTeams(action) {
//   console.log('getting teams', action.payload);
//   try {
//     const leagueTeams = yield axios.get(`/api/team/leagueTeam/${action.payload}`);
//     yield put({type: 'SET_LEAGUE_TEAMS', payload: leagueTeams.data })
//   } catch (error) {
//     console.log('error in getting teams', error);
//   }
// }

function* teamsSaga() {
  yield takeLatest('FETCH_TEAMS', fetchTeams);
  yield takeLatest('FETCH_TEAM_ACCESS', fetchTeamAccessCodes);
  yield takeLatest('CREATE_TEAM', createTeam);
  yield takeLatest('JOIN_TEAM', joinTeam);
  // yield takeLatest('FETCH_LEAGUE_TEAMS', fetchTeams);
}

export default teamsSaga;