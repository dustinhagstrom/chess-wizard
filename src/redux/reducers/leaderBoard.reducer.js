const leaderBoardReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_LEADERBOARD':
      return action.payload;
    case 'UNSET_LEADERBOARD':
      return {};
    default:
      return state;
  }
};

export default leaderBoardReducer;
