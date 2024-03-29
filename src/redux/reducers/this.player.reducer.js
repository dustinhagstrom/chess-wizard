const thisPlayerReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_THIS_PLAYER':
      return action.payload;
    case 'UNSET_THIS_PLAYER':
      return {};
    default:
      return state;
  }
};

export default thisPlayerReducer;
