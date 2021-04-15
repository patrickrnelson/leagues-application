import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import leagueSaga from './league.saga';

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

function* fetchTeamAccessCodes() {
  try {
    let teamAccess = yield axios.get(`/api/team/access`);
    console.log('get teams access codes', teamAccess.data);
    yield put({ type: 'SET_ACCESS_CODES', payload: teamAccess.data });
  }
  catch (error) {
    console.log('Error getting access codes', error);
  }
}

function* createTeam(action) {
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

function* joinTeam(action) {
  console.log('join team', action.payload);
  try{
    yield axios.post(`/api/team/join/${action.payload}`);
  }
  catch (error) {
    console.log('Error joining team', error)
  }

}

// function* fetchTeams(action) {
//   console.log('getting teams', action.payload);
//   try {
//     const leagueTeams = yield axios.get(`/api/team/leagueTeam/${action.payload}`);
//     yield put({type: 'SET_LEAGUE_TEAMS', payload: leagueTeams.data })
//   } catch (error) {
//     console.log('error in getting teams', error);
//   }
// }

function* teamsSaga() {

  yield takeLatest('FETCH_CLIMBER_TEAMS', fetchClimberTeams);
  yield takeLatest('FETCH_TEAM_ACCESS', fetchTeamAccessCodes);
  yield takeLatest('CREATE_TEAM', createTeam);
  yield takeLatest('JOIN_TEAM', joinTeam);
  yield takeLatest('FETCH_LEAGUE_TEAMS', getLeagueViewInfo);
}

//comment for push

export default teamsSaga;