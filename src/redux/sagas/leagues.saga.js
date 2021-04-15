import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchLeagues() {

  try {
    let leagues = yield axios.get(`/api/league`)

    yield put ({ type: 'SET_LEAGUES', payload: leagues.data});
  }
  catch (err) {
    console.log('Error in GET leagues Saga', err);
  }
}

function* leaguesSaga() {
  yield takeLatest('FETCH_LEAGUES', fetchLeagues)
}

export default leaguesSaga;