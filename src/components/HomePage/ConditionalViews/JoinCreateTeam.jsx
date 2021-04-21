import React from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  btn: {
    width: '165px',
    height: '45px',
    fontSize: '12px',
  },
});

// This view will show when the user is not on a team
function JoinCreateTeam() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className="container">
      <h2>Welcome!</h2>
      <p>To get started create a team or use the code your team captain gave you to join their team</p>
      <Button
        variant="outlined"
        color="secondary"
        className={classes.btn}
        onClick={(() => history.push('/team/create'))}>
        Create Team
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        className={classes.btn} 
        onClick={(() => history.push('/team/join'))}>
        Join Team
      </Button>
    </div>
  );
}

export default JoinCreateTeam;
