const opponentReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_OPPONENT_PLAYER':
      return action.payload;
    case 'UNSET_OPPONENT_PLAYER':
      return {};
    default:
      return state;
  }
};

export default opponentReducer;
