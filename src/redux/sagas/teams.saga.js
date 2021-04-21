import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import adminTeamsReducer from '../reducers/admin.teams.reducer';

function* fetchTeams() {
  try {
    // gets the characteristics from the DB
    let climberTeams = yield axios.get(`/api/team/`);
    // console.log('GET climber teams', climberTeams.data);
    // SET the characteristics in the reducer
    yield put({ type: 'SET_TEAMS', payload: climberTeams.data });

  } catch (error) {
    console.log('Error getting teams', error);
  }
}

function* fetchAccessCode(action) {
  try {
    // gets the characteristics from the DB

    // console.log('action in saga', action.payload); 
    let teamCode = yield axios.get(`/api/team/access/${action.payload}`);
    // console.log('GET access code', teamCode.data[0].accessCode);

    yield put({ type: 'SET_ACCESS_CODE', payload: teamCode.data[0].accessCode })
  } catch (error) {
    console.log('Error getting team access code', error);
  }
}

function* createTeam(action) {
  // console.log('postNewTeam', action.payload);
  try {
    yield axios.post('/api/team', action.payload);
    yield put({ type: 'FETCH_TEAMS'})
  }
  catch (error) {
    console.log('Error posting new team', error)
  }
}

function* fetchAdminTeams(action) {
  try {
    let adminTeams = yield axios.get(`api/admin/${action.payload}`)
    yield put({type: 'SET_ADMIN_TEAMS', payload: adminTeams.data})
  }
  catch (err) {
    console.log("Error if admin_get_teams:", err);
  }
}



// function* getLeagueViewInfo() {
//   try{
//     let leagueInfo = yield axios.get(`/api/league`)
//     console.log('Get League info', leagueInfo.data);
//     yield put ({type: 'FETCH_LEAGUE_INFO', payload: leagueInfo.data});
//   }
//   catch (error) {
//     console.log('Error getting the league info', error)
//   }
// }

function* joinTeam(action) {
  try{
    yield put({ type: 'CLEAR_JOIN_ERROR' });
    yield axios.post(`/api/team/join/${action.payload}`)
    yield put({ type: 'FETCH_TEAMS'})
  }
  catch (error) {
    console.log('Error joining team', error)
    if (error.response.status === 404) {
      // The 404 is the error status sent from router
      // if the access code does not match
      yield put({ type: 'ACCESS_CODE_INVALID' });
    }
  }
}

function* teamsSaga() {
  yield takeLatest('FETCH_TEAMS', fetchTeams);
  yield takeLatest('CREATE_TEAM', createTeam);
  yield takeLatest('JOIN_TEAM', joinTeam);
  yield takeLatest('FETCH_ACCESS_CODE', fetchAccessCode);
  yield takeLatest('FETCH_ADMIN_TEAMS', fetchAdminTeams);
}

export default teamsSaga;