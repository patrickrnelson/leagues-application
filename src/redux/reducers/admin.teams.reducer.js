const adminTeamsReducer = (state = [{
  attempts: 0,
  climbDate: '',
  climbId: 0,
  color: '',
  isSubmitted: false,
  level: 0,
  name: '',
  userId: 0
}], action) => {
  switch (action.type) {
    case 'SET_ADMIN_TEAMS':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default adminTeamsReducer;