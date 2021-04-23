import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { AutorenewTwoTone } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  linksContainer: {
    display: 'flex',
    justifyContent: 'flex-start'
  },
  links: {
    marginRight: '15px',
    marginLeft: '15px',
    fontSize: '24px',
    color: 'white',
    textDecoration: 'none'
  },
  title: {
    display: 'flex',
    margin: '0 auto'
  },
  containerDiv: {
    width: '100%',
    display: 'flex',
    
  }
}));

function Nav() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <div className={classes.containerDiv}>
            <div className={classes.linksContainer}>
              <Link style={{color: 'white'}} onClick={() => history.push('/admin/leagues')}>
                <Typography className={classes.links} variant="h6" color="inherit">
                  Leagues
                </Typography>
              </Link>

              <Link style={{color: 'white'}}onClick={() => history.push('/admin/teams')}>
                <Typography className={classes.links} variant="h6" color="white">
                  Teams
                </Typography>
              </Link>
            </div>

            <div className={classes.title}>
              <Typography variant="h6" color="white">
                Nature of the North
              </Typography>
            </div>

            <LogOutButton />

          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Nav;
