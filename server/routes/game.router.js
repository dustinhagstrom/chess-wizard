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
 * it returns a sessionCode to the creator of the game
 */
router.get("/", rejectUnauthenticated, (req, res) => {
    // console.log("[inside game.router.js] User generating new game:", req.user.id);

    //! make a new game and add it to the gameStagingArea
    //! it will wait there for the other player to join
    //! then it will be spliced from gameStagingArea into
    //! gamesInProgress
    const newGame = generateNewGame(req.user.id);
    gameStagingArea.push(newGame);

    // console.log("[inside game.router.js] new game session code:", newGame.sessionCode);
    // console.log(
    //     "[inside game.router.js] game staging area contents:",
    //     gameStagingArea
    // );

    //! this game.sessionCode will be used as a pusher channel name
    //! the client will subscribe to the channel with this
    //! sessionCode.

    res.send(newGame);
});

/**
 * This post will actually be used by a player that wants to join a
 * game session that has already been created. It will do the work of
 * formally created a game in the database, and it will move a game
 * from gameStagingArea to gamesInProgress
 */
router.post("/", rejectUnauthenticated, (req, res) => {
    //! this sessionCode will be used as a pusher channel name
    //! the client will subscribe to the channel with this
    //! sessionCode.

       console.log("[inside game.router.js] join game req object:", req.body);

    // console.log("[inside game.router.js] User join staged game:", req.user.id);
    const foundGame = findGameSessionToJoin(req.body.sessionCode, req.user.id);
    const queryText = `INSERT INTO "game"
                          ( "host_id",
                          "user_id_white",
                          "user_id_black",
                          "session_code"
                          )
                          VALUES (
                            $1,
                            $2,
                            $3,
                            $4
                            ) RETURNING "id" AS "gameId", "user_id_black" AS "userIdBlack",
                                "user_id_white" AS "userIdWhite", "session_code" AS "sessionCode",
                                "host_id" AS "hostId";`;
    pool.query(queryText, [
        foundGame.hostId,
        foundGame.userIdWhite,
        foundGame.userIdBlack,
        foundGame.sessionCode,
    ])
        .then((dbRes) => {
            res.status(201).send(dbRes.rows[0]);
        })
        .catch((error) => {
            console.log(
                "[inside game.router.js] error creating the new game in database."
            );
            console.error(error);
            res.sendStatus(500);
        });
});

router.put("/", (req, res) => {
  console.log("[inside game.router.js] add moves to game section");
})

router.delete("/:id", (req, res) => {
  console.log("[inside game.router.js] delete game section; req.params.id:", req.params.id);
  const queryText = `DELETE FROM "game" WHERE "id" = $1;`;

  pool.query(queryText, [req.params.id])
  .then((dbRes) => {
    res.sendStatus(204);
  })
  .catch((error) => {
    console.log(
        "[inside game.router.js] error deleting the new game in database."
    );
    console.error(error);
    res.sendStatus(500);
});
  
})

module.exports = router;
