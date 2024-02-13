import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchLeaderBoard() {
    try {
        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        };

        const response = yield axios.get("/api/leaderBoard", config);

        // console.log("leaderboard data from db:", response.data);
        yield put({ type: "SET_LEADERBOARD", payload: response.data });
    } catch (error) {
        console.log("Leader Board get request failed");
        console.error(error);
    }
}

function* fetchPlayerStats(action) {
    try {
        const generatorActionType = action.payload.isOpponent
            ? "SET_OPPONENT_PLAYER"
            : "SET_THIS_PLAYER";

            console.log("[inside fetchPlayerStats in leaderBoard.saga; isOpponent ?:]", action.payload.isOpponent);
            console.log("[inside fetchPlayerStats in leaderBoard.saga] put call action type:", generatorActionType);
        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        };

        const response = yield axios.get(
            `/api/leaderBoard/${action.payload.id}`,
            config
        );

        console.log(
            "single player stats leaderboard data from db:",
            response.data
        );
        yield put({ type: generatorActionType, payload: response.data });
    } catch (error) {
        console.log("Leader Board get request failed");
        console.error(error);
    }
}

function* leaderBoardSaga() {
    yield takeLatest("FETCH_USER_LEADERBOARD", fetchLeaderBoard);

    yield takeLatest("FETCH_PLAYER_STATS", fetchPlayerStats);
}

export default leaderBoardSaga;
