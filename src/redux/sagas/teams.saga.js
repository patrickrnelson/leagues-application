import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchClimberTeams() {
  try {

    // gets the characteristics from the DB
    let climberTeams = yield axios.get(`/api/team/all`);
    console.log('GET climber teams', climberTeams.data);

    // SET the characteristics in the reducer
    yield put({ type: 'SET_CLIMBER_TEAMS', payload: climberTeams.data });

  } catch (error) {
    console.log('Error getting teams', error);
  }
}

function* postNewTeam(action) {
  console.log('postNewTeam', action.payload);
  try {
    yield axios.post('/api/team', action.payload);
  }
  catch (error) {
    console.log('Error posting new team', error)
  }
}

function* getLeagueViewInfo() {

  try{
    let leagueInfo = yield axios.get(`/api/league`)
    console.log('Get League info', leagueInfo.data);
    yield put ({type: 'FETCH_LEAGUE_INFO', payload: leagueInfo.data});
  }
  catch (error) {
    console.log('Error getting the league info', error)
  }

}

function* teamsSaga() {
  yield takeLatest('FETCH_CLIMBER_TEAMS', fetchClimberTeams);
  yield takeLatest('CREATE_TEAM', postNewTeam);
  yield takeLatest('FETCH_LEAGUE', getLeagueViewInfo);
}

export default teamsSaga;