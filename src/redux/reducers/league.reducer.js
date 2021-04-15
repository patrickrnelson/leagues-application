const leagueReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_LEAGUE':
      return action.payload;
      default:
        return state;
  }
};

export default leagueReducer;