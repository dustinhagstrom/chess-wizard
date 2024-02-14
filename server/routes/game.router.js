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
    getGameHistory,
    makeAMove,
} = require("../modules/gameData");
const { pusherUpdateBoard } = require("../modules/pusher");

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

    res.send({
        sessionCode: newGame.sessionCode,
        userIdWhite: newGame.userIdWhite,
        hostId: newGame.hostId,
        fen: newGame.fen,
    });
    // res.send({
    //     sessionCode: newGame.sessionCode,
    //     userIdWhite: newGame.userIdWhite,
    //     hostId: newGame.hostId,
    //     chess: newGame.chess,
    //     fen: newGame.fen,
    // });
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
            // console.log("data from database:", dbRes.rows[0]);

            // SET the Id for the game with the game object
            foundGame.gameId = dbRes.rows[0].gameId;
            // res.status(201).send(dbRes.rows[0]);
            res.status(201).send({...dbRes.rows[0], fen: foundGame.fen});
        })
        .catch((error) => {
            console.log(
                "[inside game.router.js] error creating the new game in database."
            );
            console.error(error);
            res.sendStatus(500);
        });
});

//! this is the route that is hit when a player makes a move
router.put("/", rejectUnauthenticated, (req, res) => {
    console.log("[inside game.router.js] add moves to game section, req.body:", req.body);
    //get the move notation from the body obj
    const move = req.body.move;

    // get the req.body.gameId from the body
    const gameId = req.body.gameId;
    console.log("the game id:", gameId, "the move notation:", move);

    const moveData = makeAMove(gameId, move);

    // set the FEN notation in local state
    res.locals.fen = moveData.fen

    console.log("[inside game.router.js] we made a move, moveData:", moveData);
    // get the history to send to the database
    let moveHistory = getGameHistory(gameId);

    console.log("[inside game.router.js] we grabbed moveHistory:", moveHistory);

    const queryString = `UPDATE "game" SET "moves" = $2
  WHERE "id" = $1;`;

      pool.query(queryString, [gameId, moveHistory])
      .then((dbRes) => {
        // this sends an object with type and fen properties
        // res.sendStatus(201).send(moveData);
        // can't send data with response
        res.sendStatus(201);
      })
      .catch((error) => {
        console.log("[inside game.router.js] update moves section; error received in put route");
        console.error(error);
        res.sendStatus(500);
      })
      .finally(() => {
        pusherUpdateBoard(req, res)
      })
});

router.delete("/:id", rejectUnauthenticated, (req, res) => {
    console.log(
        "[inside game.router.js] delete game section; req.params.id:",
        req.params.id
    );
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
});

module.exports = router;
