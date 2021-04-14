import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addNewClimb(action) {
  try {
    // POST a new climb to the DB
    yield axios.post(`/api/climb/add`, action.payload);

    // Maybe want to FETCH after the post??
    // yield put({ type: 'FETCH_CLIMBS' });

  } catch (error) {
    console.log('Error POSTing new climb', error);
  }
}

function* climbsSaga() {
  yield takeLatest('ADD_NEW_CLIMB', addNewClimb);
}

export default climbsSaga;