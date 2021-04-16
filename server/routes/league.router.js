const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET leagues
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  let queryText = `
    SELECT * FROM "leagues"
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

router.get('/teams', rejectUnauthenticated, (req, res) => {
  let queryText = `
    SELECT "teams".name AS "teamName", "teams".id AS "teamId","leaguesTeams"."isPaid", "leagues".name AS "leagueName", "leagues".id AS "leagueId"
    FROM "leagues"
    JOIN "leaguesTeams" ON "leaguesTeams"."leagueId" = "leagues".id
    JOIN "teams" ON "leaguesTeams"."teamId" = "teams".id;
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


router.post('/join', rejectUnauthenticated, (req, res) => {
  console.log('what is my team id', req.body.teamId);
  console.log('what is my league id', req.body.leagueId);
  let queryText =`
    INSERT INTO "leaguesTeams" ("teamId", "leagueId")
    VALUES ($1, $2);
  `
  pool
    .query(queryText, [req.body.teamId, req.body.leagueId])
    .then(() => {
      res.sendStatus(201)
    })
    .catch((err) => {
      console.log('Error joining league');
      res.sendStatus(500)
    })
});

module.exports = router;
