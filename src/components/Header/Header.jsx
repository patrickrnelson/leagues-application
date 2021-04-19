import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
// import Link from '@material-ui/core/Link';
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
  list: {
    width: "225px",
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  logOut: { 
    marginTop: '120px', 
    color: 'red'
  }, 
  btn: {
    textAlign: 'center',
    width: '190px',
    height: '40px'
  }
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
          <IconButton onClick={toggleDrawer} style={{alignItems: "right"}}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Grid item xs={9}>
          <Button variant='outlined' className={classes.btn}>
            <Link onClick={() => history.push('/home')}>Home</Link>
          </Button>
        </Grid>
        <Grid item xs={9}>
          <Button variant='outlined' className={classes.btn}>
            <Link onClick={() => history.push('/team')}>Team</Link>
          </Button>
        </Grid>
        <Grid item xs={9}>
          <Button variant='outlined' className={classes.btn}>
            <Link onClick={() => history.push('/leaderboard')}>Leaderboard</Link>
          </Button>
        </Grid>
        <Grid item xs={9}>
          <Button variant='outlined' className={classes.btn}>
            <Link onClick={() => history.push('/climberProfile')}>Profile</Link>
          </Button>
        </Grid>
        <Grid item xs={9}>
          <Button variant='outlined' className={classes.btn}>
            <Link onClick={() => history.push('/rules')}>Rules</Link>
          </Button>
        </Grid>
        <Grid item xs={9}>
          <Button variant='outlined' className={classes.btn}>
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
      <h1 className='headerTitle'>Nature of the North</h1>
      {/* This section handles the hamburger menu and drawer */}
      <IconButton className='hamburgerIcon' onClick={toggleDrawer} >
        <MenuIcon fontSize="large"/>
      </IconButton>
      <Drawer anchor="right" open={drawer} onClose={toggleDrawer}>
        {list}
      </Drawer>
      {/* End drawer section */}
    </header>
  )
}

export default Header;
