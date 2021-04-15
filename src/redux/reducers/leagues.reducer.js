const leaguesReducer = (state = [{}], action) => {
  switch (action.type) {
    case 'SET_LEAGUES':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default leaguesReducer;
