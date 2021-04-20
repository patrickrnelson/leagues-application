import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Header from '../Header/Header'

const useStyles = makeStyles({
  btn: {
    width: '165px',
    height: '45px',
    fontSize: '12px',
  },
});

function CreateTeam() {
  const classes = useStyles();

  const [teamName, setTeamName] = useState('')
  const dispatch = useDispatch();
  const history = useHistory();

  const registerTeam = (event) => {
    event.preventDefault();

    dispatch({
      type: 'CREATE_TEAM',
      payload: {
        teamName: teamName,
      },
    });
    history.push('/team');
  }

  return (
    <>
      <div className="container">
        <Header />
      </div>
      <form onSubmit={registerTeam}>
        <h2>Create Team</h2>
        <input 
          type="text" 
          placeholder="Team Name"
          value={teamName}
          minlength="2"
          maxlength="24"
          required
          onChange={(event) => setTeamName(event.target.value)}/>
        <Button 
          variant="outlined"
          color="secondary"
          className={classes.btn}>
          Create Team
        </Button>
      </form>
    </>
  );
}

export default CreateTeam;
