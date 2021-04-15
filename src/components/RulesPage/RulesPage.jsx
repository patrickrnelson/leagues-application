import React from 'react';

import Header from '../Header/Header'

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

function AboutPage() {
  // Material UI
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));
  const classes = useStyles();
  // End Material UI

  return (
    <div className="container">
      <Header />
      <h2>Rules</h2>
      <List>
        <ListItem>
            1. Team members must climb together
          </ListItem>
          <ListItem>
            2. A climb is considered “sent” or “completed” when the climber:
            ** Shows control on the start (climber must hold the hand tag & number tag and remove all body weight from the floor).
            ** Ascends the wall using only the specified color hold or taped holds. If a climber uses another hold, on purpose or accident, the climb will be invalid and cannot be submitted for points.
            ** Grabs the top of the wall. The top must be grabbed with two hands, and be held, in control, for at least 5 seconds.
          </ListItem>
          <ListItem>
            3. All volumes and features are on.
          </ListItem>
          <ListItem>
            4. Help may be given both on and off the wall
          </ListItem>
          <ListItem>
            5. Don't be a sandbaggin' SOB - If you are caught sandbagging (climbing below your ability level to try to maximize points), you will be bumped, and points from previous weeks will be adjusted.
          </ListItem>
        </List>
    </div>
  );
}

export default AboutPage;
