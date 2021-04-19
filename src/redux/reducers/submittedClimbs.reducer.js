const climbsSubmittedReducer = (state = {currentData: 0, limit: 10}, action) => {
  switch (action.type) {
    case 'INCREASE_CLIMBS_SUBMITTED':
      return {...state, currentData: state.currentData + 1};
    case 'DECREASE_CLIMBS_SUBMITTED':
      return {... state, currentData: state.currentData - 1};
    default:
      return state;
  }
};


export default climbsSubmittedReducer;

