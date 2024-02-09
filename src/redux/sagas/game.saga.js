import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* hostGame(action) {
    console.log("[inside hostGame generator function game.saga.js]");
    try {
        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        };

        const response = yield axios.get("/api/game", config);

        // console.log("leaderboard data from db:", response.data);
        yield put({ type: "SET_GAME", payload: response.data });
    } catch (error) {
        console.log("game host request failed");
        console.error(error);
    }
}

function* joinGame(action) {
    console.log("[inside joinGame generator function game.saga.js], action:", action);

    try {
        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        };

        const response = yield axios.post("/api/game", action.payload, config);

        // add the game data to the reducer
        yield put({ type: "SET_GAME", payload: response.data });

    } catch (error) {
        console.log("game host request failed");
        console.error(error);
    }
}

function* gameSaga() {
    yield takeLatest("HOST_GAME", hostGame);

    yield takeLatest("JOIN_GAME_SESSION", joinGame);
}

export default gameSaga;
