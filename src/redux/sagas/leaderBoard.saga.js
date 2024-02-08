import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchLeaderBoard() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json'},
      withCredentials: true,
    };

    const response = yield axios.get('/api/leaderBoard', config);

    console.log("leaderboard data from db:", response.data);
    yield put({ type: 'SET_LEADERBOARD', payload: response.data });
  } catch (error) {
    console.log('Leader Board get request failed');
    console.error(error);
  }
}

function* leaderBoardSaga() {

  yield takeLatest('FETCH_USER_LEADERBOARD', fetchLeaderBoard);
}

export default leaderBoardSaga;
