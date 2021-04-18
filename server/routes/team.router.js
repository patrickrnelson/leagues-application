const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get('/', rejectUnauthenticated, (req, res) => {
  // console.log('in teams GET router');
  let queryText = `
    SELECT "users".name as userName, 
      "usersTeams"."userId", "usersTeams"."teamId", 
      "teams".name as "teamName", "teams".id as "teamId", "teams"."captainId", "teams"."accessCode"
    FROM "users"
    JOIN "usersTeams" ON "users".id = "usersTeams"."userId"
    JOIN "teams" ON "teams".id = "usersTeams"."teamId"
    ;`
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

router.get('/leagueTeam/:id', rejectUnauthenticated, (req, res) => {
  console.log('test1', req.body);
  let queryText = `SELECT * FROM teams WHERE "teams"."leagueId" = $1`;
  pool.query(queryText, [req.params.id])
  .then((result) => {
    res.send(result.rows);
  })
  .catch(err => {
    console.log('error getting teams', err);
    res.sendStatus(500)
  })
})

router.get('/access', rejectUnauthenticated, (req, res) => {
  let queryText = `SELECT "teams"."accessCode" FROM "teams" WHERE "teams".id = $1;`;
  console.log('access code', req.body);
  pool.query(queryText, [req.body])
  .then((result) => {
    res.send(result.rows);
  })
  .catch(err => {
    console.log('error getting team access code', err);
    res.sendStatus(500)
  })
})

router.post('/', rejectUnauthenticated, async (req, res) => {
  let accessCode = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6).toUpperCase();
  const connection = await pool.connect();
  // console.log('what is my access code?', accessCode);
  // console.log('name', req.body.teamName);
  // console.log('user id', req.user.id);
  try {
    await connection.query(`BEGIN`);
    let dbRes = await connection.query(`
      INSERT INTO "teams" ("name", "captainId", "accessCode")
      VALUES ($1, $2, $3)
      RETURNING *
    `, [req.body.teamName, req.user.id, accessCode]);
    await connection.query(`
      INSERT INTO "usersTeams" ("teamId", "userId")
      VALUES ($1, $2)
    `, [dbRes.rows[0].id, req.user.id]) 
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

router.post('/join/:accessCode', rejectUnauthenticated, async (req, res) => {
  const connection = await pool.connect();
  try{
    await connection.query(`BEGIN`);
    let dbRes = await connection.query(`
      SELECT "teams".id 
      FROM "teams" 
      WHERE "teams"."accessCode" = ($1);
    `, [req.params.accessCode]);
    if (dbRes.rows[0] === undefined) {
      console.log('Access Code does not match')
      res.sendStatus(404)
    } else {
      await connection.query(`
        INSERT INTO "usersTeams" ("userId", "teamId")
        VALUES ($1, $2)
      `, [req.user.id, dbRes.rows[0].id]);
      await connection.query(`COMMIT`);
      res.send(200)
    }
  }
  catch (err) {
    console.log('Error in joining team', err)
    await connection.query(`ROLLBACK`);
    res.sendStatus(500)
  }
})

module.exports = router;
