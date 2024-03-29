const gameReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_GAME":
            return action.payload;
        case "DELETE_GAME":
            return {};
        case "PLAYER_JOIN":
            return {
                ...state,
                userIdBlack: action.payload.userIdBlack,
                gameId: action.payload.gameId,
            };
        case "BOARD_UPDATE":
            return {
                ...state,
                fen: action.payload.fen,
                statusSignal: action.payload.type,
            };
        default:
            return state;
    }
};

export default gameReducer;
