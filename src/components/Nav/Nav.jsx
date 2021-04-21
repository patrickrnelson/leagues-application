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
  links: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2)
  },
  title: {
    textAlign: 'center',
  }
}));

function Nav() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Link onClick={() => history.push('/admin/leagues')}>
            <Typography className={classes.links} variant="h6" color="inherit">
              Leagues
            </Typography>
          </Link>

          <Link onClick={() => history.push('/admin/teams')}>
            <Typography className={classes.links} variant="h6" color="white">
              Teams
            </Typography>
          </Link>
            
            <Typography className={classes.title} variant="h6" color="white">
              Nature of the North
            </Typography>

          <LogOutButton />
          
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Nav;
