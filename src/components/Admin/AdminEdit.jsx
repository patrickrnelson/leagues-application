import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './AdminCreate.css';
import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

function AdminEdit() {
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
          <h1>Edit a League</h1>
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
          <p>Name:</p>
        </Grid>
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

      <Grid container direction="row" justify="center" alignItems="center">
        <Grid>
          <Button variant="contained" color="primary">
            Save
          </Button>

          <Button variant="contained" color="primary">
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AdminEdit;
