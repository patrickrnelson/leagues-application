import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Header from '../Header/Header'

const useStyles = makeStyles({
  btn: {
    width: '125px',
    height: '35px',
    fontSize: '12px',
  },
  buttons: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'inline-flex',
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
      <div className="container-create">
        <Header />
        <h2>Create Team</h2>
        <TextField 
          type="text" 
          value={teamName}
          minlength="2"
          maxlength="24"
          required
          variant="outlined"
          label="Team Name"
          onChange={(event) => setTeamName(event.target.value)}/>
        
        <div className={classes.buttons}>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.btn}
            style={{ border: '2px solid' }}
            onClick={() => history.push('/home')}>
            Go Back
          </Button>
        </div>
        <div className={classes.buttons}>
          <Button 
            variant="outlined"
            color="secondary"
            className={classes.btn}
            style={{ border: '2px solid' }}
            onClick={registerTeam}>
            Create Team
          </Button>
        </div>
      </div>
    </>
  );
}

export default CreateTeam;
