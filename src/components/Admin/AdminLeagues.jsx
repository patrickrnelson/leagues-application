import React, { useEffect } from 'react';
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './AdminCreate.css';
import { Grid } from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

function AdminLeagues() {

  const leaguesInfo = useSelector ((store) => store.leagueReducer);

  useEffect(() => {
    dispatchEvent({
      type: 'FETCH_LEAGUE'
    })
  },[]);


  // return (

    // iLeagues stands for individual leagues 
    {leaguesInfo.map((iLeagues) => {
      return(
        <div key={iLeagues.id} >
          <p>{iLeagues.name}</p>
       
      
  
    <Grid
      container
      item
      xs={12}
      direction="row"
      justify="center"
      alignItems="center"
    >

      <Grid  
      container
      item
      xs={12}
      direction="row"
      justify="center"
      alignItems="center"
      >
      <h1>Leagues</h1>
      </Grid>

      <Grid
      container
      item
      xs={12}
      direction="row"
      justify="center"
      alignItems="center"
      >
      <Button variant="outlined" color="primary">
            Create a League
          </Button>
      </Grid>

    <Grid 
    container
    item
    xs={12}
    direction="row"
    //space-around
    justify="center"
    alignItems="center"
    >
      <Grid item xs={2} >
        <h2>League</h2>
      </Grid>

      <Grid item xs={2} >
        <h2>Start Date</h2>
      </Grid>

      <Grid item xs={2} >
        <h2>End Date</h2>
      </Grid>

      <Grid item xs={2} >
        <h2>Status</h2>
      </Grid>
    </Grid>

      <Grid 
      container
      item
      xs={12}
      direction="row"
      // space-around
      justify="center"
      alignItems="center"
      >
        <Grid item xs={2}>
          {/* Season League */}
          <h3>Spring League 2021</h3>
        </Grid>

        <Grid item xs={2}>
          {/* Start Date */}
          <p>03/22/2021</p>
        </Grid>

        <Grid item xs={2} >
          {/* End Date */}
          <p>05/27/2021</p>
        </Grid>

        <Grid item xs={2} >
          {/* Status */}
          <p>In Progress</p>
        </Grid>

        <Grid item={2}>
          <Button variant="outlined" color="primary">
              Edit
          </Button>
        </Grid>

        <Grid item={2}>
          <Button variant="outlined" color="secondary">
              Delete
          </Button>
        </Grid>

      </Grid>

    </Grid>

    
    </div>
    ) 
  })} 
    
  // );



}


export default AdminLeagues;