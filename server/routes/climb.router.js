const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET get all climbs
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  queryText = `
    SELECT "climbs".id as "climbId", "climbs".attempts, "climbs"."climbDate", "climbs".color, "climbs"."isSubmitted", "climbs".level,
    "climbs"."userId", "locations".name AS "locationName", "users".name 
    FROM "climbs"
    JOIN "locations" ON "climbs"."locationId" = "locations".id
    JOIN "users" ON "climbs"."userId" = "users".id
    ORDER BY "climbs".level DESC;
  `;
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
 * GET get all climbs for a specific climber
 */
router.get('/:id', rejectUnauthenticated, (req, res) => {
  queryText = `
    SELECT "climbs".id as "climbId", "climbs".attempts, "climbs"."climbDate", "climbs".color, "climbs"."isSubmitted", "climbs".level,
    "climbs"."userId", "locations".name AS "locationName", "users"."name"
    FROM "climbs"
    JOIN "locations" ON "climbs"."locationId" = "locations".id
    JOIN "users" ON "climbs"."userId" = "users".id
    WHERE "users".id = $1
    ORDER BY "climbs"."climbDate", "climbs"."isSubmitted" DESC;
  `;
  pool.query(queryText, [req.params.id])
  .then((dbRes) => {
    res.send(dbRes.rows)
  })
  .catch((err) => {
    console.log('Error in GET all climbs');
    res.sendStatus(500);
  })
});

/**
 * POST new climb
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  let location = req.body.location;
  let color = req.body.color;
  let climberId = req.body.climberId;
  let difficulty = req.body.difficulty;
  let attempts = req.body.attempts;

  let queryText = `
    INSERT INTO "climbs" ("locationId", "color", "level", "attempts", "userId")
    VALUES ((SELECT "locations"."id" FROM "locations" WHERE "locations"."name" = $1), $2, $3, $4, $5);
  `;
  pool.query(queryText, [location, color, difficulty, attempts, climberId])
  .then(() => {
    res.sendStatus(201)
  })
  .catch((err) => {
    console.log('Error in new climb POST', err);
    res.sendStatus(500)
  })
});

/**
 * PUT route to update submitted status of climb to false
 */
router.put('/unsubmit', rejectUnauthenticated, (req, res) => {
  let climbId = req.body.climbId
  queryText = `
    UPDATE "climbs"
    SET "isSubmitted" = FALSE
    WHERE id = $1; 
  `;
  pool.query(queryText, [climbId])
  .then((results) => {
    res.sendStatus(202);
  })
  .catch((err) => {
    console.log('Error in PUT - unsubmit climb');
    res.sendStatus(500);
  })
});

/**
 * PUT route to update submitted status of climb to true
 */
router.put('/submit', rejectUnauthenticated, (req, res) => {
  let climbId = req.body.climbId
  queryText = `
    UPDATE "climbs"
    SET "isSubmitted" = TRUE
    WHERE id = $1; 
  `;
  pool.query(queryText, [climbId])
  .then((results) => {
    res.sendStatus(202);
  })
  .catch((err) => {
    console.log('Error in PUT - submit climb');
    res.sendStatus(500);
  })
});

module.exports = router;
