const express = require("express");
const {
    rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();
const {
    gameStagingArea,
    gamesInProgress,
    generateNewGame,
    findGameSessionToJoin,
} = require("../modules/gameData");

/**
 * This get will actually start the process of making a game instance
 * it returns a session_code to the creator of the game
 */
router.get("/", rejectUnauthenticated, (req, res) => {
    // console.log("[inside game.router.js] User generating new game:", req.user.id);

    //! make a new game and add it to the gameStagingArea
    //!     it will wait there for the other player to join
    //!     then it will be spliced from gameStagingArea into
    //!     gamesInProgress
    const newGame = generateNewGame(req.user.id);
    gameStagingArea.push(newGame);

    // console.log("[inside game.router.js] new game session code:", newGame.session_code);
    console.log(
        "[inside game.router.js] game staging area contents:",
        gameStagingArea
    );

    //! this session_code will be used as a pusher channel name
    //! the client will subscribe to the channel with this
    //! session_code.

    res.send(newGame.session_code);
    // const queryText = `INSERT INTO "game"
    // ( "user_id_white",
    // "user_id_black",
    // "session_code"
    // )
    // VALUES (
    // 	$1,
    // 	$2,
    //   $3
    // 	);`
    // pool.query(queryText, [newGame.user_id_white, newGame.user_id_black, newGame.session_code])
    // .then((dbRes) => {
    //   console.log("[inside game.router.js] new game data from db:", dbRes.rows);
    //   res.status(200).send(dbRes.rows);
    // })
    // .catch( (error) => {
    //   console.log("[inside game.router.js] error creating the new game in database.");
    //   console.error(error);
    // })
});

/**
 * This post will actually be used by a player that wants to join a
 * game session that has already been created. It will do the work of
 * formally created a game in the database, and it will move a game
 * from gameStagingArea to gamesInProgress
 */
router.post("/", rejectUnauthenticated, (req, res) => {
    //! this session_code will be used as a pusher channel name
    //! the client will subscribe to the channel with this
    //! session_code.

    console.log("[inside game.router.js] User join staged game:", req.user.id);
    const foundGame = findGameSessionToJoin(req.body.session_code, req.user.id);
    const queryText = `INSERT INTO "game"
                          ( "user_id_white",
                          "user_id_black",
                          "session_code"
                          )
                          VALUES (
                            $1,
                            $2,
                            $3
                            );`;
    pool.query(queryText, [
        foundGame.user_id_white,
        foundGame.user_id_black,
        foundGame.session_code,
    ])
        .then((dbRes) => {
            console.log(
                "[inside game.router.js] successfully created new game in db:"
            );
            res.status(201).send(foundGame);
        })
        .catch((error) => {
            console.log(
                "[inside game.router.js] error creating the new game in database."
            );
            console.error(error);
        });
    console.log("[inside game.router.js] gamesInProgress:", gamesInProgress);
});

module.exports = router;
