const gameReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_GAME':
            return action.payload;
        case 'UNSET_GAME':
            return {};
        default:
            return state;
    }
}

export default gameReducer;