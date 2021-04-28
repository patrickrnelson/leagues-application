import React from 'react';
import { useHistory } from 'react-router-dom';

// Material-UI imports
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import boulderTwo from '../../Images/boulder2.png';

const useStyles = makeStyles({
  btn: {
    width: '120px',
    height: '35px',
    fontSize: '11px',
  },
  buttons: {
    paddingTop: 40,
    paddingLeft: 10,
    paddingRight: 10,
    display: 'inline-flex',
  },
});

// This view will show when the user is not on a team
function JoinCreateTeam() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
    <div className="container-welcome">
      <h2>Welcome!</h2>
      <p>To get started create a team or use the code your team captain gave you to join their team</p>
    </div>

      <div className={classes.buttons}>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.btn}
          style={{ border: '2px solid' }}
          onClick={(() => history.push('/team/create'))}>
          Create Team
        </Button>
      </div>
      <div className={classes.buttons}>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.btn}
          style={{ border: '2px solid' }}
          onClick={(() => history.push('/team/join'))}>
          Join Team
        </Button>
      </div>
      <img className="welcome-image" src = {boulderTwo} alt="boulder" height="150px"  />
    </>
  );
}

export default JoinCreateTeam;
