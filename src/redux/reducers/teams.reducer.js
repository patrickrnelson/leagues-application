import React from 'react';
import ReactDOM from 'react-dom';
import logger from 'redux-logger';
import axios from 'axios';
import { combineReducers } from 'redux';

const teamsReducer = (state = 
  [{
    teamId: 0,
    teamName: '',
    userId: 0,
    username: ''
  }
  ], action) => {
  switch (action.type) {
    case 'SET_CLIMBER_TEAMS':
      return action.payload;
    default:
      return state;
  }
};

const leagueReducer = ( state = [], action) => {
  if(action.type === 'FETCH_LEAGUE_INFO'){
    return action.payload
  }
  return state;
}; // end leagueReducer 


// user will be on the redux state at:
// state.user
export default combineReducers({
  teamsReducer,
  leagueReducer

})
