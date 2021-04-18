const teamsReducer = (state = 
  [{
    teamId: 0,
    teamName: '',
    userId: 0,
    username: ''
  }
  ], action) => {
  switch (action.type) {
    case 'SET_TEAMS':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default teamsReducer;



