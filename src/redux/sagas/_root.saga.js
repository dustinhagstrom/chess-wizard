import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import leaderBoardSaga from './leaderBoard.saga';
import gameSaga from './game.saga';

export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    leaderBoardSaga(),
    gameSaga()
  ]);
}
