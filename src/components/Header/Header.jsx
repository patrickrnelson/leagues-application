import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import ScoreIcon from '@material-ui/icons/Score';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListIcon from '@material-ui/icons/List';
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import './Header.css';
import logo from '../Images/notn.png';

// Material UI styles
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  list: {
    color: '#ffffff',
    width: "180px",
  },
  fullList: {
    width: 'auto',
  },
  icon: {
    color: '#ffffff',
  },
  logout: {
    color: '#ff1744'
  },
  hamburger: {
    color: '#ffffff',
    paddingTop: 0.1,
  },
  title: {
    color: '#ffffff',
    paddingTop: 4,
  },
  paper: {
    background: '#535353',
  },
});

function Header () {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  // local state for drawer (hamburger menu)
  const [drawer, setDrawer] = useState(false);
  
  const toggleDrawer = () => {
    setDrawer(!drawer);
  };


// This is what is inside the hamburger menu.
  const list = (
    <div className={classes.fullList}>
      <List
        className={classes.list}
        onClick={toggleDrawer}
        onKeyDown={toggleDrawer}
        role="presentation">
        <ListItem onClick={() => history.push('/home')}>
          <ListItemIcon className={classes.icon}>{<HomeIcon />}</ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>
        <ListItem onClick={() => history.push('/climberProfile')}>
          <ListItemIcon className={classes.icon}>{<AccountCircleIcon />}</ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </ListItem>
        <ListItem onClick={() => history.push('/team')}>
          <ListItemIcon className={classes.icon}>{<PeopleIcon />}</ListItemIcon>
          <ListItemText>Team</ListItemText>
        </ListItem>
        <ListItem onClick={() => history.push('/leaderboard')}>
          <ListItemIcon className={classes.icon}>{<ScoreIcon />}</ListItemIcon>
          <ListItemText>Leaderboard</ListItemText>
        </ListItem>
        <ListItem onClick={() => history.push('/rules')}>
          <ListItemIcon className={classes.icon}>{<ListIcon />}</ListItemIcon>
          <ListItemText>Rules</ListItemText>
        </ListItem>
        <ListItem onClick={() => history.push('/about')}>
          <ListItemIcon className={classes.icon}>{<InfoIcon />}</ListItemIcon>
          <ListItemText>About</ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List className={classes.logout}>
        <ListItem onClick={() => dispatch({ type: 'LOGOUT' })}>
          <ListItemIcon className={classes.logout}>{<ExitToAppIcon />}</ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </ListItem>
      </List>
    </div>
  ); // end list

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
      <Drawer anchor="right" open={drawer} onClose={toggleDrawer} classes={{ paper: classes.paper }}>
        {list}
      </Drawer>
      {/* End drawer section */}
    </header>
  )
}

export default Header;
