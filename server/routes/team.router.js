const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get('/all', (req, res) => {
  // console.log('in teams GET router');
  let queryText = `
    SELECT "users".name as userName, 
      "usersTeams"."userId", "usersTeams"."teamId", 
      "teams".name as "teamName", "teams".id as "teamId", "teams"."captainId", "teams"."accessCode"
    FROM "users"
    JOIN "usersTeams" ON "users".id = "usersTeams"."userId"
    JOIN "teams" ON "teams".id = "usersTeams"."teamId";`
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

router.get('/access', (req, res) => {
  let queryText=`
    SELECT "teams".id as "ID", "teams"."accessCode" as "accessCode" 
    FROM "teams";
  `;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Error getting access codes', err);
      res.sendStatus(500)
    })
})

router.get('/leagueTeam/:id', (req, res) => {
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

router.post('/', async (req, res) => {
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
      INSERT INTO "leaguesTeams" ("teamId", "leagueId")
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

router.post('/join/:id', rejectUnauthenticated, (req, res) => {
  // console.log('what is my id', req.params.id);
  // console.log('what is my user', req.user.id);
  let queryText =`
    INSERT INTO "usersTeams" ("userId", "teamId")
    VALUES ($1, $2)
  ;`
  pool
    .query(queryText, [req.user.id, req.params.id])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('Error in joining team', err)
      res.sendStatus(500)
    })
})

module.exports = router;
