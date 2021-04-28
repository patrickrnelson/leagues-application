const initialState = [
  {
    accessCode: "Testing",
    captainId: 1,
    id: 1,
    leagueId: 1,
    name: "Jose"
  }
]

const leagueTeamReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LEAGUE_TEAMS':
      return action.payload;
      default:
        return state;
  }
};

export default leagueTeamReducer;