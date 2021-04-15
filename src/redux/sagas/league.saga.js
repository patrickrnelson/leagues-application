import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';



function* fetchLeague() {
  try {
    const league = yield axios.get('/api/league');
    console.log('getting the league', league.data);
    yield put({type: 'SET_LEAGUE', payload: league.data});
  } catch {
    console.log('error in league');
  }
}

function* leagueSaga() {
  yield takeLatest('FETCH_LEAGUE', fetchLeague);
}

export default leagueSaga;