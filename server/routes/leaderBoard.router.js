const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log("inside the leaderboard get route!");

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
  })

});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
