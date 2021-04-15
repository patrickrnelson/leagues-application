const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET leagues
 */
router.get('/', (req, res) => {
  let queryText = `
    SELECT * FROM "leagues"
    JOIN "leaguesTeams" ON "leaguesTeams"."leagueId" = "leagues".id
    ORDER BY "leagues".start DESC;
  `
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Error in Leagues GET', err);
      res.sendStatus(500)
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
