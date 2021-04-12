import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

// Material UI styles
const useStyles = makeStyles({
  list: {
    width: "225px",
  },
  
  logOut: { 
    marginTop: '120px', 
    color: 'red'
  }
});

function HamburgerNav () {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  // local state for drawer (hamburger menu)
  const [drawer, setDrawer] = useState(false);
  
  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const list = (
    <div style={{ padding: 20 }}>
      <Grid
        container
        spacing={3}
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        className={classes.list}
        onClick={toggleDrawer}
        onKeyDown={toggleDrawer}
        role="presentation">
        <Grid item xs={6}>
          <IconButton onClick={toggleDrawer} style={{alignItems: "center"}}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Grid item xs={9}>
          <Link onClick={() => history.push('/climb/session')}>Climb Session</Link>
        </Grid>
        <Grid item xs={9}>
          <Link onClick={() => history.push('/team')}>Team</Link>
        </Grid>
        <Grid item xs={9}>
          <Link onClick={() => history.push('/leaderboard')}>Leaderboard</Link>
        </Grid>
        <Grid item xs={9}>
          <Link onClick={() => history.push('/climber/profile')}>Profile</Link>
        </Grid>
        <Grid item xs={9}>
          <Link onClick={() => history.push('/rules')}>Rules</Link>
        </Grid>
        <Grid item xs={9}>
          <Link onClick={() => history.push('/about')}>About</Link>
        </Grid>
        {/* <Button onClick={handleLogout} className={classes.logOut}>Log Out</Button> */}
      </Grid>
    </div>
  ) // end list

  return (
    <header style={{ textAlign: 'right', paddingRight: '22px', paddingTop: '10px'}}>

      {/* This section handles the hamburger menu and drawer */}
      <IconButton onClick={toggleDrawer} >
        <MenuIcon fontSize="large"/>
      </IconButton>
      <Drawer anchor="right" open={drawer} onClose={toggleDrawer}>
        {list}
      </Drawer>
      {/* End drawer section */}

    </header>
  )
}

export default HamburgerNav