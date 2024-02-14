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

function* abortGame(action) {
    console.log("[inside abortGame generator function game.saga.js], action:", action);

    try {
        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        };

        yield axios.delete(`/api/game/${action.payload}`, config);

        // Remove the game data from the reducer
        yield put({ type: "UNSET_GAME" });

    } catch (error) {
        console.log("game host request failed");
        console.error(error);
    }
}

function* movePiece(action) {
    console.log("[inside movePiece generator function game.saga.js], action:", action);

    try {
        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        };

        yield axios.put(`/api/game/`, action.payload, config);

        // Current data should be coming in from the pusher server trigger
        

    } catch (error) {
        console.log("game host request failed");
        console.error(error);
    }
}

function* gameSaga() {
    yield takeLatest("HOST_GAME", hostGame);

    yield takeLatest("JOIN_GAME_SESSION", joinGame);

    yield takeLatest("ABORT_GAME", abortGame);

    yield takeLatest("MOVE_PIECE", movePiece);
}

export default gameSaga;
