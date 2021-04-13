import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './AdminCreate.css';
import { Grid } from '@material-ui/core';

function AdminCreate() {
  return (
    <Grid
      container
      item
      xs={12}
      direction="column"
      justify="space-around"
      alignItems="center"
    >
      <Grid
        container
        item
        xs={12}
        direction="column"
        justify="space-around"
        alignItems="center"
      >
        <Grid item xs={6}>
          <h1>Create a League</h1>
        </Grid>
      </Grid>
      {/* <input className="adminCreate" placeholder="League Name"></input> */}
      <Grid
        container
        item
        xs={12}
        direction="column"
        justify="space-around"
        alignItems="center"
      >
        <Grid>
          <TextField
            id="outlined-basic"
            label="League Name"
            variant="outlined"
          />
        </Grid>
      </Grid>

      <Grid
        container
        item
        xs={12}
        direction="column"
        justify="space-around"
        alignItems="center"
      >
        <Grid item xs={12}>
          <p>Start date:</p>
        </Grid>
        <Grid item xs={12}>
          <TextField variant="outlined" color="primary" type="date" />
        </Grid>
      </Grid>

      <Grid
        container
        item
        xs={12}
        direction="column"
        justify="space-around"
        alignItems="center"
      >
        <Grid item={12}>
          <p>End Date: </p>
        </Grid>
        <Grid item={12}>
          <TextField variant="outlined" color="primary" type="date" />
        </Grid>
      </Grid>
      <br></br>
      <Grid
        container
        item
        xs={12}
        direction="column"
        justify="space-around"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Button variant="contained" color="primary">
            Start League
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AdminCreate;

{
  /* <div className="container">
      <h1>Create a League</h1>
      {/* <input className="adminCreate" placeholder="League Name"></input> 
      <TextField id="outlined-basic" label="League Name" variant="outlined" />
      <div className="adminCreate">
        <p>Start date</p>
        <TextField variant="outlined" color="primary" type="date" />
      </div>
      <div className="adminCreate">
        <p>End Date</p>
        <TextField variant="outlined" color="primary" type="date" />
      </div>
      <br></br>
      <Grid container item xs={12}  alignItems="center">
        <Grid item xs={12}  >
        <Button variant="contained" color="primary">
          Start League
        </Button>
        </Grid>
    
      </Grid> */
}
