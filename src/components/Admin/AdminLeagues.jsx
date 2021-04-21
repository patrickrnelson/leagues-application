import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './AdminCreate.css';
import Nav from '../Nav/Nav';
import { Grid } from '@material-ui/core';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

function AdminLeagues() {
  const dispatch = useDispatch();
  const history = useHistory();

  const leaguesInfo = useSelector((store) => store.leaguesReducer);

  const [open, setOpen] = React.useState(false);

  // console.log('leaguesInfo', leaguesInfo);
  function createNewLeague() {
    history.push(`/admin/leagues/new`);
  }

  //  /admin/leagues

  function handleEdit(leagueId) {
    // dispatch({
    //   type: 'EDIT_RESULTS'
    // })

    history.push(`/admin/leagues/edit/${leagueId}`);
  }

  function handleDelete(leagueId) {
    console.log('what is the id', leagueId);
    dispatch({
      type: 'DELETE_LEAGUE',
      payload: leagueId,
    });
    handleClose();
  }

  const handleClickOpen = (leaguesID) => {
    console.log('what is the id in handleClickOpen', leaguesID);
    handleDelete(leaguesID);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid
      container
      item
      xs={12}
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Nav />
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
        <Button variant="outlined" color="primary" onClick={createNewLeague}>
          Create a League
        </Button>
      </Grid>

      <Grid
        container
        item
        xs={12}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={2}>
          <h2>League</h2>
        </Grid>

        <Grid item xs={2}>
          <h2>Start Date</h2>
        </Grid>

        <Grid item xs={2}>
          <h2>End Date</h2>
        </Grid>

        <Grid item xs={2}>
          <h2>Status</h2>
        </Grid>
      </Grid>

      {/* iLeagues stands for individual leagues */}
      {leaguesInfo.map((iLeagues) => {
        return (
          <Grid
            container
            item
            xs={12}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={2} key={iLeagues.name}>
              {/* Season League */}
              <h3>{iLeagues.name}</h3>
            </Grid>

            <Grid item xs={2} key={iLeagues.start}>
              {/* Start Date */}
              <p>{moment(iLeagues.start).format('MM-DD-YYYY')}</p>
            </Grid>

            <Grid item xs={2} key={iLeagues.end}>
              {/* End Date */}
              <p>{moment(iLeagues.end).format('MM-DD-YYYY')}</p>
            </Grid>

            <Grid item xs={2}>
              {/* Status */}
              {/* Compare today's date to the start and end dates of the leagues to find out if it is 'In Progress', 'Completed', or 'Not Started' */}
              <p>
                {moment().isBefore(iLeagues.start)
                  ? 'Not Started'
                  : moment().isSameOrAfter(iLeagues.start) &&
                    moment().isSameOrBefore(iLeagues.end)
                  ? 'In Progress'
                  : moment().isAfter(iLeagues.end)
                  ? 'Completed'
                  : 'Something is wrong'}
              </p>
            </Grid>

            <Grid item={2}>
              <Button
                variant="outlined"
                color="primary"
                onClick={(event) => handleEdit(iLeagues.id)}
              >
                Edit
              </Button>
            </Grid>

            <Grid item={2}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={(event) => handleClickOpen(iLeagues.id)}
              >
                Delete
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {'Delete a League'}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this league? All information
                    added into this event will be lost.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button
                    color="secondary"
                    autoFocus
                    onClick={(event) => handleDelete(iLeagues.id)}
                  >
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default AdminLeagues;
