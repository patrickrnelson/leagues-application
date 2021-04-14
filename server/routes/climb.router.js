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
  // GET route code here
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
});

module.exports = router;
