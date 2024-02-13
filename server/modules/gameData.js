const { chessGenerator, undoLastMove, chessMoveHandler } = require("./chessFunctions");
const { Chess } = require("chess.js");

// this will hold games that are waiting to begin
// will match games in this array to the random sessionCode
// there is a lottery chance that there will be more than one
// game in here at a time with the same sessionCode.
const gameStagingArea = [];

// this will hold all of the games that are currently running
const gamesInProgress = [];

// generate a 4 DIGIT alpha game code
const generateRandomGameID = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let gameArray = [];
    for (let i = 0; i < 4; i++) {
      const randomNum = Math.floor(Math.random() * alphabet.length);
      gameArray.push(alphabet[randomNum]);
    }
    let joinedArray = gameArray.join("");
    return joinedArray;
  };

const generateNewGame = (hostId) => {
    const gameCode = generateRandomGameID();

    const newChess = chessGenerator();

    return {
        sessionCode: gameCode, userIdWhite: hostId, hostId: hostId, chess: newChess, fen: newChess.fen(), board: newChess._board   
        // sessionCode: gameCode, userIdWhite: hostId, hostId: hostId, chess: newChess, fen: newChess.fen()   
    };

};

const findGameSessionToJoin = (joinCode, joiningPlayerId) => {
  // return the first game in the filtered array, filter out games that don't match
  // sessionCode
  const foundGame = gameStagingArea.filter((game) => game.sessionCode == joinCode)[0];

  // add the joining player to this game
  foundGame.userIdBlack = joiningPlayerId;

  // add the found game to the gamesInProgress
  gamesInProgress.push(foundGame);
  
  // remove this game from staging area
  let deletionIndex = gameStagingArea.indexOf(foundGame);
  gameStagingArea.splice(deletionIndex, 1);
  
  // console.log("[inside gameData.js] found game:", foundGame);
  // console.log("[inside gameData.js] gameStagingArea:", gameStagingArea);
  // console.log("[inside gameData.js] gamesInProgress:", gamesInProgress);

  return foundGame;
}

const getGameHistory = (gameId) => {
  // match the game to update with the game that has that id from the gamesInProgress
  const foundGame = gamesInProgress.filter((game) => game.gameId === gameId)[0];

  // call the history method on a Chess instance and return the moves
  foundGame = foundGame.history();

  // convert JS array to SQL array
  let bufferString = `{`;
  for (const element of foundGame) {
      bufferString += element;
  }
  bufferString += `}`;

  return bufferString;
}

const makeAMove = (gameId, moveNotation) => {

  const foundGame = gamesInProgress.filter((game) => game.sessionCode == joinCode)[0];
  
  chessMoveHandler(foundGame, moveNotation);
}

module.exports = { gameStagingArea, gamesInProgress, generateNewGame, findGameSessionToJoin, getGameHistory, makeAMove };