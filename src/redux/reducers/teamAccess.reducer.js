const teamAccessReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ACCESS_CODES':
      return action.payload;
    default:
      return state;
  }
};

export default teamAccessReducer;
