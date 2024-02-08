// this will hold games that are waiting to begin
// will match games in this array to the random session_code
// there is a lottery chance that there will be more than one
// game in here at a time with the same session_code.
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

const generateNewGame = (playerOneID) => {
    const gameCode = generateRandomGameID();

    return {
        session_code: gameCode, user_id_white: playerOneID    
    };

};

const findGameSessionToJoin = (joinCode, joiningPlayerID) => {
  // return the first game in the filtered array, filter out games that don't match
  // session_code
  const foundGame = gameStagingArea.filter((game) => game.session_code == joinCode)[0];

  // add the joining player to this game
  foundGame.user_id_black = joiningPlayerID;

  // add the found game to the gamesInProgress
  gamesInProgress.push(foundGame);
  
  // remove this game from staging area
  let deletionIndex = gameStagingArea.indexOf(foundGame);
  gameStagingArea.splice(deletionIndex, 1);
  
  console.log("[inside gameData.js] found game:", foundGame);
  console.log("[inside gameData.js] gameStagingArea:", gameStagingArea);
  console.log("[inside gameData.js] gamesInProgress:", gamesInProgress);



  return foundGame;
}

module.exports = { gameStagingArea, gamesInProgress, generateNewGame, findGameSessionToJoin };