const initialState = [
  {
    accessCode: "",
    captainId: 0,
    id: 0,
    leagueId: 0,
    name: ""
  }
]

const leagueTeamReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LEAGUE_TEAMS':
      return action.payload;
      default:
        return state;
  }
}

export default leagueTeamReducer;