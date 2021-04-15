const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  const queryText = `
    SELECT *
    FROM "league"
    ORDER BY "league".start DESC
    ;
  ` ; // this is going to grab all of the leagues and put in order of most recent of start date.
  pool.query(queryText)
  .then( result => {
    res.send(result.rows);
  })
  .catch(error => {
    console.log('ERROR: in league.router GET', error);
    res.sendStatus(500)
  })

});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
