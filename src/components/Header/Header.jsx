import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

import './Header.css';
import LogOutButton from '../LogOutButton/LogOutButton';
import logo from '../Images/notn.png';

// Material UI styles
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  list: {
    width: "160px",
    alignItems: 'center',
    justifyContent: 'center',
  },
  logOut: { 
    textAlign: 'right',
    marginTop: '120px', 
    color: '#ad0c0c'
  }, 
  btn: {
    width: '130px',
    height: '40px',
  },
  hamburger: {
    color: 'white',
    paddingTop: 0.1,
  },
  title: {
    color: 'white',
    paddingTop: 4,
  },
});

function Header () {
  const history = useHistory();
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
        <Grid item xs={6} style={{alignItems: "right"}}>
          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <Button variant='outlined' color="secondary" className={classes.btn} style={{ border: '2px solid' }}>
            <Link onClick={() => history.push('/home')}>Home</Link>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant='outlined' color="secondary" className={classes.btn} style={{ border: '2px solid' }}>
            <Link onClick={() => history.push('/team')}>Team</Link>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant='outlined' color="secondary" className={classes.btn} style={{ border: '2px solid' }}>
            <Link onClick={() => history.push('/leaderboard')}>Leaderboard</Link>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant='outlined' color="secondary" className={classes.btn} style={{ border: '2px solid' }}>
            <Link onClick={() => history.push('/climberProfile')}>Profile</Link>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant='outlined' color="secondary" className={classes.btn} style={{ border: '2px solid' }}>
            <Link onClick={() => history.push('/rules')}>Rules</Link>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant='outlined' color="secondary" className={classes.btn} style={{ border: '2px solid' }}>
            <Link onClick={() => history.push('/about')}>About</Link>
          </Button>
        </Grid>
        <Grid>
          <LogOutButton />
        </Grid>  
      </Grid>
    </div>
  ) // end list

  return (
    <header className='header'>
      <Link to="/home">
      <img src = {logo} alt="Logo" width='50px'/>
      </Link>
      <Typography className={classes.title} variant="h5">Nature of the North</Typography>
      {/* This section handles the hamburger menu and drawer */}
      <IconButton className={classes.hamburger} onClick={toggleDrawer} >
        <MenuIcon fontSize="large" />
      </IconButton>
      <Drawer anchor="right" open={drawer} onClose={toggleDrawer} className={classes.menu}>
        {list}
      </Drawer>
      {/* End drawer section */}
    </header>
  )
}

export default Header;
