const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/login', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

router.get('/conditional', (req, res) => {

  let queryText = `
    SELECT "users".id AS "userId", "teams".id AS "teamId", "teams"."captainId", "teams"."name" AS "teamName", "leaguesTeams"."isPaid", "leagues"."name" AS "leagueName", "leagues"."start", "leagues"."end", "leaguesTeams"."byeWeek", "climbs"."isSubmitted" from "users"
    FULL OUTER JOIN "usersTeams" ON "users".id = "usersTeams"."userId"
    FULL OUTER JOIN "teams" ON "usersTeams"."teamId" = "teams".id
    FULL OUTER JOIN "leaguesTeams" ON "teams".id = "leaguesTeams"."teamId" 
    FULL OUTER JOIN "climbs" ON "users".id = "climbs"."userId"
    FULL OUTER JOIN "leagues" ON "leaguesTeams"."leagueId" = "leagues".id
    WHERE "users".id = $1;
  `
  pool.query(queryText, [req.user.id])
    .then((dbRes) => { 
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.log('error getting conditional data', err);
      res.sendStatus(500);
    })
})

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const name = req.body.name;
  const username = req.body.username;
  const phone = req.body.phoneNumber;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "users" (name, username, phone, password)
    VALUES ($1, $2, $3, $4) RETURNING id`;
  pool
    .query(queryText, [name, username, phone, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.put('/', rejectUnauthenticated, (req, res) => {
  let name = req.body.name
  let username = req.body.username
  let phone = req.body.phone

  let queryText = `
    UPDATE "users" 
    SET "name" = $1, "username" = $2, "phone" = $3
    WHERE "users".id = $4;
  `

  pool.query(queryText, [name, username, phone, req.user.id])
    .then(() => { 
      console.log('Successful user PUT');
      res.sendStatus(201)
    })
    .catch((err) => {
      console.log('Error in user PUT', err);
      res.sendStatus(500);
    })
})

module.exports = router;
