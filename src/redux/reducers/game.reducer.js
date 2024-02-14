const gameReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_GAME':
            return action.payload;
        case 'UNSET_GAME':
            return {};
        case 'BOARD_UPDATE':
            return {...state, fen: action.payload.fen, type: action.payload.type};
        default:
            return state;
    }
}

export default gameReducer;