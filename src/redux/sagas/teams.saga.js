import { put, takeLatest, all } from 'redux-saga/effects';
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
    yield put({
      type: 'SET_ACCESS_CODE',
      payload: teamCode.data[0].accessCode,
    });
  } catch (error) {
    console.log('Error getting team access code', error);
  }
}

function* createTeam(action) {
  // console.log('postNewTeam', action.payload);
  try {
    yield axios.post('/api/team', action.payload);
    yield all([
      put({ type: 'FETCH_CONDITIONAL' }),
      put({ type: 'FETCH_TEAMS' }),
    ]);
  } catch (error) {
    console.log('Error posting new team', error);
  }
}

function* fetchAdminTeams(action) {
  try {
    let adminTeams = yield axios.get(`api/admin/${action.payload}`)
    yield put({type: 'SET_ADMIN_TEAMS', payload: adminTeams.data})
  } catch (err) {
    console.log("Error if admin_get_teams:", err);
  }
}

function* joinTeam(action) {
  try {
    yield put({ type: 'CLEAR_JOIN_ERROR' });
    yield axios.post(`/api/team/join/${action.payload}`);

    yield all([
      put({ type: 'FETCH_CONDITIONAL' }),
      put({ type: 'FETCH_TEAMS' }),
    ]);
  } catch (error) {
    console.log('Error joining team', error);
    if (error.response.status === 404) {
      // The 404 is the error status sent from router
      // if the access code does not match
      yield put({ type: 'ACCESS_CODE_INVALID' });
    } else if (error.response.status === 406) {
      // The 406 is the error status sent from router
      // if the team already has 3 climbers
      yield put({ type: 'TOO_MANY_CLIMBERS' });
    }
  }
}

function* removeFromTeam(action) {
  console.log('remove from team', action.payload);
  try {
    yield axios.delete(`/api/team/delete/${action.payload.climberId}/${action.payload.captainId}`);
    yield put({ type: 'FETCH_TEAMS'})
  } catch (error) {
    console.log('Error deleting team', error)
  }
}

function* teamsSaga() {
  yield takeLatest('FETCH_TEAMS', fetchTeams);
  yield takeLatest('CREATE_TEAM', createTeam);
  yield takeLatest('JOIN_TEAM', joinTeam);
  yield takeLatest('FETCH_ACCESS_CODE', fetchAccessCode);
  yield takeLatest('FETCH_ADMIN_TEAMS', fetchAdminTeams);
  yield takeLatest('REMOVE_TEAM_MEMBER', removeFromTeam);
}

export default teamsSaga;
