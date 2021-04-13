import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* postNewTeam(action) {
  console.log('postNewTeam', action.payload);
  try {
    yield axios.post('/api/team', action.payload);
  }
  catch (error) {
    console.log('Error posting new team', error)
  }
}

function* teamSaga() {
  yield takeLatest('CREATE_TEAM', postNewTeam)
}

export default teamSaga;