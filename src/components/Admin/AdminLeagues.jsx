import React, { useEffect } from 'react';
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './AdminCreate.css';
import { Grid } from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';


function AdminLeagues() {

 const dispatch = useDispatch();

  const leaguesInfo = useSelector ((store) => store.leaguesReducer);

  console.log('leaguesInfo', leaguesInfo);

  useEffect(() => {
    dispatch({
      type: 'FETCH_LEAGUES'
    })
  },[]);


  function handleEdit() {
    

  }


  function handleDelete() {


  }



  return (

    // iLeagues stands for individual leagues 

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

      {leaguesInfo.map((iLeagues) => {
        return(
        <Grid 
        container
        item
        xs={12}
        direction="row"
        // space-around
        justify="center"
        alignItems="center"
        >


        <Grid item xs={2} key={iLeagues.name} >
          {/* Season League */}
          <h3>{iLeagues.name}</h3>
        </Grid>

        <Grid item xs={2} key={iLeagues.start} >
          {/* Start Date */}
          <p>{iLeagues.start}</p>
        </Grid>

        <Grid item xs={2} key={iLeagues.end} >
          {/* End Date */}
          <p>{iLeagues.end}</p>
        </Grid>

        <Grid item xs={2} >
          {/* Status */}
          <p>In Progress</p>
        </Grid>  



        <Grid item={2}>
          <Button variant="outlined" color="primary" onClick={handleEdit} >
              Edit
          </Button>
        </Grid>

        <Grid item={2}>
          <Button variant="outlined" color="secondary" onClick={handleDelete} >
              Delete
          </Button>
        </Grid>

      </Grid>

      ) 
      })} 

    </Grid>

  
    
  );



}


export default AdminLeagues;