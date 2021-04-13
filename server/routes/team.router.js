const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET route template
 */
router.get('/all', (req, res) => {
  console.log('in teams GET router');
  let queryText = `
    SELECT "user".name as userName, "usersTeams"."userId", "usersTeams"."teamId", "teams".name as "teamName"
    FROM "user"
    JOIN "usersTeams" ON "user".id = "usersTeams"."userId"
    JOIN "teams" ON "teams".id = "usersTeams"."teamId"`
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Error in Team GET', err);
      res.sendStatus(500)
    })
});

 router.post('/', async (req, res) => {
  let accessCode = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6).toUpperCase();
  const connection = await pool.connect();
  // console.log('what is my access code?', accessCode);
  // console.log('name', req.body.teamName);
  // console.log('user id', req.user.id);
  try {
    await connection.query(`BEGIN`);
    await connection.query(`
      INSERT INTO "teams" ("name", "captainId", "accessCode")
      VALUES ($1, $2, $3)
      RETURNING *
    `, [req.body.teamName, req.user.id, accessCode]);
    await connection.query(`COMMIT`);
    res.send(200)
  }
  catch (err) {
    console.error('error creating team', err);
    await connection.query('ROLLBACK');
    res.sendStatus(500);
  }
  finally {
    connection.release()
  }
});
/* 
      BEGIN;
      INSERT INTO "teams" ("name", "captainId", "accessCode")
      VALUES ('Unicorns', 1, '6D43QW')
      RETURNING "teams".id;
      INSERT INTO "leagueTeams"("teamId", "leagueId")
      VALUES (3, 1);
      COMMIT;
*/
router.post('/', async (req, res) => {
  let accessCode = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6).toUpperCase();
  const connection = await pool.connect();
  console.log('what is my access code?', accessCode);
  console.log('name', req.body.teamName);
  console.log('user id', req.user.id);
  try {
    await connection.query(`BEGIN`);
    let dbRes = await connection.query(`
      INSERT INTO "teams" ("name", "captainId", "accessCode")
      VALUES ($1, $2, $3)
      RETURNING *
    `, [req.body.teamName, req.user.id, accessCode]);
    await connection.query(`
      INSERT INTO "leagueTeams" ("teamId", "leagueId")
      VALUES ($1, $2)
    `, [dbRes.rows[0].id, 1]) //need to update how to capture leagueId later
    await connection.query(`COMMIT`);
    res.send(200)
  }
  catch (err) {
    console.error('error creating team', err);
    await connection.query('ROLLBACK');
    res.sendStatus(500);
  }
  finally {
    connection.release()
  }
});

module.exports = router;
