import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const dispatch = useDispatch();
  const history = useHistory();

  const [teamCode, setTeamCode] = useState('');
  const errors = useSelector(store => store.errors);
  

  useEffect(() => {
    dispatch({ type: 'CLEAR_JOIN_ERROR' });
  },[dispatch]);

  const joinTeam = (event) => {
    event.preventDefault();
    
    if (teamCode) {
      dispatch({ 
        type: 'JOIN_TEAM', 
        payload: teamCode.toUpperCase(),
        onComplete: () => {
          history.push('/team')
        }
      });
    } else {
      dispatch({ type: 'ACCESS_CODE_INPUT_ERROR' })
    }
  } 

  return (
    <>
    <div className="container">
      <Header />
    </div>
    <form onSubmit={joinTeam}>
      <h2>Join Team</h2>
      {errors.joinTeamMessage && (
        <h3 className="alert" role="alert">
          {errors.joinTeamMessage}
        </h3>
      )}
      <label for="teamCodeInput">Enter Team Code from Captain</label>
      <input 
        type="text" 
        id="teamCodeInput" 
        placeholder="Team Code"
        maxlength="6"
        required
        onChange={(event) => setTeamCode(event.target.value)}/>
      <Button
        variant="outlined"
        color="secondary"
        className={classes.btn}
        type="submit">
        Join Team
      </Button>
    </form>
    </>
  );
}

export default CreateTeam;
