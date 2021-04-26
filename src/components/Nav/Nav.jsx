import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
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
    margin: '0 29%'
  }
}));

function Nav() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Grid container
            xs={12}
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid 
              container 
              item
              xs={4}
              direction="row"
              justify="flex-start"
              alignItems="center">
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
            </Grid>

            <Grid 
              container
              item
              xs={4}
              direction="row"
              justify="center"
              alignItems="center">
              <Typography variant="h6" color="white">
                Nature of the North
              </Typography>
            </Grid>

            <Grid
              container 
              item
              xs={4}
              direction="row"
              justify="flex-end"
              alignItems="center">
              <LogOutButton />
            </Grid>

          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Nav;
