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

router.get('/:id', rejectUnauthenticated, (req, res) => {
  let queryText = `SELECT "climbs".id as "climbId", "climbs".attempts, "climbs"."climbDate", "climbs".color, "climbs"."isSubmitted", "climbs".level,
  "climbs"."userId", "locations".name AS "locationName", "users"."name"
  FROM "climbs"
  JOIN "locations" ON "climbs"."locationId" = "locations".id
  JOIN "users" ON "climbs"."userId" = "users".id
  JOIN "usersTeams" ON "usersTeams"."userId" = "users".id
  JOIN "teams" ON "usersTeams"."teamId" = "teams".id
  WHERE "teams".id = $1;`
 
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('error getting team', err);
      res.sendStatus(500);
    });
});

module.exports = router;
