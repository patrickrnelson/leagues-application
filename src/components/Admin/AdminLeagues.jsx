import React, { useEffect } from 'react';
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './AdminCreate.css';
import { Grid } from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';



function AdminLeagues() {

 const dispatch = useDispatch();
 const history = useHistory();

  const leaguesInfo = useSelector ((store) => store.leaguesReducer);

  // console.log('leaguesInfo', leaguesInfo);

  // useEffect(() => {
  //   dispatch({
  //     type: 'FETCH_LEAGUES'
  //   })
  // },[]);


  function createNewLeague() {
    dispatch({
      type: 'CREATE_NEW_LEAGUE'
    })
  }

//  /admin/leagues

  function handleEdit(leagueId) {
    // dispatch({
    //   type: 'EDIT_RESULTS'
    // })

    history.push(`/admin/leagues/edit/${leagueId}`)


  }


  function handleDelete(leagueId) {
    dispatch({
      type: 'DELETE_LEAGUE',
      payload: leagueId
    })

  }



  return (

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
      <Button variant="outlined" color="primary" onClick={createNewLeague} >
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

      {/* iLeagues stands for individual leagues */}
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
          <p>{moment(iLeagues.start).format('MM-DD-YYYY')}</p>
        </Grid>

        <Grid item xs={2} key={iLeagues.end} >
          {/* End Date */}
          <p>{moment(iLeagues.end).format('MM-DD-YYYY')}</p>
        </Grid>

        <Grid item xs={2} >
          {/* Status */}
          <p>In Progress</p>
        </Grid>  



        <Grid item={2}>
          <Button variant="outlined" color="primary" onClick={(event) => handleEdit(iLeagues.id)} >
              Edit
          </Button>
        </Grid>

        <Grid item={2}>
          <Button variant="outlined" color="secondary" onClick= {(event) => handleDelete(iLeagues.id)} >
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