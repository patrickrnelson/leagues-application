const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
  let queryText = `SELECT *
  FROM "users"
  JOIN "userTeams" ON "userTeams"."teamId" = 1
  JOIN "teams" ON "leaguesTeams"."teamId" = "teams".id`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('error getting team', err);
      res.sendStatus(500);
    });
});

router.get('/', rejectUnauthenticated, (req, res) => {
  let queryText = ``
 
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('error getting team', err);
      res.sendStatus(500);
    });
});

module.exports = router;
