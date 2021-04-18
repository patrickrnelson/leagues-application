const accessCodeReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ACCESS_CODE':
      return action.payload;
    default:
      return state;
  }
};

export default accessCodeReducer;