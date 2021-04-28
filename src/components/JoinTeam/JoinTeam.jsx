import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Material-UI imports
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// Custom Components
import Header from '../Header/Header';
import boulderFour from '../Images/boulder4.png';

const useStyles = makeStyles({
  btn: {
    width: '110px',
    height: '35px',
    fontSize: '12px',
  },
  buttons: {
    paddingTop: 30,
    paddingLeft: 25,
    paddingRight: 25,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'inline-flex',
  },
});

function CreateTeam() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  // Redux Store
  const errors = useSelector(store => store.errors);

  // State Variables
  const [teamCode, setTeamCode] = useState('');
  
  useEffect(() => {
    dispatch({ type: 'CLEAR_JOIN_ERROR' });
  },[dispatch]);

  const joinTeam = (event) => {
    event.preventDefault();
    
    if (teamCode) {
      dispatch({ 
        type: 'JOIN_TEAM', 
        payload: teamCode.toUpperCase(),
      });
      history.push('/team')
    } else {
      dispatch({ type: 'ACCESS_CODE_INPUT_ERROR' })
    }
  }; // end joinTeam

  return (
    <>
    <div className="container-join">
      <Header />
    <form onSubmit={joinTeam}>
      <h2>Join Team</h2>
      {errors.joinTeamMessage && (
        <h3 className="alert" role="alert">
          {errors.joinTeamMessage}
        </h3>
      )}
      <h4 for="teamCodeInput">Enter Team Code from Captain</h4>
      
      <TextField 
        type="text" 
        id="teamCodeInput"
        maxlength="6"
        required
        variant="outlined"
        label="Team Code"
        onChange={(event) => setTeamCode(event.target.value)}/>

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
          type="submit">
          Join Team
        </Button>
      </div>
    </form>
    <img className="join-image" src = {boulderFour} alt="boulder" height="150px"  />
    </div>
    </>
  );
}

export default CreateTeam;
