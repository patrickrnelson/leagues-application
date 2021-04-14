const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const name = req.body.name;
  const username = req.body.username;
  const phone = req.body.phoneNumber;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (name, username, phone, password)
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
    UPDATE "user" 
    SET "name" = $1, "username" = $2, "phone" = $3
    WHERE "user".id = $4;
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
