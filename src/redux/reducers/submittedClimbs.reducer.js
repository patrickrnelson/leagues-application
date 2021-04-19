const climbsSubmittedReducer = (state = {climberOneClimbCount: 0, climberTwoClimbCount: 0, climberThreeClimbCount: 0, limit: 3}, action) => {
  switch (action.type) {
    case 'INCREASE_CLIMBER_ONE_COUNT':
      return {...state, climberOneClimbCount: state.climberOneClimbCount + 1};
    case 'DECREASE_CLIMBER_ONE_COUNT':
      return {... state, climberOneClimbCount: state.climberOneClimbCount - 1};
      case 'INCREASE_CLIMBER_TWO_COUNT':
      return {...state, climberTwoClimbCount: state.climberTwoClimbCount + 1};
    case 'DECREASE_CLIMBER_TWO__COUNT':
      return {... state, climberTwoClimbCount: state.climberTwoClimbCount - 1};
      case 'INCREASE_CLIMBER_THREE_COUNT':
      return {...state, climberThreeClimbCount: state.climberThreeClimbCount + 1};
    case 'DECREASE_CLIMBER_THREE_COUNT':
      return {... state, climberThreeClimbCount: state.climberThreeClimbCount - 1};
    default:
      return state;
  }
};


export default climbsSubmittedReducer;

