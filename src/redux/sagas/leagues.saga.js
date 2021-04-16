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

function* createNewLeagues(action) {
  console.log('see what is the action.payload', action.payload)
  try {
    yield axios.post('/api/league', action.payload);
    yield put({type: 'FETCH_LEAGUES'})
  }
  catch(error) {
    console.log('Error in POST createNewleagues Saga', error);
  }
}

function* leaguesSaga() {
  yield takeLatest('FETCH_LEAGUES', fetchLeagues)
  yield takeLatest('CREATE_NEW_LEAGUE', createNewLeagues )

}


export default leaguesSaga;
