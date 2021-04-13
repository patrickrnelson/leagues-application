import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchClimberTeams() {
  try {

    // gets the characteristics from the DB
    let climberTeams = yield axios.get(`/api/team/all`);
    console.log('GET climber teams', teams.data);

    // SET the characteristics in the reducer
    yield put({ type: 'SET_CLIMBER_TEAMS', payload: climberTeams.data });

  } catch (error) {
    console.log('Error getting teams', error);
  }
}

function* teamsSaga() {
  yield takeLatest('FETCH_CLIMBER_TEAMS', fetchClimberTeams);
}

export default teamsSaga;