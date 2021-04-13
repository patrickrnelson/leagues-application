import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchTeams() {
  try {

    // gets the characteristics from the DB
    let teams = yield axios.get(`/api/team/all`);
    console.log('GET teams', teams.data);

    // SET the characteristics in the reducer
    yield put({ type: 'SET_TEAMS', payload: teams.data });

  } catch (error) {
    console.log('Error getting teams', error);
  }
}

function* teamsSaga() {
  yield takeLatest('FETCH_TEAMS', fetchTeams);
}

export default teamsSaga;