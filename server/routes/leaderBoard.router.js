const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET top ten leaders
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log("[inside leaderBoard.router.js] inside the leaderboard top ten get route!");

  const queryText = `SELECT "U"."username", "US"."won", "US"."lost", "US"."tied"
	FROM "user" AS "U" JOIN "user_stats" AS "US" ON "U"."id" = "US"."user_id"
	ORDER BY "US"."won" DESC LIMIT 10;`

  pool.query(queryText)
  .then((dbRes) => {
    // console.log("[inside leaderBoard.router.js] LB data from db:", dbRes.rows);
    res.status(200).send(dbRes.rows);
  })
  .catch((error) => {
    console.log("[inside leaderBoard.router.js] error getting the leaderboard data from DB.");
    console.error(error);
    res.sendStatus(500);
  })

});

/**
 * GET single leader by id
 */
router.get('/:id', rejectUnauthenticated, (req, res) => {
  console.log("[inside leaderBoard.router.js] inside the get single leader by id route!");

  console.log("req.user.id:", req.user.id, "req.params.id:", req.params.id);

  // this sets an additional columm to the query request if the user is the 
  // one that is requesting the data.
  const emailSelectStatement = req.user.id == req.params.id ? `"U"."email",` : ``;

  const queryText = `SELECT ${emailSelectStatement} "U"."username", "U"."avatar_obj_key", "US"."won", "US"."lost", "US"."tied"
	FROM "user" AS "U" JOIN "user_stats" AS "US" ON "U"."id" = "US"."user_id"
	WHERE "U"."id" = $1;`

  pool.query(queryText, [req.params.id])
  .then((dbRes) => {
    // console.log("[inside leaderBoard.router.js] LB data from db:", dbRes.rows);
    res.status(200).send(dbRes.rows);
  })
  .catch((error) => {
    console.log("[inside leaderBoard.router.js] error getting the leaderboard data from DB.");
    console.error(error);
    res.sendStatus(500);
  })

});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
