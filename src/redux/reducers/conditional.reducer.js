const initialState = [{
  userId: 0,
  teamId: 0,
  captainId: 0,
  teamName: '',
  leagueName: '',
  isPaid: false,
  byeWeek: null,
  end: '',
  start: '',
  isSubmitted: null
}]

const conditionalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CONDITIONAL':
      return action.payload;
    default:
      return state;
  }
};

export default conditionalReducer;
