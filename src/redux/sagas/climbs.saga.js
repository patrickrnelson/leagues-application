import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchClimbs() {
  try {
    let climbs = yield axios.get(`/api/climb`)
    yield put ({ type: 'SET_CLIMBS', payload: climbs.data});
  } catch (err) {
    console.log('Error in GET climbs Saga', err);
  }
}

function* fetchAdminClimbs(action) {
  try {
    let adminClimbs = yield axios.get(`/api/climb/${action.payload}`)
    yield put ({ type: 'SET_ADMIN_CLIMBS', payload: adminClimbs.data});
  } catch (err) {
    console.log("Error if admin_get_climbs:", err);
  }
}

function* addNewClimb(action) {
  try {
    // POST a new climb to the DB
    yield axios.post(`/api/climb`, action.payload);
    yield put({ type: 'FETCH_CLIMBS' });
  } catch (error) {
    console.log('Error POSTing new climb', error);
  }
}

function* unsubmitClimb(action) {
  try {
    yield axios.put('/api/climb/unsubmit', action.payload);
    yield put({ type: 'FETCH_CLIMBS' });
  } catch (error) {
    console.log('Error in Unsubmit Climb Saga', error);
  }
}

function* submitClimb(action) {
  try {
    yield axios.put('/api/climb/submit', action.payload);
    yield put({ type: 'FETCH_CLIMBS' });
  } catch (error) {
    console.log('Error in Submit Climb Saga', error);
  }
}

function* climbsSaga() {
  yield takeLatest('ADD_NEW_CLIMB', addNewClimb);
  yield takeLatest('FETCH_CLIMBS', fetchClimbs);
  yield takeLatest('FETCH_ADMIN_CLIMBS', fetchAdminClimbs);
  yield takeLatest('UNSUBMIT_CLIMB', unsubmitClimb);
  yield takeLatest('SUBMIT_CLIMB', submitClimb);
}

export default climbsSaga;