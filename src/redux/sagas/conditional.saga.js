import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchConditional() {
  
  try {

    const response = yield axios.get('/api/user/conditional');
    
    yield put ({ type: 'SET_CONDITIONAL', payload: response.data});
  } catch (error) {
    console.log('Conditional request failed', error)
  }
}

function* conditionalSaga() {
  yield takeLatest('FETCH_CONDITIONAL', fetchConditional);
}

export default conditionalSaga;