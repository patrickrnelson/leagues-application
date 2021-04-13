const conditionalReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CONDITIONAL':
      return action.payload;
    default:
      return state;
  }
};

export default conditionalReducer;
