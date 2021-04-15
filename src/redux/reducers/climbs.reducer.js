const climbsReducer = (state = [{
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
    case 'SET_CLIMBS':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default climbsReducer;
