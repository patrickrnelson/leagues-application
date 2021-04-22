import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

import Header from '../Header/Header'
import './AddClimb.css'
import boulderSeven from '../Images/boulder7.png';

const useStyles = makeStyles((theme) => ({
  btn: {
    fontSize: '12px',
  },
  btnCancel: {
    fontSize: '12px',
    color: '#ff1744',
  },
  formControl: {
    minWidth: 120,
    paddingBottom: 20,
  },
  top: {
    textAlign: 'center',
    paddingTop: 70,
    paddingLeft: 20,
    paddingRight: 20,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    padding: 30,
    flexGrow: 1,
  },
  climber: {
    display: 'inline-block',
  },
  color: {
    display: 'inline-block',
  },
  location: {
    display: 'inline-block',
  },
  difficulty: {
    display: 'inline-block',
  },
  attempts: {
    display: 'inline',
    width: '50%',
    justifyContent: 'space-around',
  },
  buttons: {
    paddingTop: 30,
    paddingLeft: 25,
    paddingRight: 25,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'inline-flex',
  },
}));

function AddClimb() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);
  const teams = useSelector(store => store.teams);
  const conditionalData = useSelector(store => store.conditional);
  
  // local state to store climb info from inputs 
  const [captainId, setCaptainId] = useState('')
  const [climber, setClimber] = useState(user.name)
  const [climberId, setClimberId] = useState(user.id)
  const [color, setColor] = useState('')
  const [location, setLocation] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [attempts, setAttempts] = useState(0)

  let colors = ['Black', 'Blue', 'Green', 'Red', 'White', 'Yellow']
  let locations = ['Left Barrel', 'Overhang', 'Right Barrel', 'Slab', 'Slight Overhang'] // can change this to live in the store eventually
  let difficulties = ['V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10', 'V11', 'V12']


  useEffect(() => {
    findCaptainId();
  }, [])

  const handleAddClimb = () => {
    // make sure each input is selected
    if(color !== '' && location !== '' && difficulty !== '' && attempts !== 0) {
      // send new climb to climbs saga which sends to climb reducer to store in database
      dispatch ({
        type: 'ADD_NEW_CLIMB',
        payload: {
          climberId: climberId,
          color: color,
          location: location,
          difficulty: difficulty.substring(1), // Removes the 'V' so we send only a number to the DB
          attempts: attempts
        },

      })
      history.push('/climb/session')
    }
    else {
      alert('Please select all inputs')
    }
  } // end handleAddClimb

  // Used to find climberID since we can't pass it in the 'select' onChange
  // This will set both the climber and climberId state when the climber 'select' is changed
  const findClimberId = (event) => {
    setClimber(event.target.value)
    for(let team of teams) {
      if(team.captainId === user.id) {
        if(team.username === event.target.value) {
          setClimberId(team.userId)
        }
      }
    }
  }

  const findCaptainId = () => {
    for(let team of teams) {
      setCaptainId(team.captainId)
    }
  }

  return (
    <>
    <div className={classes.top}>
      <Header />
      <h2>Week 1</h2>
      <h3>Add a Climb</h3>
    

    <div className={classes.container}>
      {/* Captain Only - Select Climber */}

      <FormControl className={classes.climber}>
        {conditionalData[0].captainId === user.id ?
        <>
        <Typography style={{textAlign: 'left'}} variant="label" >Climber: </Typography>
          <NativeSelect style={{textAlign: 'right'}} className={classes.select} value={climber} onChange={(event) => findClimberId(event)}>
          {teams.map((team) => (
            team.captainId === user.id ?
              <option>
                {team.username}
              </option>
          : null
          ))}
          </NativeSelect>
          </>
          : null}
      </FormControl>
    
    <br/>
    <br/>

      {/* Color Dropdown */}
      <div className={classes.color}>
        <Typography variant="label">Color:  </Typography>
          <NativeSelect  onChange={(event) => setColor(event.target.value)}>
            <option value="" selected disabled>Select a Color</option>
            {colors.map(color => <option>{color}</option>)}
        </NativeSelect>
      </div>

      <br/>
      <br/>

      {/* Location in gym Dropdown */}
      <FormControl className={classes.location}>
        <Typography variant="label">Location: </Typography>
          <NativeSelect onChange={(event) => setLocation(event.target.value)}>
            <option value="starter" selected disabled>Select a Location</option>
            {locations.map(location => <option>{location}</option>)}
        </NativeSelect>
      </FormControl>

      <br/>
      <br/>

      {/* Difficulty Dropdown */}
      <FormControl className={classes.difficulty}>
        <Typography variant="label">Difficulty: </Typography>
          <NativeSelect onChange={(event) => setDifficulty(event.target.value)}>
            <option value="starter" selected disabled>Select a Difficulty</option>
            {difficulties.map(difficulty => <option>{difficulty}</option>)}
          </NativeSelect>
      </FormControl>

      <br/>
      <br/>

      {/* Attempts clicker */}
        <Typography variant="label">Attempts  </Typography>
        <FormControl className={classes.attempts}>
          <div className="attemptsPicker">
          <RemoveIcon onClick={() => attempts > 0 ? setAttempts(attempts - 1) : setAttempts(attempts)}/>
          <p>{attempts}</p>
          <AddIcon onClick={() => setAttempts(attempts + 1)}/>
          </div>
      </FormControl>

      </div>

      {/* Submit or Cancel */}
      <div className={classes.buttons}>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.btnCancel}
          style={{ border: '2px solid' }}
          onClick={() => history.push('/climb/session')}>
          Cancel
        </Button>
      </div>
      <div className={classes.buttons}>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.btn}
          style={{ border: '2px solid' }}
          onClick={handleAddClimb}>
          Submit!
        </Button>
      </div>
      <img className="add-climb-image" src = {boulderSeven} alt="boulder" height="150px"  />
    </div>
    </>
  );
}

export default AddClimb;
