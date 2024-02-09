import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import leaderBoard from './leaderBoard.reducer.js';
import game from './game.reducer.js';
import opponent from './opponent.reducer.js';
import thisPlayer from './this.player.reducer.js';

const rootReducer = combineReducers({
  errors, 
  user,
  leaderBoard,
  game,
  opponent,
  thisPlayer,
});

export default rootReducer;
