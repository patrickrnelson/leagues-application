import axios from 'axios';
import { put, takeLatest, all } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user/login', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
    yield all([
      put({ type: 'FETCH_CONDITIONAL' }),
      put({ type: 'FETCH_CLIMBS' }),
      put({ type: 'FETCH_TEAMS' }),
      put({ type: 'FETCH_LEAGUES' })
    ]);
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* editUserProfile(action) {
  console.log('in edit user Saga');
  try {
    yield axios.put('/api/user', action.payload)

    yield put({ type: 'FETCH_USER'})
  }
  catch(err) {
    console.log('Error editing user profile', err);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('EDIT_USER_PROFILE', editUserProfile);
}


export default userSaga;
