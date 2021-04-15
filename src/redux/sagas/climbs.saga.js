import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchClimbs() {

  try {
    let climbs = yield axios.get(`/api/climb`)

    yield put ({ type: 'SET_CLIMBS', payload: climbs.data});
  }
  catch (err) {
    console.log('Error in GET climbs Saga', err);
  }
}

function* addNewClimb(action) {
  try {
    // POST a new climb to the DB
    yield axios.post(`/api/climb/add`, action.payload);

    yield put({ type: 'FETCH_CLIMBS' });

  } catch (error) {
    console.log('Error POSTing new climb', error);
  }
}

function* climbsSaga() {
  yield takeLatest('ADD_NEW_CLIMB', addNewClimb);
  yield takeLatest('FETCH_CLIMBS', fetchClimbs)
}

export default climbsSaga;