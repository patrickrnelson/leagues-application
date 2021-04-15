const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  queryText = `
    SELECT "climbs".id as "climbId", "climbs".attempts, "climbs"."climbDate", "climbs".color, "climbs"."isSubmitted", "climbs".level,
    "climbs"."userId", "locations".name AS "locationName"
    FROM "climbs"
    JOIN "locations" ON "climbs"."locationId" = "locations".id;
  `
  pool.query(queryText)
  .then((dbRes) => {
    res.send(dbRes.rows)
  })
  .catch((err) => {
    console.log('Error in GET all climbs');
    res.sendStatus(500);
  })
});

/**
 * POST route template
 */
router.post('/add', rejectUnauthenticated, (req, res) => {
  console.log('req.body', req.body);
  console.log('req.user', req.user);
  let location = req.body.location;
  let color = req.body.color;
  let difficulty = req.body.difficulty;
  let attempts = req.body.attempts;

  let queryText = `
    INSERT INTO "climbs" ("locationId", "color", "level", "attempts", "userId")
    VALUES ((SELECT "locations"."id" FROM "locations" WHERE "locations"."name" = $1), $2, $3, $4, $5);
  `
  pool.query(queryText, [location, color, difficulty, attempts, req.user.id])
  .then(() => {
    res.sendStatus(201)
  })
  .catch((err) => {
    console.log('Error in new climb POST');
    res.sendStatus(500)
  })
});

module.exports = router;
